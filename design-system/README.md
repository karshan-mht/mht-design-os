# TIM Design System

Canonical, cross-project design tokens and type rules for ThisIsMenopause
(TIM). Implementation-agnostic — describes tokens and roles, not any one
project's class names. Map these onto whatever naming a consuming project
already uses.

Source of truth: the **MHT Style Guide** Figma file (`zV2gbuNONeoyeRVcFUFWeZ`),
cross-checked against real product surfaces where the Style Guide alone was
incomplete. See [Verification legend](#verification-legend).

---

## Colors

| Token | Value | Role |
|---|---|---|
| `color-primary` | `#0f57a8` | Primary action color — buttons, links |
| `color-primary-soft` | `#dee5f1` | Soft primary tint — hover/rollover states |
| `color-navy` | `#2b2b68` | Dark gradient anchor, display headline color |
| `color-text` | `#0d1b29` | Primary ink |
| `color-text-secondary` | `#626b74` | Secondary/label text |
| `color-text-muted` | `rgba(13,27,41,0.7)` | Muted text |
| `color-border` | `#dbdddf` | Hairlines |
| `color-badge` | `#ff741d` | Notification/badge accent (orange) |
| `color-badge-soft` | `rgba(255,116,29,0.05)` | Badge background tint |
| `color-magenta` | `#a440bc` | Secondary brand accent — icon tints, highlights |
| `color-magenta-soft` | `rgba(164,65,188,0.08)` | Magenta background tint (translucent) |
| `color-magenta-soft-solid` | `#f8f0fa` | Magenta background tint (opaque equivalent) |
| `color-purple-light` | `#d483cf` | Tertiary accent — headline emphasis on dark backgrounds |
| `color-bg-purple-soft` | `#f6eff8` | Soft purple section background |
| `color-bg-cool` | `#fafcff` | Cool neutral section background |
| `color-bg-blue-soft` | `#edf3f9` | Soft blue section background |
| `color-card-border` | `rgba(13,27,41,0.15)` | Card borders |
| `color-pill-border` | `rgba(13,27,41,0.44)` | Pill/chip borders |

---

## Typography

Two font families: **Display** — "DM Serif Display," weight 400 only, for
headline-level text. **Body/UI** — "Lato," weights 400/600/700, for
everything else, including a weight-600 "Headline" component family used for
UI emphasis (card titles, quotes, callouts) that isn't a document heading.

### Type rules

1. Letter-spacing: **≥20px → `-0.75px`**, **≤18px → `-0.25px`**.
2. DM Serif Display line-height is always **size + 8px**.
3. Name tokens by role, never by pixel value — this scale has two unrelated
   24px styles (Sub-heading, and the Lato "Quote" role) on different
   families/weights.
4. Heading rank (H1–H6) and visual size are independent decisions. A tag
   depends on whether the text is a real, navigable section label — not on
   how big it looks.

### Display scale (DM Serif Display)

| Tier | Mobile | Desktop |
|---|---|---|
| Hero | 40px / 48px lh | 52px / 60px lh |
| Section header | 32px / 40px lh | 36px / 44px lh |
| Title | 28px / 36px lh | 32px / 40px lh |
| Sub-heading | 24px / 32px lh | 28px / 36px lh |

### Body/UI scale (Lato)

| Size | Role | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| 12px | Note | 400 | 18px | -0.25px |
| 14px | Caption | 400/600 | 20px | -0.25px |
| 16px | Body Small | 400/600 | 22px | -0.25px |
| 18px | Body Large | 400/600 | 24px | -0.25px |
| 20px | Headline | 600 | 26px | -0.75px |
| 22px | Headline | 600 | 28px | -0.75px |
| 24px | Headline | 600 | 30px | -0.75px |
| 28px | Headline | 600 | 34px | -0.75px |

---

## Spacing & radius

| Token | Value | Role |
|---|---|---|
| `radius-pill` | `999px` | Buttons, chips, pill controls |
| `radius-card` | `16px` | Cards, panels |
| `section-padding` | `48px` top/bottom, `12px` sides | Standard content-module spacing |

---

## Verification legend

- **Figma-confirmed** — pulled directly from a real Figma node via the API.
- **Per team direction** — team-confirmed, but no Figma frame exists yet to
  check it against (typically an unbuilt desktop layout). Treat as
  provisional until a real frame confirms it.

Project-specific Figma node IDs are intentionally omitted here to stay
implementation-agnostic — check the consuming project's own design docs for
exact citations.
