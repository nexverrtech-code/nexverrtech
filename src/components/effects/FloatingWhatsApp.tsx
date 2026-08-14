import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppDirectUrl } from '@/lib/whatsapp';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The site's only floating action. Hidden entirely until a WhatsApp number is
 * configured, so it can never open an empty chat.
 */
export function FloatingWhatsApp() {
  const url = createWhatsAppDirectUrl();
  const reducedMotion = useReducedMotion();

  if (!url) return null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NEXVERR on WhatsApp"
      className="group fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-[0_14px_40px_-12px_rgba(31,168,85,0.85)] transition-[width,background-color] duration-300 ease-smooth hover:bg-[#199a4c] sm:bottom-7 sm:right-7"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
      <span className="sr-only">Open WhatsApp chat</span>
    </motion.a>
  );
}
