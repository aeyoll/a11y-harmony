<?php
/**
 * A11y Harmony - Contact Form module
 *
 * Enhances Contact Form 7 accessibility:
 * - Adds aria-label to the <form> element
 * - Adds aria-required="true" to required fields
 * - Improves error-message handling for screen readers (via JS)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add aria-label to CF7 forms.
 *
 * @param  string $form CF7 form HTML.
 * @return string
 */
function a11y_harmony_cf7_form_label( $form ) {
    if ( strpos( $form, 'wpcf7' ) === false ) {
        return $form;
    }

    // Only add aria-label if not already present
    if ( strpos( $form, 'aria-label' ) === false ) {
        $form = str_replace(
            '<form',
            '<form aria-label="' . esc_attr__( 'Contact form', 'a11y-harmony' ) . '"',
            $form
        );
    }

    return $form;
}
add_filter( 'wpcf7_form_elements', 'a11y_harmony_cf7_form_label', 10, 1 );

/**
 * Add aria-required="true" to required CF7 fields.
 *
 * @param  string $form CF7 form HTML.
 * @return string
 */
function a11y_harmony_cf7_required_fields( $form ) {
    if ( strpos( $form, 'wpcf7' ) === false ) {
        return $form;
    }

    foreach ( [ 'input', 'textarea', 'select' ] as $tag ) {
        $form = preg_replace(
            '/<' . $tag . '([^>]*?)class="([^"]*?)wpcf7-validates-as-required([^"]*?)"([^>]*?)>/i',
            '<' . $tag . '$1class="$2wpcf7-validates-as-required$3"$4 aria-required="true">',
            $form
        );
    }

    return $form;
}
add_filter( 'wpcf7_form_elements', 'a11y_harmony_cf7_required_fields', 20, 1 );
