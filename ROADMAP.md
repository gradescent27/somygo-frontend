# Roadmap

Tracks all work for the Somygo project across frontend, backend, and deployment. Updated as we go. See [CLAUDE.md](CLAUDE.md) for project context, conventions, and architecture.

---

## Phase 1: Frontend (website) ✓ COMPLETE

All 22 public pages are built, in the navy + gold design system, with per-route SEO, prerendering, and sitemap.

### Done

- [x] Rebrand from Visapat to Somygo (all 15 src files, package.json, index.html, manifest.json)
- [x] Delete 10 dead scam-recovery pages + orphan cleanup
- [x] Tailwind color system: `acblue #021BAB` primary, `acGold #F5B800` accent, `acBg #EEF2FF`
- [x] Multi-route SEO prerender pipeline (Puppeteer post-build, 22 routes)
- [x] Per-route `<title>`, `<meta description>`, canonical URLs via `<SEO />` component
- [x] Auto-generated `sitemap.xml` from `scripts/routes.js` + `robots.txt`
- [x] Homepage: Hero (hero.png), Stats, Services grid, About, How It Works, Country Showcase, CTA Banner, FAQs
- [x] Header: sticky, active link state (gold underline), polished dropdowns, mobile accordion
- [x] Footer: 4-column dark layout, gold accents, CTA strip, social icons, copyright bar
- [x] `/how-it-works`: process steps + fees section (no invented prices) + FAQs
- [x] `/why-us`: full rewrite (6 differentiators, hero, CTA)
- [x] `/about`: redesigned AboutComponent + FAQs
- [x] `/contact`: real Netlify Forms contact form, URL prefill from CTABanner, sidebar, offices
- [x] 7 service pages: `ServicePageLayout` + data-driven architecture (one layout, 7 data files)
- [x] 6 country pages: `CountryPageLayout` + data-driven architecture (one layout, 6 data files)
- [x] 3 legal pages: `LegalPrimitives` components, real entity (S O Immigration Limited, 08239985)
- [x] `ScrollToTop` component for route-change scroll fix
- [x] Germany & EU rebranded to European Union (EU) with EU flag
- [x] Em dash cleanup (188 occurrences removed across 41 files)
- [x] Legal entity confirmed: S O Immigration Limited, 08239985, 42 Fords Park Road, London E16 1NL
- [x] Production domain confirmed: `somygo.com`
- [x] `src/data/legal.js`: single source of truth for company entity, offices, emails
- [x] Netlify Forms hidden HTML form in `public/index.html`
- [x] `flag-icons` CSS imported for country flags

### Still pending (frontend only)

- [ ] **Replace placeholder logos** in `src/assets/` and `public/` (user is handling)
- [ ] **Real phone numbers**: UK and US numbers in `src/data/legal.js` are still inherited from prior template
- [ ] **Real stats numbers**: replace `X+` placeholders in `src/components/Stats.js`
- [ ] **Social media links**: Footer social icons (`#` placeholders) need real URLs
- [ ] **Legal page effective dates**: Privacy, Terms, Cookie all say `02 May 2024`, update when policies go live
- [ ] **Admin password**: change `Somygo123$` in `src/pages/ManageInvoices.js:49` before production

---

## Phase 2: Backend integration ← CURRENT PHASE

Add Somygo as a new tenant to the multi-tenant backend at `/Users/dacawave/Documents/KV/kv_backend_latest/`.

**Approach**: mirror the VISAPAT implementation (`visapath*` + `visapatCatlog*` files), review each file first, then build the Somygo version with improvements. Leave the existing visapat files untouched.

**Reference codebase**: VISAPAT frontend at `/Users/dacawave/Documents/VISAPAT`, backend files `visapath*` and `visapatCatlog*` in `kv_backend_latest`.

### 2.1 Settings & foundation (build first, everything else depends on it)

| # | Task | File | Status |
|---|---|---|---|
| 1 | Settings model (products, activeAutomation, companyInfo) | `models/somygoSettingsModel.js` | [x] |
| 2 | Settings seed (populate products from visapat-products.json on first boot) | `utils/somygoSettingsSeed.js` | [x] |
| 3 | Product loader (reads from MongoDB, replaces JSON file approach) | `utils/somygoProductLoader.js` | [x] |

