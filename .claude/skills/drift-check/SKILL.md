---
name: drift-check
description: Run the repo's five verification checks and interpret the results. Use before committing UI or design-system work, after moving files, or when asked whether anything has drifted.
---

# Drift check

One command runs everything:

```bash
node evals/check-all.js
```

Non-zero exit if any **blocking** check fails. Advisory checks print findings
and never fail the run — they report things that may be legitimate, and a check
that cries wolf gets switched off.

Individually, if you need one:

```bash
node evals/lint-tokens.js          # colour outside the token layer      BLOCKING
node evals/lint-links.js           # references that do not resolve      BLOCKING
node evals/gen-component-index.js --check                             # BLOCKING
node evals/gen-icon-registry.js --check                               # BLOCKING
node evals/lint-parity.js          # Figma mapping + coverage            BLOCKING
node evals/lint-dead-code.js       # unrendered blocks, uncalled fns     advisory
```

## Reading the results

| Output | Meaning |
|---|---|
| `PASS` | Clean. |
| `FAIL` | Blocking. Both colour checks and the two `--check` generators are blocking. |
| `NOTE` | Coverage gaps from `lint-parity`. Informational — do **not** silence by inventing entries. |

## When a check fails

**lint-tokens** — a hex or `rgb()` outside `system/tokens/`. Add a token, or a
hue to a theme file. If it genuinely must stay literal (a third-party brand
mark, a knockout through a filled shape, pure black/white at alpha), add it to
`EXCEPTIONS` in the lint **with a reason**. An unexplained exception is how a
lint stops being verification.

**lint-links** — a moved or renamed file. Fix the reference, not the check.
`decisions/DECISIONS.md` is skipped deliberately: it is append-only, so paths
inside older entries are historical records, not broken links.

**gen-component-index --check** — a CSS block was added, removed or renamed.
Run `node evals/gen-component-index.js` to regenerate. Never hand-edit
`INDEX.md`.

**gen-icon-registry --check** — an icon file changed, or one is uncategorised.
Run `node evals/gen-icon-registry.js`. If an editorial icon is missing from
`system/icons/categories.js`, add it there — the grouping is authored, not
derived.

**lint-dead-code** — a CSS block nothing renders, or a function nothing calls.
Advisory, because parked code is a legitimate state. The question to answer is
*parked or dead?* — if parked, say so at the top of its contract; if dead,
delete it. This check exists because `system/components/uplevel/docs.md` was
written as though the level-up pill shipped, when `renderUplevel()` has never
been called.

**lint-parity** — a mapped block no longer exists, or a path is wrong. If a
component was renamed, update `system/parity.json`. Never add a parity entry for
a Figma node you have not actually read: a guessed mapping looks authoritative
and is worse than a reported gap.

## Also worth checking, but not automated

- Render the change at mobile (375px) and desktop widths.
- Tab through it. Focus must be visible — `main.css` has a global
  `:focus-visible` rule, so a control that loses it is doing something unusual.
- Swap the theme (`system/tokens/themes/`) and confirm brand colour follows.
  Artwork with a baked fill will not, which is the bug class the colour lint
  exists to prevent.

See [system/AUTHORITY.md](../../../system/AUTHORITY.md) when two sources
disagree — there is no universal winner.
