import { useCallback, useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog: ESC closes, focus is trapped while open and returned to the
 * trigger on close, background scroll is locked, and the backdrop is inert to
 * screen readers.
 */
export function Modal({ open, onClose, title, description, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();

  useLockBodyScroll(open);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener('keydown', handleKeyDown);

    // Focus the panel itself so screen readers announce the dialog title first.
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-[#01050f]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className="nx-glass-strong relative z-10 max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 outline-none sm:rounded-3xl sm:px-8 sm:py-8"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <h2 id={titleId} className="text-sub">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-2 text-sm text-ink-muted">
                    {description}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline text-ink-muted transition-colors duration-200 hover:border-white/20 hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
