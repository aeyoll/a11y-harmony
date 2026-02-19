/**
 * A11y Harmony — Cookie Banner JS
 *
 * Fixes RGAA accessibility issues on cookie consent banners at runtime:
 *   - RGAA 7.1  : Close button keyboard (Enter / Space) support
 *   - RGAA 8.2  : Remove invalid "size" attribute from checkboxes
 *   - RGAA 9.1  : Add role="heading" to category and main titles
 *   - RGAA 9.3  : Wrap link groups in a <ul> list structure
 *   - RGAA 6.1  : Add text + aria-label to empty cookie/privacy links
 *   - Zero-size focusable elements are removed from the tab order
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Core fix function                                                     */
  /* ------------------------------------------------------------------ */
  function fixCookieBannerAccessibility() {
    var banner = document.querySelector('.cmplz-cookiebanner');
    if (!banner) return;

    /* --- Close button: keyboard support (RGAA 7.1) --- */
    var closeButton = banner.querySelector('.cmplz-close[role="button"]');
    if (closeButton && !closeButton.hasAttribute('data-a11y-fixed')) {
      closeButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
      closeButton.setAttribute('data-a11y-fixed', 'true');
    }

    /* --- Checkboxes: remove invalid size attribute (RGAA 8.2) --- */
    var checkboxes = banner.querySelectorAll(
      'input[type="checkbox"].cmplz-consent-checkbox[size]'
    );
    checkboxes.forEach(function (cb) {
      cb.removeAttribute('size');
    });

    /* --- Category titles: heading role (RGAA 9.1) --- */
    var categoryTitles = banner.querySelectorAll('.cmplz-category-title');
    categoryTitles.forEach(function (title) {
      if (title.tagName !== 'H3' && !title.hasAttribute('role')) {
        title.setAttribute('role', 'heading');
        title.setAttribute('aria-level', '3');
      }
    });

    /* --- Main dialog title: heading role (RGAA 9.1) --- */
    var mainTitle = banner.querySelector('.cmplz-title');
    if (mainTitle && mainTitle.tagName !== 'H2' && !mainTitle.hasAttribute('role')) {
      mainTitle.setAttribute('role', 'heading');
      mainTitle.setAttribute('aria-level', '2');
    }

    /* --- Link groups: wrap in <ul> list (RGAA 9.3) --- */
    var linksGroups = banner.querySelectorAll('.cmplz-links');
    linksGroups.forEach(function (group) {
      var links = group.querySelectorAll('a.cmplz-link');
      if (links.length > 1 && !group.querySelector('ul')) {
        var ul = document.createElement('ul');
        ul.className = 'cmplz-links-list';

        links.forEach(function (link) {
          var li = document.createElement('li');
          li.appendChild(link.cloneNode(true));
          ul.appendChild(li);
          link.remove();
        });

        group.appendChild(ul);
      }
    });

    /* --- Empty links: add text + aria-label (RGAA 6.1) --- */
    var cookieLabel = (typeof a11yHarmonyCookieBanner !== 'undefined' && a11yHarmonyCookieBanner.cookiePolicyLabel)
      ? a11yHarmonyCookieBanner.cookiePolicyLabel
      : 'Cookie policy';
    var privacyLabel = (typeof a11yHarmonyCookieBanner !== 'undefined' && a11yHarmonyCookieBanner.privacyPolicyLabel)
      ? a11yHarmonyCookieBanner.privacyPolicyLabel
      : 'Privacy policy';

    var emptyLinks = banner.querySelectorAll('a.cmplz-link:not([aria-label])');
    emptyLinks.forEach(function (link) {
      if (!link.textContent.trim() && !link.querySelector('img')) {
        var label = null;
        if (link.classList.contains('cookie-statement')) {
          label = cookieLabel;
        } else if (link.classList.contains('privacy-statement')) {
          label = privacyLabel;
        }

        if (label) {
          link.setAttribute('aria-label', label);
          var span = document.createElement('span');
          span.textContent = label;
          link.appendChild(span);
        }
      }
    });

    /* --- Zero-size focusable elements: remove from tab order --- */
    var focusable = banner.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    focusable.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (
        rect.width === 0 &&
        rect.height === 0 &&
        !el.textContent.trim() &&
        !el.querySelector('img, svg')
      ) {
        el.setAttribute('tabindex', '-1');
        el.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                  */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    fixCookieBannerAccessibility();

    /* Re-run when banner becomes visible via MutationObserver */
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList' || m.type === 'attributes') {
          var banner = document.querySelector('.cmplz-cookiebanner');
          if (banner && banner.classList.contains('cmplz-show')) {
            fixCookieBannerAccessibility();
            break;
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  });
})();
