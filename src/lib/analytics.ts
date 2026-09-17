import { analyticsConfig } from './config';

/**
 * Google Analytics 4, loaded from the browser only.
 *
 * There is no backend, so this is the whole measurement layer: gtag.js is
 * injected once, page views are sent manually on every route change (the SPA
 * never reloads, so GA's automatic page_view would fire exactly once), and
 * conversion intents are reported as named events.
 *
 * With `VITE_GA_MEASUREMENT_ID` unset every function here is a no-op — no
 * script tag, no network request, no console noise.
 */

/** Every event the site reports. Keeping them in one union stops typos. */
export type AnalyticsEvent =
  | 'page_view'
  | 'contact_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'form_start'
  | 'form_submit'
  | 'service_cta_click'
  | 'project_cta_click'
  | 'start_project_click';

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const SCRIPT_ID = 'nx-ga4';

let initialised = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/**
 * Injects gtag.js once. Safe to call repeatedly; later calls return early.
 * Queued events survive the load because gtag pushes to `dataLayer` directly.
 */
export function initAnalytics(): void {
  if (initialised || !analyticsConfig.isEnabled) return;
  if (typeof document === 'undefined') return;
  if (document.getElementById(SCRIPT_ID)) return;

  initialised = true;

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    analyticsConfig.measurementId,
  )}`;
  document.head.appendChild(script);

  window.gtag = window.gtag ?? ((...args: unknown[]) => gtag(...args));

  gtag('js', new Date());
  // Page views are sent by `trackPageView` so that client-side navigation is
  // measured too; GA's own would only ever fire on the first HTML response.
  gtag('config', analyticsConfig.measurementId, { send_page_view: false });
}

/** Reports a single event. Silently ignored when analytics is not configured. */
export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (!analyticsConfig.isEnabled || typeof window === 'undefined') return;

  const cleaned: EventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') cleaned[key] = value;
  }

  gtag('event', event, cleaned);
}

/** One page view for the given in-app path. */
export function trackPageView(path: string, title: string): void {
  if (!analyticsConfig.isEnabled || typeof window === 'undefined') return;

  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: `${window.location.origin}${path}`,
  });
}
