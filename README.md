# TIM — Navigation Prototype

A plain HTML/CSS/JS prototype of the **This Is Menopause** mobile experience
across four auth states — **Anonymous Visitor**, **Logged Out Member**,
**Logged In Member**, and **Subscriber**. It covers the global navigation (top
nav, slide-out panel, account dropdown) and the screens each persona can reach.
No framework, no build step — just open a file in a browser.

Start at the **home** (`index.html`) — the design system's front door. A
collapsible left sidebar moves between Prototypes, Foundations, Components,
Icons & Graphics, Brand, Product and Decisions. Everything opens in its own tab,
so each prototype keeps a shareable URL.

The home renders entirely from **`home/manifest.js`**. Adding a prototype or a
doc is one entry in that file — never a markup edit.

The system currently covers two sites: **ThisIsMenopause** (purple hue family,
production) and the **Legacy condition sites** (blue hue family, placeholder
values). Components are identical across both; only the hue differs. See
Foundations → Sites on the home, or
[system/tokens/themes/README.md](system/tokens/themes/README.md).

Design source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`;
per-surface Figma frames and the **MHT Style Guide** are cited in the `domains/`
docs.

## Quick start

Open the launcher and pick a flow:

```bash
open index.html          # macOS — or just double-click it
```

Everything works straight from `file://`. To serve it over HTTP instead
(any static server is fine):

```bash
npx serve .              # then visit the printed URL
# or: python3 -m http.server 8000
```

Then open the four flows from the launcher, or directly:
`visitor/`, `logged-out-member/`, `logged-in-member/`, `subscriber/`.

The launcher has a second section, **Entry Points** — four specific traffic
sources, each starting from a mocked-up external page (a Google search result
page, a Facebook ad, a Gmail inbox) that clicks through into a persona flow on a
specific starting screen instead of its default home: Paid Social (a specific
article), Organic + Paid Search (article variant and home variant), and a
member opening a content email. The external mocks live in `entry-points/`;
the click-through uses a `?start=<screen-id>` query param read by `main.js` at
boot (falls back to the normal home if the param is missing or doesn't match a
real screen in that persona).

## Structure

```
index.html                     Home — collapsible sidebar over every section
home/                          The home shell:
  manifest.js                    ALL home content. Add a prototype here.
  home.css  home.js              Shell styles and rendering
system/tokens/                 The design system's token layer:
  tokens.css                     Universal palette — single source of truth
  themes/menopause.css           Purple hue family (production)
  themes/legacy.css              Blue hue family (placeholder values)
  themes/README.md               The theme contract; how to add site 81
evals/lint-tokens.js           Drift lint — fails on hex outside the tokens
main.css                       All styles (shared by every page)
main.js                        All behavior — reads <body data-persona> and
                               renders the nav/panel/dropdown for that persona
assets/                        Real assets exported from Figma (flat folder):
                               logotype.png/.svg + logomark.svg (logos),
                               placeholder_profile.svg, privacy-choices.png,
                               listicles_*.svg (splash listicle icons),
                               hero-rings-*.svg / factoid-blob-*.svg /
                               closing-blob.svg (splash decorative graphics)
                               (nav/UI icons are inlined in main.js, not files)
visitor/index.html             Anonymous Visitor flow
logged-out-member/index.html   Logged Out Member flow
logged-in-member/index.html    Logged In Member flow (has the dropdown)
subscriber/index.html          Subscriber flow
entry-points/                  Standalone mock external pages (Google search,
                               Facebook ad, Gmail inbox) that click through into
                               a persona flow — self-contained, no main.css/js
MANUAL.md                      Index of the spec docs (start here)
DECISIONS.md                   Chronological decisions log + "on the horizon"
foundation/                    System & behavior (the how):
  system.md                      Architecture & persona model (render, screens, device)
  design.md                      Design language (tokens, type, tinting, chrome assets)
  navigation.md                  Global-nav chrome (top nav, panel, level-up, footer)
domains/                       Product surfaces (the what):
  landing.md                     Splash Landing (modules + deep-links + assets)
  advisors.md                    Medical Advisory Committee page (splash deep-link)
  library.md                     Library / "Resources" (topic pages, Topic Center, Article)
  community.md                   Community (list + detail screens, icons)
  account.md                     Account (profile dropdown + its screens)
  onboarding.md                  Onboarding (Sign Up Start, Registration Step)
```

(A local `.claude/` folder holds an optional preview helper; it's gitignored and
not part of the repo — serve with `npx serve .` instead.)

## How it works

Each flow lives in its own folder and is a thin shell that sets one attribute and
loads the token layer, a site theme, then the two shared files:

```html
<link rel="stylesheet" href="../system/tokens/tokens.css" />
<link rel="stylesheet" href="../system/tokens/themes/menopause.css" />
<link rel="stylesheet" href="../main.css" />
<body data-persona="logged-in-member">
  <script src="../main.js"></script>
</body>
```

Colour never appears in `main.css` — it lives in `tokens.css`, and the hue comes
from the theme file. Swapping that one link re-skins the page. Run
`node evals/lint-tokens.js` to check nothing has drifted back.

`main.js` reads `data-persona` and renders that persona's nav/panel/dropdown and
screens — no framework, no build step, no persona switcher. The app is a **real
responsive product** (no device frame): a full-bleed mobile experience below
1024px that reflows into a **desktop layout** — a persistent horizontal header
and content capped/centered with fluid gutters — at 1024px and up. Content is
constrained (not fully fluid): a ~1000px general cap, a ~1194px splash canvas,
and a 728px reading column. Layout mode is viewport-driven (matchMedia), so
resizing the browser switches between mobile and desktop. Navigation happens via
`data-screen="<id>"` elements inside the prototype; each flow stays
self-contained.

The full architecture — render model, screen types, responsive layout, and the
four personas — is in **[foundation/system.md](foundation/system.md)**.

## Docs

- **[RESTRUCTURE-PLAN.md](RESTRUCTURE-PLAN.md)** — the six-phase restructure,
  its findings and current status.
- **[MANUAL.md](MANUAL.md)** — index of the spec docs (start here).
- **[DECISIONS.md](DECISIONS.md)** — the chronological decisions log.
- **[foundation/](foundation/)** — system & behavior: system, design, navigation.
- **[domains/](domains/)** — the product surfaces: landing, advisors, library,
  community, account, onboarding.
