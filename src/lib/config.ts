/**
 * Single source of truth for every configurable value in the site.
 * Nothing else in the codebase reads `import.meta.env` directly.
 */

const rawWhatsApp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const rawEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim();
const rawPhone = (import.meta.env.VITE_CONTACT_PHONE ?? '').trim();
const rawSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://nexverrtech.com').replace(/\/+$/, '');
const rawGaId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim();

export const siteConfig = {
  name: 'NEXVERR TECHNOLOGIES',
  shortName: 'NEXVERR',
  tagline: 'IDEATE • BUILD • SCALE',
  statement: 'Turning Ideas Into Digital Innovations.',
  /** Search-facing one-liner. Also the Organization schema description. */
  description:
    'NEXVERR TECHNOLOGIES is an Erode software development company building custom software, websites, ERP, mobile apps and business automation solutions.',
  /** Positioning line used in body copy, not in metadata. */
  positioning: 'Business digitalization and custom software solutions.',
  city: 'Erode',
  region: 'Tamil Nadu',
  country: 'India',
  location: 'Erode, Tamil Nadu, India',
  url: rawSiteUrl,
  ogImage: '/og/og-default.png',
  /**
   * Public profiles, used for `sameAs` in Organization schema and the footer.
   * Empty until verified URLs are supplied — a wrong profile is worse than none.
   */
  socialProfiles: [] as { label: string; url: string }[],
} as const;

export const contactConfig = {
  /** Digits-only international number, e.g. 91XXXXXXXXXX. Empty until configured. */
  whatsappNumber: rawWhatsApp,
  email: rawEmail,
  /** Display/dial number, e.g. +91 99941 40525. Optional. */
  phone: rawPhone,
  isWhatsAppConfigured: rawWhatsApp.length >= 10,
  isEmailConfigured: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawEmail),
  isPhoneConfigured: rawPhone.replace(/\D/g, '').length >= 10,
} as const;

export const analyticsConfig = {
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Analytics is inert while empty. */
  measurementId: rawGaId,
  isEnabled: /^G-[A-Z0-9]{6,}$/i.test(rawGaId),
} as const;

/** Shown in the UI when a channel has not been configured yet. */
export const CONFIG_HINT = {
  whatsapp: 'WhatsApp is not configured yet. Set VITE_WHATSAPP_NUMBER in your .env file.',
  email: 'Email is not configured yet. Set VITE_CONTACT_EMAIL in your .env file.',
} as const;
