/* =============================================================================
   Launcher — renders entirely from launcher/manifest.js
   =============================================================================
   No framework, no build step. Adding a prototype or a doc is one entry in the
   manifest; nothing in this file should need editing to add content.

   Two bits of state persist in localStorage: the collapsed rail and the active
   theme. Both are wrapped in try/catch — a private window or blocked site data
   must not stop the page rendering.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.LAUNCHER_MANIFEST;
  if (!M) { document.body.innerHTML = '<p style="padding:2rem;font:16px system-ui">Could not load launcher/manifest.js.</p>'; return; }

  // --- storage (never allowed to throw) -------------------------------------
  function get(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  // --- icons ----------------------------------------------------------------
  var P = {
    layers: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    box: 'M21 8v8a2 2 0 0 1-1 1.7l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.7l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8ZM3.3 7 12 12l8.7-5M12 22V12',
    shapes: 'M12 2 3 20h18L12 2ZM17.5 13.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z',
    pen: 'M12 19l7-7 3 3-7 7-3-3ZM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5ZM2 2l7.586 7.586M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    map: 'M9 20 3 17V4l6 3m0 13 6-3m-6 3V7m6 10 6 3V7l-6-3m0 13V4m0 0L9 7',
    clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2',
    chevron: 'm15 18-6-6 6-6',
    ext: 'M7 17 17 7M7 7h10v10',
    doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6',
    code: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
    pdf: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M9 15h6'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + P[name] + '"/></svg>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // --- build the rail -------------------------------------------------------
  function countLive(sec) {
    var n = 0;
    sec.groups.forEach(function (g) { g.items.forEach(function (i) { if (i.status !== 'planned') n++; }); });
    return n;
  }

  var nav = document.getElementById('rail-nav');
  nav.innerHTML = M.sections.map(function (s) {
    return '<button class="rail__link" type="button" role="tab" data-section="' + s.id + '" ' +
      'aria-current="false" title="' + esc(s.title) + '">' +
      '<span class="rail__ico">' + svg(s.icon) + '</span>' +
      '<span class="rail__label">' + esc(s.title) + '</span>' +
      '<span class="rail__count">' + countLive(s) + '</span>' +
      '</button>';
  }).join('');

  // --- render a section -----------------------------------------------------
  var main = document.getElementById('main-inner');

  function cardHTML(item) {
    var kindIcon = { doc: 'doc', code: 'code', pdf: 'pdf' }[item.kind];
    var tags = '<span class="tag tag--' + item.status + '">' + item.status + '</span>' +
      (kindIcon ? '<span class="tag">' + esc(item.kind) + '</span>' : '');

    var inner =
      '<div class="card__top">' +
        '<h3 class="card__title">' + esc(item.title) + '</h3>' +
        (item.href ? '<span class="card__ext">' + svg('ext') + '</span>' : '') +
      '</div>' +
      '<p class="card__desc">' + esc(item.desc) + '</p>' +
      '<div class="card__tags">' + tags + '</div>';

    if (!item.href || item.status === 'planned') {
      return '<div class="card card--planned">' + inner + '</div>';
    }
    // Everything opens in its own tab so each prototype keeps a shareable URL.
    return '<a class="card" href="' + esc(item.href) + '" target="_blank" rel="noopener">' + inner + '</a>';
  }

  function render(id) {
    var sec = M.sections.filter(function (s) { return s.id === id; })[0] || M.sections[0];

    main.innerHTML =
      '<header class="hero">' +
        '<p class="hero__eyebrow">' + esc(M.title) + '</p>' +
        '<h1 class="hero__title">' + esc(sec.title) + '</h1>' +
        '<p class="hero__blurb">' + esc(sec.blurb) + '</p>' +
      '</header>' +
      sec.groups.map(function (g) {
        return '<section class="group">' +
          '<div class="group__head"><h2 class="group__title">' + esc(g.title) + '</h2><span class="group__rule"></span></div>' +
          (g.note ? '<p class="group__note">' + esc(g.note) + '</p>' : '') +
          '<div class="cards">' + g.items.map(cardHTML).join('') + '</div>' +
        '</section>';
      }).join('');

    Array.prototype.forEach.call(nav.children, function (b) {
      b.setAttribute('aria-current', String(b.dataset.section === sec.id));
    });

    if (location.hash.slice(1) !== sec.id) history.replaceState(null, '', '#' + sec.id);
    set('launcher.section', sec.id);
    main.focus({ preventScroll: true });
  }

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-section]');
    if (b) render(b.dataset.section);
  });

  // Arrow-key navigation across the rail, as a tablist should.
  nav.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    var items = Array.prototype.slice.call(nav.children);
    var i = items.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus();
  });

  // --- collapse -------------------------------------------------------------
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

  // --- boot -----------------------------------------------------------------
  setRail(get('launcher.rail', 'expanded'));
  render(location.hash.slice(1) || get('launcher.section', 'prototypes'));
})();
