#!/usr/bin/env node
/* =============================================================================
   lint-dead-code — find styling and behaviour that nothing reaches
   =============================================================================
   Written after a real miss: system/components/uplevel/docs.md was written as
   though the level-up pill shipped. It does not. renderUplevel() is defined and
   never called, and .screen__uplevel is only referenced by a querySelector that
   always returns null. The component was parked on 2026-08-04 pending an up-nav
   decision and the code left in place.

   Nothing caught that, because the component index's "JS" column only asks
   whether the string appears in main.js — which cannot tell a definition from a
   call.

   Two checks:
     1. CSS blocks whose class never appears in any markup or script
     2. functions defined in main.js and never called

   Both are ADVISORY. Parked code is a legitimate state; the point is that it
   should be a known one, not a surprise found while writing documentation.

     node evals/lint-dead-code.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Blocks that are styled here but rendered elsewhere, or applied dynamically.
const EXPECTED_UNUSED = {
  'launcher-hotspot': 'injected by main.js and entry-points/back-to-launcher.js',
};

// Parked on purpose — kept for a planned use, not dead. Each needs a reason and
// a contract that says so, otherwise this list becomes a way to silence the
// check rather than answer it.
const PARKED_FUNCTIONS = {
  renderUplevel: 'level-up pill, parked 2026-08-04 pending the up-nav treatment; ' +
                 'kept deliberately for pages under the main sections. See ' +
                 'system/components/uplevel/docs.md',
};

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }

function sources() {
  const out = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const full = path.join(dir, e.name);
      const rel = path.relative(ROOT, full);
      if (e.isDirectory()) {
        if (['system/assets', 'system/icons', 'evals'].includes(rel)) continue;
        walk(full);
      } else if (/\.(js|html)$/.test(e.name)) out.push(rel);
    }
  })(ROOT);
  return out;
}

const index = read('system/components/INDEX.md');
const blocks = [...index.matchAll(/^\| `\.([a-z0-9-]+)`/gm)].map(m => m[1]);

const corpus = sources().map(read).join('\n');

// --- 1. blocks nothing renders ---------------------------------------------
const unrendered = blocks.filter(b => {
  if (EXPECTED_UNUSED[b]) return false;
  // A block counts as rendered if the bare class OR any of its BEM elements or
  // modifiers appears. Several blocks here only ever exist as `block__element`
  // (.comm-ic is styled only as .comm-ic__bg / __glyph / __action).
  const re = new RegExp(`\\b${b}(__[a-z0-9-]+|--[a-z0-9-]+)?\\b`);
  return !re.test(corpus);
});

// --- 2. functions defined and never called ---------------------------------
const mainJs = read('prototypes/navigation/main.js');
const defined = [...mainJs.matchAll(/^function ([a-zA-Z_][\w]*)\s*\(/gm)].map(m => m[1]);
const uncalled = defined.filter(fn => {
  if (PARKED_FUNCTIONS[fn]) return false;
  const calls = mainJs.match(new RegExp(`\\b${fn}\\s*\\(`, 'g')) || [];
  return calls.length <= 1;   // the definition itself
});

let found = 0;

if (unrendered.length) {
  found += unrendered.length;
  console.error(`NOTE — ${unrendered.length} CSS block${unrendered.length === 1 ? '' : 's'} that nothing appears to render:`);
  for (const b of unrendered) console.error(`  .${b}`);
  console.error('  Either it is parked (say so in its contract) or it is dead (delete it).\n');
}

if (uncalled.length) {
  found += uncalled.length;
  console.error(`NOTE — ${uncalled.length} function${uncalled.length === 1 ? '' : 's'} in main.js defined but never called:`);
  for (const fn of uncalled) console.error(`  ${fn}()`);
  console.error('  Same question: parked, or dead?\n');
}

const parked = Object.keys(PARKED_FUNCTIONS).length + Object.keys(EXPECTED_UNUSED).length;
console.log(found
  ? `Reviewed ${blocks.length} blocks and ${defined.length} functions — ${found} to look at (${parked} parked, listed in the script).`
  : `PASS — ${blocks.length} blocks rendered, ${defined.length} functions called, ${parked} parked on purpose.`);
