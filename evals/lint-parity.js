#!/usr/bin/env node
/* =============================================================================
   lint-parity — validate system/parity.json against the repo
   =============================================================================
   What this CAN check, deterministically:
     - the JSON is well formed and every entry has the required fields
     - every `block` actually exists in the CSS (via the component index)
     - every `doc` and `css` path exists
     - every `file` reference resolves to a declared Figma file
     - node ids look like node ids
     - a component with a contract but no parity entry is reported

   What it CANNOT check: whether the Figma node still exists or still matches.
   That needs Figma access, so each entry carries a `verified` date instead and
   this reports entries that have gone stale.

     node evals/lint-parity.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STALE_AFTER_DAYS = 90;

const parity = JSON.parse(fs.readFileSync(path.join(ROOT, 'system/parity.json'), 'utf8'));
const index = fs.readFileSync(path.join(ROOT, 'system/components/INDEX.md'), 'utf8');

const knownBlocks = new Set([...index.matchAll(/^\| `\.([a-z0-9-]+)`/gm)].map(m => m[1]));
const contracted = new Set(
  [...index.matchAll(/^\| `\.([a-z0-9-]+)`.*\[yes\]/gm)].map(m => m[1])
);

const errors = [];
const notes = [];
const seen = new Set();

parity.components.forEach((c, i) => {
  const where = `components[${i}] (${c.block || '?'} ${c.node || '?'})`;

  for (const field of ['block', 'file', 'node', 'css', 'verified']) {
    if (!c[field]) errors.push(`${where}: missing required field "${field}"`);
  }
  if (!parity.files[c.file]) errors.push(`${where}: unknown file key "${c.file}"`);
  if (c.node && !/^\d+[:-]\d+$/.test(c.node)) errors.push(`${where}: "${c.node}" is not a node id`);
  if (c.block && !knownBlocks.has(c.block)) {
    errors.push(`${where}: block ".${c.block}" is not in the component index — renamed or removed?`);
  }
  for (const f of [c.doc, c.css]) {
    if (f && !fs.existsSync(path.join(ROOT, f))) errors.push(`${where}: path does not exist: ${f}`);
  }

  const key = `${c.file}#${c.node}`;
  if (seen.has(key)) errors.push(`${where}: duplicate node ${key}`);
  seen.add(key);

  if (c.verified) {
    const age = (Date.now() - Date.parse(c.verified)) / 86400000;
    if (age > STALE_AFTER_DAYS) {
      notes.push(`${where}: last verified ${Math.round(age)} days ago — re-check against Figma`);
    }
  }
});

// Coverage: a component good enough to document is good enough to map.
const mapped = new Set(parity.components.map(c => c.block));
for (const b of contracted) {
  if (!mapped.has(b)) notes.push(`.${b} has a contract but no parity entry`);
}

const pct = knownBlocks.size ? Math.round((mapped.size / knownBlocks.size) * 100) : 0;

if (notes.length) {
  console.error(`NOTE — ${notes.length} coverage gap${notes.length === 1 ? '' : 's'}:`);
  for (const n of notes) console.error(`  ${n}`);
  console.error('');
}

if (errors.length) {
  console.error(`FAIL — ${errors.length} parity problem${errors.length === 1 ? '' : 's'}:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

console.log(
  `PASS — ${parity.components.length} parity entries across ${Object.keys(parity.files).length} Figma files; ` +
  `${mapped.size}/${knownBlocks.size} blocks mapped (${pct}%).`
);
