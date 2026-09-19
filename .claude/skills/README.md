# Skills

Procedures for working on this repo. Each one references the authoritative
files rather than copying them, so a skill cannot drift from the system it
describes.

| Skill | Use when |
|---|---|
| [drift-check](drift-check/SKILL.md) | Before committing, after moving files, or when asked whether anything has drifted |
| [new-component-contract](new-component-contract/SKILL.md) | Documenting a component, or before changing one whose intent is unclear |
| [add-icon](add-icon/SKILL.md) | Adding or changing an icon |
| [new-prototype](new-prototype/SKILL.md) | Building a new screen, flow or surface |

## Why only four

The restructure plan listed six candidates — design, design-to-code, design
review, accessibility review, component creation, drift detection. Four were
written. The other two were not, on purpose.

**design review** and **accessibility review** are mostly judgment, not
procedure. What a skill could usefully say about them already lives closer to
the work: the accessibility expectations are in each component contract, and
[system/AUTHORITY.md](../../system/AUTHORITY.md) covers how to weigh sources
when they disagree. A skill that only said "check contrast and keyboard access"
would be a maintenance cost pretending to be guidance.

The four that exist all describe something with a real, repeating, repo-specific
procedure — a sequence with commands in it, where getting the order wrong causes
a concrete failure. That is the bar. Add a fifth when a task has actually
recurred and has that shape, not before.

## These are committed

`.claude/settings.local.json` stays gitignored — it is local permission state.
`.claude/skills/` is tracked, because a procedure that exists on one machine is
not a procedure. `evals/lint-links.js` checks the links inside them, since they
reference repo paths heavily and are exactly the kind of link that rots after a
move.
