# TIM Account — spec

The Account surface: the **profile dropdown** menu and the destination screens it
opens (Notifications / My Messages / Saved / Health Journey / Settings) plus the member's own
**My Profile**. The dropdown is triggered from the top-nav profile avatar — that
trigger is nav chrome, spec'd in [navigation.md](../system/patterns/navigation.md) §1 (Top Nav) /
Interactions. **Log out** lives here structurally but is an auth transition — see
[onboarding.md](onboarding.md). Chronological history is in [decisions/DECISIONS.md](../decisions/DECISIONS.md). Code
is the source of truth — correct this doc if it drifts.

All destination screens here are **labelled placeholders** — real UI is not built.

---

## Profile dropdown

Figma Global Navigation `7921:813`. Anchored card, top-right under the profile
avatar, 301px wide (capped at the viewport less 24px), `core-default-300` border,
`0 0 8px` navy-at-10% shadow, 16px radius, 24px padding, 16px between the user
block and the menu.

**Structure:** `User block → rule → Notifications · My Messages · Saved · Health Journey · Settings → rule → Log out`

- **User block:** three 28px rows: name ("Janet Smithsonian", SemiBold 18), handle ("@jannie1234", 16, `core-default-700`), "View Profile" (18, action blue) → the member's own **My Profile** (`my-profile`, via `data-action="go-profile"`), a page distinct from "Someone's Member Profile" reached via Meet Others (see [community.md](community.md)).
- **Menu:** 18/24 rows, 24px apart, each a 24px icon + label (12px gap), all in the dark navy. A 1px rule sits above Notifications and above Log out, 17px above the item.
  - Notifications (10+) → `acct-notifications`
  - My Messages (4) → `acct-messages`
  - Saved → `acct-saved`
  - Health Journey → `acct-health`
  - Settings → `acct-settings`
  - **Log out** → `data-action="log-out"`, currently a **no-op** (auth transition not wired; see [onboarding.md](onboarding.md)).

The `acct-*` rows carry a `data-screen` and navigate to a placeholder destination
screen within the persona (the dropdown closes on click). The counts are
placeholder copy.

**Persona availability:** Logged In Member only. Logged Out Member has a
profile-style icon in the nav but no dropdown content in Figma — not built.
Subscriber uses the Visitor nav (Join button, no profile icon), so it has no
dropdown either.

---

## Destination screens

| Screen | id | Reached from |
|---|---|---|
| Notifications | `acct-notifications` | dropdown |
| My Messages | `acct-messages` | dropdown |
| Saved | `acct-saved` | dropdown |
| Health Journey | `acct-health` | dropdown |
| Settings | `acct-settings` | dropdown |
| My Profile | `my-profile` | dropdown "View Profile" (`go-profile`) |

All `acct-*` rows are top-level `page`s with **no** level-up pill (the nav logo
returns home), as is `my-profile`. **Log out** is not a screen — it's an auth
no-op (see [onboarding.md](onboarding.md)).

---

## Assets — dropdown icons

The six menu icons are the Figma drawings from `7921:813` (Notifications
`7921:823`, My Messages `7921:826`, Saved `7921:830`, Health Journey `7921:834`,
Settings `7921:838`, Log out `7921:844`), inlined in `main.js` as
`DROPDOWN_ICONS` with `currentColor` paint. The bell is drawn 20x22; the rest
are 24x24.
