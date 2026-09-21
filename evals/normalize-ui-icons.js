#!/usr/bin/env node
/* =============================================================================
   normalize-ui-icons — put every UI glyph on one 24x24 canvas
   =============================================================================
   The 28 UI glyphs had ELEVEN different viewBoxes, inherited from whatever size
   each was exported at. Measured in a browser, the drawn artwork filled
   anywhere from 47% to 100% of its own canvas, so rendering them all at one
   size produced glyphs ranging 19px to 40px inside an identical 40px box.

   The prototype hid this by sizing each icon at its own call site to match its
   own canvas (16px here, 44px there, 22px elsewhere). That works but means the
   set has no shared sizing contract — which is the thing a design system is
   supposed to provide.

   This rewrites each file onto a 24x24 canvas with a 20-unit live area: the
   content bounding box is scaled so its longest side is 20 units, then centred.
   24/20 is the common icon-grid convention (Material, Lucide).

   Bounding boxes come from getBBox() in a real browser, recorded below —
   parsing curve geometry in Node would be guesswork.

     node evals/normalize-ui-icons.js --dry
     node evals/normalize-ui-icons.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = 'system/icons/ui';
const CANVAS = 24;
const LIVE = 20;          // longest side of the artwork, in canvas units
const STROKE_TARGET = 1.5; // desired rendered stroke weight on the 24 grid

const BBOX = require('./ui-icon-bboxes.json');

const round = n => Math.round(n * 10000) / 10000;

let changed = 0;
const report = [];

for (const [name, m] of Object.entries(BBOX)) {
  const file = path.join(ROOT, DIR, name + '.svg');
  if (!fs.existsSync(file)) { report.push([name, 'MISSING FILE']); continue; }

  const { bbox } = m;
  const longest = Math.max(bbox.w, bbox.h);
  if (!longest) { report.push([name, 'empty bbox — skipped']); continue; }

  const s = LIVE / longest;
  const tx = (CANVAS - bbox.w * s) / 2 - bbox.x * s;
  const ty = (CANVAS - bbox.h * s) / 2 - bbox.y * s;

  let src = fs.readFileSync(file, 'utf8').trim();

  // Already normalized? Leave it.
  if (/viewBox="0 0 24 24"/.test(src) && /data-normalized/.test(src)) {
    report.push([name, 'already normalized']);
    continue;
  }

  const open = src.match(/<svg[^>]*>/)[0];
  const inner = src.slice(open.length, src.lastIndexOf('</svg>'));

  // Only my-health carries a stroke; scaling the geometry scales the stroke
  // with it, so the declared width is pre-divided to land on STROKE_TARGET.
  let body = inner;
  if (/stroke-width="([\d.]+)"/.test(body)) {
    body = body.replace(/stroke-width="([\d.]+)"/g, () => `stroke-width="${round(STROKE_TARGET / s)}"`);
  }

  const out =
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ` +
    `fill="none" data-normalized="24">` +
    `<g transform="translate(${round(tx)} ${round(ty)}) scale(${round(s)})">${body}</g>` +
    `</svg>\n`;

  if (process.argv.includes('--dry')) {
    report.push([name, `${m.vb.join(' ')} -> 0 0 24 24, scale ${round(s)}`]);
  } else {
    fs.writeFileSync(file, out);
    changed++;
    report.push([name, `${m.vb.join(' ')} -> 24x24 (scale ${round(s)})`]);
  }
}

for (const [n, msg] of report) console.log(`  ${n.padEnd(16)} ${msg}`);
console.log(process.argv.includes('--dry')
  ? `\nDry run — ${report.length} icons would be rewritten.`
  : `\nRewrote ${changed} icons onto a ${CANVAS}x${CANVAS} canvas, ${LIVE}-unit live area.`);
