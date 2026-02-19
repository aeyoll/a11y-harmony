/**
 * A11y Harmony — Contact Form JS
 *
 * Enhances Contact Form 7 accessibility at runtime:
 *   - Adds role="alert" + aria-live="assertive" to error output
 *   - Sets aria-invalid="true" on invalid fields
 *   - Links error messages to their fields via aria-describedby
 *   - Cleans up ARIA attributes after successful submission
 *   - Handles spam detection responses
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------------------ */
    /* Validation error                                                      */
    /* ------------------------------------------------------------------ */
    document.addEventListener('wpcf7invalid', function (event) {
      var form = event.target;
      var responseOutput = form.querySelector('.wpcf7-response-output');

      if (responseOutput) {
        responseOutput.setAttribute('role', 'alert');
        responseOutput.setAttribute('aria-live', 'assertive');
        responseOutput.setAttribute('tabindex', '-1');
        responseOutput.focus();
      }

      /* Add aria-invalid + aria-describedby to each invalid field */
      var invalidFields = form.querySelectorAll('.wpcf7-not-valid');
      invalidFields.forEach(function (field) {
        field.setAttribute('aria-invalid', 'true');

        var errorMessage = field.parentElement
          ? field.parentElement.querySelector('.wpcf7-not-valid-tip')
          : null;

        if (errorMessage && field.id) {
          var errorId = 'a11y-error-' + field.id;
          errorMessage.id = errorId;
          field.setAttribute('aria-describedby', errorId);
        }
      });
    }, false);

    /* ------------------------------------------------------------------ */
    /* Successful submission — clean up                                      */
    /* ------------------------------------------------------------------ */
    document.addEventListener('wpcf7mailsent', function (event) {
      var form = event.target;
      var invalidFields = form.querySelectorAll('[aria-invalid="true"]');

      invalidFields.forEach(function (field) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      });
    }, false);

    /* ------------------------------------------------------------------ */
    /* Spam detection                                                        */
    /* ------------------------------------------------------------------ */
    document.addEventListener('wpcf7spam', function (event) {
      var form = event.target;
      var responseOutput = form.querySelector('.wpcf7-response-output');

      if (responseOutput) {
        responseOutput.setAttribute('role', 'alert');
        responseOutput.setAttribute('aria-live', 'assertive');
      }
    }, false);
  });
})();
