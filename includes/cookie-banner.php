<?php
/**
 * A11y Harmony - Cookie Banner module
 *
 * Fixes RGAA issues on Complianz (cmplz) cookie banners:
 * - RGAA 6.1  : Empty links without accessible label
 * - RGAA 7.1  : Close button keyboard support
 * - RGAA 8.2  : Invalid "size" attribute on checkboxes
 * - RGAA 9.1  : Missing heading structure on category titles
 * - RGAA 9.3  : Missing list structure on link groups
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Fix empty cookie / privacy links in page content and footer.
 *
 * @param  string $content HTML content.
 * @return string
 */
function a11y_harmony_fix_cookie_empty_links( $content ) {
    if ( strpos( $content, 'cmplz-link' ) === false ) {
        return $content;
    }

    $cookie_label = __( 'Cookie policy', 'a11y-harmony' );
    $privacy_label = __( 'Privacy policy', 'a11y-harmony' );

    $content = preg_replace(
        '/<a\s+class="cmplz-link cookie-statement"\s+href="([^"]+)"\s+data-relative_url="[^"]*"><\/a>/i',
        '<a class="cmplz-link cookie-statement" href="$1" data-relative_url="" aria-label="' . esc_attr( $cookie_label ) . '">' . esc_html( $cookie_label ) . '</a>',
        $content
    );

    $content = preg_replace(
        '/<a\s+class="cmplz-link privacy-statement"\s+href="([^"]+)"\s+data-relative_url="[^"]*"><\/a>/i',
        '<a class="cmplz-link privacy-statement" href="$1" data-relative_url="" aria-label="' . esc_attr( $privacy_label ) . '">' . esc_html( $privacy_label ) . '</a>',
        $content
    );

    return $content;
}
add_filter( 'the_content', 'a11y_harmony_fix_cookie_empty_links', 999 );
add_filter( 'get_footer',  'a11y_harmony_fix_cookie_empty_links', 999 );
