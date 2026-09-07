#!/usr/bin/env node
/**
 * validate-tokens.mjs — Check that frontend code uses only design tokens, no arbitrary values.
 *
 * Usage:
 *   node .ai/scripts/validate-tokens.mjs --path frontend/src
 *   node .ai/scripts/validate-tokens.mjs --spec specs/products/ui-spec.md
 *
 * Checks:
 *   - No arbitrary Tailwind values: w-[...], text-[#...], bg-[#...], etc.
 *   - No inline style={} with hardcoded colors/spacing
 *   - Warns on non-token color usage
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ARBITRARY_VALUE_REGEX = /[a-z]+-\[.+?\]/g;
const INLINE_STYLE_REGEX = /style\s*=\s*\{\{[^}]*\}\}/g;
const HARDCODED_COLOR_REGEX = /#[0-9a-fA-F]{3,8}\b/g;
const HARDCODED_PX_REGEX = /:\s*['"`]?\d+px['"`]?/g;

let errors = 0;
let warnings = 0;

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check arbitrary Tailwind values
    const arbitraryMatches = line.match(ARBITRARY_VALUE_REGEX);
    if (arbitraryMatches) {
      // Allow some exceptions: data attributes, known safe patterns
      const filtered = arbitraryMatches.filter(m => {
        // Allow data-[] and aria-[] which are valid Tailwind
        if (m.startsWith('data-[') || m.startsWith('aria-[')) return false;
        return true;
      });
      if (filtered.length > 0) {
        console.error(`  ❌ ${filePath}:${lineNum} — Arbitrary Tailwind value: ${filtered.join(', ')}`);
        console.error(`     ${line.trim().slice(0, 120)}`);
        errors++;
      }
    }

    // Check inline styles
    if (INLINE_STYLE_REGEX.test(line)) {
      console.error(`  ❌ ${filePath}:${lineNum} — Inline style detected (use Tailwind + tokens):`);
      console.error(`     ${line.trim().slice(0, 120)}`);
      errors++;
    }

    // Warn on hardcoded colors outside tokens
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      const colorMatches = line.match(HARDCODED_COLOR_REGEX);
      if (colorMatches && !line.includes('// allow-color') && !line.includes('allow-color')) {
        // Only warn if it looks like a style value, not a comment or test
        if (line.includes('bg-') || line.includes('text-') || line.includes('border-') || line.includes('color') || line.includes('#')) {
          // Check if it's in a className or style context
          if (line.includes('className') || line.includes('style') || line.includes('color')) {
            console.warn(`  ⚠️  ${filePath}:${lineNum} — Hardcoded color (use token): ${colorMatches.join(', ')}`);
            warnings++;
          }
        }
      }
    }
  });
}

function walkDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (['.tsx', '.ts', '.jsx', '.js'].includes(extname(full))) {
      checkFile(full);
    }
  }
}

// Parse args
const args = process.argv.slice(2);
const pathIdx = args.indexOf('--path');
const specIdx = args.indexOf('--spec');

if (pathIdx !== -1 && args[pathIdx + 1]) {
  const targetPath = args[pathIdx + 1];
  console.log(`🔍 Checking tokens compliance in: ${targetPath}\n`);
  try {
    const stat = statSync(targetPath);
    if (stat.isDirectory()) walkDir(targetPath);
    else checkFile(targetPath);
  } catch (e) {
    console.error(`Error reading path: ${e.message}`);
    process.exit(1);
  }
} else if (specIdx !== -1 && args[specIdx + 1]) {
  const specPath = args[specIdx + 1];
  console.log(`🔍 Checking ui-spec token compliance: ${specPath}\n`);
  checkFile(specPath);
} else {
  console.log('Usage:');
  console.log('  node .ai/scripts/validate-tokens.mjs --path frontend/src');
  console.log('  node .ai/scripts/validate-tokens.mjs --spec specs/<feature>/ui-spec.md');
  process.exit(0);
}

console.log(`\n${'─'.repeat(50)}`);
if (errors === 0 && warnings === 0) {
  console.log('✅ All checks passed — no token violations found.');
} else {
  if (errors > 0) console.log(`❌ ${errors} error(s) found — fix before marking UI complete.`);
  if (warnings > 0) console.log(`⚠️  ${warnings} warning(s) — review and map to tokens or add ADR.`);
}
process.exit(errors > 0 ? 1 : 0);
