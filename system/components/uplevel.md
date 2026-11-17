# Uplevel row (`.uplevel`)

> **Status: live (2026-11-16).** Rendered on every detail screen (`type:
> "uplevel"`), under the sub-nav on mobile and under the header on desktop.
> Figma Global Navigation `7981:5`. It replaced the dormant floating pill
> (`7294:1952`), which had not rendered since 2026-08-04.

## Purpose

A full-width row that names the current screen's parent and takes you one
level up. It is sticky, so the way back stays reachable while reading.

## Use

- **Preferred** — on a detail screen with a clear parent list (an article, a
  group, a question).
- **Avoid** — on a top-level screen. There is nothing to go up to.
- **Prohibited** — more than one per screen.
- **Rationale** — it is a wayfinding aid, not navigation chrome.

## Anatomy

| Part | Required | Notes |
|---|:-:|---|
| `.screen__uplevel` | yes | sticky container; `top` set to the nav or header height in JS |
| `.uplevel` | yes | the row: 48px, padding 8px 12px, translucent white with 4px blur and a bottom hairline |
| `.uplevel__icon` | no | 32px circle, primary at 10%, holding a 20px UI glyph |
| `.uplevel__label` | yes | "All <section>", Lato SemiBold 16/24, primary blue |

## Variants

None. The label and icon come from the screen's `backLabel` and `upIcon`.

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
