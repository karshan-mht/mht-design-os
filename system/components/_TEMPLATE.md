# <Component name>

> Copy this file to `system/components/<block-name>/docs.md`, where
> `<block-name>` is the CSS block exactly as it appears in
> [INDEX.md](INDEX.md) (without the leading dot). Then regenerate the index:
> `node evals/gen-component-index.js`.
>
> Delete any section that genuinely does not apply — an empty heading is worse
> than no heading. Do **not** restate CSS values that the stylesheet already
> says; per [AUTHORITY.md](../AUTHORITY.md), code is authoritative about what
> behaves this way today. This file is authoritative about what was *intended*.

## Purpose

What job does this do for the user? One or two sentences.

## Use

Use the preference grammar from [AUTHORITY.md](../AUTHORITY.md):

- **Preferred** —
- **Allowed** —
- **Avoid** —
- **Prohibited** —
- **Exception** —
- **Rationale** —

## Anatomy

Required and optional parts, by BEM element.

## Variants

Supported choices and when each applies.

## States

Only the states that actually exist. Default, hover, focus, active, selected,
loading, disabled, error, empty — and say explicitly which are *not*
implemented, so a gap is visible rather than assumed.

## Behavior

Interaction, transitions, persistence, recovery.

## Content

Label wording, length limits, terminology.

## Accessibility

Semantic element, accessible name, keyboard operation, visible focus, contrast,
target size, reduced motion, announcements.

## Dependencies

Tokens, other components, assets.

## Implementation

Where the styles and the markup actually live, by file and selector.

## Figma

Node id and file, when known. `parity.json` (Phase 4) will make this
machine-checkable.

## Rationale and decisions

Why the important constraints exist. Link to
[decisions/DECISIONS.md](../../decisions/DECISIONS.md) entries.
