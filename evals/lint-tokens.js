#!/usr/bin/env node
/* =============================================================================
   lint-tokens — drift detection for the MHT design system
   =============================================================================
   Fails when an implementation file hardcodes a colour instead of consuming a
   token. Zero dependencies, no build step: `node evals/lint-tokens.js`.

   This is deliberately mechanical. It does not judge taste; it enforces the one
   rule that keeps the system a system — colour lives in tokens.css and the
   theme files, nowhere else.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Files allowed to contain raw colour values.
const TOKEN_SOURCES = [
  'system/tokens/tokens.css',
  'system/tokens/themes/menopause.css',
  'system/tokens/themes/legacy.css',
];

// Specific, justified exceptions. Each needs a reason — an unexplained entry
// here is how a lint quietly stops being a lint.
const EXCEPTIONS = [
  { file: 'main.css', match: /-webkit-mask:/, reason: 'mask luminance, not a colour' },
  { file: 'community-standalone/feat-cards.css', match: /var\(--color-[a-z-]+, *#/, reason: 'portable drop-in: token with literal fallback' },
  { file: 'community-standalone/feat-cards.css', match: /data:image\/svg\+xml/, reason: 'inline SVG asset, not a style value' },
];

// entry-points/ mocks third-party UI (Google, Facebook, Gmail). Those are other
// companies' brand colours, deliberately not ours — tokenising them would be
// wrong. design-system/, line-icons/ and assistant/ are documentation pages
// pending the Phase 2 move; re-scope them once they land under system/.
const SKIP_DIRS = new Set([
  '.git', 'assets', 'node_modules', '.figma', '.claude',
  'design-system', 'line-icons', 'assistant', 'entry-points',
]);

// Strip HTML numeric entities (&#9734;) before scanning — they are not colours.
const ENTITY = /&#\d+;/g;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') && e.name !== '.') continue;
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, out);
    } else if (/\.(css|html)$/.test(e.name)) {
      if (!TOKEN_SOURCES.includes(rel)) out.push(rel);
    }
  }
  return out;
}

const failures = [];
for (const rel of walk(ROOT)) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const hits = line.replace(ENTITY, '').match(HEX);
    if (!hits) return;
    const excused = EXCEPTIONS.some(x => x.file === rel && x.match.test(line));
    if (excused) return;
    failures.push({ file: rel, line: i + 1, values: [...new Set(hits)].join(' '), text: line.trim().slice(0, 90) });
  });
}

if (failures.length === 0) {
  console.log('PASS — no hardcoded colours outside the token layer.');
  process.exit(0);
}

console.error(`FAIL — ${failures.length} hardcoded colour${failures.length === 1 ? '' : 's'} outside the token layer:\n`);
const byFile = {};
for (const f of failures) (byFile[f.file] ||= []).push(f);
for (const [file, list] of Object.entries(byFile)) {
  console.error(`  ${file}`);
  for (const f of list.slice(0, 12)) console.error(`    ${String(f.line).padStart(5)}  ${f.values.padEnd(20)} ${f.text}`);
  if (list.length > 12) console.error(`    ... and ${list.length - 12} more`);
  console.error('');
}
console.error('Add a token to system/tokens/tokens.css, or a hue to a theme file.');
process.exit(1);
