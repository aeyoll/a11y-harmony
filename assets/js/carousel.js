/**
 * A11y Harmony — Carousel JS
 *
 * Fixes RGAA issues on Swiper.js carousels at runtime:
 *   - RGAA 6.1 : Remove misleading aria-label="X / Y" from slides
 *   - RGAA 7.1 : Navigation buttons keyboard (Enter / Space) support
 *   - RGAA 9.3 : Add role="list" / role="listitem" to wrapper & slides
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Core fix function                                                     */
  /* ------------------------------------------------------------------ */
  function fixCarouselAccessibility() {

    /* --- Remove Swiper's auto-generated, non-descriptive aria-label --- */
    var slides = document.querySelectorAll(
      '.swiper-slide[role="group"][aria-label]'
    );
    slides.forEach(function (slide) {
      slide.removeAttribute('role');
      slide.removeAttribute('aria-label');
    });

    /* --- Navigation buttons: keyboard support (RGAA 7.1) --- */
    var navButtons = document.querySelectorAll(
      '.swiper-button-prev, .swiper-button-next'
    );
    navButtons.forEach(function (button) {
      if (!button.hasAttribute('data-a11y-fixed')) {
        button.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
        button.setAttribute('data-a11y-fixed', 'true');
      }
    });

    /* --- List structure on slide wrappers (RGAA 9.3) --- */
    var wrappers = document.querySelectorAll('.swiper-wrapper');
    wrappers.forEach(function (wrapper) {
      if (!wrapper.hasAttribute('role')) {
        wrapper.setAttribute('role', 'list');
      }

      var slideItems = wrapper.querySelectorAll('.swiper-slide');
      slideItems.forEach(function (slide) {
        if (!slide.hasAttribute('role')) {
          slide.setAttribute('role', 'listitem');
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                  */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    fixCarouselAccessibility();

    /* Re-run when Swiper initialises or updates */
    var observer = new MutationObserver(function (mutations) {
      var shouldFix = false;

      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList' || m.type === 'attributes') {
          var target = m.target;
          if (
            target.classList &&
            (target.classList.contains('swiper') ||
              target.classList.contains('swiper-wrapper') ||
              target.classList.contains('swiper-slide'))
          ) {
            shouldFix = true;
            break;
          }
        }
      }

      if (shouldFix) {
        setTimeout(fixCarouselAccessibility, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'aria-label', 'role'],
    });
  });
})();
