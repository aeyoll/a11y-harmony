<?php
/**
 * A11y Harmony — Asset registration
 * Enqueues all CSS and JS files for the three modules.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue front-end stylesheets.
 */
function a11y_harmony_enqueue_styles() {
    wp_enqueue_style(
        'a11y-harmony-cookie-banner',
        A11Y_HARMONY_URL . 'assets/css/cookie-banner.css',
        [],
        A11Y_HARMONY_VERSION
    );

    wp_enqueue_style(
        'a11y-harmony-contact-form',
        A11Y_HARMONY_URL . 'assets/css/contact-form.css',
        [],
        A11Y_HARMONY_VERSION
    );

    wp_enqueue_style(
        'a11y-harmony-carousel',
        A11Y_HARMONY_URL . 'assets/css/carousel.css',
        [],
        A11Y_HARMONY_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'a11y_harmony_enqueue_styles' );

/**
 * Enqueue front-end scripts.
 */
function a11y_harmony_enqueue_scripts() {
    wp_enqueue_script(
        'a11y-harmony-cookie-banner',
        A11Y_HARMONY_URL . 'assets/js/cookie-banner.js',
        [],
        A11Y_HARMONY_VERSION,
        true
    );

    wp_localize_script(
        'a11y-harmony-cookie-banner',
        'a11yHarmonyCookieBanner',
        [
            'cookiePolicyLabel' => __( 'Cookie policy', 'a11y-harmony' ),
            'privacyPolicyLabel' => __( 'Privacy policy', 'a11y-harmony' ),
        ]
    );

    wp_enqueue_script(
        'a11y-harmony-contact-form',
        A11Y_HARMONY_URL . 'assets/js/contact-form.js',
        [],
        A11Y_HARMONY_VERSION,
        true
    );

    wp_enqueue_script(
        'a11y-harmony-carousel',
        A11Y_HARMONY_URL . 'assets/js/carousel.js',
        [],
        A11Y_HARMONY_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'a11y_harmony_enqueue_scripts' );
