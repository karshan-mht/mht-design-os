# Launcher archive

On 2026-09-21 the launcher was cut back to four sections — Prototypes, Color,
Type, Icons — so it surfaces the basics rather than everything. This records
what was removed and where it still lives, because the curation (the grouping,
the descriptions, the deliberate `planned` placeholders) is work in its own
right and is not recoverable from a file listing.

**Nothing was deleted.** Every file below is still in the repo and still
reachable through the docs viewer at `system/docs/index.html`, which indexes
all 31 markdown documents. The standalone pages — the component gallery, the
graphics gallery, the token reference — are also still there and still pass
their checks.

To restore a section, copy its block back into `launcher/manifest.js`. Sections
with `kind` omitted default to a card grid.

---

## Foundations

_The universal layer every site and prototype shares — color, type, space and motion — plus the hue family that distinguishes each site._

### Conventions

> How to read the rest of the system: who is authoritative about what, and the grammar used to document usage.

| Item | Where it lives | What it was |
|---|---|---|
| Authority & preference | `system/docs/index.html?doc=system/AUTHORITY.md` | Which source wins when artifacts disagree, and the Preferred / Allowed / Avoid / Prohibited grammar. |

### Sites

> One universal palette, one hue family per site. Components are identical everywhere — only the hue differs. Adding a site is one file in system/tokens/themes/ and nothing else.

| Item | Where it lives | What it was |
|---|---|---|
| Site & theme guide | `system/docs/index.html?doc=system/tokens/themes/README.md` | What each site is, what belongs in a theme, and how to add site 81. |
| ThisIsMenopause | `system/tokens/themes/menopause.css` | Purple hue family. Production values, Figma-confirmed. The theme every prototype here is built against. |
| Legacy condition sites | `system/tokens/themes/legacy.css` | Blue hue family for the 80+ existing condition sites, migrating onto Menopause styling. Placeholder values — only the accent is sourced. |
| Legacy site template | _not built_ | A prototype shell running the Legacy hue end to end. Not built yet. |

### Tokens

> One source of truth. Every page links tokens.css, then a theme, then its own styles.

| Item | Where it lives | What it was |
|---|---|---|
| Token reference | `system/tokens/reference.html` | Every token, rendered from tokens.css itself with live computed values and a theme switcher. |
| tokens.css | `system/tokens/tokens.css` | The universal palette. Source of truth; names no hue. |
| Design language | `system/docs/index.html?doc=system/foundation/design.md` | Color tokens, type scale, tinting, chrome asset provenance. |

### Motion

| Item | Where it lives | What it was |
|---|---|---|
| Ask AI pulse | `system/motion/ai-pulse-spec.html` | Motion study for the assistant pill — timing, easing, scope. |

### Patterns

| Item | Where it lives | What it was |
|---|---|---|
| Global navigation | `system/docs/index.html?doc=system/patterns/navigation.md` | Top nav, slide-out panel, level-up pill, footer. |

---

## Components

_The monolith made addressable. A generated index of every CSS block, plus hand-written contracts for the ones that earn one._

### Index

> Generated from main.css by evals/gen-component-index.js, so it cannot drift from the code.

| Item | Where it lives | What it was |
|---|---|---|
| Component gallery | `system/components/index.html` | Live specimens rendered from the real main.css, plus every block by tier. Theme switcher included. |
| Component index (markdown) | `system/components/INDEX.md` | The same inventory as a file, for reading in an editor or a diff. |
| How components work here | `system/docs/index.html?doc=system/components/README.md` | What the tiers mean, how to add a contract, and the known gaps. |
| Contract template | `system/docs/index.html?doc=system/components/_TEMPLATE.md` | The schema for a component contract, using the preference grammar. |

### Contracts

> Written by hand. Authoritative about intent, not about CSS values.

| Item | Where it lives | What it was |
|---|---|---|
| Ask AI button | `system/docs/index.html?doc=system/components/ai-btn.md` | The assistant entry point — states, pulse motion, reduced-motion and accessibility. |
| More contracts | _not built_ | Buttons, the level-up pill and icon-btn are the next candidates. |

