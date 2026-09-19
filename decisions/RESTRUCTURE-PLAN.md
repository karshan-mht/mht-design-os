# TIM Repo Restructure — Plan

Status: **Phases 0-5 complete.** Phase 6 not started.

Goal: turn this repo into a design system that is *executable context* for
agents — a single source of truth for tokens, an addressable component layer,
a launcher that hosts many prototypes, and mechanical verification that
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
5. **Repo renames to `mht-design-os`**, brand-neutral so it does not favour
   Menopause over the Legacy sites. It landed as `mht-design-system` first and
   was renamed again after the Design OS handoff made the case: the design
   system is one subsystem under `system/`, while `prototypes/`, `product/`,
   `decisions/` and `evals/` are not design system at all. The local directory
   rename goes **last** (it invalidates any running session's working
   directory); the GitHub rename is yours to do.

   Naming inside `system/` deliberately still says "design system" — that part
   genuinely is one.
6. **DECISIONS.md is not split by surface.** Its interleaved timeline is a
   deliberate design that explains cross-surface decisions; splitting destroys
   that. It gets `### YYYY-MM` sub-headings for retrieval instead, and moves
   to `decisions/` in Phase 2 with a README stating the append-only policy.

---

## Target structure

```
index.html                  Home shell (collapsible left sidebar)
launcher/
  manifest.js               adding a prototype = one entry, not markup surgery
  launcher.css  launcher.js

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

### Phase 1 — Launcher shell — **DONE**

Delivered:

- `index.html` — collapsible sidebar over seven sections; state persisted.
  Named the **launcher**, never "Home" — the product has its own Member Home.
- `launcher/manifest.js` — all home content as data. Adding a prototype is one entry.
- `launcher/launcher.css`, `launcher/launcher.js` — shell styles and rendering, no framework.
- A Sites group documenting both hue families, with the missing Legacy site
  template listed as `planned` rather than left implied.

37 items catalogued across Prototypes, Foundations, Components, Icons &
Graphics, Brand, Product and Decisions. `planned` items render as dashed,
non-clickable cards so the roadmap shows without dead links.

Verified in a browser: section routing and `#hash` deep links, collapse,
mobile reflow, and a `file://` load with no server (7 sections, 13 cards).

A theme switcher was built and then removed — it demonstrated the token layer
but did not serve the page, and there is no Legacy site template to switch to
yet. The two sites are documented instead.

The manifest is `.js` not `.json` because Chrome blocks `fetch()` over
`file://` — a `.json` would have broken the no-server invariant silently.

### Phase 2 — The move — **DONE**

The target structure above is now the actual structure, with two refinements
found in execution: `design-system/` was dissolved into `system/tokens/` and
`system/brand/` rather than kept, and the old `foundation/` was split three
ways (design language to `system/foundation/`, the nav pattern to
`system/patterns/`, the render model to `prototypes/navigation/ARCHITECTURE.md`).

Every move used `git mv`, so history follows each file.

Verified:

- **217 tracked files before and after, identical content-hash set** — the move
  changed locations only.
- 119 markdown links resolve; all 36 home-manifest links resolve.
- Prototypes render over http and `file://` with 0 broken images, including
  advisor headshots. Entry-point click-through into a persona flow works.
- `.figma/make/dev.json` priority paths and exclusions rewritten.
- `evals/lint-tokens.js` rescoped from directory names to exact relative paths
  and still passes.

Not done at the time: the local directory and GitHub repo rename (now `mht-design-os`).
That is deliberately last — renaming the working directory invalidates any
running session, and the GitHub rename is the user's to perform.

### Phase 3 — Components — **DONE**

Done:

- `system/AUTHORITY.md` — the authority model and preference grammar, folded in
  from the Design OS handoff. Replaces the old "code always wins" line.
- `system/components/INDEX.md` — all 79 CSS blocks by tier, **generated** from
  the stylesheet by `evals/gen-component-index.js` so it cannot drift.
  `--check` fails when it is stale.
- `system/components/_TEMPLATE.md` + `README.md` — the contract schema and how
  to use it.
