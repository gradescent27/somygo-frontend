// Cookie.js: Cookie Policy
//
// Restructured around the LegalPrimitives. Two sections from the prior
// version were dropped because they were developer-facing template content
// that shouldn't appear on a public privacy page:
//   - "Optional banner and settings copy", boilerplate banner suggestions
//   - "Implementation tips for your developer", developer instructions
//
// All other content is preserved.

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

const cookieRows = [
  ['Strictly necessary', 'cookie_consent_status', 'remembers your consent choices', '6–12 months', 'first-party'],
  ['Strictly necessary', '__cf_bm', 'bot management / security (if using a CDN)', 'up to 30 minutes', 'third-party (CDN)'],
  ['Strictly necessary', 'session_id', 'keeps you signed in / session state', 'session', 'first-party'],
  ['Performance & analytics', '_ga, _gid, _gat', 'Google Analytics identifiers / throttling', '1 minute to 24 months', 'third-party (Google)'],
  ['Performance & analytics', '_clck, _clsk', 'Microsoft Clarity session & clickstream', 'session to 12 months', 'third-party (Microsoft)'],
  ['Performance & analytics', 'log_level / error_state', 'error tracking & stability', 'session to 12 months', 'first / third-party'],
  ['Functionality', 'locale / lang', 'remembers language / region', '6–12 months', 'first-party'],
  ['Functionality', 'remember_me', 'saves login / form preference', '30 days–12 months', 'first-party'],
  ['Advertising & social', '_fbp', 'Facebook pixel for measurement', '~3 months', 'third-party (Meta)'],
  ['Advertising & social', '_tt_enable_cookie, _ttp', 'TikTok pixel', 'up to 13 months', 'third-party (TikTok)'],
  ['Advertising & social', 'li_fat_id', 'LinkedIn Insights', 'up to 6 months', 'third-party (LinkedIn)'],
  ['Embeds', 'yt_innertube_*, VISITOR_INFO1_LIVE', 'YouTube embed preferences / measurement', 'up to 6 months', 'third-party (Google)'],
  ['Email pixels', 'ESP open / click trackers', 'measure engagement in emails', 'per email', 'third-party ESP'],
];

