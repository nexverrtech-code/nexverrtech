import { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { ArrowRight, Menu } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useScrolled } from '@/hooks/useScrolled';
import { useInquiry } from '@/context/InquiryContext';
import { primaryNav } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

/** Sticky, transparent at the top, glass once the page moves. */
export function Navbar() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openInquiry } = useInquiry();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-brand-gradient focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-smooth',
          scrolled
            ? 'border-b border-hairline bg-[rgba(3,9,34,0.72)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
        style={{ height: 'var(--nx-nav-height)' }}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => (
                <li key={link.to}>
                  <RouterNavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-4 bottom-1.5 h-px bg-brand-gradient"
                          />
                        ) : null}
                      </>
                    )}
                  </RouterNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => openInquiry()} className="hidden sm:inline-flex">
              Let&rsquo;s Talk
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-white/20 lg:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
              Menu
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
