/**
 * Single source of truth for every configurable value in the site.
 * Nothing else in the codebase reads `import.meta.env` directly.
 */

const rawWhatsApp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const rawEmail = (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim();
const rawSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://nexverrtech.com').replace(/\/+$/, '');

export const siteConfig = {
  name: 'NEXVERR TECHNOLOGIES',
  shortName: 'NEXVERR',
  tagline: 'IDEATE • BUILD • SCALE',
  statement: 'Turning Ideas Into Digital Innovations.',
  description:
    'NEXVERR TECHNOLOGIES builds custom software, business systems and digital solutions around the way your business actually works.',
  location: 'Erode, Tamil Nadu, India',
  url: rawSiteUrl,
  ogImage: '/og/og-default.png',
} as const;

export const contactConfig = {
  /** Digits-only international number, e.g. 91XXXXXXXXXX. Empty until configured. */
  whatsappNumber: rawWhatsApp,
  email: rawEmail,
  isWhatsAppConfigured: rawWhatsApp.length >= 10,
  isEmailConfigured: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawEmail),
} as const;

/** Shown in the UI when a channel has not been configured yet. */
export const CONFIG_HINT = {
  whatsapp: 'WhatsApp is not configured yet. Set VITE_WHATSAPP_NUMBER in your .env file.',
  email: 'Email is not configured yet. Set VITE_CONTACT_EMAIL in your .env file.',
} as const;
