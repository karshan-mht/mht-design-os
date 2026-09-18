# TIM Repo Restructure — Plan

Status: **Phases 0 and 1 complete.** Phases 2-6 not started.

Goal: turn this repo into a design system that is *executable context* for
agents — a single source of truth for tokens, an addressable component layer,
a home shell that hosts many prototypes, and mechanical verification that
catches drift. Structure follows **System → Context → Behavior → Verification**.

---

## Findings that shaped this plan

Evidence gathered from the current repo, not assumptions.

### 1. Five competing token declarations, three naming schemes

| Source | Scheme | Font |
|---|---|---|
| `main.css` `:root` (47 vars) | `--color-primary`, `--color-text` | Lato |
| `design-system/README.md` | hand-copied table of the above | Lato |
| `design-system/MHT-Design-Tokens.html` | `--action-900`, `--neutral-700` | Lato |
| `line-icons/icon-sheet.html` | `--menopause`, `--brand`, `--ink` | **Archivo** |
| `assistant/ai-pulse-spec.html` | `--blue`, `--magenta`, `--ink` | Lato |
| `community-standalone/styles.css` | fork of `main.css` | Lato |

Every page added recently reinvented the palette. This is the highest-value
problem in the repo and no folder move fixes it.

### 2. Two token values have already silently drifted

| Literal in `main.css` | Existing token | Delta |
|---|---|---|
| `#a441bc` | `--color-magenta` `#a440bc` | one hex digit |
| `#dfe5f1` | `--color-primary-soft` `#dee5f1` | one hex digit |
| `#0f57a8` | `--color-primary` | exact duplicate |
| `#edf3f9` | `--color-bg-blue-soft` | exact duplicate |

### 3. Hex literals outside `:root` — smaller than feared

111 total occurrences, but **57 are `#fff`** and only ~20 values are distinct.
Full inventory in Phase 0 below.

### 4. There is no component layer

`main.js` is 284KB with **76 inline SVGs**; `main.css` is 99KB. Nothing is
addressable, so `components/` cannot be created by `mkdir` — it requires
extraction, or at minimum an index that points into the monolith.

### 5. Two unrelated icon systems

`line-icons/icons/` holds **112 SVG files referenced by zero prototype files**.
The prototype inlines a separate, unrelated set in `main.js`. The icon sheet
also uses Archivo while the product uses Lato.

### 6. Code Connect conflicts with "no build step"

No `package.json`, no `figma.config.json`, no `*.figma.ts`. Real Code Connect
needs a Node toolchain plus `figma connect publish` in CI, and a stable code
identity per component. The docs already cite Figma node ids in prose
(`4101:3`, `zV2gbuNONeoyeRVcFUFWeZ`) — formalize that into `parity.json` data
first; adopt Code Connect only once components exist and a toolchain is
accepted.

### 7. `foundation/` currently mixes three different concerns

- `design.md` — design language → belongs in the **design system**
- `navigation.md` — nav chrome spec → a **pattern**
- `system.md` — the `data-persona` render model → **prototype architecture**

Splitting these three is worth more than any renaming.

### 8. What NOT to change

`domains/` holds product surface knowledge (landing, community, account,
onboarding). This is the "product context" layer and is harder to rebuild than
a generic `patterns/` folder. Keep it (rename to `product/` at most). Do not
reshape the repo merely to mirror Coinbase's architecture.

---

## Brand model

Not two brands — **one universal palette with a hue family per site**, scaling
to the 80+ existing condition sites. Components are identical everywhere;
only the hue differs (Menopause purple, Legacy blue). Legacy is not a separate
product but the existing sites migrating onto Menopause styling.

This rules out a `data-brand` switch with a block per site — at 80 sites that
becomes the bottleneck. Instead a single `--brand-*` set lives in one file per
site, and `tokens.css` never names a hue. Adding a site is one file.

## Decisions taken

1. **Token naming: keep the `main.css` scheme** (`--color-primary`,
   `--color-text`, `--color-magenta`). Zero churn in the working prototype;
   `design-system/README.md` already documents it. `MHT-Design-Tokens.html`
   gets rewritten to match rather than the reverse.
2. **The existing prototype moves** into `prototypes/navigation/`. Accepts a
   wide mechanical path rewrite in exchange for a clean system/prototype
   boundary and room for prototype #2+.
3. **All hex literals get migrated** in Phase 0 — every value becomes a token
   or a documented one-off exception. A lint you cannot switch on is not
   verification.
4. **Brand scope is accent-only.** The six `--brand-*` hue tokens swap per
   site. Action blue, ink, surfaces, borders, type and layout are universal.
