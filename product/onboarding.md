# TIM Onboarding — spec

The onboarding surface: the start of account creation — **Sign Up Start** and
**Registration Step** — and every CTA that opens them, plus the auth transitions
that are deliberately *not* wired yet. These CTAs originate on other surfaces (the
splash in [landing.md](landing.md), the nav Join button in
[navigation.md](../system/patterns/navigation.md)), but the destination
pages and their behavior are specified here. Chronological history is in
[decisions/DECISIONS.md](../decisions/DECISIONS.md). Code is the source of truth — correct this doc if it
drifts.

**Code source of truth:** the two screens are declared in `main.js` —
`signup-start` in `SPLASH_FLOW_SCREENS` (~`main.js:142`) and `registration-step`
appended to the Subscriber persona only (~`main.js:203`). Chromeless rendering is
the `screen.chromeless` branch of `render()` (~`main.js:571`); the ✕ runs the
`close-flow` action (~`main.js:721`), returning to `state.prevScreenId`
(remembered on every navigation, ~`main.js:681`).

---

## Screens

Both are `type: "page"`, `chromeless: true` — they render with **no top nav, no
level-up pill, no footer**; just an **✕** in the top-left (`.flow-close`,
`data-action="close-flow"`) that closes **back to the page they opened from**
(`state.prevScreenId`).

| Screen id | Label | Available to |
|---|---|---|
| `signup-start` | **Sign Up Start** | Visitor **and** Subscriber (part of the shared `SPLASH_FLOW_SCREENS`) |
| `registration-step` | **Registration Step** | **Subscriber only** (appended to that persona's `screens`) — pending a fuller subscriber-specific design |

Both are labelled placeholder pages, consistent with the rest of the prototype —
real form UI is not built.

---

## Entry points (as wired)

Every entry point uses `data-screen` (a real in-persona navigation to the
chromeless page), **not** a cross-folder jump:

| Trigger | Persona(s) | Opens |
|---|---|---|
| Nav pill **Join** | **Visitor only** | `signup-start` |
| Nav pill **Finish** | **Subscriber only** | `registration-step` |
| Splash closing card **Join for free** | **Visitor only** | `signup-start` |
| Splash closing card **Finish up now** | **Subscriber only** | `registration-step` |

Both the nav pill and the splash closing card are **persona-aware** (Subscriber
and Visitor share the `visitor` nav variant, so the split is by persona key, not
nav variant). For the Subscriber the nav pill reads **Finish** and the closing
card reads "You're almost in." / **Finish up now** — both → `registration-step`.
For the Visitor they're **Join** / **Join for free** → `signup-start`.

> **Note (2026-08-03 shared-panel redesign):** the panel's Join for free /
> Finish up now access cards were removed. Their roles moved to the splash
> closing card above — which is now the sole entry point to `registration-step`.

---

## Auth transitions

Logging **in** is wired (2026-11-16); logging **out** is not. There is no real
auth: logging in is a client-side jump into the `../logged-in-member/` flow on
the same page (`logIn()` in `main.js`; it falls back to that persona's home if
the page doesn't exist there).

| CTA | Where | Action | Behavior today |
|---|---|---|---|
| **Log in now** | Logged Out Member panel access card; Community login reminder | `data-action="log-in"` | opens the login card (see [account.md](account.md)) |
| **Other ways to log in** | Logged Out Member panel access card | `data-action="log-in-other"` | opens the login card with Google and Facebook showing |
| **Log In** | Member gate ("Already a member?"), Visitor and Subscriber | `data-action="log-in"` | goes straight into the logged-in flow (the card is pre-filled with a known member's email, so it is skipped for visitors) |
| **Log in** / **Continue with Google / Facebook** | The login card | form submit / `log-in-with` | into the logged-in flow |
| **Log out** | Logged In Member profile dropdown | `data-action="log-out"` | no-op |

Log out staying a no-op **supersedes** the earlier (2026-07-24) design in which
it did a real cross-folder navigation into the `../logged-out-member/` flow — see
[decisions/DECISIONS.md](../decisions/DECISIONS.md). A real implementation would replace these jumps
with an actual auth flow rather than a client-side folder swap; that decision is
still open ("on the horizon" in [decisions/DECISIONS.md](../decisions/DECISIONS.md)).
