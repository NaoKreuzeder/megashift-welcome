# Megashift website

Public website for **Megashift**, deployed with Next.js on Vercel.

## Routes

- `/` — product website
- `/support` — support and contact information
- `/privacy` — current Privacy Policy
- `/terms` — current Terms of Service
- `/welcome` — existing email-confirmation landing page
- `/reset-password` — existing Supabase password-reset page

The redesign deliberately leaves the functional source of `/welcome`, `/reset-password` and their reset-password translations unchanged.

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

The project pins Next.js **15.5.25**, the current Next.js 15 maintenance-LTS release available when this website update was prepared. Keep Next.js and `eslint-config-next` on a supported patched release.

## Deployment

Work is prepared on `website-redesign`. Vercel can create a Preview deployment from that branch. Verify the homepage, legal pages, support route, `/welcome`, and `/reset-password` before merging into `main`.

After the production site is live, update Google Auth Platform, App Store Connect and Google Play to use:

- `https://www.megashiftapp.com/`
- `https://www.megashiftapp.com/privacy`
- `https://www.megashiftapp.com/terms`

Do not remove old OAuth redirect/callback domains until the active OAuth/Supabase configuration has been checked separately.
