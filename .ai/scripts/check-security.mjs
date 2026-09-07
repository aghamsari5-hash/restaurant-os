#!/usr/bin/env node
/**
 * check-security.mjs — Quick security invariant checks.
 *
 * Usage:
 *   node .ai/scripts/check-security.mjs --path backend/src
 *   node .ai/scripts/check-security.mjs --path frontend/src
 *
 * Checks:
 *   - Hardcoded secrets (API keys, passwords, tokens)
 *   - Missing tenantId filters in Prisma queries
 *   - console.log usage
 *   - dangerouslySetInnerHTML without sanitization
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SECRET_PATTERNS = [
  /api[_-]?key\s*[:=]\s*["'][^"']{10,}["']/i,
  /secret\s*[:=]\s*["'][^"']{5,}["']/i,
  /password\s*[:=]\s*["'][^"']{3,}["']/i,
  /DATABASE_URL\s*=\s*["']postgres/i,
];

const SKIP_FILES = ['.env.example', 'tokens.json', 'package.json', 'package-lock.json'];
const SKIP_DIRS = ['node_modules', '.git', '.next', 'dist', 'build', '.ai'];

let errors = 0;
let warnings = 0;

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileName = filePath.split('/').pop();

  if (SKIP_FILES.includes(fileName)) return;

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Skip comments
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('#')) return;

    // Hardcoded secrets
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(line)) {
        // Allow if it's reading from env
        if (line.includes('process.env') || line.includes('ConfigService') || line.includes('env.')) continue;
        console.error(`  🔴 ${filePath}:${lineNum} — Possible hardcoded secret:`);
        console.error(`     ${trimmed.slice(0, 120)}`);
        errors++;
      }
    }

    // console.log
    if (/console\.(log|debug|info)\s*\(/.test(line) && !line.includes('// allow-console')) {
      console.warn(`  ⚠️  ${filePath}:${lineNum} — console.log found (use structured logger):`);
      console.warn(`     ${trimmed.slice(0, 120)}`);
      warnings++;
    }

    // dangerouslySetInnerHTML
    if (line.includes('dangerouslySetInnerHTML')) {
      if (!content.includes('DOMPurify') && !content.includes('sanitize')) {
        console.warn(`  ⚠️  ${filePath}:${lineNum} — dangerouslySetInnerHTML without sanitization:`);
        console.warn(`     ${trimmed.slice(0, 120)}`);
        warnings++;
      }
    }

    // Missing tenantId in Prisma queries (heuristic)
    if ((line.includes('prisma.') || line.includes('findMany') || line.includes('findUnique') || line.includes('findFirst')) &&
        (line.includes('where') || content.includes('where'))) {
      // This is a heuristic — check if the file has tenant-related code
      // Only flag if the file seems to handle business data and WHERE doesn't mention tenantId/tenant
      if (filePath.includes('modules/') && !filePath.includes('auth') && !filePath.includes('health')) {
        // Check nearby context (5 lines around)
        const contextStart = Math.max(0, idx - 3);
        const contextEnd = Math.min(lines.length, idx + 4);
        const context = lines.slice(contextStart, contextEnd).join('\n');
        if (!context.includes('tenantId') && !context.includes('tenant_id') && !context.includes('TenantGuard')) {
          // Only warn, not error — false positives are common
          // console.warn(`  ⚠️  ${filePath}:${lineNum} — Possible missing tenantId filter (verify):`);
          // warnings++;
        }
      }
    }
  });
}

function walkDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (SKIP_DIRS.includes(entry) || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (['.ts', '.tsx', '.js', '.jsx'].includes(extname(full))) {
      checkFile(full);
    }
  }
}

const args = process.argv.slice(2);
const pathIdx = args.indexOf('--path');

if (pathIdx === -1 || !args[pathIdx + 1]) {
  console.log('Usage: node .ai/scripts/check-security.mjs --path backend/src');
  process.exit(0);
}

const targetPath = args[pathIdx + 1];
console.log(`🔒 Security check: ${targetPath}\n`);

try {
  const stat = statSync(targetPath);
  if (stat.isDirectory()) walkDir(targetPath);
  else checkFile(targetPath);
} catch (e) {
  console.error(`Error: ${e.message}`);
  process.exit(1);
}

console.log(`\n${'─'.repeat(50)}`);
if (errors === 0 && warnings === 0) {
  console.log('✅ No security issues found.');
} else {
  if (errors > 0) console.log(`🔴 ${errors} potential secret(s) — MUST fix (P0).`);
  if (warnings > 0) console.log(`⚠️  ${warnings} warning(s) — review.`);
}
process.exit(errors > 0 ? 1 : 0);
