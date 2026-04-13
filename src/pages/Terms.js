// Terms.js: Terms of Service
//
// Restructured around the LegalPrimitives. Content preserved from the prior
// version. Three-part structure: Website Terms, Services Terms, General
// Legal Terms, preserved as section grouping.

import React from 'react';
import {
  LegalHero,
  LegalEntityCard,
  LegalSection,
  Callout,
  DefinitionList,
  LegalContactBlock,
} from '../components/legal/LegalPrimitives';
import { LEGAL_ENTITY, ROLE_EMAILS } from '../data/legal';

const definitions = [
  {
    term: 'Firm, we, us, our',
    definition: `${LEGAL_ENTITY.name} trading as "${LEGAL_ENTITY.tradingAs}".`,
  },
  {
    term: 'You, client',
    definition: 'The person who visits the site or engages our services.',
  },
  {
    term: 'Services',
    definition:
      'Immigration consulting, document preparation, coordination with third parties, and related support.',
  },
  {
    term: 'Site',
    definition:
      'somygo.com, its subdomains, portals, forms, emails, and messaging channels operated by us.',
  },
  {
    term: 'Local counsel',
    definition:
      'A licensed attorney, regulated adviser, or representative engaged where required by law.',
  },
  {
    term: 'Government fees',
    definition:
      'Fees charged by governments, consulates, visa centres, testing bodies, and similar agencies.',
  },
  {
    term: 'Business day',
    definition:
      'Monday to Friday, excluding public holidays in England and Wales.',
  },
];

