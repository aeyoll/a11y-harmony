# A11y Harmony

**Automatically patches common RGAA accessibility issues on cookie banners, contact forms, and carousels — with zero configuration.**

## Features

| Module | Fixes |
|---|---|
| **Cookie Banner** | Empty links (RGAA 6.1), close-button keyboard nav (RGAA 7.1), invalid `size` on checkboxes (RGAA 8.2), heading structure (RGAA 9.1), link-group list structure (RGAA 9.3) |
| **Contact Form** | `aria-label` on `<form>`, `aria-required` on required fields, live error announcements, `aria-invalid` + `aria-describedby` on invalid fields |
| **Carousel** | Remove misleading `aria-label="X / Y"` from slides (RGAA 6.1), keyboard nav for buttons (RGAA 7.1), `role="list"` / `role="listitem"` (RGAA 9.3) |

## File Structure

```
a11y-harmony/
├── a11y-harmony.php          ← Plugin entry point
├── includes/
│   ├── assets.php            ← CSS & JS enqueueing
│   ├── cookie-banner.php     ← Server-side cookie banner fixes
│   ├── contact-form.php      ← Server-side CF7 fixes
│   └── carousel.php          ← (reserved for server-side hooks)
└── assets/
    ├── css/
    │   ├── cookie-banner.css
    │   ├── contact-form.css
    │   └── carousel.css
    └── js/
        ├── cookie-banner.js
        ├── contact-form.js
        └── carousel.js
```

## Installation

1. Copy the `a11y-harmony/` folder into `wp-content/plugins/`.
2. Activate **A11y Harmony** from the WordPress plugin admin screen.
3. No settings needed — fixes are applied automatically on the front end.

## Compatibility

- **Cookie banners** — Complianz (cmplz)
- **Contact forms** — Contact Form 7 (wpcf7)
- **Carousels** — Swiper.js

The plugin is safe to install even when those plugins/libraries are absent; it detects their presence at runtime before applying any changes.

## License

GPL-2.0+
