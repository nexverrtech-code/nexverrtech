/**
 * The shape of a project inquiry, shared by the form, the WhatsApp channel and
 * the email channel. Nothing here is stored anywhere — the object exists only
 * long enough to be formatted into a message the visitor sends themselves.
 */
export interface InquiryData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export type InquiryChannel = 'whatsapp' | 'email';

export interface InquiryResult {
  /** True when the hand-off to WhatsApp / the mail client was triggered. */
  handedOff: boolean;
  /** Present when the channel is not configured or could not be opened. */
  error?: string;
}

/** Formats the inquiry as the plain-text body both channels share. */
export function formatInquiryBody(data: InquiryData): string {
  const optional = (label: string, value?: string) =>
    value && value.trim() ? `${label}: ${value.trim()}` : null;

  const lines = [
    `Name: ${data.name}`,
    optional('Company', data.company),
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    optional('Budget', data.budget),
    optional('Timeline', data.timeline),
    '',
    'Project Requirement:',
    data.message,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}
