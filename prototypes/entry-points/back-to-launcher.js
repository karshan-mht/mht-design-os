/* Shared "back to the launcher" hotspot for the entry-point mocks.
   =============================================================================
   These three pages mock external sites (Google, Facebook, Gmail) and
   deliberately do NOT load main.js, so they cannot get the hotspot the way the
   persona pages do. They each carried their own hand-copied <a> with the same
   inline SVG, which meant a change to the control — the class rename during the
   Home->launcher rename, for instance — had to be made in three places and
   silently missed one.

   One copy now. Styling still comes from prototypes/navigation/main.css, which
   these pages already load. */
(function () {
  var href = document.currentScript && document.currentScript.dataset.href;
  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<a class="launcher-hotspot" href="' + (href || "../../index.html") + '" ' +
        'aria-label="Back to the launcher" title="Back to the launcher">' +
        '<span class="icon">' + '<svg style="display: block;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="11.5" y="2" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="2" y="11.5" width="6.5" height="6.5" rx="1.6" fill="currentColor"/><rect x="11.5" y="11.5" width="6.5" height="6.5" rx="1.6" fill="currentColor"/></svg>' + "</span></a>"
    );
  });
})();
