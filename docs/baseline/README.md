# Baseline (captured 2026-10-07, before the upgrade)

Source: live site https://www.traversebase.co.uk, Next 13.4.10, Lighthouse (mobile preset, headless Chrome).
Screenshots: `<route>-desktop.png` (1440px) and `<route>-mobile.png` (390px) for home, canopies, used-gear, contact, about, success, product (`closing-loops`). The cart drawer is not captured.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 58 | 88 | 77 | 91 | 7.7 s | 0.37 | 90 ms |
| Product | 76 | 84 | 77 | 82 | 6.7 s | 0 | 100 ms |

Local production build (`npm run build`), route sizes: `/` 131 kB first load, `/product/[slug]` 123 kB, `/studio` 784 kB, shared JS 78 kB.

Note: Sanity CORS does not allow `http://localhost:*`, so a local build renders with no products or banner. Add `http://localhost:3000` under CORS origins in the Sanity project settings to develop locally.
