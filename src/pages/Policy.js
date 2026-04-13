// Policy.js: Privacy Policy
//
// Restructured around the LegalPrimitives. Content preserved from the prior
// version (which was correct immigration / GDPR-aware copy), only the
// design and the legal entity references have changed.
//
// To edit copy, change it inline below. To change the legal entity (name,
// company number, registered office), edit src/data/legal.js, it's used
// throughout these legal pages.

import React from 'react';
import {
  LegalHero,
  LegalEntityCard,
  LegalSection,
  Callout,
  LegalContactBlock,
  LegalOfficesGrid,
} from '../components/legal/LegalPrimitives';
import { ROLE_EMAILS } from '../data/legal';

const Policy = () => {
  return (
    <div className="bg-white">
      <LegalHero
        eyebrow="Privacy Policy"
        title="How we handle your data."
        effectiveDate="02 May 2024"
        lastUpdated="02 May 2024"
      />

      <LegalEntityCard />

      <LegalOfficesGrid />

      <LegalSection number="1." title="Scope">
        <p>
          This policy explains how we collect, use, disclose, store, and
          protect personal data when you:
        </p>
        <ul>
          <li>visit our websites or social pages;</li>
          <li>submit a form or book a consultation;</li>
          <li>engage us for immigration services;</li>
          <li>receive updates or marketing communications; or</li>
          <li>apply for a role with us.</li>
        </ul>
        <p>
          This policy does not cover third-party websites or services we
          link to.
        </p>
      </LegalSection>

      <LegalSection number="2." title="The data we collect" tone="alt">
        <p>
          <strong>A. Identity & contact</strong>: name, aliases, date and
          place of birth, nationality, passport or ID numbers, photos,
          signatures, addresses, phone numbers, email addresses.
        </p>
        <p>
          <strong>B. Case & eligibility</strong>: CV/résumé, education,
          employment history, job offers and contracts, salary and tax data,
          licences, study offers and enrolment, sponsorship and invitations.
        </p>
        <p>
          <strong>C. Family & relationships</strong>: marital or partnership
          status, spouse, partner, and children details, birth and marriage
          records, custody and consent documents.
        </p>
        <p>
          <strong>D. Immigration & travel</strong>: prior visas and permits,
          refusals, travel history, entry and exit stamps, I-94 or
          equivalents, biometrics notices, case numbers, decision letters.
        </p>
        <p>
          <strong>E. Finance & documents</strong>: bank statements, proof of
          funds, sponsorship declarations, company and ownership records,
          source of funds and wealth (e.g. for investor routes).
        </p>
        <p>
          <strong>F. Sensitive data (special category / criminal)</strong>:
          health information for medicals (e.g. TB tests), disability
          accommodations, police certificates, and data revealing racial,
          ethnic, or religious origin where present on official records. We
          collect this only where necessary and lawful.
        </p>
        <p>
          <strong>G. Technical & usage</strong>: device identifiers, IP
          address, country inferred from IP, pages visited, referring URLs,
          timestamps, cookies, and pixels for analytics and session
          management.
        </p>
        <p>
          <strong>H. Communications</strong>: emails, messages, call notes,
          WhatsApp or chat transcripts (if you choose to use them), and
          feedback.
        </p>
      </LegalSection>

      <LegalSection number="3." title="Where we get your data">
        <ul>
          <li>directly from you or someone you authorise;</li>
          <li>your employer or prospective employer, school, or sponsor;</li>
          <li>
            government bodies and visa centres where you ask us to interact;
          </li>
          <li>
            public sources and verification providers, where appropriate;
          </li>
          <li>
            service providers (e-signature, scheduling, payments,
            translation, identity verification).
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        number="4."
        title="How we use your data and lawful bases"
        tone="alt"
      >
        <p>We process personal data only where a lawful basis applies.</p>

        <p>
          <strong>A. Providing services / contract</strong>: eligibility
          assessments, strategy, document preparation, bookings, submissions
          where permitted, status tracking, and guidance.{' '}
          <em>Basis: performance of a contract or steps prior to a contract.</em>
        </p>
        <p>
          <strong>B. Compliance with law</strong>: record-keeping, tax and
          accounting, sanctions and identity checks, lawful requests.{' '}
          <em>Basis: legal obligation.</em>
        </p>
        <p>
          <strong>C. Legitimate interests</strong>: client relationship
          management, improving services, preventing fraud and abuse,
          security of our systems, audits, business continuity.{' '}
          <em>Basis: legitimate interests not overridden by your rights.</em>
        </p>
        <p>
          <strong>D. Consent</strong>: optional marketing, testimonials, and
          certain uses where required.{' '}
          <em>Basis: your consent (you can withdraw at any time).</em>
        </p>
        <p>
          <strong>E. Vital interests</strong>: urgent circumstances
          affecting health or safety. <em>Basis: vital interests.</em>
        </p>

        <Callout tone="warning">
          <strong>
            Special category and criminal-history data (only where needed for
            immigration work):
          </strong>
          <ul className="mt-3">
            <li>
              legal claims and advice (establishment, exercise, defence of
              claims);
            </li>
            <li>substantial public interest where permitted by law;</li>
            <li>
              explicit consent where required (withdrawal may affect our
              ability to act).
            </li>
          </ul>
        </Callout>
      </LegalSection>

      <LegalSection number="5." title="Automated decisions and profiling">
        <p>
          We do not make decisions with legal or similarly significant
          effects based solely on automated processing. Government
          authorities may use automated tools in their own systems; we do
          not control those systems.
        </p>
      </LegalSection>

      <LegalSection number="6." title="Sharing your data" tone="alt">
        <p>
          We share data only for the purposes described and with appropriate
          safeguards:
        </p>
        <ul>
          <li>
            licensed local counsel where regulated representation is
            required;
          </li>
          <li>translation and legalisation providers and document couriers;</li>
          <li>
            medical panels and police certificate bodies at your instruction;
          </li>
          <li>
            government authorities and visa centres to submit and manage
            applications;
          </li>
          <li>
            technology vendors acting as processors (secure cloud storage,
            CRM, email, scheduling, e-signature, ticketing, accounting);
          </li>
          <li>payment processors for billing;</li>
          <li>professional advisers and auditors;</li>
          <li>
            successors in a merger, acquisition, or reorganisation, with
            safeguards.
          </li>
        </ul>

        <Callout tone="success">
          <strong>We do not sell personal data</strong> and we do not share
          it for cross-context behavioural advertising.
        </Callout>

        <Callout tone="info">
          <strong>Controller vs processor.</strong> When engaged directly by
          you, we are a controller. If we deliver services to you on behalf
          of your employer or sponsor under their instructions, we may act
          as a processor and will process your data according to that
          contract.
        </Callout>
      </LegalSection>

      <LegalSection number="7." title="International transfers">
        <p>
          To deliver services, we may transfer data internationally,
          including:
        </p>
        <ul>
          <li>between the UK and the United States;</li>
          <li>
            between the UK / EEA and other countries relevant to your matter.
          </li>
        </ul>
        <p>
          For transfers from the UK or EEA to countries without an adequacy
          decision, we use appropriate safeguards such as:
        </p>
        <ul>
          <li>
            Standard Contractual Clauses (EU SCCs) and the UK Addendum;
          </li>
          <li>
            vendor participation in the EU-US or UK-US Data Privacy Framework
            where applicable;
          </li>
          <li>
            additional technical and organisational measures (encryption,
            access controls).
          </li>
        </ul>
        <p>
          Request copies of applicable safeguards at{' '}
          <a href={`mailto:${ROLE_EMAILS.privacy}`}>{ROLE_EMAILS.privacy}</a>.
        </p>
      </LegalSection>

      <LegalSection number="8." title="Data retention" tone="alt">
        <p>
          We retain data only as long as necessary for the purposes in this
          policy and to meet legal and regulatory requirements. Typical
          periods:
        </p>
        <ul>
          <li>
            <strong>Client matter files</strong>: 6 years after case
            closure (longer if required for legal claims).
          </li>
          <li>
            <strong>Accounting and tax</strong>: 7 years from the end of
            the financial year.
          </li>
          <li>
            <strong>KYC and sanctions checks</strong>: 5 years from the end
            of the client relationship (or as required by law).
          </li>
          <li>
            <strong>Marketing contacts</strong>: until you opt out, then
            minimal suppression data for up to 2 years.
          </li>
          <li>
            <strong>Recruitment applications</strong>: 12 months if not
            hired (or as required by local law).
          </li>
          <li>
            <strong>Messaging transcripts</strong>: up to 2 years from case
            closure (longer if required for compliance).
          </li>
        </ul>
        <p>
          If you request deletion, we'll comply subject to legal limits and
          explain any records we must retain.
        </p>
      </LegalSection>

      <LegalSection number="9." title="Security">
        <p>We apply layered safeguards proportionate to risk, including:</p>
        <ul>
          <li>role-based and least-privilege access;</li>
          <li>encryption in transit and at rest, where supported;</li>
          <li>multi-factor authentication for key systems;</li>
          <li>backups and continuity planning;</li>
          <li>vendor due diligence and confidentiality obligations;</li>
          <li>audit logging;</li>
          <li>employee training.</li>
        </ul>
        <Callout tone="warning">
          No system is perfectly secure. If we become aware of an incident
          affecting your data, we will act promptly and, where required by
          law, notify you and relevant authorities without undue delay.
        </Callout>
      </LegalSection>

      <LegalSection number="10." title="Your rights" tone="alt">
        <p>Depending on your location, you may have rights to:</p>
        <ul>
          <li>access your data;</li>
          <li>rectify inaccurate or incomplete data;</li>
          <li>erase data in certain cases;</li>
          <li>restrict processing in certain cases;</li>
          <li>
            data portability (a machine-readable copy of data you provided);
          </li>
          <li>
            object to processing based on legitimate interests or to direct
            marketing;
          </li>
          <li>withdraw consent where processing relies on consent;</li>
          <li>complain to a supervisory authority.</li>
        </ul>

        <Callout tone="info">
          <strong>How to exercise your rights:</strong> email{' '}
          <a href={`mailto:${ROLE_EMAILS.privacy}`}>{ROLE_EMAILS.privacy}</a>.
          We may need to verify your identity and clarify the request. We
          aim to respond within one month, or inform you if more time is
          needed due to complexity.
        </Callout>

        <p>
          <strong>Supervisory authorities:</strong>
        </p>
        <ul>
          <li>
            <strong>UK</strong>: Information Commissioner's Office
            (ico.org.uk)
          </li>
          <li>
            <strong>EEA</strong>: your local Data Protection Authority (see
            edpb.europa.eu)
          </li>
          <li>
            <strong>US</strong>: your state attorney general or relevant
            federal agency
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="11." title="Quick summary for clients">
        <ul>
          <li>
            We collect only what's needed to deliver immigration services
            and meet legal duties.
          </li>
          <li>We never sell your personal data.</li>
          <li>
            We share data only with authorities, licensed counsel, and
            trusted providers, under safeguards.
          </li>
          <li>
            You control marketing choices and can exercise privacy rights at
            any time.
          </li>
          <li>
            We keep data only as long as needed and protect it with layered
            security.
          </li>
        </ul>
      </LegalSection>

      <LegalContactBlock
        primaryEmail={ROLE_EMAILS.privacy}
        primaryLabel="Privacy contact"
      />
    </div>
  );
};

export default Policy;
