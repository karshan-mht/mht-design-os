window.HOME_MANIFEST =
{
  "_comment": "The home shell renders entirely from this file. Adding a prototype or a doc is one entry here - never a markup edit. Paths are relative to the repo root. kind: page|doc|pdf|code. status: live|draft|planned (planned renders disabled, so the roadmap is visible without dead links). This is a .js rather than a .json because Chrome blocks fetch() of local files over file://, and this repo must keep working from file:// with no server. It is still pure data - nothing here is executable.",
  "title": "MHT Design System",
  "subtitle": "Design system, documentation and prototypes for ThisIsMenopause and the Legacy condition sites.",
  "themes": [
    { "id": "menopause", "label": "Menopause" },
    { "id": "legacy", "label": "Legacy" }
  ],
  "sections": [
    {
      "id": "prototypes",
      "title": "Prototypes",
      "icon": "layers",
      "blurb": "Working prototypes built on the real system. Each opens in its own tab so the URL stays shareable.",
      "groups": [
        {
          "title": "User Types",
          "note": "The four auth states of the global navigation.",
          "items": [
            {
              "title": "Anonymous Visitor",
              "desc": "Someone browsing without an account.",
              "href": "visitor/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Subscriber",
              "desc": "Someone who's started signing up but hasn't finished.",
              "href": "subscriber/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Logged In Member",
              "desc": "A member signed in to their account.",
              "href": "logged-in-member/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Logged Out Member",
              "desc": "A member with an account who isn't currently signed in.",
              "href": "logged-out-member/index.html",
              "kind": "page",
              "status": "live"
            }
          ]
        },
        {
          "title": "Entry Points",
          "note": "Arriving from an external source onto a specific starting screen.",
          "items": [
            {
              "title": "Paid Social — Article",
              "desc": "A Facebook ad opens straight into an Article Show.",
              "href": "entry-points/facebook-ad.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Search — Article",
              "desc": "A Google result opens straight into an Article Show.",
              "href": "entry-points/google-search.html?highlight=article",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Search — Home",
              "desc": "A Google result opens on the Splash Landing home.",
              "href": "entry-points/google-search.html?highlight=home",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Content Email — Article",
              "desc": "A Gmail message opens a member into an Article Show.",
              "href": "entry-points/gmail-inbox.html",
              "kind": "page",
              "status": "live"
            }
          ]
        },
        {
          "title": "Personal Assistant",
          "note": "Ask AI states, isolated for review.",
          "items": [
            {
              "title": "Assistant — Pulse",
              "desc": "Just the AI pill pulsing in the top nav.",
              "href": "visitor/index.html?flow=pulse",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Assistant — Greeting Nudge",
              "desc": "A first-time welcome on the Splash Landing.",
              "href": "visitor/index.html?flow=assistant&reset=1",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Assistant — Question Nudge",
              "desc": "A suggested question on an Article.",
              "href": "visitor/index.html?flow=assistant&start=article",
              "kind": "page",
              "status": "live"
            }
          ]
        },
        {
          "title": "Standalone",
          "note": "Single surfaces built outside the persona shell.",
          "items": [
            {
              "title": "Community",
              "desc": "The Community page body — no nav, no footer. Data-driven from script.js.",
              "href": "community-standalone/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Resources",
              "desc": "The Resources surface. Next prototype up.",
              "href": null,
              "kind": "page",
              "status": "planned"
            }
          ]
        }
      ]
    },
    {
      "id": "foundations",
      "title": "Foundations",
      "icon": "grid",
      "blurb": "The universal layer every site and prototype shares. Colour, type, space and motion.",
      "groups": [
        {
          "title": "Tokens",
          "note": "One source of truth. Every page links tokens.css, then a theme, then its own styles.",
          "items": [
            {
              "title": "Token reference",
              "desc": "The live MHT token sheet — colour ramps, type scale, spacing.",
              "href": "design-system/MHT-Design-Tokens.html",
              "kind": "page",
              "status": "draft"
            },
            {
              "title": "tokens.css",
              "desc": "The universal palette. Source of truth; names no hue.",
              "href": "system/tokens/tokens.css",
              "kind": "code",
              "status": "live"
            },
            {
              "title": "Theme contract",
              "desc": "How a site hue family works, and how to add site 81.",
              "href": "system/tokens/themes/README.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Design language",
              "desc": "Colour tokens, type scale, tinting, chrome asset provenance.",
              "href": "foundation/design.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        },
        {
          "title": "Motion",
          "items": [
            {
              "title": "Ask AI pulse",
              "desc": "Motion study for the assistant pill — timing, easing, scope.",
              "href": "assistant/ai-pulse-spec.html",
              "kind": "page",
              "status": "live"
            }
          ]
        },
        {
          "title": "Patterns",
          "items": [
            {
              "title": "Global navigation",
              "desc": "Top nav, slide-out panel, level-up pill, footer.",
              "href": "foundation/navigation.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        }
      ]
    },
    {
      "id": "components",
      "title": "Components",
      "icon": "box",
      "blurb": "Component specimens with variants, usage and accessibility notes, each mapped to its Figma counterpart.",
      "groups": [
        {
          "title": "Not built yet",
          "note": "Phase 3. There is no component layer today — styles live in a 99KB main.css and behaviour in a 284KB main.js, so nothing is addressable yet. These land as they are extracted.",
          "items": [
            {
              "title": "Component index",
              "desc": "Map of component name to its location in the monolith. The first step.",
              "href": null,
              "kind": "page",
              "status": "planned"
            },
            {
              "title": "Figma ↔ code parity",
              "desc": "parity.json — Figma node, component, CSS class, doc.",
              "href": null,
              "kind": "page",
              "status": "planned"
            }
          ]
        }
      ]
    },
    {
      "id": "icons",
      "title": "Icons & Graphics",
      "icon": "shapes",
      "blurb": "Every icon and graphic in one place. Some are not used by a prototype yet — that is expected; they land as pages are built.",
      "groups": [
        {
          "title": "Icons",
          "items": [
            {
              "title": "Line icon sheet",
              "desc": "112 line icons with search, size and stroke controls.",
              "href": "line-icons/icon-sheet.html",
              "kind": "page",
              "status": "live"
            }
          ]
        },
        {
          "title": "Graphics",
          "note": "Logos, splash decoration and listicle art, exported from Figma.",
          "items": [
            {
              "title": "Asset folder",
              "desc": "53 files — logotype, logomark, hero rings, factoid blobs, listicle icons.",
              "href": "assets/",
              "kind": "page",
              "status": "draft"
            }
          ]
        }
      ]
    },
    {
      "id": "brand",
      "title": "Brand",
      "icon": "pen",
      "blurb": "Who the brand is and how it sounds. Strategy, voice, messaging and copy guardrails.",
      "groups": [
        {
          "title": "Source of truth",
          "items": [
            {
              "title": "Brand source of truth",
              "desc": "Positioning, values, voice pillars, tone spectrum, messaging architecture.",
              "href": "design-system/thisismenopause_brand_source_of_truth_outline.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Site design language",
              "desc": "thisismenopause.com — colour roles, components, layout rules.",
              "href": "design-system/thisismenopause.com-DESIGN.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "MHT Style Guide v1",
              "desc": "The originating Figma style guide, as a PDF.",
              "href": "design-system/MHT Style Guide v1.pdf",
              "kind": "pdf",
              "status": "live"
            }
          ]
        }
      ]
    },
    {
      "id": "product",
      "title": "Product",
      "icon": "map",
      "blurb": "What each surface is and how it behaves — the product knowledge behind the prototypes.",
      "groups": [
        {
          "title": "Surfaces",
          "items": [
            {
              "title": "Landing",
              "desc": "Splash Landing — six content modules and its deep-links.",
              "href": "domains/landing.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Library / Resources",
              "desc": "Topic pages, Topic Center, Article Show.",
              "href": "domains/library.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Community",
              "desc": "Posts, Q&A, Groups, Meet-Others and their detail screens.",
              "href": "domains/community.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Topic Hub",
              "desc": "Per-concern hub aggregating Q&A, conversations, groups, resources.",
              "href": "domains/topic-hub.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Advisors",
              "desc": "Medical Advisory Committee page.",
              "href": "domains/advisors.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Account",
              "desc": "Profile dropdown and its destination screens.",
              "href": "domains/account.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Onboarding",
              "desc": "Sign Up Start and Registration Step.",
              "href": "domains/onboarding.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        },
        {
          "title": "Architecture",
          "items": [
            {
              "title": "System & persona model",
              "desc": "The data-persona render model, screen types, responsive layout.",
              "href": "foundation/system.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        }
      ]
    },
    {
      "id": "decisions",
      "title": "Decisions",
      "icon": "clock",
      "blurb": "Why things are the way they are. Append-only: older entries record what was true at the time and are never rewritten.",
      "groups": [
        {
          "title": "Logs",
          "items": [
            {
              "title": "Decisions log",
              "desc": "Every design and build decision, interleaved in time order.",
              "href": "DECISIONS.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Restructure plan",
              "desc": "The six-phase plan this home is part of, with findings and status.",
              "href": "RESTRUCTURE-PLAN.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Manual",
              "desc": "Index of the spec docs.",
              "href": "MANUAL.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        }
      ]
    }
  ]
};
