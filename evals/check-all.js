#!/usr/bin/env node
/* =============================================================================
   check-all — run every check, one command, one exit code
   =============================================================================
   The checks were accumulating faster than anyone would remember to run them.
   This is the single entry point.

     node evals/check-all.js

   Exit code is non-zero if any BLOCKING check fails. Advisory checks print
   their findings and never fail the run — they report things that may be
   legitimate (parked code, partial Figma coverage) and a check that cries wolf
   gets switched off.
   ========================================================================== */

const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const CHECKS = [
  { name: 'tokens',          cmd: ['evals/lint-tokens.js'],                    blocking: true,
    covers: 'colour outside the token layer' },
  { name: 'links',           cmd: ['evals/lint-links.js'],                     blocking: true,
    covers: 'internal references that do not resolve' },
  { name: 'component index', cmd: ['evals/gen-component-index.js', '--check'], blocking: true,
    covers: 'the generated index matches the CSS' },
  { name: 'icon registry',   cmd: ['evals/gen-icon-registry.js', '--check'],   blocking: true,
    covers: 'registries match the files; every editorial icon is categorised' },
  { name: 'parity',          cmd: ['evals/lint-parity.js'],                    blocking: true,
    covers: 'Figma mapping structure; reports coverage gaps' },
  { name: 'dead code',       cmd: ['evals/lint-dead-code.js'],                 blocking: false,
    covers: 'blocks nothing renders; functions nothing calls' },
];

let failed = 0;
const results = [];

for (const check of CHECKS) {
  let out = '', ok = true;
  try {
    // 2>&1 — the advisory NOTEs are written to stderr, and they are the whole
    // point of running the advisory checks. Capturing only stdout silently
    // dropped them.
    const r = require('child_process').spawnSync('node', check.cmd, { cwd: ROOT, encoding: 'utf8' });
    if (r.status !== 0) throw Object.assign(new Error('check failed'), { stdout: r.stdout, stderr: r.stderr });
    out = `${r.stderr || ''}${r.stdout || ''}`;
  } catch (e) {
    ok = false;
    out = `${e.stdout || ''}${e.stderr || ''}`;
  }
  // advisory output arrives on stderr even when the check passes
  if (!ok && !check.blocking) ok = true;
  if (!ok) failed++;
  results.push({ check, ok, out: out.trim() });
}

for (const { check, ok, out } of results) {
  const tag = ok ? 'ok  ' : 'FAIL';
  console.log(`\n── ${tag}  ${check.name}  (${check.covers})`);
  if (out) console.log(out.split('\n').map(l => '   ' + l).join('\n'));
}

const blocking = CHECKS.filter(c => c.blocking).length;
console.log(`\n${'─'.repeat(68)}`);
if (failed) {
  console.log(`FAILED — ${failed} of ${blocking} blocking checks did not pass.`);
  process.exit(1);
}
console.log(`PASSED — all ${blocking} blocking checks. Advisory notes above are for review, not failure.`);
