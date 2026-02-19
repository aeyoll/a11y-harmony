<?php
/**
 * Plugin Name: A11y Harmony
 * Plugin URI:  https://example.com/a11y-harmony
 * Description: Automatically patches common accessibility issues (RGAA) on cookie banners, contact forms, and carousels — with zero configuration required.
 * Version:     1.0.0
 * Author:      Jean-Philippe Bidegain
 * License:     GPL-2.0+
 * Text Domain: a11y-harmony
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'A11Y_HARMONY_VERSION', '1.0.0' );
define( 'A11Y_HARMONY_DIR', plugin_dir_path( __FILE__ ) );
define( 'A11Y_HARMONY_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load plugin text domain for translations.
 * Default language is English; load .mo files from languages/ when available.
 */
function a11y_harmony_load_textdomain() {
    load_plugin_textdomain(
        'a11y-harmony',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'init', 'a11y_harmony_load_textdomain', 0 );

// Load modules
require_once A11Y_HARMONY_DIR . 'includes/cookie-banner.php';
require_once A11Y_HARMONY_DIR . 'includes/contact-form.php';
require_once A11Y_HARMONY_DIR . 'includes/carousel.php';
require_once A11Y_HARMONY_DIR . 'includes/assets.php';