const Cookie = () => {
  return (
    <div className="bg-white">
      <LegalHero
        eyebrow="Cookie Policy"
        title="How we use cookies."
        effectiveDate="02 May 2024"
        lastUpdated="02 May 2024"
      />

      <LegalEntityCard />

      <LegalOfficesGrid />

      <LegalSection number="1." title="What cookies and similar technologies are">
        <p>
          <strong>Cookies</strong> are small text files placed on your
          device when you visit a website.
        </p>
        <p>
          <strong>Pixels and tags</strong> are small pieces of code that
          help us understand usage and the success of features or emails.
        </p>
        <p>
          <strong>Local storage and session storage</strong> allow a site to
          store data in your browser.
        </p>
        <p>
          <strong>SDKs</strong> are similar tools used in mobile apps.
        </p>
        <p>
          These technologies help a site function, keep you signed in,
          remember choices, measure performance and, where enabled,
          personalise content or ads.
        </p>
      </LegalSection>

      <LegalSection number="2." title="Types of cookies we use" tone="alt">
        <p>
          We group cookies by purpose. You can manage non-essential
          categories in the Cookie Settings panel.
        </p>

        <p>
          <strong>Strictly necessary.</strong> Required for the site to
          work. Examples: page navigation, loading resources, security,
          forms, fraud prevention, cookie-consent storage. Always active
          because they are essential.
        </p>
        <p>
          <strong>Performance and analytics.</strong> Help us understand
          how the site is used so we can improve it. Examples: page views,
          time on page, error logs, campaign attribution. Data is
          aggregated where possible. IPs may be truncated or anonymised
          when configured.
        </p>
        <p>
          <strong>Functionality.</strong> Remember your preferences.
          Examples: language, region, saved form inputs, accessibility
          settings.
        </p>
        <p>
          <strong>Advertising and social media.</strong> Show or measure
          ads, build audiences, or allow social sharing. May track you
          across sites. We only use these with your consent where required
          by law.
        </p>
        <p>
          <strong>Email tracking pixels.</strong> If you opt in to emails,
          we may use pixels to measure opens and link clicks. You can
          disable images in your email client to limit this.
        </p>
      </LegalSection>

      <LegalSection number="3." title="First-party vs third-party">
        <p>
          <strong>First-party cookies</strong> are set by somygo.com.
        </p>
        <p>
          <strong>Third-party cookies</strong> are set by service providers,
         for example, analytics or embedded video. Third parties may
          treat the data they collect as personal data under applicable law.
        </p>
      </LegalSection>

      <LegalSection number="4." title="Duration" tone="alt">
        <p>
          <strong>Session cookies</strong> delete when you close your
          browser.
        </p>
        <p>
          <strong>Persistent cookies</strong> stay for a set time or until
          you delete them. We set reasonable lifetimes and review them
          periodically.
        </p>
      </LegalSection>

      <LegalSection number="5." title="Legal basis for cookies">
        <p>
          <strong>Strictly necessary.</strong> Our legitimate interests in
          running a secure and functional site (and / or performance of a
          contract where applicable).
        </p>
        <p>
          <strong>
            Performance, functionality, advertising, social.
          </strong>{' '}
          Your consent where required under UK and EU law. In some
          jurisdictions we may rely on legitimate interests for limited,
          privacy-protective analytics. You can withdraw consent at any
          time in Cookie Settings.
        </p>
      </LegalSection>

      <LegalSection number="6." title="Your choices" tone="alt">
        <p>
          <strong>A. Cookie Settings panel.</strong> Click Cookie Settings
          on our site to review, accept, or reject categories. Your choices
          apply to the browser and device you use. If you clear cookies or
          use a different device or browser, you'll need to set
          preferences again.
        </p>
        <p>
          <strong>B. Browser controls.</strong> Most browsers let you block
          or delete cookies under Privacy or Security settings. Blocking
          strictly necessary cookies may break site features.
        </p>
        <p>
          <strong>C. Do Not Track and Global Privacy Control.</strong>{' '}
          There is no consistent DNT standard, so we do not respond to
          DNT. Where required by law, we treat Global Privacy Control
          (GPC) as a request to opt out of the sale or sharing of personal
          information for cross-context behavioural advertising. You can
          still adjust Cookie Settings for more granular control.
        </p>
        <p>
          <strong>D. Advertising choices.</strong> You can opt out of
          interest-based advertising from many providers at network opt-out
          pages in your country (e.g. youradchoices.com or
          youronlinechoices.eu). This limits targeted ads but does not
          remove ads.
        </p>
      </LegalSection>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl md:text-3xl font-bold text-acGold leading-none select-none">
              7.
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-inter text-acBlack leading-tight">
              Cookies we commonly use
            </h2>
          </div>
          <p className="text-acGray font-light leading-relaxed mb-6">
            This list is illustrative. We may update it as our site
            changes; material changes will be reflected in this policy.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full bg-white text-sm">
              <thead className="bg-acBg">
                <tr>
                  {['Category', 'Name / Example', 'Purpose', 'Lifetime', 'Party'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-acBlack text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cookieRows.map((row, i) => (
                  <tr key={i} className="hover:bg-acBg/40 transition-colors">
                    <td className="px-4 py-3 text-acBlack font-medium">
                      {row[0]}
                    </td>
                    <td className="px-4 py-3 text-acGray font-mono text-xs">
                      {row[1]}
                    </td>
                    <td className="px-4 py-3 text-acGray font-light">
                      {row[2]}
                    </td>
                    <td className="px-4 py-3 text-acGray font-light whitespace-nowrap">
                      {row[3]}
                    </td>
                    <td className="px-4 py-3 text-acGray font-light whitespace-nowrap">
                      {row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <LegalSection
        number="8."
        title="When consent is required and how we collect it"
        tone="alt"
      >
        <p>
          In the UK and EEA we obtain consent before placing or reading
          non-essential cookies. Our banner presents clear options:{' '}
          <strong>Accept all</strong>, <strong>Reject non-essential</strong>,
          and <strong>Manage settings</strong>. We record consent choices
          and the timestamp to demonstrate compliance. If you continue
          browsing after rejecting non-essential cookies, only strictly
          necessary cookies will be used.
        </p>
      </LegalSection>

      <LegalSection
        number="9."
        title="Special notes for California and certain US states"
      >
        <p>
          Some cookies used for advertising or analytics may be considered a
          sale or sharing of personal information under state laws such as
          the California Consumer Privacy Act (as amended by CPRA).
        </p>
        <Callout tone="info">
          To opt out of sale or sharing, use the{' '}
          <strong>
            Do Not Sell or Share My Personal Information
          </strong>{' '}
          link in the footer or adjust the Cookie Settings panel. We also
          honour GPC signals where required.
        </Callout>
        <p>
          Your rights are described in our Privacy Policy and may include
          access, deletion, correction, and the right to limit the use of
          sensitive personal information.
        </p>
      </LegalSection>

      <LegalSection number="10." title="Data we collect through cookies" tone="alt">
        <p>
          Depending on your settings, cookies may collect: device and
          browser type, operating system, IP address, general location,
          pages viewed, buttons clicked, time spent, referring URLs, and
          campaign identifiers. We use aggregation and de-identification
          where possible, and retention periods that match the purpose.
        </p>
        <p>
          We keep cookie data only as long as needed for each purpose.
          Persistent cookies have fixed lifetimes shown in the table.
          Analytics data is retained according to our analytics provider
          settings and our data retention policy.
        </p>
      </LegalSection>

      <LegalSection number="11." title="Children">
        <p>
          Our site is not directed to children. We process children's
          information only when necessary for family immigration services
          and only through parents or legal guardians, not for advertising.
        </p>
      </LegalSection>

      <LegalSection number="12." title="Updates to this policy" tone="alt">
        <p>
          We may update this Cookie Policy from time to time. Material
          changes will be posted on this page with a new effective date. If
          required by law, we will ask for consent again.
        </p>
      </LegalSection>

      <LegalContactBlock
        primaryEmail={ROLE_EMAILS.privacy}
        primaryLabel="Privacy contact"
      />
    </div>
  );
};

export default Cookie;
