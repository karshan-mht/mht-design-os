# MHT Design OS

The durable design workspace for **ThisIsMenopause** and the Legacy condition
sites: the design system, the product knowledge, the prototypes built from
both, the decisions behind them, and the checks that keep them honest.

The design system is one subsystem inside it, under `system/`. Prototypes,
product context, decisions and verification are the rest — which is why this is
a Design OS rather than a design system repo.

Plain HTML/CSS/JS. No framework, no build step — open a file in a browser.

Start at the **launcher** (`index.html`) — the front door. A
collapsible left sidebar moves between Prototypes, Foundations, Components,
Icons & Graphics, Brand, Product and Decisions. Everything opens in its own tab,
so each prototype keeps a shareable URL.

("Launcher", never "Home" — the product has its own Member Home surface, and
reusing the word for two different things confuses both people and agents.)

The launcher renders entirely from **`launcher/manifest.js`**. Adding a
prototype or a doc is one entry in that file — never a markup edit.

The system currently covers two sites: **ThisIsMenopause** (purple hue family,
production) and the **Legacy condition sites** (blue hue family, placeholder
values). Components are identical across both; only the hue differs. See
Foundations → Sites in the launcher, or
[system/tokens/themes/README.md](system/tokens/themes/README.md).

The flagship prototype is the **global navigation** across four auth states —
Anonymous Visitor, Logged Out Member, Logged In Member and Subscriber — in
`prototypes/navigation/`.

Design source: Figma **Global Navigation** file `42yas7Q9FfwhL6xUocjEAl`;
per-surface Figma frames and the **MHT Style Guide** are cited in the `product/`
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
`prototypes/navigation/visitor/`, `.../logged-out-member/`,
`.../logged-in-member/`, `.../subscriber/`.

The launcher has a second section, **Entry Points** — four specific traffic
sources, each starting from a mocked-up external page (a Google search result
page, a Facebook ad, a Gmail inbox) that clicks through into a persona flow on a
specific starting screen instead of its default home: Paid Social (a specific
article), Organic + Paid Search (article variant and home variant), and a
member opening a content email. The external mocks live in `prototypes/entry-points/`;
the click-through uses a `?start=<screen-id>` query param read by `main.js` at
boot (falls back to the normal home if the param is missing or doesn't match a
real screen in that persona).

## Structure

```
index.html                     Launcher — collapsible sidebar over every section
launcher/                      The launcher shell:
  manifest.js                    ALL launcher content. Add a prototype here.
  launcher.css  launcher.js      Shell styles and rendering

system/                        The design system
  tokens/
    tokens.css                   Universal palette — single source of truth
    tokens.md                    Token roles, implementation-agnostic
    manifest.js                  GENERATED mirror of tokens.css
    reference.html               Live token page — renders tokens.css itself
    themes/menopause.css         Purple hue family (production)
    themes/legacy.css            Blue hue family (placeholder values)
    themes/README.md             The two sites; how to add site 81
  foundation/design.md         Design language (type, tinting, chrome assets)
  patterns/navigation.md       Global-nav chrome (top nav, panel, footer)
  parity.json                  Figma node <-> CSS block <-> contract
  components/
    index.html                   Component gallery — live specimens + inventory
    manifest.js                  GENERATED inventory data
    INDEX.md                     The same inventory as markdown
    README.md                    Tiers, how to add a contract, known gaps
    _TEMPLATE.md                 Component contract schema
    <block>.md                   Hand-written contracts (one file each)
  AUTHORITY.md                 Authority model + preference grammar
  icons/
    sheet.html                   Specimen page for both sets
    editorial/*.svg              112 graphical line icons (display sizes)
    ui/*.svg                     28 solid glyphs for interface chrome
    categories.js                Authored grouping + display names
    registry-*.js                GENERATED inline registries
  motion/ai-pulse-spec.html    Ask AI pulse motion study
  brand/                       Brand strategy and voice
  assets/
    index.html                   Graphics gallery, grouped by purpose
    manifest.js                  GENERATED asset inventory
                                 Real assets exported from Figma (flat folder):
                               logotype/logomark, advisor headshots, listicle
                               icons, splash decoration. Nav/UI icons are
                               inlined in main.js, not files.

prototypes/                    Working prototypes, built on the system
  navigation/                  The four-persona global-nav prototype
    main.css  main.js            Styles and behaviour (shared by its pages)
    ARCHITECTURE.md              Render model, screen types, persona model
    visitor/ subscriber/ logged-in-member/ logged-out-member/
  entry-points/                Mock external pages (Google, Facebook, Gmail)
                               that click through into a persona flow
  community/                   Standalone Community surface

product/                       Product surfaces (the what):
  landing.md                     Splash Landing (modules + deep-links + assets)
  advisors.md                    Medical Advisory Committee page
  library.md                     Library / "Resources"
  community.md                   Community (list + detail screens)
  topic-hub.md                   Per-concern Topic Hub
  account.md                     Account (profile dropdown + its screens)
  onboarding.md                  Onboarding (Sign Up Start, Registration Step)

.claude/skills/               How to work on this repo (committed)
decisions/
  DECISIONS.md                 Chronological decisions log + "on the horizon"
  RESTRUCTURE-PLAN.md          The six-phase restructure and its status
evals/
  check-all.js                 Runs every check; one exit code
  lint-tokens.js               Fails on hex outside the tokens; audits rgba()
  lint-links.js                Fails on an internal reference that does not resolve
  gen-component-index.js       Regenerates system/components/INDEX.md (--check)
  gen-icon-registry.js         Regenerates the icon registries (--check)
  gen-token-manifest.js        Regenerates the token manifest (--check)
  gen-asset-manifest.js        Regenerates the asset inventory (--check)
  lint-parity.js               Validates system/parity.json; reports coverage
  lint-dead-code.js            Unrendered blocks and uncalled functions (advisory)
MANUAL.md                      Index of the spec docs
```

`.claude/skills/` holds the procedures for working on this repo — drift checks,
writing a component contract, adding an icon, starting a prototype. They are
committed; only `.claude/settings.local.json` (local permission state) is
ignored. See [.claude/skills/README.md](.claude/skills/README.md).

## How it works

Each flow lives in its own folder and is a thin shell that sets one attribute and
loads the token layer, a site theme, then the two shared files:

```html
<link rel="stylesheet" href="../../../system/tokens/tokens.css" />
<link rel="stylesheet" href="../../../system/tokens/themes/menopause.css" />
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
four personas — is in **[prototypes/navigation/ARCHITECTURE.md](prototypes/navigation/ARCHITECTURE.md)**.

## Docs

- **[system/AUTHORITY.md](system/AUTHORITY.md)** — the authority model (which
  source wins about what) and the preference grammar used across component docs.
- **[RESTRUCTURE-PLAN.md](decisions/RESTRUCTURE-PLAN.md)** — the six-phase restructure,
  its findings and current status.
- **[MANUAL.md](MANUAL.md)** — index of the spec docs (start here).
- **[decisions/DECISIONS.md](decisions/DECISIONS.md)** — the chronological decisions log.
- **[system/](system/foundation/)** — system & behavior: system, design, navigation.
- **[product/](product/)** — the product surfaces: landing, advisors, library,
  community, account, onboarding.
