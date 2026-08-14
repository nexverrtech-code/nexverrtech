import { CONFIG_HINT, contactConfig } from './config';
import { formatInquiryBody, type InquiryData, type InquiryResult } from './inquiry';

/**
 * Free `mailto:` hand-off — the visitor's own mail client sends the inquiry.
 * Swappable for a transactional email service in v2 without touching the UI.
 */

export function createEmailInquiryUrl(data: InquiryData): string | null {
  if (!contactConfig.isEmailConfigured) return null;

  const subject = `New Project Inquiry – ${data.service}`;
  const body = formatInquiryBody(data);

  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens the visitor's mail client with the inquiry pre-filled. */
export function createEmailInquiry(data: InquiryData): InquiryResult {
  const url = createEmailInquiryUrl(data);
  if (!url) return { handedOff: false, error: CONFIG_HINT.email };

  // `location.assign` keeps the current tab, which is how mail clients expect to
  // be invoked; window.open leaves an orphaned blank tab on most browsers.
  window.location.assign(url);
  return { handedOff: true };
}

export function createMailtoLink(subject?: string): string | null {
  if (!contactConfig.isEmailConfigured) return null;
  return subject
    ? `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${contactConfig.email}`;
}
