# Megashift website

Public website for **Megashift**, deployed with Next.js on Vercel.

## Routes

- `/` — English product website
- `/<locale>` — localized product website
- `/support` and `/<locale>/support` — support and contact information
- `/privacy` — current English Privacy Policy
- `/terms` — current English Terms of Service
- `/welcome` — existing email-confirmation landing page
- `/reset-password` — existing Supabase password-reset page
- `/app-ads.txt` — AdMob app-ads.txt

The localization architecture deliberately does **not** use Next.js global i18n routing, so the existing auth, legal and app-ads URLs remain unchanged.

## Localization

Website locales are defined in `lib/i18n/locales.js`. Marketing/support copy lives in `content/locales/`. Product visuals are individual, native-resolution, lossless WebP files in `public/images/screenshots/<locale>/`: `calendar.webp`, `appointments.webp`, `reports.webp`, `pdf.webp` and `cloud.webp` (185 files across 37 website locales). The old three AVIF atlases have been removed.

`components/Phone.js` uses the same dark frame as `main`. `components/LocalizedVisual.js` selects an individual image through `lib/screenshots.mjs`. It uses `next/image` with `unoptimized` so these already lossless assets are delivered without a second lossy encoding pass. Only the two hero images are prioritized; the other images retain lazy loading. Unknown locales or failed localized loads fall back to the full-resolution English asset, not a low-resolution SVG/atlas.

The three phone crops contain only the visible app screen. PDF and cloud preserve the English main site's original product compositions, cropped below/above the store marketing text. Main's phone sizes, rotations, border, shadows and secondary-phone fade are pinned in `tests/fixtures/main-visual-rules.json`.

**Source review required:** Thai currently contains German UI in source images 02, 03, 06 and 07; Hindi contains English UI in those four images. The corresponding native crops are pixel-identical. Reports are translated. These are source-artwork issues, not routing/fallback errors. See `docs/SCREENSHOT_UPDATE_DE.md`. Do not merge the localization PR before reviewing these exceptions and a real Vercel Preview.

The language switcher does not force browser-language redirects. The English root URL remains the stable default.

## Store badges

Download CTAs use official App Store and Google Play badge artwork and share one sizing component, so hero and lower download CTAs have consistent dimensions.

## Local development

Use Node.js 20 or newer, then:

```bash
npm ci
cp .env.example .env.local
# Fill in the same public Supabase values already configured in Vercel.
npm run dev
```

Never commit `.env.local`, a Supabase service-role/secret key, password-reset links, OAuth tokens or other credentials.

## Validation

```bash
npm run lint
npm test
npm run build
```

`npm run build` regenerates the localized sitemap and runs the regression suite before Next.js builds the site. The original authentication regression test is retained. The suite additionally verifies all four protected source hashes, including `next.config.mjs`, all 185 image files, lossless WebP encoding, native image dimensions and the main visual composition.

Additional checks:

```bash
node scripts/verify-auth.mjs
node scripts/review-screenshot-localization.mjs
# Deliberately fails until unexpected cross-language duplicate sources are fixed:
node scripts/review-screenshot-localization.mjs --strict
```

Regenerate assets only when the original screenshots change (not during Vercel builds):

```bash
python3 -m pip install -r scripts/requirements-screenshots.txt
python3 scripts/generate-screenshots.py /path/to/extracted/android
python3 scripts/generate-screenshots.py /path/to/extracted/android --check
```

Bengali uses `05.png` for the report overview because its source set swaps the overview and entries-list artwork. This explicit per-locale override is recorded in `scripts/screenshot-crops.json`. Use `--locale bn` (or another known locale) to regenerate just one locale after a full generation.

The generator never resizes or upscales. It verifies every encoded image against the exact PNG crop before installing it. Crop coordinates/source mapping are in `scripts/screenshot-crops.json`; `scripts/screenshot-manifest.json` records source, file and decoded-pixel SHA-256 hashes. `--check` without a source directory verifies the delivered assets without needing the large original archive.

The project pins Next.js **15.5.25**. Keep Next.js and `eslint-config-next` on a supported patched release.

## Deployment

Substantial changes should be prepared on a feature branch and reviewed through a Vercel Preview before merging into `main`. For localization work, verify a representative mix of Latin, Cyrillic, CJK, Thai, Hindi and Bengali pages on desktop and mobile.

Do not merge changes that alter the existing authentication source files unless the authentication change is intentional and has been tested through real signup and password-reset flows.
