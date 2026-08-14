/**
 * The shape of a project inquiry, shared by the form, the WhatsApp channel and
 * the email channel. When a backend/CRM is added in v2, it consumes this same
 * type — no component changes required.
 */
export interface InquiryData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
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
  const lines = [
    `Name: ${data.name}`,
    data.company?.trim() ? `Company: ${data.company.trim()}` : null,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    '',
    'Project Requirement:',
    data.message,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}
