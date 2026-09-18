/* ==========================================================================
   TIM — Community page (standalone)

   Data-driven, following the prototype's convention: a data array plus a render
   function, not hand-written markup. Reordering the page, retitling a module or
   changing a card's treatment is an edit to MODULES / LAYOUT below — never to
   the DOM code.

   Mirrors the Figma mixed-system frames on the "UX/UI – Version 1" page.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Illustrations — monoline, matching TIM's house set (assets/listicles_*.svg):
     fill="none", ~3px currentColor strokes, round caps/joins, 128x128 viewBox.

     Stroke is currentColor so CSS owns the tint and the ghosting opacity in one
     place rather than baking an alpha into nine drawings. Draw any new one as
     line art or it will look pasted in from another product.
     ------------------------------------------------------------------------ */
  var ART = {
    // Rail drawn as SEGMENTS BETWEEN the nodes — a continuous stroke reads
    // straight through each open circle and turns it into a "ø".
    timeline: '<path d="M26 21v6M26 41v18M26 73v18M26 105v6"/><circle cx="26" cy="34" r="7"/><circle cx="26" cy="66" r="7"/><circle cx="26" cy="98" r="7"/><path d="M46 30h56M46 42h34M46 62h50M46 74h30M46 94h44M46 106h26"/>',
    bubbles: '<path d="M26 24h44a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12H48l-14 13V70h-8a12 12 0 0 1-12-12V36a12 12 0 0 1 12-12Z"/><path d="M42 40a7 7 0 0 1 13 3c0 5-6 5-6 10"/><path d="M49 60.5h.01"/><path d="M74 66h28a10 10 0 0 1 10 10v18a10 10 0 0 1-10 10h-4v12l-13-12H74a10 10 0 0 1-10-10V76a10 10 0 0 1 10-10Z"/>',
    groups: '<circle cx="48" cy="50" r="26"/><circle cx="80" cy="50" r="26"/><circle cx="64" cy="80" r="26"/>',
    stories: '<path d="M64 36c-10-8-26-11-40-9v56c14-2 30 1 40 9 10-8 26-11 40-9V27c-14-2-30 1-40 9Z"/><path d="M64 36v56"/><path d="M28 44c8-1 16 0 22 3M28 60c8-1 16 0 22 3M78 47c8-3 16-4 22-3M78 63c8-3 16-4 22-3"/>',
    meet: '<circle cx="44" cy="46" r="16"/><path d="M20 96a24 24 0 0 1 48 0"/><circle cx="90" cy="54" r="13"/><path d="M71 100a19 19 0 0 1 38 0"/>',
    team: '<circle cx="38" cy="42" r="13"/><circle cx="90" cy="42" r="13"/><circle cx="64" cy="92" r="13"/><path d="M51 42h26M44 54l13 25M84 54L71 79"/>',
    welcome: '<circle cx="52" cy="44" r="17"/><path d="M24 96a28 28 0 0 1 56 0"/><circle cx="98" cy="82" r="16"/><path d="M98 74v16M90 82h16"/>',
    leadership: '<circle cx="64" cy="52" r="28"/><path d="M64 36l3.8 10.8 11.4.3-9.1 6.9 3.3 10.9L64 58.4l-9.4 6.5 3.3-10.9-9.1-6.9 11.4-.3L64 36Z"/><path d="M46 75L38 108l17-9 9 11 9-11 17 9-8-33"/>',
    guidelines: '<path d="M64 18l38 14v32c0 23-16 38-38 46-22-8-38-23-38-46V32l38-14Z"/><path d="M64 84c-13-8-20-15-20-23 0-6 5-11 11-11 4 0 7 2 9 5 2-3 5-5 9-5 6 0 11 5 11 11 0 8-7 15-20 23Z"/>'
  };

  var PERSON_GLYPH = '<circle cx="12" cy="8.5" r="3.8"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>';
  var CHECK_GLYPH = '<circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.2 3.2L17 9"/>';

  function svg(inner, width) {
    return '<svg viewBox="0 0 ' + (width || 128) + ' ' + (width || 128) + '" fill="none" ' +
      'stroke="currentColor" stroke-width="' + (width === 24 ? 2.2 : 3) + '" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  /* ------------------------------------------------------------------------
     Modules — the nine from the Community Hub product brief.

     COPY PATTERN, taken from the Figma card template: the magenta uppercase
     eyebrow carries the FEATURE NAME and the serif headline is a DESCRIPTIVE
     editorial line — e.g. "POSTS" / "What people are talking about". Note this
     is the inverse of the early screenshot exploration.

     `type` picks the treatment:
       ghost  — line art ghosted in the corner (the default)
       split  — illustration gets its own panel; used where the drawing teaches
       photo  — full-bleed image + duotone; people-led modules only
     ------------------------------------------------------------------------ */
  var MODULES = {
    activity: {
      type: "split", art: "timeline", screen: "com-activities",
      eyebrow: "Activity Feed",
      title: "What people are talking about",
      desc: "See the latest community updates — feelings, milestones, and conversations from women experiencing menopause."
    },
    qa: {
      type: "ghost", art: "bubbles", screen: "com-questions",
      eyebrow: "Q&A",
      title: "Ask, answer, and be heard",
      desc: "Ask a question. Contribute a reply that helps a fellow member. Browse featured topics curated by our community team."
    },
    groups: {
      type: "ghost", art: "groups", screen: "com-groups",
      eyebrow: "Groups",
      title: "Find the circle that fits your journey",
      desc: "Join conversations on the topics that matter to you — from perimenopause and HRT to sleep, mood, and caring for someone else."
    },
    stories: {
      type: "photo", screen: "com-stories", photo: "",
      eyebrow: "Stories",
      title: "Real women, in their own words"
    },
    meet: {
      type: "photo", screen: "com-meet", photo: "",
      eyebrow: "Meet Others",
      title: "Discover women like you"
    },
    team: {
      type: "split", art: "team", screen: "com-team",
      eyebrow: "My Team",
      title: "The people you keep closest",
      desc: "Build your Team — the handful of members you want to follow closely and hear from first as your journey changes."
    },
    newMembers: {
      type: "ghost", art: "welcome", screen: "com-new-members",
      eyebrow: "New Members",
      title: "Say hello to this week's arrivals",
      desc: "Someone joined today looking for exactly what you already know. Welcome them — it's the fastest way to make this place feel like yours."
    },
    ambassadors: {
      type: "ghost", art: "leadership", screen: "com-ambassadors", feature: true,
      eyebrow: "Ambassadors & CEMs",
      title: "The women who look after this place",
      desc: "Meet the member ambassadors and Community Engagement Managers who champion, guide, and support the community every day.",
      // Counts are ALWAYS the literal "[TBD]" placeholder, never a fabricated
      // number — same rule as the rest of the prototype.
      people: [
        { name: "Patient Ambassadors", meta: "[TBD] ambassadors" },
        { name: "Community Engagement Managers", meta: "[TBD] CEMs" },
        { name: "Featured this month", meta: "[TBD] members" }
      ]
    },
    guidelines: {
      type: "ghost", art: "guidelines", screen: "com-values", feature: true,
      eyebrow: "Community Guidelines",
      title: "How we look after each other",
      desc: "The short version of what makes this a place people come back to — and how we keep it safe, private, and kind.",
      rules: [
        "Be kind — someone here is living it",
        "What's shared here stays here",
        "Share experience, not medical advice",
        "Flag anything that feels off"
      ]
    }
  };

  /* Page order. A "row" is a two-up group on desktop that stacks on mobile —
     used only for cards carrying something other than plain copy. */
  var LAYOUT = [
    { card: "activity" },
    { card: "qa" },
    { card: "groups" },
    { row: ["stories", "meet"] },
    { card: "team" },
    { card: "newMembers" },
    { row: ["ambassadors", "guidelines"] }
  ];

  var HEADER = {
    title: "Community",
    sub: "Everything happening in your community — and everyone in it."
  };

  /* ---------------------------------------------------------------------- */

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function copyBlock(mod) {
    var copy = el("span", "card__copy");
    copy.appendChild(el("span", "card__eyebrow", mod.eyebrow));
    copy.appendChild(el("span", "card__title", mod.title));
    if (mod.desc) copy.appendChild(el("span", "card__desc", mod.desc));

    if (mod.people) {
      var people = el("span", "preview");
      mod.people.forEach(function (p) {
        var row = el("span", "person");
        row.appendChild(el("span", "person__avatar", svg(PERSON_GLYPH, 24)));
        var text = el("span", "person__text");
        text.appendChild(el("span", "person__name", p.name));
        text.appendChild(el("span", "person__meta", p.meta));
        row.appendChild(text);
        people.appendChild(row);
      });
      copy.appendChild(people);
    }

    if (mod.rules) {
      var rules = el("span", "preview");
      mod.rules.forEach(function (r) {
        var row = el("span", "rule");
        row.appendChild(el("span", "rule__icon", svg(CHECK_GLYPH, 24)));
        row.appendChild(el("span", "rule__text", r));
        rules.appendChild(row);
      });
      copy.appendChild(rules);
    }
    return copy;
  }

  function buildCard(key) {
    var mod = MODULES[key];
    var card = document.createElement("button");
    card.type = "button";
    card.className = "card card--" + mod.type + (mod.feature ? " card--feature" : "");
    card.dataset.screen = mod.screen;
    card.dataset.module = key;

    if (mod.type === "photo") {
      // Layers, bottom to top: photo, duotone, scrim, copy.
      if (mod.photo) card.style.setProperty("--photo", "url('" + mod.photo + "')");
      card.appendChild(el("span", "card__photo"));
      card.appendChild(el("span", "card__duotone"));
      card.appendChild(el("span", "card__scrim"));
    } else if (mod.type === "split") {
      card.appendChild(el("span", "card__panel", svg(ART[mod.art])));
    } else if (ART[mod.art]) {
      card.appendChild(el("span", "card__art", svg(ART[mod.art])));
    }

    card.appendChild(copyBlock(mod));
    return card;
  }

  function render(root) {
    root.textContent = "";

    var header = el("div", "community__header");
    var h1 = el("h1", "community__title", HEADER.title);
    h1.id = "community-title";
    header.appendChild(h1);
    header.appendChild(el("p", "community__sub", HEADER.sub));
    root.appendChild(header);

    var list = el("div", "community__list");
    LAYOUT.forEach(function (item) {
      if (item.row) {
        var row = el("div", "row");
        item.row.forEach(function (key) { row.appendChild(buildCard(key)); });
        list.appendChild(row);
      } else {
        list.appendChild(buildCard(item.card));
      }
    });
    root.appendChild(list);
  }

  /* One delegated listener rather than nine. Swap the body of this for real
     navigation when the destination pages exist. */
  function wire(root) {
    root.addEventListener("click", function (event) {
      var card = event.target.closest(".card");
      if (!card || !root.contains(card)) return;
      root.dispatchEvent(new CustomEvent("community:navigate", {
        bubbles: true,
        detail: { module: card.dataset.module, screen: card.dataset.screen }
      }));
    });
  }

  function init() {
    var root = document.getElementById("community");
    if (!root) return;
    render(root);
    wire(root);
    // Exposed so photos can be set from the console or a host page:
    //   TIMCommunity.setPhoto('stories', 'photos/stories.jpg')
    window.TIMCommunity = {
      modules: MODULES,
      layout: LAYOUT,
      render: function () { render(root); },
      setPhoto: function (key, url) {
        if (!MODULES[key]) return;
        MODULES[key].photo = url;
        render(root);
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
