window.LAUNCHER_MANIFEST =
{
  "_comment": "The launcher renders from this file. Section and group headings are titles only — no blurbs or notes. Sections are either kind:'links' (a card grid, like Prototypes) or a built-in view rendered inline by launcher.js — color, type and icons all read the generated manifests, so nothing here duplicates the system. Adding a prototype is one entry in the Prototypes groups. This is a .js rather than a .json because Chrome blocks fetch() of local files over file://.",
  "title": "Design OS",
  "sections": [
    {
      "id": "prototypes",
      "title": "Prototypes",
      "icon": "layers",
      "kind": "links",
      "groups": [
        {
          "title": "User Types",
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
        }
      ]
    },
    {
      "id": "color",
      "title": "Color",
      "icon": "palette",
      "kind": "color"
    },
    {
      "id": "type",
      "title": "Type",
      "icon": "type",
      "kind": "type"
    },
    {
      "id": "icons",
      "title": "Icons",
      "icon": "shapes",
      "kind": "icons"
    }
  ]
};
