# Somygo

Immigration consulting website for individuals and families. Work, study, family, residency, investor, and visitor visas across the UK, US, Canada, European Union, Australia, and the UAE.

**Live site:** [somygo.co](https://somygo.co)
**Legal entity:** S O Immigration Limited (08239985), trading as Somygo

## Quick start

```bash
# Install dependencies (includes puppeteer for SEO prerendering)
npm install

# Start development server
npm start
# → http://localhost:3000

# Production build (generates sitemap, builds, prerenders all 22 routes)
npm run build
```

## Tech stack

| Layer     | Technology                                |
| --------- | ----------------------------------------- |
| Framework | React 18 + React Router 6                 |
| Styling   | Tailwind CSS 3.4 (custom `ac*` tokens)    |
| Icons     | Lucide React                              |
| Animation | Framer Motion                             |
| SEO       | react-helmet + Puppeteer prerender        |
| Forms     | Netlify Forms (contact page)              |
| Payments  | Flutterwave inline checkout               |
| Hosting   | Netlify                                   |
| Backend   | Node.js/Express (multi-tenant, see below) |
| Database  | MongoDB via Mongoose                      |

## Project structure

```
somygo/
├── public/
│   ├── index.html          # HTML shell + Netlify form registration
│   ├── sitemap.xml         # Auto-generated from scripts/routes.js
│   ├── robots.txt          # Allows crawling, blocks /invoice/ and /forms/
│   └── logo.png            # Favicon
├── scripts/
│   ├── routes.js           # Single source of truth: all 22 public routes
│   ├── generate-sitemap.js # Prebuild: routes.js → public/sitemap.xml
│   └── prerender.js        # Postbuild: Puppeteer visits each route, writes per-route HTML
├── src/
│   ├── components/
│   │   ├── Hero.js              # Full-bleed hero with family photo + navy overlay
│   │   ├── Stats.js             # 4-stat counter bar (X+ placeholders)
│   │   ├── ScamTypes.js         # Services grid (misleading filename, see CLAUDE.md)
│   │   ├── AboutComponent.js    # Asymmetric image+text + 5 trust pillars
│   │   ├── HowItWorksComponent.js # 4-step process explainer
│   │   ├── CountryShowcase.js   # 6 country cards with flags
│   │   ├── CTABanner.js         # CTA with country/service form → /contact
│   │   ├── FAQs.js              # Accordion FAQ
│   │   ├── FeesComponent.js     # Fee structure (no invented prices)
│   │   ├── WhyACComponent.js    # Full /why-us page content
│   │   ├── Header.js            # Sticky nav with dropdowns + active link state
│   │   ├── Footer.js            # 4-column dark footer with offices
│   │   ├── SEO.js               # Per-route Helmet tags from seo.config.js
│   │   ├── ScrollToTop.js       # Scroll-to-top on route change
│   │   ├── ServicePageLayout.js # Reusable layout for 7 service pages
│   │   ├── CountryPageLayout.js # Reusable layout for 6 country pages
│   │   └── legal/
│   │       └── LegalPrimitives.js # Shared legal page building blocks
│   ├── data/
│   │   ├── legal.js             # Single source of truth: company entity, offices, emails
│   │   ├── faqData.json         # FAQ questions and answers
│   │   ├── services/            # 7 service page data files (one per service)
│   │   └── countries/           # 6 country page data files (one per country)
│   ├── pages/
│   │   ├── HomePage.js          # 8-section homepage
│   │   ├── AboutUs.js           # About + FAQs
│   │   ├── HowItWorks.js       # Process + fees + FAQs
│   │   ├── WhyAC.js            # Why choose us (full page)
│   │   ├── Contact.js          # Contact form + sidebar + offices
│   │   ├── SkilledWorkerEmploymentVisas.js  # → ServicePageLayout + data
│   │   ├── StudyPermitsGraduatePathways.js
│   │   ├── FamilyDependentVisas.js
│   │   ├── PermanentResidenceCitizenship.js
│   │   ├── InvestorEntrepreneurVisas.js
│   │   ├── VisitorShortStay.js
│   │   ├── AppealsComplexCases.js
│   │   ├── UnitedStates.js      # → CountryPageLayout + data
│   │   ├── Canada.js
│   │   ├── UnitedKingdom.js
│   │   ├── EuropeanUnion.js
│   │   ├── Australia.js
│   │   ├── UAE.js
│   │   ├── Policy.js           # Privacy policy (legal primitives)
│   │   ├── Terms.js            # Terms of service
│   │   ├── Cookie.js           # Cookie policy
│   │   ├── InvoicePayments.js  # Flutterwave payment flow
│   │   ├── InvoiceCatalog.js   # Catalog invoice page
│   │   ├── ManageInvoices.js   # Password-protected invoice dashboard
│   │   ├── ManageCatlogInvoices.js # Catalog invoice dashboard
│   │   ├── FormManagement.js   # Hidden form admin
│   │   └── NotFound.js         # 404 page
│   ├── config/
│   │   └── api.js              # API service functions (payment, catalog)
│   ├── constants.js            # BASE_URL, SERVER_BASE_URL
│   ├── seo.config.js           # Per-route titles, descriptions, canonicals
│   ├── App.js                  # Router + SEO + ScrollToTop + all routes
│   └── index.css               # Tailwind + flag-icons import
├── CLAUDE.md                   # Project context for Claude Code sessions
├── ROADMAP.md                  # Outstanding work + per-client swap checklist
├── tailwind.config.js          # Custom color tokens (acblue, acGold, etc.)
├── netlify.toml                # Build command + SPA redirects
└── package.json                # Dependencies + prebuild/postbuild scripts
```

## Build pipeline

```
npm run build
  ├─ prebuild   → scripts/generate-sitemap.js    writes public/sitemap.xml
  ├─ build      → react-scripts build            CRA production build
  └─ postbuild  → scripts/prerender.js           Puppeteer prerenders 22 routes
```

The prerender writes per-route HTML files (e.g., `build/services/canada/index.html`) so Google gets real content with correct per-page `<title>` and `<meta description>` without executing JavaScript.

## Design system

**Color tokens** (in [tailwind.config.js](tailwind.config.js)):

| Token     | Value     | Role                                |
| --------- | --------- | ----------------------------------- |
| `acblue`  | `#021BAB` | Primary navy                        |
| `acGold`  | `#F5B800` | Accent (CTAs, highlights, eyebrows) |
| `acBg`    | `#EEF2FF` | Soft indigo wash background         |
| `acBlack` | `#131313` | Text dark                           |
| `acGray`  | `#7E7E7E` | Muted text                          |

**Design model:** Modeled after the Visora theme (Bravis Themes). Structure, layout patterns, typography hierarchy, and spacing rhythm are absorbed; code, images, and text are original. See CLAUDE.md for the full pattern catalogue.

## Pages

**22 public routes** (prerendered + in sitemap):

| Category      | Routes                                                                                                                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marketing     | `/`, `/about`, `/how-it-works`, `/why-us`, `/contact`                                                                                                                                                                                          |
| Services (7)  | `/services/skilled-worker-employment-visas`, `study-permits-graduate-pathways`, `family-and-dependent-visas`, `permanent-residence-and-citizenship`, `investor-and-entrepreneur-routes`, `visitor-and-short-stay`, `appeals-and-complex-cases` |
| Countries (6) | `/countries/united-states`, `canada`, `united-kingdom`, `european-union`, `australia`, `uae`                                                                                                                                                   |
| Legal (3)     | `/terms-of-service`, `/privacy-policy`, `/cookie-policy`                                                                                                                                                                                       |

**Internal routes** (excluded from prerender, sitemap, and robots.txt):

| Route                     | Purpose                              |
| ------------------------- | ------------------------------------ |
| `/invoice/payments`       | Flutterwave payment flow             |
| `/invoice/manage`         | Password-protected invoice dashboard |
| `/invoice/catalog`        | Catalog invoice page                 |
| `/invoice/catalog/manage` | Catalog invoice dashboard            |
| `/forms/jndfe8939434ndfd` | Hidden form management               |

## Backend

The backend is a **multi-tenant Node.js/Express server** at a separate repo (`kv_backend_latest`) that hosts 12+ client sites from one process. Somygo is added as a new tenant.

### API surfaces

| Surface | Base URL                                   | Endpoints | Purpose                                    |
| ------- | ------------------------------------------ | --------- | ------------------------------------------ |
| Core    | `http://localhost:5001/api/somygo`         | 13        | Payment requests, users, automation, stats |
| Catalog | `http://localhost:5001/api/somygo-catalog` | 6         | Products, catalog payments, mark-as-paid   |

### Core payment endpoints (`/api/somygo`)

```
POST   /payment-request          Create payment request (fullName, email, phone)
GET    /payment-requests          List requests (filters: status, page, limit, search)
GET    /payment-request/:id       Get single request
GET    /status/:id                Get payment status
POST   /payment-callback          Flutterwave payment callback
POST   /automate-checkout         Trigger browser automation
POST   /retry/:id                 Retry failed automation
GET    /logs/:id                  Get automation logs
GET    /users                     List all users
GET    /user/:email               Get user by email
GET    /user/:email/payments      Get user's payment history
GET    /stats                     Dashboard statistics
GET    /health                    Health check
```

### Catalog endpoints (`/api/somygo-catalog`)

```
GET    /products                  List catalog products
POST   /payment-request           Create catalog payment request
POST   /automate-checkout         Trigger catalog automation
GET    /status/:id                Get catalog payment status
GET    /payment-requests          List catalog payment requests
POST   /mark-as-paid/:id          Mark catalog invoice as paid
```

### Payment flow (Flutterwave)

1. Frontend sends `{fullName, email, phone}` → `POST /api/somygo/payment-request`
2. Backend creates request with UUID `tx_ref`, returns `{requestId, flutterwaveConfig}`
3. Frontend opens Flutterwave inline checkout with the config
4. On completion, frontend sends callback → `POST /api/somygo/payment-callback`
5. Backend verifies transaction and updates status

### Backend files (in kv_backend_latest)

| File                                         | Purpose                                  |
| -------------------------------------------- | ---------------------------------------- |
| `models/somygoUserModel.js`                  | User schema → `somygousers`              |
| `models/somygoPaymentRequestModel.js`        | Payment schema → `somygopaymentrequests` |
| `routes/somygoRoutes.js`                     | Core route definitions                   |
| `controllers/somygoController.js`            | Core business logic                      |
| `models/somygoCatalogPaymentRequestModel.js` | Catalog payment schema                   |
| `routes/somygoCatalogRoutes.js`              | Catalog route definitions                |
| `controllers/somygoCatalogController.js`     | Catalog business logic                   |
| `services/somygoCatalogAutomationService.js` | Catalog browser automation               |

### Environment variables

```bash
# Required in kv_backend_latest/.env
SOMYGO_FLW_PUBLIC_KEY=FLWPUBK-...
SOMYGO_FLW_SECRET_KEY=FLWSECK-...
SOMYGO_PAYMENT_AMOUNT=65
SOMYGO_PAYMENT_CURRENCY=USD
SOMYGO_FROM_EMAIL=no-reply@somygo.co
SOMYGO_FROM_NAME=Somygo
```

## Adding a new page

Three updates required:

1. Add the route in [src/App.js](src/App.js)
2. Add the path to [scripts/routes.js](scripts/routes.js) (prerender + sitemap)
3. Add an entry to [src/seo.config.js](src/seo.config.js) (per-page metadata)

## Adding a new service or country page

Service pages and country pages are **data-driven**. The layout component is shared; only the data file is unique.

**New service page:**

1. Create `src/data/services/yourService.js` (copy an existing one as template)
2. Create `src/pages/YourService.js` (8-line wrapper importing ServicePageLayout + data)
3. Register the route (see "Adding a new page" above)

**New country page:**

1. Create `src/data/countries/yourCountry.js`
2. Create `src/pages/YourCountry.js` (6-line wrapper importing CountryPageLayout + data)
3. Register the route

## Key files

| File                                     | What it controls                                             |
| ---------------------------------------- | ------------------------------------------------------------ |
| [src/data/legal.js](src/data/legal.js)   | Company entity, office addresses, phone numbers, role emails |
| [src/seo.config.js](src/seo.config.js)   | Per-page `<title>`, meta description, canonical URL          |
| [scripts/routes.js](scripts/routes.js)   | Which routes get prerendered and sitemapped                  |
| [src/constants.js](src/constants.js)     | Backend API base URLs                                        |
| [src/config/api.js](src/config/api.js)   | API service functions (payment, catalog)                     |
| [tailwind.config.js](tailwind.config.js) | Color tokens, fonts, breakpoints                             |

## Documentation

- **[CLAUDE.md](CLAUDE.md)** : Full project context, conventions, gotchas, backend integration details. Auto-loaded by Claude Code.
- **[ROADMAP.md](ROADMAP.md)** : Outstanding work, per-client swap checklist, future SEO phases, locked decisions.
