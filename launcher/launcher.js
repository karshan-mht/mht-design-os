/* =============================================================================
   Launcher
   =============================================================================
   Renders from launcher/manifest.js. Sections are either a card grid
   (kind:'links') or a built-in view rendered inline — color, type and icons
   read the generated manifests, so this file duplicates nothing about the
   system. Everything stays in this tab: prototypes navigate here, and their
   hidden top-left hotspot brings you back.

   Two bits of state persist in localStorage, both wrapped in try/catch so a
   private window cannot stop the page rendering: the collapsed rail and the
   color mode.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.LAUNCHER_MANIFEST;
  if (!M) {
    document.body.innerHTML = '<p style="padding:2rem;font:15px system-ui">Could not load launcher/manifest.js.</p>';
    return;
  }

  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var P = {
    layers:  'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
    palette: 'M12 22a10 10 0 1 1 0-20c5.5 0 10 3.8 10 8.5 0 2.5-2 4.5-4.5 4.5H15a2 2 0 0 0-1.5 3.3A2 2 0 0 1 12 22ZM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
    type:    'M4 6V4h16v2M9 20h6M12 4v16',
    shapes:  'M12 2 3 20h18L12 2ZM17.5 13.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z',
    /* Sidebar glyph: a panel with one rail filled. Says "sidebar", where a
       chevron says "back". */
    panel:   'M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13ZM9 3v18',
    sun:     'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
    moon:    'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z'
  };
  function svg(name, filled) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + P[name] + '"' + (filled ? ' fill="currentColor" stroke="none"' : '') + '/></svg>';
  }

  /* ---- color mode -------------------------------------------------------
     Default follows the OS. The attribute lives on <html>, which is what the
     dark block in tokens.css keys off. */
  var root = document.documentElement;
  function applyMode(mode) {
    var resolved = mode === 'auto'
      ? (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    root.setAttribute('data-mode', resolved);
    root.setAttribute('data-mode-pref', mode);
    set('launcher.mode', mode);
    var box = document.getElementById('modes');
    if (box) [].forEach.call(box.children, function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setMode === mode));
    });
    // Color and type resolve their values with getComputedStyle at render
    // time, so a mode change leaves them showing the previous mode's values.
    // Re-render — but on the NEXT frame: called synchronously from the click
    // handler, getComputedStyle still returns the pre-change values because the
    // style recalculation has not happened yet.
    if (currentSection) requestAnimationFrame(function () { render(currentSection); });
  }

  var modes = document.getElementById('modes');
  modes.innerHTML = [
    ['light', 'Light', svg('sun')],
    ['dark', 'Dark', svg('moon')]
  ].map(function (m) {
    return '<button class="modes__btn" type="button" data-set-mode="' + m[0] +
      '" aria-pressed="false" title="' + m[1] + '">' + m[2] + '<span>' + m[1] + '</span></button>';
  }).join('');
  // data-set-mode, not data-mode: <html> carries data-mode, so a plain
  // [data-mode] selector matches the document element first.
  modes.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-mode]');
    if (b) applyMode(b.dataset.setMode);
  });
  if (window.matchMedia) {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (root.getAttribute('data-mode-pref') === 'auto') applyMode('auto');
    });
  }

  /* ---- rail --------------------------------------------------------------- */
  var nav = document.getElementById('rail-nav');
  nav.innerHTML = M.sections.map(function (s) {
    return '<button class="rail__link" type="button" data-section="' + s.id + '" aria-current="false" ' +
      'title="' + esc(s.title) + '"><span class="rail__ico">' + svg(s.icon) + '</span>' +
      '<span class="rail__label">' + esc(s.title) + '</span></button>';
  }).join('');

  var main = document.getElementById('main-inner');
  var currentSection = null;

  /* ---- views -------------------------------------------------------------- */

  function viewLinks(sec) {
    return sec.groups.map(function (g) {
      return '<section class="group">' +
        '<div class="group__head"><h2 class="group__title">' + esc(g.title) + '</h2><span class="group__rule"></span></div>' +
        (g.note ? '<p class="group__note">' + esc(g.note) + '</p>' : '') +
        '<div class="cards">' + g.items.map(function (i) {
          var inner = '<h3 class="card__title">' + esc(i.title) + '</h3>' +
            '<p class="card__desc">' + esc(i.desc) + '</p>' +
            (i.status === 'planned' ? '<span class="card__tag">Planned</span>' : '');
          return (!i.href || i.status === 'planned')
            ? '<div class="card card--planned">' + inner + '</div>'
            : '<a class="card" href="' + esc(i.href) + '">' + inner + '</a>';
        }).join('') + '</div></section>';
    }).join('');
  }

  // Color and type both read system/tokens/manifest.js, resolving live values
  // so what is shown is what the browser computes under the current mode.
  function live(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }

  function viewColor() {
    var tokens = (window.MHT_TOKENS || []).filter(function (t) {
      var v = live(t.name) || t.value;
      return /^(#|rgb|color\(|hsl)/.test(v);
    });
    if (!tokens.length) return '<p class="empty">Token manifest not loaded.</p>';
    var groups = {};
    tokens.forEach(function (t) { (groups[t.group] = groups[t.group] || []).push(t); });
    return Object.keys(groups).map(function (g) {
      return '<section class="group">' +
        '<div class="group__head"><h2 class="group__title">' + esc(g) + '</h2><span class="group__rule"></span></div>' +
        '<div class="swatches">' + groups[g].map(function (t) {
          var v = live(t.name) || t.value;
          return '<div class="sw"><div class="sw__chip" style="background:' + esc(v) + '"></div>' +
            '<div class="sw__meta"><div class="sw__name">' + esc(t.name) + '</div>' +
            '<div class="sw__val">' + esc(v) + '</div></div></div>';
        }).join('') + '</div></section>';
    }).join('');
  }

  var TYPE_SPECS = [
    ['Display', 'var(--font-display)', [
      ['Hero', '--display-hero-size', '--display-hero-lh'],
      ['Section', '--display-section-size', '--display-section-lh'],
      ['Title', '--display-title-size', '--display-title-lh'],
      ['Sub-heading', '--display-subhead-size', '--display-subhead-lh']
    ]],
    ['Body and UI', 'var(--font-body)', [
      ['Quote', '--quote-size', '--quote-lh']
    ]]
  ];
  var BODY_SCALE = [
    ['Headline', 20, 26, 600], ['Body Large', 18, 24, 400],
    ['Body Small', 16, 22, 400], ['Caption', 14, 20, 400], ['Note', 12, 18, 400]
  ];

  function viewType() {
    var out = TYPE_SPECS.map(function (block) {
      var rows = block[2].map(function (r) {
        var size = live(r[1]), lh = live(r[2]);
        if (!size) return '';
        return '<div class="type-row"><p class="type-row__spec" style="font-family:' + block[1] +
          ';font-size:' + size + ';line-height:' + lh + ';letter-spacing:var(--display-tracking)">' +
          esc(r[0]) + '</p><div class="type-row__meta">' + esc(r[1]) + ' &middot; ' + size + ' / ' + lh + '</div></div>';
      }).join('');
      return '<section class="group"><div class="group__head"><h2 class="group__title">' + esc(block[0]) +
        '</h2><span class="group__rule"></span></div>' + rows + '</section>';
    }).join('');

    out += '<section class="group"><div class="group__head"><h2 class="group__title">Lato scale</h2>' +
      '<span class="group__rule"></span></div>' +
      '<p class="group__note">Fixed values from system/foundation/design.md, not tokens — the body scale is applied per component rather than through a variable.</p>' +
      BODY_SCALE.map(function (r) {
        return '<div class="type-row"><p class="type-row__spec" style="font-family:var(--font-body);font-size:' +
          r[1] + 'px;line-height:' + r[2] + 'px;font-weight:' + r[3] + ';letter-spacing:-0.25px">' + esc(r[0]) +
          '</p><div class="type-row__meta">' + r[1] + 'px / ' + r[2] + 'px &middot; weight ' + r[3] + '</div></div>';
      }).join('') + '</section>';
    return out;
  }

  /* ---- icons -------------------------------------------------------------
     The editorial registry is ~160KB and most visits never open this section,
     so it is injected on first use rather than loaded up front. */
  var iconState = { set: 'editorial', size: 40, q: '' };
  var editorialLoading = false;

  function ensureEditorial(done) {
    if (window.MHT_ICONS && window.MHT_ICONS.editorial) return done();
    if (editorialLoading) return;
    editorialLoading = true;
    var s = document.createElement('script');
    s.src = 'system/icons/registry-editorial.js';
    s.onload = function () { editorialLoading = false; done(); };
    s.onerror = function () { editorialLoading = false; done(); };
    document.head.appendChild(s);
  }

  function iconGrid() {
    var lib = (window.MHT_ICONS || {})[iconState.set] || {};
    var names = Object.keys(lib).filter(function (n) { return n.indexOf(iconState.q) > -1; });
    if (!names.length) return '<p class="empty">No icon matches &ldquo;' + esc(iconState.q) + '&rdquo;.</p>';
    return '<div class="icon-grid" style="--icon-size:' + iconState.size + 'px">' + names.map(function (n) {
      return '<button class="ic" type="button" data-icon="' + esc(n) + '" title="Copy ' + esc(n) + '">' +
        '<span class="ic__art">' + lib[n] + '</span><span class="ic__name">' + esc(n) + '</span></button>';
    }).join('') + '</div>';
  }

  function viewIcons() {
    var counts = window.MHT_ICONS || {};
    return '<div class="icon-controls">' +
      '<div class="seg" id="icon-set">' +
        ['editorial', 'ui'].map(function (k) {
          var n = counts[k] ? Object.keys(counts[k]).length : '';
          return '<button class="seg__btn" type="button" data-set="' + k + '" aria-pressed="' +
            (iconState.set === k) + '">' + (k === 'ui' ? 'UI glyphs' : 'Editorial') +
            (n ? ' (' + n + ')' : '') + '</button>';
        }).join('') +
      '</div>' +
      '<div class="seg" id="icon-size">' +
        [24, 40, 64].map(function (s) {
          return '<button class="seg__btn" type="button" data-size="' + s + '" aria-pressed="' +
            (iconState.size === s) + '">' + s + '</button>';
        }).join('') +
      '</div>' +
      '<input class="icon-search" id="icon-q" type="search" placeholder="Filter by name" value="' +
        esc(iconState.q) + '" aria-label="Filter icons by name" />' +
      '</div><div id="icon-host">' + iconGrid() + '</div>';
  }

  function bindIcons() {
    var host = document.getElementById('icon-host');
    if (!host) return;
    function redraw() { host.innerHTML = iconGrid(); }

    document.getElementById('icon-set').addEventListener('click', function (e) {
      var b = e.target.closest('[data-set]'); if (!b) return;
      iconState.set = b.dataset.set;
      [].forEach.call(e.currentTarget.children, function (x) {
        x.setAttribute('aria-pressed', String(x.dataset.set === iconState.set));
      });
      if (iconState.set === 'editorial') ensureEditorial(redraw); else redraw();
    });
    document.getElementById('icon-size').addEventListener('click', function (e) {
      var b = e.target.closest('[data-size]'); if (!b) return;
      iconState.size = +b.dataset.size;
      [].forEach.call(e.currentTarget.children, function (x) {
        x.setAttribute('aria-pressed', String(+x.dataset.size === iconState.size));
      });
      redraw();
    });
    document.getElementById('icon-q').addEventListener('input', function (e) {
      iconState.q = e.target.value.trim().toLowerCase();
      redraw();
    });
    host.addEventListener('click', function (e) {
      var b = e.target.closest('[data-icon]'); if (!b) return;
      var lib = (window.MHT_ICONS || {})[iconState.set] || {};
      var svgText = lib[b.dataset.icon] || '';
      if (navigator.clipboard) navigator.clipboard.writeText(svgText).catch(function () {});
      b.classList.add('is-copied');
      setTimeout(function () { b.classList.remove('is-copied'); }, 900);
    });
  }

  /* ---- render ------------------------------------------------------------- */
  function render(id) {
    var sec = M.sections.filter(function (s) { return s.id === id; })[0] || M.sections[0];
    currentSection = sec.id;

    function paint(body) {
      main.innerHTML =
        '<header class="hero"><h1 class="hero__title">' + esc(sec.title) + '</h1>' +
        '<p class="hero__blurb">' + esc(sec.blurb) + '</p></header>' + body;
      if (sec.kind === 'icons') bindIcons();
    }

    if (sec.kind === 'links') paint(viewLinks(sec));
    else if (sec.kind === 'color') paint(viewColor());
    else if (sec.kind === 'type') paint(viewType());
    else if (sec.kind === 'icons') {
      paint(viewIcons());
      ensureEditorial(function () { paint(viewIcons()); });
    }

    [].forEach.call(nav.children, function (b) {
      b.setAttribute('aria-current', String(b.dataset.section === sec.id));
    });
    if (location.hash.slice(1) !== sec.id) history.replaceState(null, '', '#' + sec.id);
    set('launcher.section', sec.id);
  }

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-section]');
    if (b) render(b.dataset.section);
  });
  nav.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var items = [].slice.call(nav.children);
    var i = items.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus();
  });

  var toggle = document.getElementById('rail-toggle');
  function setRail(state) {
    document.body.dataset.rail = state;
    toggle.setAttribute('aria-expanded', String(state !== 'collapsed'));
    toggle.setAttribute('aria-label', state === 'collapsed' ? 'Expand sidebar' : 'Collapse sidebar');
    set('launcher.rail', state);
  }
  toggle.addEventListener('click', function () {
    setRail(document.body.dataset.rail === 'collapsed' ? 'expanded' : 'collapsed');
  });

  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1);
    if (id) render(id);
  });

  applyMode(get('launcher.mode', 'auto'));
  setRail(get('launcher.rail', 'expanded'));
  render(location.hash.slice(1) || get('launcher.section', 'prototypes'));
})();
