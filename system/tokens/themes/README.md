# Sites

One universal palette, one hue family per site. Components are identical
everywhere — only the `--brand-*` values in this folder differ.

## The two sites

### ThisIsMenopause — `menopause.css`

The flagship site. Purple hue family, anchored on `#a440bc`, which the brand
docs reserve for brand moments: logo lockup, featured highlights and secondary
CTAs. Values are production and Figma-confirmed. Every prototype in this repo
currently runs this theme.

### Legacy condition sites — `legacy.css`

The 80+ existing condition sites. They run older styling today and are
migrating onto Menopause styling with a blue hue family instead of purple —
same components, same layout, same type, different hue.

**Status: placeholder.** Only `--brand-accent` (`#3f7ec1`) is sourced, from
`line-icons/icon-sheet.html`. The other values are derived from it using the
same relationships the Menopause theme uses, so the system is coherent today
and the real palette is a one-file swap later. `--brand-accent-pale` in
particular is **not** contrast-checked yet.

There is no Legacy site template yet — no prototype runs this theme end to
end. That is tracked in the launcher under Foundations → Sites.

| Theme | Hue family | Status |
|---|---|---|
| `menopause.css` | Purple | Production. Figma-confirmed. |
| `legacy.css` | Blue | Placeholder. Only the accent is sourced. |

## What belongs in a theme

Only the eight `--brand-*` hue tokens. Everything else — action blue, ink,
surfaces, borders, type, layout — is universal and lives in `../tokens.css`.

If you find yourself wanting to add a ninth token here, check first whether the
difference is really brand or really a component variant.

Derivation used for a new hue family, matching Menopause exactly:

| Token | Rule |
|---|---|
| `--brand-accent` | the site hue |
| `--brand-accent-soft` | accent at 8% alpha |
| `--brand-accent-soft-solid` | that 8% composited over white |
| `--brand-accent-strong` | deeper accent for rings and edges |
| `--brand-accent-light` | lighter accent for emphasis on dark |
| `--brand-accent-pale` | pale tint that clears AA on a photo scrim |
| `--brand-scrim` | dark backdrop behind a COLOR-blended photo |
| `--brand-bg-accent-soft` | very light section wash |

## Two loading models

Each theme file declares its values twice: once on bare `:root` (so it works
alone) and once on `:root[data-theme="<name>"]` (so it works in a switcher).
The attribute selector has higher specificity, so it always wins when both are
present.

**A product page loads exactly one theme.** This is the normal case, and what
every page in this repo does today:

```html
<link rel="stylesheet" href="system/tokens/tokens.css">
<link rel="stylesheet" href="system/tokens/themes/menopause.css">
<link rel="stylesheet" href="main.css">
```

**A page that compares hues loads several** and sets the attribute on `<html>`:

```html
<link rel="stylesheet" href="system/tokens/tokens.css">
<link rel="stylesheet" href="system/tokens/themes/menopause.css">
<link rel="stylesheet" href="system/tokens/themes/legacy.css">
<script>document.documentElement.dataset.theme = 'menopause';</script>
```

Such a page must set `data-theme` explicitly — with several theme files loaded,
the bare `:root` default is decided by link order, which is fragile. No page
does this today; the launcher documents the sites rather than switching
between them.

## Adding a site

Copy `legacy.css`, change the eight values and the selector name. That is the
whole job — no component, token or documentation change beyond listing it
above. This is the property that has to hold as the count grows toward 80+; if
adding a site ever requires touching anything outside this folder, something
has leaked out of the theme layer.

## Known gap

Brand-coloured raster and SVG assets do not theme. Applying the Legacy hue
recolours the UI but leaves the logo purple, because the wordmark is inlined
SVG with baked fills in `main.js`. `evals/lint-tokens.js` reports these as
warnings. Fixing it means `currentColor` or per-site marks — Phase 3.
