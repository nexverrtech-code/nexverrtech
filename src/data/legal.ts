import { analyticsConfig, contactConfig, siteConfig } from '@/lib/config';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  /** Sits under the H1. */
  summary: string;
  effectiveDate: string;
  sections: LegalSection[];
}

/** Both documents state this date. Update it whenever the text changes. */
const EFFECTIVE_DATE = '2026-09-16';

const contactLine = contactConfig.isEmailConfigured
  ? `You can reach us at ${contactConfig.email}.`
  : 'You can reach us through the contact page on this website.';

/**
 * Website-level legal text.
 *
 * It describes what this website actually does and nothing more: there is no
 * account system, no database and no server that receives form submissions, so
 * the policy does not pretend to govern any of those. Anything that would need
 * a lawyer's sign-off — engagement terms, service level commitments, data
 * processing agreements — lives in the written agreement for a project, not
 * here.
 */
export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  summary: `How ${siteConfig.name} handles information in connection with this website.`,
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: 'The short version',
      paragraphs: [
        'This website has no user accounts, no login and no database. It does not store the details you type into the inquiry form, because there is no server here to store them on.',
        'When you submit the form, your browser opens WhatsApp or your own email application with the message prepared for you. Nothing is sent until you press send in that application, and at that point the message travels through that service, not through this website.',
      ],
    },
    {
      heading: 'Information you choose to send us',
      paragraphs: [
        'If you contact us by WhatsApp or email, we receive whatever you include in that message — typically your name, your business, your contact details and a description of what you want built.',
        'We use that information for one purpose: to understand your requirement and reply to it. We do not sell it, rent it, or share it with anyone outside the engagement. It stays in the inbox or messaging account it arrived in, and in our project records if the work proceeds.',
      ],
    },
    {
      heading: 'Analytics',
      paragraphs: analyticsConfig.isEnabled
        ? [
            'This website uses Google Analytics 4 to understand which pages are read and how visitors arrive. It records page views and a small number of interaction events — for example that a contact button was clicked — along with technical information such as approximate location, device type, browser and referring source.',
            'Google Analytics sets cookies in your browser and processes data on Google’s infrastructure. It does not tell us who you are. We use it to improve the site, not to build a profile of any individual.',
            'You can opt out by using your browser’s Do Not Track or cookie controls, by blocking analytics scripts, or by installing Google’s official opt-out browser add-on. Blocking analytics does not affect anything else on this site.',
          ]
        : [
            'Analytics is not currently enabled on this website. If it is switched on in future, this section will describe exactly what is measured before it goes live.',
          ],
    },
    {
      heading: 'Cookies and local storage',
      paragraphs: analyticsConfig.isEnabled
        ? [
            'This website sets no cookies of its own. The only cookies present are those set by Google Analytics, described above. We do not use advertising cookies, remarketing pixels or cross-site trackers.',
          ]
        : [
            'This website sets no cookies of its own, and no advertising, remarketing or cross-site tracking technologies are used.',
          ],
    },
    {
      heading: 'Third-party services this site relies on',
      bullets: [
        'Hosting — the site is served by a content delivery network, which keeps standard server logs including IP addresses for security and operational purposes.',
        'Google Fonts — the typeface is requested from Google’s font service, which receives your IP address as part of that request.',
        'WhatsApp (Meta) — used only when you choose to open a WhatsApp chat with us. That conversation is governed by WhatsApp’s own terms and privacy policy.',
        'Your email provider — used only when you choose to send us an email. The message is handled by your provider and ours.',
        ...(analyticsConfig.isEnabled
          ? ['Google Analytics — described in the analytics section above.']
          : []),
      ],
    },
    {
      heading: 'Links to other websites',
      paragraphs: [
        'Where this site links to another website, that site has its own privacy practices. We are not responsible for what happens after you leave this domain.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This website is aimed at businesses and is not directed at children. We do not knowingly collect information from children through it.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        'If you have sent us a message and would like us to delete the details you shared, write to us and we will remove them from our records, except where we are required to keep them for legal or accounting reasons.',
        contactLine,
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'If what this website does changes — for example if a form begins submitting to a server, or a new third-party service is added — this policy is updated before that change goes live, and the effective date above is revised.',
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: 'Terms & Conditions',
  summary: `The terms that apply to your use of the ${siteConfig.name} website.`,
  effectiveDate: EFFECTIVE_DATE,
  sections: [
    {
      heading: 'About these terms',
      paragraphs: [
        `These terms apply to this website only. Any project ${siteConfig.name} carries out for a client is governed by the separate written agreement for that engagement, which takes precedence over anything on this site.`,
        'By using this website you accept these terms. If you do not accept them, please do not use the site.',
      ],
    },
    {
      heading: 'What the content on this site is',
      paragraphs: [
        'The pages here describe the services we offer, the industries we build for, and work we have delivered. They are written to be accurate and are reviewed as things change.',
        'They are general information, not advice for your specific situation, and not an offer capable of acceptance. Scope, timelines and costs for any project are confirmed in writing after we have understood the requirement.',
      ],
    },
    {
      heading: 'Project information and client work',
      paragraphs: [
        'Client names and project descriptions are published only where the client is content for them to appear. Where a detail — a feature, a technology, a result — has not been confirmed, it is left out rather than estimated.',
        'No figures, testimonials, ratings or awards appear anywhere on this site unless they are verified. If you believe something published here is inaccurate, tell us and we will correct it.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        `The design, text, graphics, logo and code of this website belong to ${siteConfig.name}, except where third-party material is used under licence.`,
        'You may read, print and share pages for your own reference. You may not copy the site or substantial parts of it for commercial use, or present our material as your own, without written permission.',
        'Client names and marks referred to on this site remain the property of those businesses.',
      ],
    },
    {
      heading: 'Acceptable use',
      bullets: [
        'Do not attempt to gain unauthorised access to this site or anything connected to it.',
        'Do not use automated tools in a way that degrades the site for other visitors.',
        'Do not use this site to transmit unlawful, harmful or misleading material.',
        'Do not misrepresent an association with, or endorsement by, this company.',
      ],
    },
    {
      heading: 'Availability',
      paragraphs: [
        'We aim to keep this site available and current, but we do not guarantee uninterrupted access. It may be unavailable during maintenance, or because of factors outside our control.',
      ],
    },
    {
      heading: 'Third-party links and services',
      paragraphs: [
        'This site links to third-party services such as WhatsApp, and loads resources such as web fonts from third-party providers. Those services operate under their own terms, and we are not responsible for their content or their availability.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, we are not liable for any loss arising from reliance on the general information published on this website. Nothing in these terms limits liability that cannot lawfully be limited.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        `These terms are governed by the laws of India, and the courts at ${siteConfig.city}, ${siteConfig.region} have jurisdiction over any dispute arising from the use of this website.`,
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `If you have a question about these terms, get in touch. ${contactLine}`,
      ],
    },
  ],
};