const Terms = () => {
  return (
    <div className="bg-white">
      <LegalHero
        eyebrow="Terms of Service"
        title="The terms that govern using somygo."
        effectiveDate="02 May 2024"
        lastUpdated="02 May 2024"
      />

      <LegalEntityCard />

      <LegalSection number="" title="Overview">
        <p>
          These Terms of Service ("Terms") govern your use of our websites
          and the provision of immigration consulting services to
          individuals and families. By using the site or engaging our
          services you accept these Terms.
        </p>
        <p>These Terms have three parts:</p>
        <ul>
          <li>
            <strong>Part A: Website Terms</strong> apply to all visitors.
          </li>
          <li>
            <strong>Part B: Services Terms</strong> apply when you request
            paid services.
          </li>
          <li>
            <strong>Part C: General Legal Terms</strong> apply to both.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="1." title="Definitions" tone="alt">
        <DefinitionList items={definitions} />
      </LegalSection>

      <LegalSection number="2." title="Who we are and what we do">
        <Callout tone="info">
          <strong>2.1</strong> We are an immigration consulting practice
          focused on individuals and families. We are not a law firm and we
          do not provide legal representation. Where local law requires
          representation by a regulated adviser (e.g. OISC/SRA in the UK or
          licensed attorneys elsewhere), we coordinate with licensed local
          counsel who will be engaged under their own terms.
        </Callout>
        <Callout tone="info">
          <strong>2.2</strong> We are not affiliated with any government or
          immigration authority (e.g. UKVI / Home Office, USCIS, IRCC,
          embassies). We do not influence officers or expedite decisions
          outside published programmes.
        </Callout>
      </LegalSection>

      <LegalSection number="A." title="Part A: Website Terms" tone="alt">
        <p>
          <strong>3. Use of the site.</strong> Use the site lawfully, for
          its intended purpose, and in accordance with these Terms. Do not
          attempt security testing, scraping, reverse engineering, or any
          activity that harms the site or users. Where an account is
          offered, keep credentials confidential, you are responsible for
          activity under your account.
        </p>
        <p>
          <strong>4. Information on the site.</strong> Site content is
          general information for guidance only. It is not legal advice or a
          guarantee of outcome. Rules change frequently and may vary by
          country and personal circumstances. We try to keep content
          accurate but do not promise completeness, timeliness, or
          error-free material.
        </p>
        <p>
          <strong>5. User content.</strong> If you upload or submit content
          you promise you have the right to share it and that it is accurate
          and lawful. You grant us a limited licence to store and process
          that content to operate the site and deliver requested services.
          See our Privacy Policy for details.
        </p>
        <p>
          <strong>6. Intellectual property.</strong> The site, branding,
          text, graphics, and templates are owned by us or our licensors.
          You may not copy, sell, or reuse any part without permission. You
          may download materials we provide for your personal,
          non-commercial use related to your immigration matter.
        </p>
        <p>
          <strong>7. Third-party links.</strong> The site may link to third
          parties. We do not control or endorse their content or practices.
          Use them at your discretion.
        </p>
      </LegalSection>

      <LegalSection number="B." title="Part B: Services Terms">
        <p>
          <strong>8. Engagement process.</strong> An engagement begins when
          you accept a written proposal, letter of engagement, email quote,
          or online checkout that references these Terms, and you pay any
          initial invoice or retainer. The specific scope, timelines,
          deliverables, and fees for your matter will appear in the
          engagement documents. If there is a conflict, the engagement
          document prevails over these Terms.
        </p>
        <p>
          <strong>9. Our role.</strong> We provide immigration consulting
          and coordination services which may include eligibility
          assessments, strategy, document checklists, templates, form
          completion, submissions where allowed, appointment scheduling,
          interview preparation, status tracking, and post-decision
          guidance. If representation by a regulated professional is
          required by law, we will introduce licensed local counsel. You
          will contract with counsel directly and pay their fees separately
          unless our engagement states otherwise. We remain your day-to-day
          point of contact unless agreed differently.
        </p>
        <p>
          <strong>10. Your responsibilities.</strong> You agree to:
        </p>
        <ul>
          <li>
            provide complete and accurate information and documents in a
            timely manner;
          </li>
          <li>
            tell us promptly about changes, travel plans, or deadlines;
          </li>
          <li>
            review drafts, approve filings, and attend appointments;
          </li>
          <li>
            pay our invoices and third-party fees that are your
            responsibility;
          </li>
          <li>
            comply with laws and instructions of government authorities;
          </li>
          <li>keep copies of all documents you submit and receive.</li>
        </ul>

        <Callout tone="warning">
          <strong>11. No guarantees.</strong> We do not guarantee approvals,
          processing times, interview outcomes, or entry at a border.
          Decisions rest with government authorities. Timelines we share are
          estimates based on current information and may change without
          notice.
        </Callout>

        <p>
          <strong>12. Fees, expenses, and taxes.</strong> Our fees are
          usually stage-based and will be listed in your engagement. We may
          request a retainer that we draw down against future work.
          Government fees, visa centre charges, medicals, police checks,
          translations, courier, travel, evaluations, and counsel fees are
          not included unless stated. You pay these directly where possible.
          Prices are shown before taxes unless stated. Invoices are due upon
          receipt unless the invoice states a due date. Late balances may
          incur interest at the lower of 1.5% per month or the highest rate
          allowed by law. We may pause work for overdue invoices. Unless
          stated otherwise, charges are in GBP and payable via the methods
          listed on your invoice. Bank charges and FX costs are your
          responsibility.
        </p>
      </LegalSection>

      <LegalSection number="C." title="Part C: General Legal Terms" tone="alt">
        <p>
          <strong>13. Privacy.</strong> Our processing of personal data is
          described in our Privacy Policy. By using the site or services
          you acknowledge that policy. If we appoint an EU representative or
          UK representative, their details will appear there.
        </p>

        <Callout tone="info">
          <strong>14. Limitation of liability.</strong> To the fullest
          extent permitted by law, our total liability for all claims
          arising out of or related to the site or services will not
          exceed the fees you paid to us for the services giving rise to
          the claim during the 12 months before the event. We are not
          liable for indirect, incidental, special, consequential, or
          punitive damages, loss of profits, loss of business, or loss of
          data. Nothing in these Terms limits liability for death or
          personal injury caused by negligence, fraud, or other liability
          that cannot be excluded by law.
        </Callout>

        <p>
          <strong>15. Governing law and disputes.</strong> If your
          engagement letter specifies governing law and forum, that clause
          controls. If not, for all clients contracting with our UK entity,
          the law of {LEGAL_ENTITY.jurisdiction} governs and the courts of
          England have exclusive jurisdiction. Consumers may have mandatory
          rights under local law that override parts of this section.
          Before filing a claim, each party will attempt good-faith
          resolution for at least 30 days after written notice of the
          dispute.
        </p>
      </LegalSection>

      <LegalSection number="" title="Country-specific disclosures">
        <p>
          <strong>United Kingdom.</strong> Services are provided by{' '}
          {LEGAL_ENTITY.name} (trading as "{LEGAL_ENTITY.tradingAs}"),
          company number {LEGAL_ENTITY.companyNumber}, registered in{' '}
          {LEGAL_ENTITY.jurisdiction}. Complaints:{' '}
          <a href={`mailto:${ROLE_EMAILS.complaints}`}>
            {ROLE_EMAILS.complaints}
          </a>
          . We aim to acknowledge within 3 business days and respond within
          14 business days. If your matter involves regulated immigration
          advice delivered through a regulated professional, your engagement
          documents will include details of any external complaints
          escalation routes applicable to that regulated provider.
        </p>
        <p>
          <strong>European Union and EEA.</strong> If you are located in the
          EEA and we appoint an EU representative, contact details appear
          in the Privacy Policy. Cross-border transfers are protected by
          appropriate safeguards as described there.
        </p>
      </LegalSection>

      <LegalContactBlock
        primaryEmail={ROLE_EMAILS.legal}
        primaryLabel="Legal contact"
      />
    </div>
  );
};

export default Terms;