**Settings document shape:**
```js
{
  activeAutomation: 'catlog',  // global: 'catlog' | 'bumpa' | 'stripe' | 'manual'
  products: [
    {
      invoiceId: '1',
      productName: 'AWS Cloud Foundations (Beginner)',  // intentionally fake
      price: 300,
      currency: 'USD',
      description: 'Professional Consultation & Case Strategy',
      enabled: true
    },
    // ... dynamic, no cap on count
  ],
  companyInfo: {
    name: 'Somygo',
    address: '42 Fords Park Road, London, England, E16 1NL',
    phone: '+44 (0)75 3716 9698',
    email: 'support@somygo.com'
  }
}
```

### 2.2 Automation layer

| # | Task | File | Status |
|---|---|---|---|
| 4 | Automation dispatcher (reads activeAutomation from settings, routes to right service) | `services/somygoAutomationDispatcher.js` | [x] |
| 5 | Catlog automation service (port from visapat as-is, no internal changes) | `services/somygoCatlogAutomationService.js` | [x] |
| 6 | Bumpa automation service (stub with correct interface, not functional yet) | `services/somygoBumpaAutomationService.js` | [x] |

**Dispatcher pattern:**
```js
// Controller calls:
const checkoutUrl = await dispatch(paymentRequest);

// Dispatcher reads settings.activeAutomation and routes:
//   'catlog' → SomygoCatlogAutomationService.automateCheckout(request)
//   'bumpa'  → SomygoBumpaAutomationService.automateCheckout(request)
//   'manual' → null (admin will paste URL manually)
```

**Key rule**: the global switch affects ALL new automation attempts. If admin switches from catlog to bumpa mid-day, the next checkout (even a retry for someone who started on catlog) uses bumpa. The `automationType` field on the payment request records what was used for audit.

### 2.3 Catalog flow (`/api/somygo-catalog`)

| # | Task | File | Mirrors | Status |
|---|---|---|---|---|
| 7 | Catalog payment request model (dynamic product IDs, `automationType` field) | `models/somygoCatalogPaymentRequestModel.js` | `visapatCatlogPaymentRequestModel.js` | [x] |
| 8 | Catalog routes (products, payment-request, automate, status, list, mark-as-paid, settings) | `routes/somygoCatalogRoutes.js` | `visapatCatlogRoutes.js` | [x] |
| 9 | Catalog controller (uses dispatcher, reads products from DB) | `controllers/somygoCatalogController.js` | `visapatCatlogController.js` | [x] |
| 10 | Register in server.js | 2 lines in `server.js` | | [x] |

**Endpoints:**
```
# Public (no auth)
GET    /products                  Returns enabled products from settings
POST   /payment-request           Create/upsert payment request
POST   /automate-checkout         Dispatch to active automation service
GET    /status/:id                Poll payment status
GET    /payment-requests          List requests (with filters)
POST   /mark-as-paid/:id          Mark invoice paid, send receipt

# Admin (requires X-Admin-Secret header)
GET    /settings                  Full settings (products + automation + company)
PUT    /settings                  Update settings (automation switch, product CRUD, company info)
GET    /payment-requests/:id/details   Full record with automation logs
```

### 2.4 Core payment flow (`/api/somygo`) — DEPRECATED, build later

These routes are currently disabled in the frontend (`InvoicePayments.js` and `ManageInvoices.js` routes commented out in App.js). Build after the catalog flow is working.

| # | Task | File | Mirrors | Status |
|---|---|---|---|---|
| 11 | User model | `models/somygoUserModel.js` | `visapathUserModel.js` | [ ] |
| 12 | Payment request model | `models/somygoPaymentRequestModel.js` | `visapathPaymentRequestModel.js` | [ ] |
| 13 | Routes | `routes/somygoRoutes.js` | `visapathRoutes.js` | [ ] |
| 14 | Controller | `controllers/somygoController.js` | `visapathController.js` | [ ] |
| 15 | Register in server.js | `app.use('/api/somygo', somygoRoutes)` | | [ ] |
| 16 | Re-enable frontend routes in App.js | | | [ ] |

### 2.5 Environment variables

| # | Task | Status |
|---|---|---|
| 17 | Add Somygo env vars to `.env` | [x] |
| 18 | Add Somygo env vars to `.env.example` | [x] |

