# Components

## What this is

There is **no extracted component layer yet.** Styles live in one ~2,700-line
`prototypes/navigation/main.css` and behaviour in one ~6,000-line `main.js`.
Extracting 79 blocks at once would be a large, risky change with no immediate
payoff.

So the first step is to make the monolith *addressable*:

- **[INDEX.md](INDEX.md)** — every CSS block, its parts, variants, whether JS
  renders it, and whether it has a contract. **Generated** from the stylesheet
  by `evals/gen-component-index.js`, so it cannot drift.
- **`<block>/docs.md`** — a hand-written contract for blocks that earn one.
- **[_TEMPLATE.md](_TEMPLATE.md)** — the contract schema.

Per [AUTHORITY.md](../AUTHORITY.md), the code is authoritative about what
behaves this way today; a contract is authoritative about what was *intended*.
A contract that merely restates CSS values is waste.

## Tiers

| Tier | What it means | Extract? |
|---|---|---|
| **primitive** | Small reusable control | Yes — these are the real candidates |
| **chrome** | Global nav furniture, one per page | Probably not; document instead |
| **module** | Splash Landing content module (`mod-*`) | Composed, not primitive |
| **surface** | Belongs to one product surface | No — documented in `product/` |

The tier list is the one human judgment in the generator; it lives in
`evals/gen-component-index.js` so it is reviewable in a diff.

## Adding a contract

1. Copy `_TEMPLATE.md` to `<block>/docs.md`, using the block name exactly as
   INDEX.md spells it (no leading dot).
2. Fill it in. Delete sections that do not apply. State missing states
   explicitly — a visible gap is worth more than a silent one.
3. Regenerate: `node evals/gen-component-index.js`
4. Run `node evals/lint-links.js`.

## Which to write first

Order by reuse, not by size. `.ai-btn` went first because it has real states,
motion, and accessibility surface. Writing it immediately surfaced a
system-wide blocker — the prototype had no keyboard focus styling at all across
64 buttons — which is the argument for contracts in the first place: the act of
describing intended behaviour exposes what is missing.

Good next candidates: `.mod-btn-primary` / `.mod-btn-secondary` (real buttons,
sharing a silhouette), `.uplevel` (the level-up pill), `.icon-btn` (composed
into several others).

## Known gaps

- `.icon-btn` is composed into `.ai-btn`, `.join-btn` and others but has only
  two rules — the relationship is real but undocumented.
- The three `prototypes/entry-points/` pages hand-copy the
  `.launcher-hotspot` markup instead of sharing it with `main.js`.
- No component has a Figma node id recorded yet; `parity.json` is Phase 4.
