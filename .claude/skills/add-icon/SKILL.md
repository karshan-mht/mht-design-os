---
name: add-icon
description: Add or change an icon. Use when given an SVG to add, when asked which icon to use, or when an icon needs to change color or size.
---

# Add an icon

Two sets, each holding only what a page actually uses:

| | `system/icons/ui/` | `system/icons/illustrations/` |
|---|---|---|
| For | Interface chrome: nav, tabs, actions, hub and level-up markers | Listicle and community feature art |
| Style | Solid shapes, `fill="currentColor"` | Line art, ~3px `currentColor` strokes |
| Canvas | 24x24, 20-unit live area | 128 grid |
| Registry | `registry-ui.js` → `MHT_ICONS.ui` | `registry-illustrations.js` → `MHT_ICONS.illustrations` |

The 112-icon editorial line set was removed on 2026-11-16 because nothing
rendered it; it is in git history if a page ever needs one back. Add an icon
when a page needs it, and delete one when the last page stops using it.

## Procedure

1. **Drop the file** into the right folder. Name it kebab-case, after what it
   shows; the filename becomes the registry key.

2. **Make it inherit color.** Every paint must be `currentColor` (or `none`),
   not a literal. A baked color will not re-skin when the site theme changes;
   `evals/lint-icon-paint.js` fails on it.

3. **UI glyphs only: put it on the 24x24 canvas** (below).

4. **Regenerate and verify.**
   ```bash
   node evals/gen-icon-registry.js
   node evals/check-all.js
   ```

5. **Look at it** in the launcher's Icons section at 24, 40 and 64, in light
   and dark.

## The 24x24 canvas

UI glyphs live on a **24x24 canvas with a 20-unit live area**: the artwork's
longest side is 20 units, centered. Every glyph matches, so they render at a
consistent optical size wherever they are used.

A new glyph has to match. If it does not, normalize it:

1. Measure its bounding box in a browser with `getBBox()` — parsing curve
   geometry any other way is guesswork.
2. Add the measurement to `evals/ui-icon-bboxes.json`.
3. Run `node evals/normalize-ui-icons.js`.

That file is a point-in-time snapshot, not something generated on demand, which
is why step 2 is manual. An already-normalized file is detected by its
`data-normalized="24"` attribute and left alone.

## Notes

- Files are the source of truth. `registry-ui.js` is generated — never hand-edit.
- `icon()` in `main.js` normalizes a camelCase request (`tabHome`) to the kebab
  key, so existing call sites keep working.
- The launcher's Icons section copies a glyph's SVG on click. It keeps
  `currentColor`, so a design tool that drops inherited paint will import it
  unfilled; set the fill there.
