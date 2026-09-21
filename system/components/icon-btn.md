# Icon button (`.icon-btn`)

## Purpose

A 44px circular hit target holding a single glyph and nothing else. The base
control for every icon-only action in the navigation.

## Use

- **Preferred** — icon-only actions in the nav: menu, search, profile.
- **Allowed** — as a base for a composed control. `.ai-btn` extends it into a
  labelled pill by overriding width, padding and radius.
- **Avoid** — adding a visible text label. Once it has one it is no longer this
  component; extend it the way `.ai-btn` does.
- **Prohibited** — using it without an accessible name. It has no text, so
  `aria-label` is the only thing a screen reader has.
- **Rationale** — 44px is the minimum comfortable touch target, and a fixed
  size is what lets several of these sit in a row without the nav reflowing.

## Anatomy

| Part | Required | Notes |
|---|:-:|---|
| `.icon-btn` | yes | 44×44, `border-radius: 50%`, transparent |
| `.icon` span | yes | injected by `icon()`; holds the inline SVG |

No BEM elements or modifiers of its own.

## States

| State | Implemented | Behavior |
|---|:-:|---|
| Default | yes | transparent, `--color-text` |
| Active | yes | 5% ink wash |
| Focus-visible | yes | 2px `--color-primary` ring at pill radius, from the global rule |
| **Hover** | **no** | no distinct hover; the active wash is the only feedback |
| **Disabled** | **no** | no styling exists |

## Accessibility

- Semantic `<button>`.
- `aria-label` is mandatory — there is no visible text.
- The glyph inherits `color`, so contrast is whatever the surrounding context
  sets. On the nav's white background that is `--color-text`.
- 44×44 meets the minimum target size.

## Dependencies

Tokens `--color-text`; the `icon()` helper and `window.MHT_ICONS.ui`.

## Implementation

Styles `prototypes/navigation/main.css` `.icon-btn`. Markup is built inline in
`main.js` wherever an icon-only action is rendered.

## Rationale and decisions

Composed into `.ai-btn` — see [ai-btn](ai-btn.md). That relationship is
real but was undocumented before this file existed.
