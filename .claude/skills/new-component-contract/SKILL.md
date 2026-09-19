---
name: new-component-contract
description: Write a contract for a CSS block in the prototype. Use when documenting a component, when asked what a component is for or how it behaves, or before changing a component whose intent is unclear.
---

# New component contract

A contract says what a component is *for* and what was *intended*. The CSS
already says what it does today. Per
[system/AUTHORITY.md](../../../system/AUTHORITY.md), restating CSS values here
is waste — and worse, a second copy that can drift.

## Procedure

1. **Find the block** in [system/components/INDEX.md](../../../system/components/INDEX.md).
   Use the name exactly as listed, without the leading dot. The index is
   generated, so if the block is missing, the CSS changed — regenerate first.

2. **Read the implementation before writing.** Both the CSS rules and the
   markup in `prototypes/navigation/main.js`. Writing from the class name alone
   produces a plausible, wrong document.

3. **Copy the template.**
   ```bash
   cp system/components/_TEMPLATE.md system/components/<block>.md
   ```

4. **Fill it in.** Use the preference grammar (Preferred / Allowed / Avoid /
   Prohibited / Exception / Rationale) from AUTHORITY.md. Delete sections that
   do not apply — an empty heading is worse than no heading.

5. **State what is missing.** In the States table, mark states that do **not**
   exist as explicitly absent. This is where contracts earn their keep: every
   contract written in this repo so far has surfaced a real defect, and all of
   them came from asking "what should the hover state be?" rather than from
   reading code.

6. **Regenerate and verify.**
   ```bash
   node evals/gen-component-index.js
   node evals/lint-links.js
   ```

## Rules

- **Do not fix what you find while documenting, silently.** If the contract
  surfaces a bug, fix it as a separate, stated change — and say so in the
  contract and in `decisions/DECISIONS.md`.
- **Do not resolve a contradiction by guessing.** When the code and a comment
  disagree and the repo cannot settle it, record it as a known discrepancy and
  surface it. There is a worked example in
  [uplevel.md](../../../system/components/uplevel.md) — a
  `font-weight: 400` commented `/* Lato Semibold */`, left unresolved on
  purpose.
- **Measure claims.** If you assert a contrast ratio or a size, compute it.
  A wrong number in a contract is worse than no number.
- **One contract per pair where they share a base rule.** The module buttons
  share one; `mod-btn-secondary/docs.md` is a pointer.

## Good next candidates

Order by reuse, not size. Anything in the `primitive` tier of the index with no
contract yet.
