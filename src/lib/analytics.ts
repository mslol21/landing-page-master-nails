/**
 * Configure these IDs only after the business owner provides them.
 * Meta Pixel: [INSERIR: ID DO PIXEL]
 * Google Analytics 4: [INSERIR: ID GA4]
 * Until then, no analytics scripts or network requests are loaded.
 */
const META_PIXEL_ID = '[INSERIR: ID DO PIXEL]';
const GA4_MEASUREMENT_ID = '[INSERIR: ID GA4]';
const PLACEHOLDER_PREFIX = '[INSERIR:';

function isConfigured(value: string) {
  return value.trim().length > 0 && !value.startsWith(PLACEHOLDER_PREFIX);
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (isConfigured(META_PIXEL_ID) && !window.fbq) {
    const fbq = Object.assign(
      (...args: unknown[]) => { fbq.queue.push(args); },
      { queue: [] as unknown[][] },
    );
    window.fbq = fbq;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  if (isConfigured(GA4_MEASUREMENT_ID) && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }
}

/** Called by every checkout button so the campaign can measure outbound checkout intent. */
export function trackCheckoutClick(value?: number) {
  if (typeof window === 'undefined') return;
  window.fbq?.('track', 'InitiateCheckout', value === undefined ? {} : { value, currency: 'BRL' });
  window.gtag?.('event', 'begin_checkout', value === undefined ? {} : { value, currency: 'BRL' });
}

/** Called once when each main landing-page section enters the viewport. */
export function trackSectionView(sectionName: string) {
  if (typeof window === 'undefined') return;
  window.fbq?.('trackCustom', 'SectionView', { section_name: sectionName });
  window.gtag?.('event', 'section_view', { section_name: sectionName });
}
