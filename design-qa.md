# Design QA

final result: passed

## Source

- Visual reference: `reference/madie-desktop.png`, `reference/madie-menu.png`, `reference/madie-mobile.png`.
- Prototype captures: `qa/desktop-viewport.png`, `qa/mobile-viewport.png`, `qa/desktop-menu.png`, `qa/mobile-menu.png`, `qa/admin-panel.png`.

## Checks

- Desktop viewport 1365x900: no horizontal overflow, hero CTA visible, images loaded, console clear.
- Mobile viewport 390x844: no horizontal overflow, hero CTA visible, images loaded, console clear.
- Menu: opens and closes, 5 navigation links visible, no overflow on desktop or mobile.
- FAQ: accordion opens the selected answer.
- Lead form: required contact field works, fallback local state appears when `/api/leads` is not available in Vite.
- CMS: floating admin button opens panel, local fallback login works with `admin` / `admin123`, editable block fields render.
- Typography: `Unbounded` display and `Onest` body are self-hosted via `@fontsource`; no Garamond or Manrope usage.
- Copy/style scan: no old project names, no temporary-visual wording, no em dash characters in source copy.

## Iteration Fixes

- Hero now has one primary CTA and no icon inside that first-screen CTA.
- Primary buttons were shifted from bright pink to deeper wine gradients with softer highlights.
- CMS floating lock button is hidden; admin still opens through `?admin=1` or `#admin`.
- Fullscreen menu is rendered outside the transformed header and covers the full viewport on desktop and mobile.
- Dark-mode token inversion was removed so masterclass, price and contact text stay readable.
- Headline wrapping no longer uses arbitrary letter breaks; desktop and mobile checks show no heading overflow.
- Calculator estimate was changed to a vertical layout so large totals stay inside the card.
- Header `TG` circle was removed.
- VK contact uses a real VK brand icon from `react-icons/fa` instead of the camera icon.

## Notes

- Generated images are art-directed placeholders in the approved direction. Real client work can be uploaded through the CMS media endpoint after server configuration.
- Production CMS requires MySQL config in `public/api/config.php` based on `config.example.php` and importing `public/api/schema.sql`.
