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
     Illustrations — from system/icons/illustrations/ via the generated
     registry (system/icons/registry-illustrations.js, loaded before this
     file). Monoline, ~3px currentColor strokes, so CSS owns the tint and the
     ghosting opacity. Draw any new one as line art in that folder, or it will
     look pasted in from another product.
     ------------------------------------------------------------------------ */
  var ILLUSTRATIONS = (window.MHT_ICONS && window.MHT_ICONS.illustrations) || {};
  function art(name) {
    return (ILLUSTRATIONS[name] || "").replace("<svg ", '<svg aria-hidden="true" ');
  }


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
      type: "split", art: "activity-timeline", screen: "com-activities",
      eyebrow: "Activity Feed",
      title: "What people are talking about",
      desc: "See the latest community updates — feelings, milestones, and conversations from women experiencing menopause."
    },
    qa: {
      type: "ghost", art: "chat-question", screen: "com-questions",
      eyebrow: "Q&A",
      title: "Ask, answer, and be heard",
      desc: "Ask a question. Contribute a reply that helps a fellow member. Browse featured topics curated by our community team."
    },
    groups: {
      type: "ghost", art: "groups-join", screen: "com-groups",
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
      card.appendChild(el("span", "card__panel", art(mod.art)));
    } else if (ILLUSTRATIONS[mod.art]) {
      card.appendChild(el("span", "card__art", art(mod.art)));
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
