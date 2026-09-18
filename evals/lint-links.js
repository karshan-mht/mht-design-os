#!/usr/bin/env node
/* =============================================================================
   lint-links — every internal reference must resolve on disk
   =============================================================================
   Added after a Phase 2 regression: the prototype's "back to the launcher"
   hotspot was built in a JS template literal, so a grep over HTML href/src
   never saw it and it silently pointed at a path that no longer existed.

   This checks four places a path can hide:
     1. href/src attributes in HTML
     2. url(...) in CSS
     3. string literals in JS that look like relative paths
     4. markdown links

   decisions/DECISIONS.md is skipped: it is append-only, so paths inside older
   entries are historical records and must not be "fixed".

   Zero dependencies: `node evals/lint-links.js`
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', '.figma', '.claude', 'assets']);

// Some files' paths do not resolve against their own directory.
//  - launcher/manifest.js  hrefs are consumed by index.html at the repo root
//  - main.js               paths are resolved by the PAGE that loads it, which
//                          sits at prototypes/navigation/<persona>/
const BASE_OVERRIDES = {
  'launcher/manifest.js': '.',
  'prototypes/navigation/main.js': 'prototypes/navigation/visitor',
};

// Documentation examples that intentionally name files which do not exist.
const IGNORE = new Set([
  'photos/stories.jpg',  // script.js: sample data showing the expected image shape
  'me.jpg',              // styles.css: usage example in a comment for --photo
]);

// Paths built at runtime from a base constant. The base itself is checked; the
// interpolated leaf cannot be known statically.
const DYNAMIC = /\$\{|\+\s*[a-zA-Z_]/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(full, out); }
    else if (/\.(html|css|js|md)$/.test(e.name)) out.push(path.relative(ROOT, full));
  }
  return out;
}

function refsIn(rel, text) {
  const out = [];
  const add = (p, line) => out.push({ p, line });
  const lineOf = (i) => text.slice(0, i).split('\n').length;

  if (/\.html$/.test(rel)) {
    for (const m of text.matchAll(/\b(?:href|src)\s*=\s*"([^"]+)"/g)) add(m[1], lineOf(m.index));
  }
  if (/\.(css|html)$/.test(rel)) {
    for (const m of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) add(m[1], lineOf(m.index));
  }
  if (/\.md$/.test(rel)) {
    for (const m of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) add(m[1], lineOf(m.index));
  }
  if (/\.js$/.test(rel)) {
    // String literals that look like a path. A bare filename with no slash
    // (e.g. a card titled "tokens.css") is a label, not a reference — requiring
    // a separator keeps those out.
    for (const m of text.matchAll(/["'`](\.{1,2}\/[^"'`\n]+|[\w.-]+\/[\w./-]+\.(?:html|css|js|svg|png|jpg|json))["'`]/g)) {
      add(m[1], lineOf(m.index));
    }
  }
  return out;
}

const failures = [];
let checked = 0;

for (const rel of walk(ROOT)) {
  if (rel.startsWith('evals/')) continue;            // this file quotes paths in comments
  if (rel === 'decisions/DECISIONS.md') continue;    // append-only: historical paths stay as written
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');

  for (const { p, line } of refsIn(rel, text)) {
    let t = p.trim();
    if (!t || t.startsWith('http') || t.startsWith('//') || t.startsWith('#') ||
        t.startsWith('data:') || t.startsWith('mailto:') || DYNAMIC.test(t)) continue;
    if (t.includes('%23') || t.includes('%3C')) continue;   // inside an encoded data: URI
    if (IGNORE.has(t)) continue;
    t = decodeURIComponent(t.split('#')[0].split('?')[0]);
    if (!t) continue;
    checked++;
    const base = BASE_OVERRIDES[rel] ?? path.dirname(rel);
    const target = path.resolve(ROOT, base, t);
    if (!fs.existsSync(target)) failures.push({ rel, line, t });
  }
}

if (!failures.length) {
  console.log(`PASS — ${checked} internal references all resolve.`);
  process.exit(0);
}

console.error(`FAIL — ${failures.length} of ${checked} internal references do not resolve:\n`);
const byFile = {};
for (const f of failures) (byFile[f.rel] ||= []).push(f);
for (const [file, rows] of Object.entries(byFile)) {
  console.error(`  ${file}`);
  for (const r of rows) console.error(`    ${String(r.line).padStart(5)}  ${r.t}`);
  console.error('');
}
process.exit(1);
