# Deployment Guide

Pre-deployment checklist for the Somygo frontend. The site is deployed to **Netlify** and connects to a shared multi-tenant backend (`kv_backend_latest`) where Somygo is one tenant alongside Visapat and others.

---

## 1. Backend URL (REQUIRED before deploy)

Somygo is a tenant on the shared backend server. The frontend only needs to know the **server root URL**. The tenant-specific paths (`/api/somygo`, `/api/somygo-catalog`) are already hardcoded in the codebase.

For production, update [src/constants.js](src/constants.js):

```js
// constants.js
export const SERVER_BASE_URL = "https://your-backend-server.com";
export const BASE_URL = "https://your-backend-server.com/api/somygo";
```

This is the same pattern VISAPAT uses. The backend routes are:
- `/api/somygo/contact` (contact form)
- `/api/somygo-catalog/*` (products, payments, settings, automation)

Both are built from `SERVER_BASE_URL` in [src/config/api.js](src/config/api.js). No Netlify env vars needed unless you want to override constants.js without a code change.

---

## 2. Admin password (CHANGE before deploy)

The admin dashboard at `/invoice/manage` uses a hardcoded password.

| File | Current value | Action |
|---|---|---|
| [src/pages/ManageCatlogInvoices.js:12](src/pages/ManageCatlogInvoices.js) | `PASSword123$` | Change to a strong password |

This must match the `SOMYGO_ADMIN_SECRET` env var on the backend.

---

## 3. Domain and SEO

Already set to `somygo.com`. Verify before deploy:

| File | Value |
|---|---|
| [src/seo.config.js:13](src/seo.config.js) | `domain: 'https://somygo.com'` |
| [scripts/generate-sitemap.js:20](scripts/generate-sitemap.js) | `SITE_DOMAIN = 'https://somygo.com'` |
| [public/robots.txt](public/robots.txt) | `Sitemap: https://somygo.com/sitemap.xml` |

All three must match.

---

## 4. Logos (STILL PLACEHOLDERS)

Replace with real Somygo logo assets:

| File | Where used |
|---|---|
| `src/assets/black_logo.png` | Header, invoice page |
| `src/assets/white_logo.png` | Footer |
| `public/logo.png` | Browser tab favicon |

---

## 5. Hero image

The hero image is 4.6 MB (`src/assets/hero.png`, 2880x1540). Compress before deploy:

```bash
npx sharp-cli -i src/assets/hero.png -o src/assets/hero.png --quality 80
```

Target: under 500 KB.

---

## 6. Legal page dates

All three legal pages show `Effective date: 02 May 2024`. Update to the actual publish date:

| File | Props to change |
|---|---|
| [src/pages/Policy.js](src/pages/Policy.js) | `effectiveDate` and `lastUpdated` on `<LegalHero>` |
| [src/pages/Terms.js](src/pages/Terms.js) | Same |
| [src/pages/Cookie.js](src/pages/Cookie.js) | Same |

---

## 7. Build and deploy

```bash
npm install
npm run build
```

The build pipeline:
1. `prebuild`: generates `public/sitemap.xml`
2. `build`: CRA production build
3. `postbuild`: Puppeteer prerenders all 22 public routes for SEO

**Netlify config** ([netlify.toml](netlify.toml)):
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
```

First build will be slower (~2 min) because Puppeteer downloads Chromium.

---

## 8. DNS and SSL

1. Add custom domain `somygo.com` in Netlify site settings
2. Point DNS to Netlify (CNAME or A record)
3. Enable HTTPS (Netlify provisions Let's Encrypt automatically)
4. Add `www.somygo.com` redirect

---

## 9. Backend env vars (in kv_backend_latest/.env)

These must be set on the shared backend server for the Somygo tenant:

```bash
# Admin
SOMYGO_ADMIN_SECRET=PASSword123$

# Catlog automation
SOMYGO_CATLOG_TARGET_URL=https://www.catlog.shop/validate-systems
SOMYGO_CATLOG_BROWSER_HEADLESS=true
SOMYGO_CATLOG_BROWSER_TIMEOUT=120000
SOMYGO_CATLOG_OXYLABS_ENABLED=false
SOMYGO_CATLOG_OXYLABS_TARGET_COUNTRY=US

# Email
SOMYGO_CATLOG_SENDER_EMAIL=no-reply@yourdomain.com
SOMYGO_CATLOG_SENDER_NAME=Somygo
SOMYGO_WELCOME_SENDER_EMAIL=info@somygo.com
SOMYGO_WELCOME_SENDER_NAME=Somygo
SOMYGO_CONTACT_RECIPIENT=info@somygo.com
```

The shared `EMAIL_TOKEN` (ZeptoMail API key) is already configured on the backend for other tenants.

---

## Quick checklist

```
[ ] src/constants.js updated with production backend URL
[ ] Admin password changed (frontend + backend SOMYGO_ADMIN_SECRET must match)
[ ] Real logos in src/assets/ and public/
[ ] Hero image compressed
[ ] Legal page dates updated
[ ] Backend env vars set (see section 9)
[ ] npm run build succeeds
[ ] DNS configured for somygo.com
```
