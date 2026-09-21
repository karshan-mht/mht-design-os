---
name: add-icon
description: Add or change an icon. Use when given an SVG to add, when asked which icon to use, or when an icon needs to change color, size or category.
---

# Add an icon

Two sets with different jobs. Pick the right one first — they are deliberately
not interchangeable.

| | `system/icons/editorial/` | `system/icons/ui/` |
|---|---|---|
| For | Symptoms, anatomy, care, support, living | Interface chrome: nav, tabs, actions |
| Style | Line art, stroke 3.4 on a 128 grid | Solid shapes |
| Size | Display — **below ~44px it renders as a hairline** | 16–44px |
| Count | 112 | 28 |

If it is a glyph in a button or a nav row, it is **ui**. If it illustrates a
topic, it is **editorial**.

## Procedure

1. **Drop the file** into the right folder. Name it kebab-case; the filename
   becomes the registry key.

2. **Make it inherit color.** Every path must use `currentColor`, not a
   literal — `stroke="currentColor"` for editorial, `fill="currentColor"` for
   ui. A baked fill will not re-skin when the site theme changes, which is the
   bug class `evals/lint-tokens.js` exists to catch.

   Exceptions are narrow: a knockout punched through a filled shape, and
   third-party brand marks. Both stay literal and need a reason in the lint.

3. **Categorise it** (editorial only) in
   [system/icons/categories.js](../../../system/icons/categories.js) — add the
   slug to exactly one category and give it a display name. This is authored
   data, not derived; the grouping is a judgment about what the icon is for.

4. **Regenerate and verify.**
   ```bash
   node evals/gen-icon-registry.js
   node evals/gen-icon-registry.js --check
   node evals/lint-tokens.js
   ```
   The `--check` run fails if an editorial icon is uncategorised, so a new icon
   cannot silently vanish from the sheet.

5. **Look at it.** Open `system/icons/sheet.html`, switch themes, and check it
   at the small sizes. The sheet renders from the registry, so it is a specimen
   of the real file, not a copy.

## Notes

- Files are the source of truth. `registry-*.js` is generated — never hand-edit.
- The registries are split per set on purpose: the prototype loads only the 28
  UI glyphs (53KB) and never the 112 editorial icons (160KB it would not use).
- `icon()` in `main.js` normalizes a camelCase request (`tabHome`) to the kebab
  key, so existing call sites keep working.
- Design tools drop inherited paint on import. The sheet's **COPY** button bakes
  a literal hex onto every shape before copying, so `currentColor` in the source
  costs nothing there.
