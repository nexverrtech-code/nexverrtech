import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useInquiry } from '@/context/InquiryContext';
import { mobileNav } from '@/data/navigation';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();
  const { openInquiry } = useInquiry();
  const reducedMotion = useReducedMotion();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useLockBodyScroll(open);

  // Close on navigation. Deliberately keyed on `pathname` alone — adding `open`
  // to the deps would close the menu the instant it is opened.
  useEffect(() => {
    onCloseRef.current();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[95] flex flex-col bg-base lg:hidden"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex items-center justify-between px-4 sm:px-6"
            style={{ height: 'var(--nx-nav-height)' }}
          >
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-white/20 hover:text-ink"
            >
              <X className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-6 pt-4 sm:px-6">
            <ul className="flex flex-col">
              {mobileNav.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.045, duration: 0.35 }}
                  className="border-b border-hairline"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between py-4 text-2xl font-extrabold tracking-tight transition-colors duration-200',
                        isActive ? 'text-ink' : 'text-ink-muted',
                      )
                    }
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-ink-faint" aria-hidden="true" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="nx-safe-b border-t border-hairline px-4 pt-5 sm:px-6">
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                onClose();
                openInquiry();
              }}
            >
              Let&rsquo;s Talk
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="mt-4 text-center text-xs font-semibold tracking-[0.2em] text-ink-faint">
              {siteConfig.tagline}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
