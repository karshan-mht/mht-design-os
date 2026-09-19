---
name: new-prototype
description: Add a new prototype, or a new page to an existing one. Use when asked to build a screen, flow or surface, or to put an existing mockup into the repo.
---

# New prototype

A prototype here is not a throwaway. It is built from the real system, so the
work can feed back into components and decisions rather than being rebuilt.

## Before building

1. **Check what exists.** [system/components/INDEX.md](../../../system/components/INDEX.md)
   for blocks, `system/icons/sheet.html` for icons, `product/` for what the
   surface is supposed to do. Reuse beats reinvention — and a new block that
   duplicates an existing one is the main way a design system rots.
2. **Read the product doc** for the surface if there is one, in `product/`.

## Structure

Put it under `prototypes/<name>/`. Every page loads three stylesheets, **in this
order**:

```html
<link rel="stylesheet" href="../../system/tokens/tokens.css" />
<link rel="stylesheet" href="../../system/tokens/themes/menopause.css" />
<link rel="stylesheet" href="your-styles.css" />
```

Adjust the depth to where the page actually sits. If it needs the UI glyphs,
load `system/icons/registry-ui.js` **before** any script that calls `icon()`.

## Rules

- **No colour in your stylesheet.** Everything comes from the token layer.
  `evals/lint-tokens.js` blocks a hex or `rgb()` outside `system/tokens/`.
- **No build step.** It must work opened straight from `file://`. That rules
  out `fetch()` of local JSON — data files are `.js` assigning to `window`,
  which is why `launcher/manifest.js` is not `manifest.json`.
- **Keyboard focus** comes free from the global `:focus-visible` rule if you
  use real `<button>` and `<a>` elements. Use them.
- **Honour `prefers-reduced-motion`** for anything that animates.

## Register it

Add one entry to [launcher/manifest.js](../../../launcher/manifest.js) under
the Prototypes section. That is the whole registration — never edit
`index.html` markup to add a prototype.

```js
{ "title": "...", "desc": "...", "href": "prototypes/<name>/index.html",
  "kind": "page", "status": "live" }
```

`status` is `live`, `draft` or `planned`. A `planned` entry renders as a
dashed, non-clickable card, so the roadmap is visible without dead links — use
it rather than leaving something unlisted.

## Finish

```bash
node evals/lint-tokens.js
node evals/lint-links.js
```

Then render it at 375px and desktop, tab through it, and swap the theme to
confirm brand colour follows.