5. **Repo renames to `mht-design-system`**, brand-neutral so it does not
   favour Menopause over the Legacy sites. The local directory rename goes
   **last** (it invalidates any running session's working directory); the
   GitHub rename is yours to do.
6. **DECISIONS.md is not split by surface.** Its interleaved timeline is a
   deliberate design that explains cross-surface decisions; splitting destroys
   that. It gets `### YYYY-MM` sub-headings for retrieval instead, and moves
   to `decisions/` in Phase 2 with a README stating the append-only policy.

---

## Target structure

```
index.html                  Home shell (collapsible left sidebar)
home/
  manifest.json             adding a prototype = one entry, not markup surgery
  home.css  home.js

system/                     the design system: live pages + docs
  tokens/
    tokens.css              SINGLE source of truth — imported by everything
    tokens.md               intent, roles, naming rules
  foundation/
    color.md  type.md  space.md  motion.md
    brand.md  tone-of-voice.md
  patterns/
    navigation.md           (from foundation/navigation.md)
  components/
    <name>/demo.html        live specimen + variants
    <name>/docs.md          intent, usage, a11y, do/don't
  icons/
    icons/*.svg  sheet.html  icons.json
  assets/                   logos, graphics
  motion/                   ai-pulse-spec.html + future studies
  parity.json               Figma node id <-> component <-> class <-> doc

prototypes/
  navigation/               current 4-persona app + main.css/js
    ARCHITECTURE.md         (from foundation/system.md)
  entry-points/
  community/                (from community-standalone/)

product/                    (was domains/) product surface knowledge
decisions/                  DECISIONS.md
.claude/skills/             design, design-to-code, design-review,
                            a11y-review, new-component, drift-check
evals/                      lint scripts
```

---

## Phases

### Phase 0 — Tokens (no folder moves) — **DONE**

Delivered:

- `system/tokens/tokens.css` — the universal palette. 55 tokens; no hue named.
- `system/tokens/themes/menopause.css` — purple family, production values.
- `system/tokens/themes/legacy.css` — blue family, placeholder values.
- `system/tokens/themes/README.md` — the theme contract and both load models.
- `evals/lint-tokens.js` — drift lint, passing.
- All 8 product pages + both standalone pages repointed at the token layer.

Verified: every one of the original 38 token names preserved; brace balance
616→613 (exactly the three removed blocks); resolved-value diff shows **11
changed declarations, all intended consolidations**; theme switch confirmed in
a browser on live product UI.

Not done in Phase 0, deliberately: `design-system/`, `line-icons/` and
`assistant/` still hold their own palettes. Those are documentation pages that
get rebuilt when they move under `system/` in Phase 2; the lint skips them and
that exclusion is scoped to be removed then.

Original steps, for reference:

1. Create `system/tokens/tokens.css` from the current `main.css` `:root` block
   (47 vars, names unchanged), including the `@media (min-width:1024px)`
   desktop overrides.
2. Resolve the four drift/duplicate values:
   `#a441bc`→`--color-magenta`, `#dfe5f1`→`--color-primary-soft`,
   `#0f57a8`→`--color-primary`, `#edf3f9`→`--color-bg-blue-soft`.
3. Add tokens for the recurring unnamed values:
   `#fff` (57 uses), `#e9ebee` (9), `#f3f4f6` (4), `#000` (4), `#e5e5e5` (3),
   and the 2-use pairs `#fbf7f3` `#f6f7f9` `#eef1f7` `#eef0f3` `#6b6b6b`
   `#1a1a1a`. Name by role, never by value — the existing rule in
   `foundation/design.md`.
4. Document the true one-offs (`#e3e6ea` `#d6e2f1` `#6b3794` `#151515`) as
   exceptions with a reason comment, or fold them into a token.
5. Point `main.css`, `community-standalone/styles.css`,
   `assistant/ai-pulse-spec.html`, `line-icons/icon-sheet.html` and
   `design-system/MHT-Design-Tokens.html` at `tokens.css`; delete their local
   `:root` blocks.
6. Resolve the **Archivo vs Lato** conflict in the icon sheet.

Exit criterion: exactly one `:root` colour/type declaration exists in the repo.

### Phase 1 — Home shell — **DONE**

Delivered:

- `index.html` — collapsible sidebar over seven sections; state persisted.
- `home/manifest.js` — all home content as data. Adding a prototype is one entry.
- `home/home.css`, `home/home.js` — shell styles and rendering, no framework.
- A live Menopause/Legacy theme switcher, reading swatch colours out of the
  theme files rather than duplicating them.

37 items catalogued across Prototypes, Foundations, Components, Icons &
Graphics, Brand, Product and Decisions. `planned` items render as dashed,
non-clickable cards so the roadmap shows without dead links.

Verified in a browser: section routing and `#hash` deep links, collapse,
theme switch, and a `file://` load with no server (7 sections, 13 cards).

The manifest is `.js` not `.json` because Chrome blocks `fetch()` over
`file://` — a `.json` would have broken the no-server invariant silently.

### Phase 2 — The move

Execute the target structure. Note this churns every relative path plus the
`priorityPaths` and `exclusions` in `.figma/make/dev.json` — mechanical but
wide. Update `README.md` and `MANUAL.md` to match.

### Phase 3 — Components

Start with an **index** mapping component names to their location in the
monolith; extract opportunistically rather than in one pass. Resolve the two
icon systems — either the prototype consumes `system/icons/`, or the sheet is
declared a separate legacy set and marked as such.

### Phase 4 — Figma parity

Build `system/parity.json` from the node ids already cited across
`foundation/` and `domains/`. Adopt real Code Connect only after components
exist and a Node toolchain is accepted.

### Phase 5 — Skills

`.claude/skills/` — each references the system rather than duplicating it.

### Phase 6 — Drift lint

`evals/` — a small Node script, not an LLM harness. Fails on: a hex literal
outside `tokens.css`, an icon file with no sheet entry (or vice versa), a
component with no `docs.md`, a `parity.json` entry pointing at a dead node.
Wire into CI once green.
