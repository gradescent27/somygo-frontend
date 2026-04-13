# Email Reference

All transactional emails sent by Somygo. Use this document to plan content changes, sequence modifications, and new email additions. The templates live in the backend at `kv_backend_latest/utils/somygoCatalogEmailTemplates.js` and `kv_backend_latest/controllers/somygoContactController.js`.

---

## Email 1: Payment Receipt

**Template**: `getSomygoCatalogReceiptTemplate()` in `utils/somygoCatalogEmailTemplates.js`
**Triggered**: immediately when admin clicks "Mark Paid" on any invoice
**Sent to**: client's original email
**From**: `no-reply@somygo.com` (env: `SOMYGO_CATLOG_SENDER_EMAIL`)
**Subject**: `Payment Receipt - Invoice #[X] - Somygo`

**Content**:
- Navy header: "PAYMENT RECEIPT" + short reference number (first 8 chars of UUID)
- Company info block: name, address, email (reads from admin settings)
- Greeting: "Hi [name], Thank you for your payment. Here is your receipt."
- Receipt table:
  - Invoice number
  - Product description
  - Payment date
  - Reference number
  - Amount paid (bold, navy)
- Green badge: "Payment Confirmed"
- Note: "Please keep this email for your records. Contact info@somygo.com."
- Footer: "Best regards, Somygo, info@somygo.com, copyright"

**Data available to template**:
```
customerName, invoiceId, productDescription, amount, paidAt, paymentReference, companyInfo { name, address, email }
```

---

## Email 2: Welcome / Next Steps (Invoice #1 only)

**Template**: `getSomygoWelcomeTemplate()` in `utils/somygoCatalogEmailTemplates.js`
**Triggered**: 30 seconds after Invoice #1 is marked as paid
**Sent to**: client's original email
**From**: `info@somygo.com` (env: `SOMYGO_WELCOME_SENDER_EMAIL`)
**Subject**: `Next Steps & Required Documents - Somygo`
**Attachments**: PDFs from `assets/somygo/` (if files exist)

**Content**:
- Navy header: gold eyebrow "Next Steps" + "Required Documents"
- Greeting: "Hi [name], Thank you for your payment. To move forward..."
- Document checklist (placeholder, needs real content):
  - Valid passport (all pages with stamps)
  - Passport-sized photograph (recent, white background)
  - Updated CV / resume
  - Marriage certificate (if applicable)
  - Birth certificates (for dependents, if applicable)
  - Previous refusal letters (if any)
  - Educational certificates and transcripts
  - Proof of funds (bank statements, last 3 months)
- Yellow callout: "Attached Forms" note
- Instructions: "Reply to this email or send to info@somygo.com"
- Footer: "Best regards, Somygo, info@somygo.com, copyright"

**PDF attachments** (in `kv_backend_latest/assets/somygo/`):
- `PSW_Intake_Form_v2.pdf` (placeholder filename, needs real file)
- `IMM5476_Use_of_Representative.pdf` (placeholder, needs real file)
- `IMM5409_Statutory_Declaration_of_Common_Law_Union.pdf` (placeholder, needs real file)

**Data available to template**:
```
customerName
```

**Notes**:
- Only fires for Invoice #1. Other invoices only get the receipt.
- The document checklist is a generic placeholder. Update before going live.
- The PDF filenames are from the VISAPAT template. Replace with real Somygo documents.
- If PDF files don't exist in `assets/somygo/`, the email still sends but without attachments (warning logged).

---

## Email 3: Contact Form Notification (internal)

**Template**: inline in `controllers/somygoContactController.js`
**Triggered**: when someone submits the /contact form on the website
**Sent to**: `info@somygo.com` (env: `SOMYGO_CONTACT_RECIPIENT`)
**From**: `no-reply@somygo.com` as "[name] via Somygo"
**Subject**: `New enquiry from [name]`

**Content**:
- Navy header: gold eyebrow "New Enquiry" + "Contact Form Submission"
- Details table (only filled fields shown):
  - Name (bold)
  - Email (clickable mailto link)
  - Phone
  - Destination (country)
  - Service type
- Message body in gray box (preserves line breaks)
- Footer: submission timestamp, "Reply directly to respond", Somygo branding + copyright

**Data available to template**:
```
name, email, phone, country, service, message
```

**Notes**:
- This is an internal notification email (sent to the team, not the client).
- The client does NOT receive a confirmation email. Consider adding one if needed.

---

## Shared branding (all emails)

**Colors**:
- Navy header: `#021BAB`
- Gold eyebrow text: `#F5B800`
- Body text: `#131313`
- Muted text: `#7E7E7E`
- Light gray: `#9ca3af`
- Card background: `#f9fafb`
- Border: `#e5e7eb`
- Page background: `#f4f4f5`

**Footer** (shared `emailFooter()` function for Email 1 and 2):
```
Best regards,
Somygo
info@somygo.com

(c) [year] Somygo. All rights reserved.
```

**Format**: table-based HTML layout, minimal inline CSS, no classes, no flexbox/grid. Outlook-compatible. Every email includes a plain text fallback.

---

## Sequence diagram

```
Client visits /invoice/pay → fills form → submits
  ↓
Backend creates payment request, runs automation
  ↓
Automation captures checkout URL → client redirected to Stripe
  ↓
Client pays on Stripe
  ↓
Admin sees "checkout ready" in dashboard → clicks "Mark Paid"
  ↓
  ├── [Immediately] Email 1: Payment Receipt → client
  │
  └── [If Invoice #1, after 30 seconds] Email 2: Welcome + PDFs → client


Visitor submits /contact form
  ↓
  └── [Immediately] Email 3: Contact Notification → info@somygo.com
```

---

## TODO: decisions needed

- [ ] Should we send a confirmation email to the client when they submit the contact form? (Currently only the team is notified.)
- [ ] Should the welcome email (Email 2) fire for all invoices, not just Invoice #1?
- [ ] What are the real required documents for the welcome email checklist?
- [ ] What are the real PDF form filenames for `assets/somygo/`?
- [ ] Should we add a "payment failed" or "payment reminder" email?
- [ ] Should the receipt email include a link back to the website?
