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

Website locales are defined in `lib/i18n/locales.js`. Marketing/support copy lives in `content/locales/`. Localized Android product screenshots are bundled into three optimized AVIF atlases: `public/images/screenshots-phone.avif` for calendar, appointments and reports, `public/images/screenshots-pdf.avif` for Share & Print, and `public/images/screenshots-cloud.avif` for Cloud Sync & Backup. Each atlas contains one row per website locale. `components/LocalizedVisual.js` selects the correct row and panel for each localized page. If an atlas cannot be loaded, the site falls back to the existing English product imagery.

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

`npm run build` regenerates the localized sitemap and runs the regression suite before Next.js builds the site. The regression suite pins the source hashes of `/welcome`, `/reset-password` and the reset-password translations.

The project pins Next.js **15.5.25**. Keep Next.js and `eslint-config-next` on a supported patched release.

## Deployment

Substantial changes should be prepared on a feature branch and reviewed through a Vercel Preview before merging into `main`. For localization work, verify a representative mix of Latin, Cyrillic, CJK, Thai, Hindi and Bengali pages on desktop and mobile.

Do not merge changes that alter the existing authentication source files unless the authentication change is intentional and has been tested through real signup and password-reset flows.
