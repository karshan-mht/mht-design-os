#!/usr/bin/env node
/* =============================================================================
   lint-icon-paint — icons must carry no paint of their own
   =============================================================================
   lint-tokens.js enforces "color lives in tokens, nowhere else", and skips
   system/icons wholesale because those pages carry their own chrome. That skip
   also exempted the icon SVGs, and 22 editorial icons sat with a literal black
   fill on their solid dots — pupils, full stops — which stayed black while the
   rest of the icon tinted purple or blue. Nothing caught it.

   The rule here is not the token rule. An icon does not consume a token; it
   consumes whatever `color` the call site sets. So every paint attribute in a
   tintable icon must be exactly `currentColor` or `none`. A literal value is a
   dot that will not tint.

     node evals/lint-icon-paint.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Tintable sets: inlined by the registries and coloured by CSS at the call site.
const TINTABLE = ['system/icons/ui', 'system/icons/illustrations'];

// Assets are mostly artwork — brand marks, decoration, headshots — where a
// literal colour is correct. These prefixes are the exception: the asset
// manifest documents them as tintable, so they answer to the same rule.
const TINTABLE_ASSETS = [/^tab-/];

const PAINT = /\b(fill|stroke)\s*=\s*"([^"]*)"/g;
const ALLOWED = new Set(['currentColor', 'none', '']);

function scan(file, rel) {
  const bad = [];
  const src = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = PAINT.exec(src))) {
    const [, attr, value] = m;
    if (ALLOWED.has(value.trim())) continue;
    const line = src.slice(0, m.index).split('\n').length;
    bad.push({ rel, line, attr, value: value.trim() });
  }
  return bad;
}

function svgsIn(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter(f => f.endsWith('.svg')).map(f => path.join(dir, f));
}

const failures = [];

for (const dir of TINTABLE) {
  for (const rel of svgsIn(dir)) failures.push(...scan(path.join(ROOT, rel), rel));
}

for (const rel of svgsIn('system/assets')) {
  const name = path.basename(rel);
  if (!TINTABLE_ASSETS.some(re => re.test(name))) continue;
  failures.push(...scan(path.join(ROOT, rel), rel));
}

if (failures.length === 0) {
  const n = TINTABLE.reduce((a, d) => a + svgsIn(d).length, 0);
  console.log(`PASS — ${n} tintable icons carry no paint of their own.`);
  process.exit(0);
}

console.error(`FAIL — ${failures.length} paint value${failures.length === 1 ? '' : 's'} that will not tint:\n`);
for (const f of failures) {
  console.error(`  ${f.rel}:${f.line}  ${f.attr}="${f.value}"`);
}
console.error('\nUse currentColor (or none). The call site sets `color`; the icon follows it.');
process.exit(1);
