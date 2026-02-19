<?php
/**
 * A11y Harmony — Carousel module
 *
 * Fixes RGAA issues on Swiper.js carousels (via JS):
 * - RGAA 6.1 : aria-label on slide links must include visible text
 * - RGAA 7.1 : Navigation buttons keyboard support
 * - RGAA 9.3 : Proper list / listitem roles on slide wrapper
 *
 * All fixes are applied client-side (assets/js/carousel.js).
 * This file is reserved for any future server-side carousel hooks.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
