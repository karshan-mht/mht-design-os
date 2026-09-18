# Themes

One universal palette, one hue family per site. Components are identical
everywhere — only the `--brand-*` values in this folder differ.

| Theme | Hue family | Status |
|---|---|---|
| `menopause.css` | Purple | Production. Figma-confirmed. |
| `legacy.css` | Blue | **Placeholder.** Only `--brand-accent` is sourced; the rest are derived. |

## What belongs in a theme

Only the six `--brand-*` hue tokens. Everything else — action blue, ink,
surfaces, borders, type, layout — is universal and lives in `../tokens.css`.

If you find yourself wanting to add a seventh token here, check first whether
the difference is really brand or really a component variant.

## Two loading models

Each theme file declares its values twice: once on bare `:root` (so it works
alone) and once on `:root[data-theme="<name>"]` (so it works in a switcher).
The attribute selector has higher specificity, so it always wins when both
are present.

**A product page loads exactly one theme:**

```html
<link rel="stylesheet" href="system/tokens/tokens.css">
<link rel="stylesheet" href="system/tokens/themes/menopause.css">
<link rel="stylesheet" href="main.css">
```

**A documentation page with a live switcher loads all of them** and sets the
attribute on `<html>`:

```html
<link rel="stylesheet" href="system/tokens/tokens.css">
<link rel="stylesheet" href="system/tokens/themes/menopause.css">
<link rel="stylesheet" href="system/tokens/themes/legacy.css">
<script>document.documentElement.dataset.theme = 'menopause';</script>
```

Switcher pages must set `data-theme` explicitly — with several theme files
loaded, the bare `:root` default is decided by link order, which is fragile.

## Adding a site

Copy `legacy.css`, change the six values and the selector name. That is the
whole job — no component, token or documentation change. This is the property
that has to hold as the count grows toward 80+; if adding a site ever requires
touching anything outside this folder, something has leaked out of the theme
layer.
