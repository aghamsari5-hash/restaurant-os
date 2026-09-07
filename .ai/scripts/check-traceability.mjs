#!/usr/bin/env node
/**
 * check-traceability.mjs — Verify that a feature's traceability chain is complete.
 *
 * Usage:
 *   node .ai/scripts/check-traceability.mjs --feature products
 *   node .ai/scripts/check-traceability.mjs --phase phase-1
 *   node .ai/scripts/check-traceability.mjs --all
 *
 * Checks:
 *   - Every required file exists for the feature
 *   - DoD checklist is green (if exists)
 *   - Traceability matrix row is green
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const REQUIRED_FILES = {
  spec: 'spec.md',
  plan: 'plan.md',
  apiContract: 'api-contract.md',
  dbSchema: 'database-schema.md',
  uiSpec: 'ui-spec.md', // optional for non-UI features
  traceability: 'traceability.md',
  dodChecklist: 'dod-checklist.md',
};

// Parse args
const args = process.argv.slice(2);
let feature = null;
let phase = null;
let all = false;

const featIdx = args.indexOf('--feature');
if (featIdx !== -1) feature = args[featIdx + 1];

const phaseIdx = args.indexOf('--phase');
if (phaseIdx !== -1) phase = args[phaseIdx + 1];

if (args.includes('--all')) all = true;

if (!feature && !phase && !all) {
  console.log('Usage:');
  console.log('  node .ai/scripts/check-traceability.mjs --feature <name>');
  console.log('  node .ai/scripts/check-traceability.mjs --phase <phase-id>');
  console.log('  node .ai/scripts/check-traceability.mjs --all');
  process.exit(0);
}

function checkFeature(featureName) {
  const base = join('specs', featureName);
  console.log(`\n📋 Traceability Check — ${featureName}`);
  console.log('─'.repeat(50));

  let hasErrors = false;
  let hasWarnings = false;

  for (const [key, file] of Object.entries(REQUIRED_FILES)) {
    const filePath = join(base, file);
    const isOptional = key === 'uiSpec';

    if (existsSync(filePath)) {
      // Check for TODO/TBD in required files
      const content = readFileSync(filePath, 'utf-8');
      const hasTodo = /TODO|TBD|FIXME/.test(content);
      if (hasTodo && key !== 'traceability') {
        console.log(`  ⚠️  ${file} — exists but contains TODO/TBD/FIXME`);
        hasWarnings = true;
      } else {
        console.log(`  ✅ ${file} — exists`);
      }
    } else {
      if (isOptional) {
        console.log(`  ⬛ ${file} — not found (N/A if non-UI feature)`);
      } else {
        console.log(`  ❌ ${file} — MISSING`);
        if (key === 'spec' || key === 'apiContract' || key === 'dbSchema') {
          hasErrors = true;
        } else {
          hasWarnings = true;
        }
      }
    }
  }

  // Check traceability matrix if it exists
  const tracePath = join(base, 'traceability.md');
  if (existsSync(tracePath)) {
    const trace = readFileSync(tracePath, 'utf-8');
    const redCells = (trace.match(/🔴/g) || []).length;
    const yellowCells = (trace.match(/🟡/g) || []).length;
    const whiteCells = (trace.match(/⬜/g) || []).length;

    if (redCells > 0) {
      console.log(`  🔴 Traceability: ${redCells} blocked cells`);
      hasErrors = true;
    }
    if (whiteCells > 0) {
      console.log(`  ⬜ Traceability: ${whiteCells} not-started cells`);
      hasWarnings = true;
    }
    if (yellowCells > 0) {
      console.log(`  🟡 Traceability: ${yellowCells} in-progress cells`);
      hasWarnings = true;
    }
    if (redCells === 0 && whiteCells === 0 && yellowCells === 0) {
      console.log(`  ✅ Traceability: All cells green/N/A`);
    }
  }

  // Check DoD
  const dodPath = join(base, 'dod-checklist.md');
  if (existsSync(dodPath)) {
    const dod = readFileSync(dodPath, 'utf-8');
    const unchecked = (dod.match(/- \[ \]/g) || []).length;
    const checked = (dod.match(/- \[x\]/g) || []).length;

    if (unchecked > 0) {
      console.log(`  ⬜ DoD: ${unchecked} unchecked / ${checked} checked`);
      hasWarnings = true;
    } else if (checked > 0) {
      console.log(`  ✅ DoD: All ${checked} items checked`);
    }
  }

  // Verdict
  console.log('');
  if (hasErrors) {
    console.log(`  🔴 VERDICT: BLOCKED — Missing required artifacts`);
    return false;
  } else if (hasWarnings) {
    console.log(`  🟡 VERDICT: IN PROGRESS — Some items incomplete`);
    return false;
  } else {
    console.log(`  🟢 VERDICT: COMPLETE — All traceability links verified`);
    return true;
  }
}

// Execute
if (all) {
  console.log('🔍 Checking all features in specs/...\n');
  const { readdirSync, statSync } = await import('fs');
  try {
    const entries = readdirSync('specs');
    let allGreen = true;
    for (const entry of entries) {
      if (entry.startsWith('.') || entry.startsWith('_')) continue;
      const full = join('specs', entry);
      if (statSync(full).isDirectory()) {
        const green = checkFeature(entry);
        if (!green) allGreen = false;
      }
    }
    console.log(`\n${'═'.repeat(50)}`);
    console.log(allGreen ? '🟢 ALL FEATURES COMPLETE' : '🟡 SOME FEATURES INCOMPLETE');
    process.exit(allGreen ? 0 : 1);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
} else if (feature) {
  const green = checkFeature(feature);
  process.exit(green ? 0 : 1);
} else if (phase) {
  const green = checkFeature(phase);
  process.exit(green ? 0 : 1);
}