**Required variables:**
```bash
# Admin
SOMYGO_ADMIN_SECRET=PASSword123$

# Catlog automation
SOMYGO_CATLOG_TARGET_URL=https://www.catlog.shop/validate-systems
SOMYGO_CATLOG_BROWSER_HEADLESS=true
SOMYGO_CATLOG_BROWSER_TIMEOUT=120000
SOMYGO_CATLOG_OXYLABS_ENABLED=false
SOMYGO_CATLOG_OXYLABS_TARGET_COUNTRY=US

# Bumpa automation (placeholder, not functional yet)
SOMYGO_BUMPA_API_KEY=
SOMYGO_BUMPA_TARGET_URL=

# Email
SOMYGO_CATLOG_SENDER_EMAIL=no-reply@somygo.com
SOMYGO_CATLOG_SENDER_NAME=Somygo
SOMYGO_WELCOME_SENDER_EMAIL=emea@somygo.com
SOMYGO_WELCOME_SENDER_NAME=Somygo | EMEA Office

# Core payment (for Phase 2.4, not needed yet)
SOMYGO_FLW_PUBLIC_KEY=FLWPUBK-...
SOMYGO_FLW_SECRET_KEY=FLWSECK-...
SOMYGO_PAYMENT_AMOUNT=65
SOMYGO_PAYMENT_CURRENCY=USD
```

### 2.6 Frontend fixes (catalog pages)

| # | Task | File | Status |
|---|---|---|---|
| 19 | Fix company info (use `src/data/legal.js` instead of hardcoded) | `InvoiceCatalog.js` | [x] |
| 20 | Fix invoice number (use backend `_id` instead of random) | `InvoiceCatalog.js` | [x] |
| 21 | Document phone manipulation pattern with code comment | `InvoiceCatalog.js` | [x] |
| 22 | Change admin password to `PASSword123$` | `ManageCatlogInvoices.js` | [x] |
| 23 | Add settings panel (automation switch, product editor, company info) | `ManageCatlogInvoices.js` | [x] |
| 24 | Wire admin settings panel to `GET/PUT /api/somygo-catalog/settings` | `ManageCatlogInvoices.js` | [x] |

### 2.7 End-to-end verification

| # | Task | Status |
|---|---|---|
| 25 | Start backend (`npm run dev` in kv_backend_latest) | [ ] |
| 26 | Start frontend (`npm start` in SOMYGO) | [ ] |
| 27 | Verify `GET /api/somygo-catalog/products` returns seeded products | [ ] |
| 28 | Test invoice page: `http://localhost:3000/invoice/catalog?name=John+Doe&email=john@example.com&invoice=1` | [ ] |
| 29 | Test checkout flow with Catlog automation | [ ] |
| 30 | Test admin dashboard: login, view invoices, mark as paid | [ ] |
| 31 | Test admin settings: switch automation, edit product, update company info | [ ] |
| 32 | Test automation switch: change to bumpa (should fail gracefully with "not implemented"), switch back to catlog | [ ] |

### Decisions locked for Phase 2

- **Catlog automation is ported as-is.** No internal changes to the automation logic.
- **Bumpa automation is a stub.** Correct interface, throws "not implemented" error. Browser-based like Catlog.
- **Global automation switch.** Admin changes it, all new attempts use the new one. `automationType` on payment request records what was used.
- **Products are dynamic.** No enum cap, no JSON file. Seeded from existing visapat-products.json, admin can add/remove after.
- **Product names are intentionally fake.** Course names masking real services. By design.
- **Admin auth is a shared secret** (`SOMYGO_ADMIN_SECRET` env var). Frontend sends it as `X-Admin-Secret` header. Same password for frontend login and backend API.
- **Phone manipulation stays.** `removeRandomDigitFromPhone` is intentional, documented with code comment.
- **`paymentProvider` field renamed to `automationType`** on the catalog payment model. Records which automation service handled the request.
- **Products are public** (`GET /products` needs no auth). Settings write is admin-only. Full settings read (including automation config) is admin-only.

---

## Phase 3: Email integration

Add Somygo-branded email templates and sender for transactional emails.

| # | Task | File to create | Mirrors | Status |
|---|---|---|---|---|
| 1 | Email templates | `utils/somygoEmailTemplates.js` | Pattern from `utils/notaEmailTemplates.js` | [ ] |
| 2 | Email sender | `utils/somygoSendEmail.js` | Pattern from `utils/notaSendEmail.js` | [ ] |
| 3 | Wire into controller | Update `somygoController.js` to send receipts | | [ ] |

