# MHT Design OS — Manual

The spec docs, as a flat index. Start with the root [README.md](README.md) for
the project overview and quick start, or open `index.html` for the same map as
a browsable launcher.

**`system/`** is the design system — what is true about colour, type, patterns,
icons and brand. **`product/`** is the product knowledge — what each surface is
and how it behaves. **`prototypes/`** is what was built with both.

## system/ — the design system

- **[tokens/tokens.md](system/tokens/tokens.md)** — token roles, colour, type scale and
  spacing, written implementation-agnostically so another project can map them
  onto its own naming.
- **[tokens/themes/README.md](system/tokens/themes/README.md)** — the two sites
  (ThisIsMenopause, Legacy), what belongs in a theme, both loading models, and
  how to add another site.
- **[foundation/design.md](system/foundation/design.md)** — the design language: colour
  tokens, type scale + letter-spacing, spacing/radius/motion, the icon-tinting
  system, and chrome asset provenance.
- **[patterns/navigation.md](system/patterns/navigation.md)** — the global-nav chrome: top
  nav, slide-out panel, level-up pill and global footer — behaviour, component
  structure, and Figma node ids.
- **[tokens/reference.html](system/tokens/reference.html)** — the live token sheet.
- **[icons/sheet.html](system/icons/sheet.html)** — the 112-icon line set, with search and
  size/stroke controls.
- **[motion/ai-pulse-spec.html](system/motion/ai-pulse-spec.html)** — the Ask AI pulse
  motion study.
- **brand/** — [brand source of truth](system/brand/brand-source-of-truth.md),
  [site design language](system/brand/site-design-language.md), and the
  [MHT Style Guide PDF](system/brand/MHT-Style-Guide-v1.pdf).

## product/ — the product surfaces

- **[landing.md](product/landing.md)** — the Splash Landing surface: the six
  content-module sections (Checker, Listicles, Articles, Experts, Factoid,
  Community), the splash CTA deep-link screens, and the landing's styling.
- **[advisors.md](product/advisors.md)** — the Medical Advisory Committee page.
- **[library.md](product/library.md)** — the Library surface (labelled "Resources" in the
  panel): topic pages, Topic Center / Article Show, and the panel topic icons.
- **[community.md](product/community.md)** — the Community surface: Posts / Q&A / Groups /
  Meet-Others / All-Community list pages and their detail screens.
- **[topic-hub.md](product/topic-hub.md)** — the Topic Hub: a per-concern hub aggregating
  Q&A, conversations, groups and resources.
- **[account.md](product/account.md)** — the Account surface: the profile dropdown and its
  destination screens.
- **[onboarding.md](product/onboarding.md)** — Sign Up Start and Registration Step, every
  CTA that opens them, and the auth transitions not yet wired.

## prototypes/

- **[navigation/ARCHITECTURE.md](prototypes/navigation/ARCHITECTURE.md)** — the
  `data-persona` render model, screen types and state machine, responsive
  layout, the four personas, and the per-persona screen inventory.

## decisions/

- **[DECISIONS.md](decisions/DECISIONS.md)** — the chronological decisions log for the
  whole project, interleaved in time order, plus what's "on the horizon". It is
  **append-only**: entries record what was true when written and are not
  rewritten later, so paths mentioned in older entries are historical.
- **[RESTRUCTURE-PLAN.md](decisions/RESTRUCTURE-PLAN.md)** — the six-phase restructure,
  its findings and current status.

## Conventions

- **[system/AUTHORITY.md](system/AUTHORITY.md)** — which source is authoritative
  about what when artifacts disagree, and the Preferred / Allowed / Avoid /
  Prohibited / Exception / Rationale grammar used to document usage.

Code is authoritative about what *behaves* this way today, but not
automatically about what was *intended* — see AUTHORITY.md before resolving a
disagreement by editing the nearest file.