- `system/components/ai-btn/docs.md` — the first real contract.
- **Brand marks now theme.** The inlined logos carried baked `fill="#A440BC"`,
  which is why the wordmark stayed purple under the Legacy hue. The paths are
  now classed `.logo-accent` / `.logo-ink` and driven from the tokens.
  Verified in a browser: the wordmark goes blue with the theme.
- **Ask AI pulse now themes.** Its keyframes baked the accent as `rgba(...)`,
  which the hex-only lint never saw. Converted to
  `rgb(from var(--color-accent) …)`; `lint-tokens` now audits `rgba()` too, as
  an advisory tier.
- **Keyboard focus, repo-wide.** Writing the first contract surfaced that the
  prototype had *no* focus styling at all — zero `:focus` rules across 64
  rendered buttons. Added one `:focus-visible` rule plus a pill-radius variant.
  This was a blocker, found by the act of documenting.
- Removed the dead legacy launcher CSS (13 rules) left behind by Phase 1.

Also done:

- **Five contracts**: `ai-btn`, `icon-btn`, `uplevel`, and the module button
  pair. Each surfaced a real defect — see `system/components/README.md`.
- **The two icon systems** were never rival versions: editorial (112,
  display-sized line art) and UI glyphs (28, interface chrome) share 2 names
  out of 140. Files are the source of truth for both, with generated
  registries; the sheet renders from them instead of holding a third copy.
- **Both lints graduated from advisory to blocking.** 42 baked SVG colours and
  36 `rgba()` literals went to **zero**: brand colours are classed and
  token-driven, exact token values became `rgb(from var(--token) …)`, and the
  handful that must stay literal — third-party marks, knockouts, pure
  black/white at alpha — are named with reasons.
- **The `.launcher-hotspot` markup** is one shared script instead of three
  hand-copies.

### Phase 4 — Figma parity — **DONE**

`system/parity.json` ties a Figma node to the CSS block that implements it, and
`evals/lint-parity.js` validates the structure, checks every mapped block still
exists, and reports coverage.

Entries were **read from Figma, not mined from prose**. That immediately paid:

- `.uplevel` → `7294:1952`, literally named "Uplevel", confirmed 34px in both
  with a 16×16 Icon and a Label child matching the contract's anatomy.
- `.footer` → `6371:78`, whose `Bar` and `End` children map exactly onto
  `.footer__bar` / `.footer__end`. The docs had cited the outer `6371:29`;
  `6371:78` is the more precise anchor.
- The two panel persona cards are **both named "Access"** in Figma and differ
  only by button label — a real drift risk for anyone reading the file without
  the docs.

**Code Connect was considered and not adopted.** It needs a Node toolchain plus
a publish step in CI, which ends the no-build-step property that lets every page
open from `file://`. `parity.json` gets detectable drift without that and is the
input if Code Connect is adopted later.

Coverage is 3 of 81 blocks and deliberately partial — an entry is added only
when the node has been read. The four contracted components without one are
reported every run, with what each is waiting on recorded in `openQuestions`.

### Phase 5 — Skills — **DONE**

Four skills in `.claude/skills/`, each referencing the authoritative files
rather than copying them: `drift-check`, `new-component-contract`, `add-icon`,
`new-prototype`.

Two of the six candidates were **not** written. `design review` and
`accessibility review` are mostly judgment rather than procedure, and what a
skill could usefully say already lives closer to the work — accessibility
expectations are in each component contract, and AUTHORITY.md covers weighing
sources. A skill saying "check contrast and keyboard access" would be a
maintenance cost pretending to be guidance.

The bar applied: a real, repeating, repo-specific sequence with commands in it,
where getting the order wrong causes a concrete failure.

Two supporting changes:

- `.gitignore` now tracks `.claude/skills/` while still ignoring
  `settings.local.json`. A procedure that exists on one machine is not a
  procedure.
- `evals/lint-links.js` now checks inside the skills. They reference repo paths
  heavily and are exactly the kind of link that rots after a move — verified by
  deliberately breaking one and confirming the check fails.

### Phase 6 — Drift lint

`evals/` — a small Node script, not an LLM harness. Fails on: a hex literal
outside `tokens.css`, an icon file with no sheet entry (or vice versa), a
component with no `docs.md`, a `parity.json` entry pointing at a dead node.
Wire into CI once green.