**Templates needed:**
- Payment receipt / confirmation
- Payment failed notification
- Welcome email (first payment)

---

## Phase 4: SEO Phase 2 (rich results & social sharing)

Builds on the per-route prerendering from Phase 1. Extend `<SEO />` and `seo.config.js`.

| # | Task | Status |
|---|---|---|
| 1 | Open Graph meta tags (WhatsApp, Slack, iMessage link previews) | [ ] |
| 2 | Twitter Card meta tags | [ ] |
| 3 | Social sharing image (1200x630px asset needed) | [ ] |
| 4 | JSON-LD: `Organization` / `LegalService` schema (Google knowledge panel) | [ ] |
| 5 | JSON-LD: `LocalBusiness` for London + NYC offices (Google Maps, "near me") | [ ] |
| 6 | JSON-LD: `Service` schema on each service page | [ ] |
| 7 | JSON-LD: `FAQPage` schema on homepage FAQ (collapsible FAQ in search results) | [ ] |
| 8 | JSON-LD: `BreadcrumbList` schema (breadcrumbs in search results) | [ ] |

---

## Phase 5: SEO Phase 3 (cleanup)

| # | Task | Status |
|---|---|---|
| 1 | Audit semantic HTML and heading hierarchy across all pages | [ ] |
| 2 | Audit and improve image alt text | [ ] |
| 3 | Verify `lang` attribute correctness | [ ] |
| 4 | Lighthouse performance pass (Core Web Vitals) | [ ] |
| 5 | hero.png optimization (currently 4.6 MB, needs compression) | [ ] |

---

## Decisions & conventions (don't relitigate)

These have been discussed, decided, and should not be revisited without good reason.

- **Tailwind token names stay `ac*`** (legacy from prior brand). Don't rename, just change values.
- **Brand casing**: `Somygo` for display copy, `somygo` for URLs/emails/identifiers.
- **Adding a route** requires updates in three places: `App.js`, `scripts/routes.js`, `src/seo.config.js`.
- **Prerender + sitemap exclude** the duplicate route `/services/skilled-worker-employment` (canonical points to `-visas`).
- **`/invoice/*` and `/forms/*`** are admin-only: excluded from prerender, sitemap, and robots.txt.
- **Design model**: Visora theme (Bravis). Structure and layout absorbed, code and assets original.
- **Color tokens**: navy `acblue` primary + gold `acGold` accent.
- **Hero**: single static image, not a carousel.
- **No blog grid** on homepage.
- **Stats counter**: `X+` placeholders until real numbers exist.
- **Office locations**: London (UK/EMEA) + New York (US/APAC). Single source of truth: `src/data/legal.js`.
- **Legal entity**: S O Immigration Limited (08239985), 42 Fords Park Road, London E16 1NL.
- **Production domain**: `somygo.com` (confirmed).
- **Backend approach**: mirror VISAPAT implementation, review first, then improve. 5 specific improvements listed in Phase 2.4.
- **No em dashes** in copy or comments. Use commas, colons, parentheses, or sentence breaks.

---

## Per-client swap checklist

When using this codebase as a base for a new immigration client, work through these in order:

1. **Brand find/replace**: `Somygo` → `NewClient` (display), `somygo` → `newclient` (URLs, emails, identifiers, package name, sessionStorage key)
2. **Domain**: update `SITE.domain` in `src/seo.config.js` + `SITE_DOMAIN` in `scripts/generate-sitemap.js`
3. **Tailwind primary color**: change `acblue` value in `tailwind.config.js`. Optionally update `acBg` + `acGold`.
4. **Logos**: drop new files at same paths: `src/assets/{black_logo,white_logo,black_icon,white_icon}.png` + `public/logo.png`
5. **Per-page metadata**: rewrite titles/descriptions in `src/seo.config.js`
6. **Legal entity + offices**: update `src/data/legal.js` (company name, number, addresses, phones, emails)
7. **Admin password**: change in `src/pages/ManageInvoices.js:49`
8. **API URL**: update `src/constants.js` and `src/config/api.js`
9. **manifest.json + index.html**: short_name, name, theme_color
10. **Backend**: create new tenant files in `kv_backend_latest` following Phase 2 pattern
