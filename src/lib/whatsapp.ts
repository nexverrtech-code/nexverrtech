import { CONFIG_HINT, contactConfig, siteConfig } from './config';
import { formatInquiryBody, type InquiryData, type InquiryResult } from './inquiry';

/**
 * Free click-to-chat hand-off. No WhatsApp Business API, no backend, no vendor.
 * The visitor's own WhatsApp sends the message, so nothing is "received" until
 * they press send — the UI must not claim otherwise.
 */

const WA_BASE = 'https://wa.me';

function buildMessage(data: InquiryData): string {
  return [
    `Hello ${siteConfig.name},`,
    '',
    'I would like to discuss a project.',
    '',
    formatInquiryBody(data),
    '',
    'Please contact me regarding this project.',
  ].join('\n');
}

/** Chat link with a pre-filled inquiry message. */
export function createWhatsAppInquiryUrl(data: InquiryData): string | null {
  if (!contactConfig.isWhatsAppConfigured) return null;
  return `${WA_BASE}/${contactConfig.whatsappNumber}?text=${encodeURIComponent(buildMessage(data))}`;
}

/** Plain chat link with no form data — used by the floating button and footer. */
export function createWhatsAppDirectUrl(prefill?: string): string | null {
  if (!contactConfig.isWhatsAppConfigured) return null;
  const text = prefill ?? `Hello ${siteConfig.name}, I would like to discuss a project.`;
  return `${WA_BASE}/${contactConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp in a new tab with the inquiry pre-filled. */
export function createWhatsAppInquiry(data: InquiryData): InquiryResult {
  const url = createWhatsAppInquiryUrl(data);
  if (!url) return { handedOff: false, error: CONFIG_HINT.whatsapp };

  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    return {
      handedOff: false,
      error: 'Your browser blocked the WhatsApp window. Allow pop-ups and try again.',
    };
  }

  return { handedOff: true };
}