### Figma parity

> Coverage is partial on purpose — an entry is added only when the node has been read from Figma. Guessed mappings look authoritative and are worse than none.

| Item | Where it lives | What it was |
|---|---|---|
| parity.json | `system/parity.json` | Figma node to CSS block to contract, with what each mapping was verified against. |
| Code Connect | _not built_ | Considered and not adopted — it needs a Node toolchain and CI, which ends the no-build-step property. |

---

## Brand

_Who the brand is and how it sounds. Strategy, voice, messaging and copy guardrails._

### Source of truth

| Item | Where it lives | What it was |
|---|---|---|
| Brand source of truth | `system/docs/index.html?doc=system/brand/brand-source-of-truth.md` | Positioning, values, voice pillars, tone spectrum, messaging architecture. |
| Site design language | `system/docs/index.html?doc=system/brand/site-design-language.md` | thisismenopause.com — color roles, components, layout rules. |
| MHT Style Guide (Figma) | _not built_ | The live style guide. The v1 PDF was removed as outdated — link to be added. |

---

## Product

_What each surface is and how it behaves — the product knowledge behind the prototypes._

### Surfaces

| Item | Where it lives | What it was |
|---|---|---|
| Landing | `system/docs/index.html?doc=product/landing.md` | Splash Landing — six content modules and its deep-links. |
| Library / Resources | `system/docs/index.html?doc=product/library.md` | Topic pages, Topic Center, Article Show. |
| Community | `system/docs/index.html?doc=product/community.md` | Posts, Q&A, Groups, Meet-Others and their detail screens. |
| Topic Hub | `system/docs/index.html?doc=product/topic-hub.md` | Per-concern hub aggregating Q&A, conversations, groups, resources. |
| Advisors | `system/docs/index.html?doc=product/advisors.md` | Medical Advisory Committee page. |
| Account | `system/docs/index.html?doc=product/account.md` | Profile dropdown and its destination screens. |
| Onboarding | `system/docs/index.html?doc=product/onboarding.md` | Sign Up Start and Registration Step. |

### Architecture

| Item | Where it lives | What it was |
|---|---|---|
| System & persona model | `system/docs/index.html?doc=prototypes/navigation/ARCHITECTURE.md` | The data-persona render model, screen types, responsive layout. |

---

## Decisions

_Why things are the way they are. Append-only: older entries record what was true at the time and are never rewritten._

### Logs

| Item | Where it lives | What it was |
|---|---|---|
| Docs viewer | `system/docs/index.html` | Every markdown document in the repo, rendered and cross-linked, with a sidebar. |
| Decisions log | `system/docs/index.html?doc=decisions/DECISIONS.md` | Every design and build decision, interleaved in time order. |
| Restructure plan | `system/docs/index.html?doc=decisions/RESTRUCTURE-PLAN.md` | The six-phase plan this home is part of, with findings and status. |
| Manual | `system/docs/index.html?doc=MANUAL.md` | Index of the spec docs. |

---

## Why these four went

The launcher had grown to seven sections and 51 entries. Most of it was
reference material that is read occasionally and does not belong on a front
door — the front door should answer "what can I open right now?".

- **Foundations** — superseded. Color and type are now first-class sections
  rendered inline, which is what people actually came to Foundations for. The
  remaining entries (authority model, theme contract, design language,
  navigation pattern) are documents, and documents belong in the docs viewer.
- **Components** — the gallery and contracts still exist at
  `system/components/`. It is a maturing area with five contracts out of 77
  blocks; it earns a launcher section when there is more to show than to
  explain.
- **Brand**, **Product**, **Decisions** — all reading material. The docs
  viewer renders them properly, with cross-links.

The test applied: does this section answer "what can I open right now?" If it
answers "where do I read about X?", it is a document, and the docs viewer is
the right home.
