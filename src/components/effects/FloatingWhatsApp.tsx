import { MessageCircle } from 'lucide-react';
import { createWhatsAppDirectUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';

/**
 * The site's only floating action. Hidden entirely until a WhatsApp number is
 * configured, so it can never open an empty chat.
 *
 * Its entrance is a CSS animation rather than a JavaScript one: this button is
 * mounted on every page, and importing the animation library for it would put
 * 39 kB gzipped back into the critical path of every route.
 */
export function FloatingWhatsApp() {
  const url = createWhatsAppDirectUrl();

  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NEXVERR on WhatsApp"
      onClick={() => track('whatsapp_click', { source: 'floating-button' })}
      className="group fixed bottom-5 right-4 z-40 flex h-14 w-14 animate-fade-up items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_14px_40px_-12px_rgba(31,168,85,0.85)] transition-colors duration-300 ease-smooth hover:bg-[#199a4c] sm:bottom-7 sm:right-7"
      style={{ marginBottom: 'env(safe-area-inset-bottom)', animationDelay: '1.2s' }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      <span className="sr-only">Open WhatsApp chat</span>
    </a>
  );
}
