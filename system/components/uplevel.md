# Level-up pill (`.uplevel`)

> **Status: dormant — not rendered today.**
>
> `renderUplevel()` exists in `main.js` and is **never called**; `.screen__uplevel`
> is only referenced by a `querySelector` that always returns null. The desktop
> breadcrumb was dropped on 2026-08-04 with the note *"Re-add via
> `screen.type === "uplevel"` when the up-nav treatment is decided"*, and the
> pill went with it. The CSS, the render function and the per-screen `upTo` /
> `upIcon` data all remain, so it is parked rather than deleted.
>
> This contract therefore describes **intent**, not shipped behavior. Treat the
> rendering details as what it would do when re-enabled, and verify against the
> design before switching it back on. Found while verifying this contract in a
> browser — the component index's "JS" column says `•` because the string
> appears in `main.js`, which does not distinguish a definition from a call.

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

## Resolved discrepancy

The label was `font-weight: 400` with the comment `/* Lato Semibold */` — a
contradiction this contract surfaced. **Confirmed 2026-09-18: 600 is correct.**
The comment carried the intent and the value had drifted from it. Now 600.

Note that this has **no visible effect today**, because the component is
dormant. It is correct for when it is re-enabled.

Worth noting how it resolved: per [AUTHORITY.md](../AUTHORITY.md) the code
was authoritative about what rendered and the comment about what was meant, and
the repo could not settle between them. It took a decision from outside the
repo — which is exactly why it was recorded rather than guessed.

## Implementation

Styles `prototypes/navigation/main.css` `.uplevel*` and
`.screen__uplevel.is-lifted`. The `is-lifted` toggle is in `attachAutoHide()` in
`main.js`.

## Figma

Global Navigation `42yas7Q9FfwhL6xUocjEAl`, node **`7294:1952`** ("Uplevel").
Read from the file and confirmed: 34px tall in both, a 16×16 `Icon` child
matching `.uplevel__icon`, and a `Label` text child matching the span. The frame
is `hidden=true`, so it is a definition rather than a placed instance.

Recorded in [system/parity.json](../parity.json).
