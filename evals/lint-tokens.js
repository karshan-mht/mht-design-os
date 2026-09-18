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
  { file: 'prototypes/navigation/main.css', match: /-webkit-mask:/, reason: 'mask luminance, not a colour' },
  { file: 'prototypes/community/feat-cards.css', match: /var\(--color-[a-z-]+, *#/, reason: 'portable drop-in: token with literal fallback' },
  { file: 'prototypes/community/feat-cards.css', match: /data:image\/svg\+xml/, reason: 'inline SVG asset, not a style value' },
];

// Skipped wherever the directory name appears.
const SKIP_DIRS = new Set(['.git', 'node_modules', '.figma', '.claude']);

// This file names hexes in its own comments.
const SKIP_FILES = new Set(['evals/lint-tokens.js']);

// Skipped by exact repo-relative path. Each needs a reason.
//  - system/assets                 binary and SVG artwork, not style source
//  - prototypes/entry-points       mocks Google/Facebook/Gmail chrome; other
//                                  companies' colours, not ours to normalise
//  - system/icons, system/motion   standalone documentation pages that still
//                                  carry their own chrome; folded in when they
//                                  are rebuilt as system pages
//  - system/brand                  reference documents, not implementation
//  - system/tokens/reference.html  the live token sheet: its whole job is to
//                                  print raw values
const SKIP_PATHS = [
  'system/assets',
  'system/icons',
  'system/motion',
  'system/brand',
  'system/tokens/reference.html',
  'prototypes/entry-points',
];

// Strip HTML numeric entities (&#9734;) before scanning — they are not colours.
const ENTITY = /&#\d+;/g;
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

// rgb()/rgba() literals are colours too. A baked rgba slipped past the hex-only
// check and left the Ask AI pulse ring purple on a blue site. This starts as
// AUDIT-ONLY per system/AUTHORITY.md: new checks warn until they are shown
// reliable, then graduate to blocking. Most remaining hits are universal ink
// and white overlays, which are lower risk than brand hues.
const RGB_FN = /\brgba?\(\s*\d+[^)]*\)/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') && e.name !== '.') continue;
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      if (SKIP_PATHS.includes(rel)) continue;
      walk(full, out);
    } else if (/\.(css|html|js)$/.test(e.name)) {
      if (!TOKEN_SOURCES.includes(rel) && !SKIP_FILES.has(rel) && !SKIP_PATHS.includes(rel)) out.push(rel);
    }
  }
  return out;
}

// Inline SVG artwork inside JS is a known, tracked debt rather than a fresh
// mistake: recolouring it needs per-path judgment (brand fill vs decoration vs
// a third-party logo) and is Phase 3 of the restructure. It is reported as a
// WARNING so it stays visible and counted, but it does not fail the run.
const SVG_CONTEXT = /<svg|<path|<stop|fill="|stroke="|stop-color/;

// Other companies' brand colours, mocked deliberately. Tokenising them would be
// wrong — they are not ours to normalise.
const THIRD_PARTY = new Set(['#1877f2', '#4285f4', '#34a853', '#ea4335', '#fbbc05']);

const failures = [];
const warnings = [];
for (const rel of walk(ROOT)) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const clean = line.replace(ENTITY, '');
    const rgbHits = clean.match(RGB_FN);
    if (rgbHits && !/rgb\(from /.test(line)) {
      const excusedRgb = EXCEPTIONS.some(x => x.file === rel && x.match.test(line));
      if (!excusedRgb) {
        warnings.push({ file: rel, line: i + 1, values: [...new Set(rgbHits)].join(' ').slice(0, 20),
                        text: line.trim().slice(0, 90), kind: 'rgb' });
      }
    }

    const hits = clean.match(HEX);
    if (!hits) return;
    const excused = EXCEPTIONS.some(x => x.file === rel && x.match.test(line));
    if (excused) return;

    const values = [...new Set(hits)].filter(h => !THIRD_PARTY.has(h.toLowerCase()));
    if (values.length === 0) return;

    const entry = { file: rel, line: i + 1, values: values.join(' '), text: line.trim().slice(0, 90) };
    (SVG_CONTEXT.test(line) ? warnings : failures).push(entry);
  });
}

function report(list, label) {
  const byFile = {};
  for (const f of list) (byFile[f.file] ||= []).push(f);
  for (const [file, rows] of Object.entries(byFile)) {
    console.error(`  ${file}  (${rows.length} ${label})`);
    for (const f of rows.slice(0, 8)) console.error(`    ${String(f.line).padStart(5)}  ${f.values.padEnd(20)} ${f.text}`);
    if (rows.length > 8) console.error(`    ... and ${rows.length - 8} more`);
    console.error('');
  }
}

const svgWarnings = warnings.filter(w => w.kind !== 'rgb');
const rgbWarnings = warnings.filter(w => w.kind === 'rgb');

if (svgWarnings.length) {
  console.error(`WARN — ${svgWarnings.length} colour${svgWarnings.length === 1 ? '' : 's'} baked into inline SVG artwork.`);
  console.error('       Brand logos are fixed (classed .logo-accent/.logo-ink). These are the\n' +
                '       remaining decorative and pre-tinted icons. Not failing the run.\n');
  report(svgWarnings, 'warnings');
}

if (rgbWarnings.length) {
  console.error(`WARN — ${rgbWarnings.length} rgb()/rgba() literal${rgbWarnings.length === 1 ? '' : 's'} outside the token layer.`);
  console.error('       AUDIT-ONLY while this check proves out. Brand-hue cases are already\n' +
                '       converted to rgb(from var(--token) …); the rest are ink and white.\n');
  report(rgbWarnings, 'warnings');
}

if (failures.length === 0) {
  console.log('PASS — no hardcoded colours outside the token layer.');
  process.exit(0);
}

console.error(`FAIL — ${failures.length} hardcoded colour${failures.length === 1 ? '' : 's'} outside the token layer:\n`);
report(failures, 'errors');
console.error('Add a token to system/tokens/tokens.css, or a hue to a theme file.');
process.exit(1);
