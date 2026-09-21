# Authority and preference

Two small conventions that apply everywhere in this repo. Adapted from the
Design OS handoff; see [decisions/DECISIONS.md](../decisions/DECISIONS.md) for
why they were adopted.

---

## Authority model

When two artifacts disagree, there is **no universal winner**. Each source is
authoritative about a different thing:

| Source | Authoritative about |
|---|---|
| Running code (`prototypes/`, `system/tokens/`) | What actually behaves this way today |
| Checks (`evals/`) | Invariants that are actually enforced |
| Contracts (`system/components/*/docs.md`, `system/patterns/`) | Intended semantics, states, boundaries, component API |
| Decisions (`decisions/DECISIONS.md`) | Why a rule, exception or tradeoff exists |
| Product context (`product/`) | Users, activities, outcomes, terminology |
| Figma | Intended visual direction — not shipped behavior |
| Live pages (`system/icons/sheet.html`, `system/tokens/reference.html`) | Rendered specimens of the real implementation |
| Brand (`system/brand/`) | Voice, positioning, messaging |
| External references | Evidence and inspiration only, never a product rule |

**This replaces the older "code always wins" line** that used to close
`MANUAL.md`. That rule was convenient but wrong: it meant any bug in
`main.css` could silently become the specification.

### When artifacts disagree

1. **Detect** the difference.
2. **Classify** it — foundation, component, pattern, visual, contract or intent
   drift.
3. **Determine intent** — which artifact expresses what was meant?
4. **Reconcile** every affected representation, not just the convenient one.
5. **Verify** with the checks in `evals/`.
6. **Record** the decision if it was a judgment call.

Do not resolve a disagreement by editing whichever file is easiest.

### Worked example

`--color-magenta` was a *value* name for a token that is really the brand
accent. Code said "magenta"; intent said "accent"; the Legacy site made the
value name plainly wrong. The reconciliation was not "code wins" — it was to
introduce the role name `--color-accent`, keep `--color-magenta` as a
deprecated alias so nothing broke, and record why. Three representations
updated, none silently overwritten.

---

## Preference grammar

When documenting how something should be used, use these six headings rather
than an undifferentiated list. An agent can act on the difference between
"allowed" and "preferred"; it cannot act on a bullet list of valid options.

| Term | Meaning |
|---|---|
| **Preferred** | The default. Reach for this unless there is a reason not to. |
| **Allowed** | Valid, under the stated condition. |
| **Avoid** | Usually harmful or inconsistent. Needs a reason. |
| **Prohibited** | Violates a hard requirement. No exceptions without a decision entry. |
| **Exception** | A named situation where the normal rule does not apply. |
| **Rationale** | Why the boundary exists. Without this the rule decays into cargo cult. |

### Example

> **Preferred** — `var(--color-accent)` for brand-accent color.
> **Allowed** — `var(--color-magenta)`, in code not yet migrated.
> **Avoid** — introducing a new accent token for a one-off tint.
> **Prohibited** — a raw hex value in any file outside `system/tokens/`.
> **Exception** — `-webkit-mask` values, which are luminance not color; and
> `prototypes/entry-points/`, which mocks other companies' brand colors.
> **Rationale** — one hue swap has to re-skin every site. A hex literal is
> invisible to that swap, and `evals/lint-tokens.js` enforces it.
