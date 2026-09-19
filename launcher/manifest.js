window.LAUNCHER_MANIFEST =
{
  "_comment": "The launcher renders entirely from this file. Adding a prototype or a doc is one entry here - never a markup edit. Paths are relative to the repo root. kind: page|doc|pdf|code. status: live|draft|planned (planned renders disabled, so the roadmap is visible without dead links). This is a .js rather than a .json because Chrome blocks fetch() of local files over file://, and this repo must keep working from file:// with no server. It is still pure data - nothing here is executable.",
  "title": "MHT Design OS",
  "subtitle": "The design system, product knowledge, prototypes and decisions for ThisIsMenopause and the Legacy condition sites.",
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
              "href": "prototypes/navigation/visitor/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Subscriber",
              "desc": "Someone who's started signing up but hasn't finished.",
              "href": "prototypes/navigation/subscriber/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Logged In Member",
              "desc": "A member signed in to their account.",
              "href": "prototypes/navigation/logged-in-member/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Logged Out Member",
              "desc": "A member with an account who isn't currently signed in.",
              "href": "prototypes/navigation/logged-out-member/index.html",
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
              "href": "prototypes/entry-points/facebook-ad.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Search — Article",
              "desc": "A Google result opens straight into an Article Show.",
              "href": "prototypes/entry-points/google-search.html?highlight=article",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Search — Home",
              "desc": "A Google result opens on the Splash Landing home.",
              "href": "prototypes/entry-points/google-search.html?highlight=home",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Content Email — Article",
              "desc": "A Gmail message opens a member into an Article Show.",
              "href": "prototypes/entry-points/gmail-inbox.html",
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
              "href": "prototypes/navigation/visitor/index.html?flow=pulse",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Assistant — Greeting Nudge",
              "desc": "A first-time welcome on the Splash Landing.",
              "href": "prototypes/navigation/visitor/index.html?flow=assistant&reset=1",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Assistant — Question Nudge",
              "desc": "A suggested question on an Article.",
              "href": "prototypes/navigation/visitor/index.html?flow=assistant&start=article",
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
              "href": "prototypes/community/index.html",
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
      "blurb": "The universal layer every site and prototype shares — colour, type, space and motion — plus the hue family that distinguishes each site.",
      "groups": [
        {
          "title": "Conventions",
          "note": "How to read the rest of the system: who is authoritative about what, and the grammar used to document usage.",
          "items": [
            {
              "title": "Authority & preference",
              "desc": "Which source wins when artifacts disagree, and the Preferred / Allowed / Avoid / Prohibited grammar.",
              "href": "system/docs/index.html?doc=system/AUTHORITY.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        },
        {
          "title": "Sites",
          "note": "One universal palette, one hue family per site. Components are identical everywhere — only the hue differs. Adding a site is one file in system/tokens/themes/ and nothing else.",
          "items": [
            {
              "title": "Site & theme guide",
              "desc": "What each site is, what belongs in a theme, and how to add site 81.",
              "href": "system/docs/index.html?doc=system/tokens/themes/README.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "ThisIsMenopause",
              "desc": "Purple hue family. Production values, Figma-confirmed. The theme every prototype here is built against.",
              "href": "system/tokens/themes/menopause.css",
              "kind": "code",
              "status": "live"
            },
            {
              "title": "Legacy condition sites",
              "desc": "Blue hue family for the 80+ existing condition sites, migrating onto Menopause styling. Placeholder values — only the accent is sourced.",
              "href": "system/tokens/themes/legacy.css",
              "kind": "code",
              "status": "draft"
            },
            {
              "title": "Legacy site template",
              "desc": "A prototype shell running the Legacy hue end to end. Not built yet.",
              "href": null,
              "kind": "page",
              "status": "planned"
            }
          ]
        },
        {
          "title": "Tokens",
          "note": "One source of truth. Every page links tokens.css, then a theme, then its own styles.",
          "items": [
            {
              "title": "Token reference",
              "desc": "Every token, rendered from tokens.css itself with live computed values and a theme switcher.",
              "href": "system/tokens/reference.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "tokens.css",
              "desc": "The universal palette. Source of truth; names no hue.",
              "href": "system/tokens/tokens.css",
              "kind": "code",
              "status": "live"
            },
            {
              "title": "Design language",
              "desc": "Colour tokens, type scale, tinting, chrome asset provenance.",
              "href": "system/docs/index.html?doc=system/foundation/design.md",
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
              "href": "system/motion/ai-pulse-spec.html",
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
              "href": "system/docs/index.html?doc=system/patterns/navigation.md",
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
      "blurb": "The monolith made addressable. A generated index of every CSS block, plus hand-written contracts for the ones that earn one.",
      "groups": [
        {
          "title": "Index",
          "note": "Generated from main.css by evals/gen-component-index.js, so it cannot drift from the code.",
          "items": [
            {
              "title": "Component gallery",
              "desc": "Live specimens rendered from the real main.css, plus every block by tier. Theme switcher included.",
              "href": "system/components/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Component index (markdown)",
              "desc": "The same inventory as a file, for reading in an editor or a diff.",
              "href": "system/components/INDEX.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "How components work here",
              "desc": "What the tiers mean, how to add a contract, and the known gaps.",
              "href": "system/docs/index.html?doc=system/components/README.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Contract template",
              "desc": "The schema for a component contract, using the preference grammar.",
              "href": "system/docs/index.html?doc=system/components/_TEMPLATE.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        },
        {
          "title": "Contracts",
          "note": "Written by hand. Authoritative about intent, not about CSS values.",
          "items": [
            {
              "title": "Ask AI button",
              "desc": "The assistant entry point — states, pulse motion, reduced-motion and accessibility.",
              "href": "system/docs/index.html?doc=system/components/ai-btn.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "More contracts",
              "desc": "Buttons, the level-up pill and icon-btn are the next candidates.",
              "href": null,
              "kind": "doc",
              "status": "planned"
            }
          ]
        },
        {
          "title": "Figma parity",
          "items": [
            {
              "title": "parity.json",
              "desc": "Figma node to CSS block to contract, with what each mapping was verified against.",
              "href": "system/parity.json",
              "kind": "code",
              "status": "live"
            },
            {
              "title": "Code Connect",
              "desc": "Considered and not adopted — it needs a Node toolchain and CI, which ends the no-build-step property.",
              "href": null,
              "kind": "doc",
              "status": "planned"
            }
          ],
          "note": "Coverage is partial on purpose — an entry is added only when the node has been read from Figma. Guessed mappings look authoritative and are worse than none."
        }
      ]
    },
    {
      "id": "icons",
      "title": "Icons & Graphics",
      "icon": "shapes",
      "blurb": "Two icon systems with different jobs, plus the graphics. The SVG files are the source of truth; the sheet and the prototype both render from them.",
      "groups": [
        {
          "title": "Icons",
          "note": "Editorial icons are graphical and detailed, drawn for display sizes. UI glyphs are solid shapes for interface chrome at 16-44px. Deliberately not merged — below ~44px the line icons render as hairlines.",
          "items": [
            {
              "title": "Icon sheet",
              "desc": "All 140 icons, both sets, with theme/size/stroke controls and copy-for-design-tool.",
              "href": "system/icons/sheet.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Editorial icons",
              "desc": "112 line icons — symptoms, anatomy, care, support, living. Source files.",
              "href": "system/icons/editorial/",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "UI glyphs",
              "desc": "28 solid glyphs for nav, tabs, actions and hub markers. Source files.",
              "href": "system/icons/ui/",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Categories",
              "desc": "Authored grouping and display names. Coverage is checked — no icon can go uncategorised.",
              "href": "system/icons/categories.js",
              "kind": "code",
              "status": "live"
            }
          ]
        },
        {
          "title": "Graphics",
          "note": "Generated gallery — an asset that matches no grouping rule is reported rather than quietly filed under \"Other\".",
          "items": [
            {
              "title": "Graphics gallery",
              "desc": "All 53 assets by group, with transparency/light/dark backdrops.",
              "href": "system/assets/index.html",
              "kind": "page",
              "status": "live"
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
              "href": "system/docs/index.html?doc=system/brand/brand-source-of-truth.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Site design language",
              "desc": "thisismenopause.com — colour roles, components, layout rules.",
              "href": "system/docs/index.html?doc=system/brand/site-design-language.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "MHT Style Guide (Figma)",
              "desc": "The live style guide. The v1 PDF was removed as outdated — link to be added.",
              "href": null,
              "kind": "doc",
              "status": "planned"
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
              "href": "system/docs/index.html?doc=product/landing.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Library / Resources",
              "desc": "Topic pages, Topic Center, Article Show.",
              "href": "system/docs/index.html?doc=product/library.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Community",
              "desc": "Posts, Q&A, Groups, Meet-Others and their detail screens.",
              "href": "system/docs/index.html?doc=product/community.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Topic Hub",
              "desc": "Per-concern hub aggregating Q&A, conversations, groups, resources.",
              "href": "system/docs/index.html?doc=product/topic-hub.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Advisors",
              "desc": "Medical Advisory Committee page.",
              "href": "system/docs/index.html?doc=product/advisors.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Account",
              "desc": "Profile dropdown and its destination screens.",
              "href": "system/docs/index.html?doc=product/account.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Onboarding",
              "desc": "Sign Up Start and Registration Step.",
              "href": "system/docs/index.html?doc=product/onboarding.md",
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
              "href": "system/docs/index.html?doc=prototypes/navigation/ARCHITECTURE.md",
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
              "title": "Docs viewer",
              "desc": "Every markdown document in the repo, rendered and cross-linked, with a sidebar.",
              "href": "system/docs/index.html",
              "kind": "page",
              "status": "live"
            },
            {
              "title": "Decisions log",
              "desc": "Every design and build decision, interleaved in time order.",
              "href": "system/docs/index.html?doc=decisions/DECISIONS.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Restructure plan",
              "desc": "The six-phase plan this home is part of, with findings and status.",
              "href": "system/docs/index.html?doc=decisions/RESTRUCTURE-PLAN.md",
              "kind": "doc",
              "status": "live"
            },
            {
              "title": "Manual",
              "desc": "Index of the spec docs.",
              "href": "system/docs/index.html?doc=MANUAL.md",
              "kind": "doc",
              "status": "live"
            }
          ]
        }
      ]
    }
  ]
};
