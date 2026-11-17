# Archive

Retired pages, kept so they can still be opened and brought back. Nothing in
here is checked by `evals/check-all.js`, and nothing live links to it.

| Path | What it was | Archived |
|---|---|---|
| `docs/index.html` + `docs/content.js` | The docs viewer: every markdown file in the repo, rendered with a sidebar. `content.js` is a snapshot of the markdown taken on the day it was archived; it is no longer regenerated. | 2026-11-16 |
| `components/index.html` + `components/manifest.js` | The component gallery: live specimens from the real `main.css` plus the block inventory, with a theme switcher. Its contract links point at `system/components/`, where the contracts still live. | 2026-11-16 |
| `gen-docs.js` | The generator for `docs/content.js`, formerly `evals/gen-docs.js`. Run `node archive/gen-docs.js` by hand to refresh the snapshot. | 2026-11-16 |

**Why:** to keep the repo lean. The markdown files are the docs, and
`system/components/INDEX.md` is the component inventory; both are still
maintained. The viewer's mirror had to be regenerated after every doc edit
and was the check that failed most often.

**To bring one back:** move it back to `system/docs/` or `system/components/`,
restore the generator in `evals/`, re-add its check to `evals/check-all.js`,
and undo the path changes listed in `decisions/DECISIONS.md` (2026-11-16).
