# Module buttons (`.mod-btn-primary`, `.mod-btn-secondary`)

One component with two variants. `.mod-btn-secondary` shares this contract.

## Purpose

The call-to-action pair inside content modules — the primary action and its
lower-emphasis companion.

## Use

- **Preferred** — a primary alone, or a primary with one secondary beside it.
- **Allowed** — secondary alone, where the action is genuinely optional.
- **Avoid** — two primaries in one module. Emphasis stops meaning anything.
- **Prohibited** — using either on a light background. **Both are designed for
  dark surfaces**: the primary is a white fill with dark text, and the secondary
  is transparent with a white border and inverse text. On white, the secondary
  is invisible.
- **Exception** — none currently.
- **Rationale** — they were drawn for the splash modules, which sit on the
  purple gradient. That constraint is invisible in the class name, which is why
  it is stated here.

## Anatomy

Shared base: 48px tall, 24px radius, Lato 18px, `-0.25px` tracking.

| Variant | Fill | Border | Text |
|---|---|---|---|
| `.mod-btn-primary` | `--color-surface` | none | `--color-text` |
| `.mod-btn-secondary` | transparent | 1px white at 35% | `--color-text-inverse` |

## States

| State | Primary | Secondary |
|---|---|---|
| Default | yes | yes |
| Active | `brightness(0.97)` | 8% white wash |
| Focus-visible | yes — global rule, pill radius | yes |
| **Hover** | **no** | **no** |
| **Disabled** | **no** | **no** |

Neither has a loading state, which matters if one is ever wired to a real
request.

## Accessibility

- Semantic `<button>`; the label is the accessible name.
- 48px tall, above the minimum target size.
- The secondary's border is `rgba(255,255,255,0.35)`. Composited over the
  darkest gradient anchor (`--color-navy`) that is `#75759d` — a measured
  **2.90:1**, just under the 3:1 non-text minimum. The label itself is
  **12.74:1**, so the control is perceivable and the failure is limited to the
  boundary. Raising the border to ~40% alpha would clear it.

## Content

Sentence case, short. At 18px in a 48px pill, anything past ~4 words wraps and
breaks the fixed height.

## Implementation

Styles `prototypes/navigation/main.css`, shared rule then per-variant. Rendered
in `main.js` content modules (4 primary, 2 secondary at time of writing).
Desktop widens padding to 28px at the 1024px breakpoint.
