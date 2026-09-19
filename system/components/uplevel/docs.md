# Level-up pill (`.uplevel`)

## Purpose

A floating pill that tells you where the current screen sits and takes you one
level up. It docks into a bar once the page scrolls, so the way back is always
reachable without occupying the header.

## Use

- **Preferred** — on a screen that has a clear parent (an article inside a hub).
- **Allowed** — with an icon, or label only.
- **Avoid** — on a top-level screen. There is nothing to go up to, and the pill
  implies a hierarchy that is not there.
- **Prohibited** — more than one per screen.
- **Rationale** — it is a wayfinding aid, not navigation chrome. Two of them
  would make "up" ambiguous.

## Anatomy

| Part | Required | Notes |
|---|:-:|---|
| `.uplevel` | yes | the pill; `pointer-events: auto` re-enables clicks inside a `pointer-events: none` container |
| `.uplevel__icon` | no | 16px glyph |
| `span` | yes | the label |

Its container `.screen__uplevel` carries the `is-lifted` state.

## Variants

Not a class modifier — two forms driven by scroll position:

| Form | Trigger | Appearance |
|---|---|---|
| Idle | default | 34px pill, soft blue fill, `--color-border-primary-soft` border |
| Docked | `.screen__uplevel.is-lifted` | full-width 44px bar, translucent white, `backdrop-filter: blur(8px)`, square, bottom hairline |

The transition animates height, padding, radius, background and border-color
over 0.2s.

## States

| State | Implemented |
|---|:-:|
| Idle / Docked | yes |
| Focus-visible | yes — global rule, pill radius |
| **Hover** | **no** |
| **Active** | **no** |

## Accessibility

- The docked bar uses `backdrop-filter` over `rgba(255,255,255,0.8)`, so page
  content shows faintly through. Contrast is not guaranteed against arbitrary
  content scrolling beneath it — worth checking against the darkest screen.
- The dock transition now honours `prefers-reduced-motion`. It did not before:
  `main.css` had four reduced-motion blocks, but every one was narrowly scoped
  to the assistant pill, its nudge, or the notification badge, so this animation
  ran regardless. Found by writing this contract; fixed in the same change.

## Known discrepancy

`.uplevel span` sets `font-weight: 400` with the comment `/* Lato Semibold */`.
Semibold is 600, weight 600 *is* loaded, and the only other "SemiBold" comment
in the stylesheet correctly pairs with `font-weight: 600`.

Per [AUTHORITY.md](../../AUTHORITY.md), code is authoritative about what renders
today (400) and the comment claims an intent (600). Which is right cannot be
determined from the repo — it needs the Figma frame or a decision. Left as-is
and surfaced rather than guessed.

## Implementation

Styles `prototypes/navigation/main.css` `.uplevel*` and
`.screen__uplevel.is-lifted`. The `is-lifted` toggle is in `attachAutoHide()` in
`main.js`.
