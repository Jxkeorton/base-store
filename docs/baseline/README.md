# Baseline (captured 2026-10-07, before the upgrade)

Source: live site https://www.traversebase.co.uk, Next 13.4.10, Lighthouse (mobile preset, headless Chrome).
Screenshots: `<route>-desktop.png` (1440px) and `<route>-mobile.png` (390px) for home, canopies, used-gear, contact, about, success, product (`closing-loops`). The cart drawer is not captured.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 58 | 88 | 77 | 91 | 7.7 s | 0.37 | 90 ms |
| Product | 76 | 84 | 77 | 82 | 6.7 s | 0 | 100 ms |

Local production build (`npm run build`), route sizes: `/` 131 kB first load, `/product/[slug]` 123 kB, `/studio` 784 kB, shared JS 78 kB.

Note: Sanity CORS does not allow `http://localhost:*`, so a local build renders with no products or banner. Add `http://localhost:3000` under CORS origins in the Sanity project settings to develop locally.

## After the upgrade (captured 2026-10-07, live site after Phase 4)

Same tool and settings (Lighthouse mobile preset, headless Chrome) against https://www.traversebase.co.uk.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | **90** (was 58) | **100** (was 88) | **100** (was 77) | **100** (was 91) | 3.4 s (was 7.7 s) | 0 (was 0.37) | 20 ms |
| Product | **91** (was 76) | **100** (was 84) | **100** (was 77) | **100** (was 82) | 3.5 s (was 6.7 s) | 0 | 20 ms |
| Canopies | 97 | 100 | 100 | 100 | 2.5 s | 0 | 0 ms |

`npm audit` (production dependencies): 19 findings, all inside the tooling that ships with `sanity@6.18.0`
(CLI, codegen and build helpers such as `globby`, `micromatch`, `js-yaml`, `smol-toml`). They have no fix upstream yet.
The suggested `npm audit fix --force` would downgrade Sanity, which is the wrong direction. Re-check after Sanity releases.
