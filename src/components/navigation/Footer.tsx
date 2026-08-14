import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { footerServiceLinks, mobileNav } from '@/data/navigation';
import { contactConfig, siteConfig } from '@/lib/config';
import { createWhatsAppDirectUrl } from '@/lib/whatsapp';
import { createMailtoLink } from '@/lib/email';
import { headquarters } from '@/data/branches';

/**
 * Compact by design. Contact rows only appear once the matching value is
 * configured — an empty phone or address is never rendered as a blank line.
 */
export function Footer() {
  const whatsappUrl = createWhatsAppDirectUrl();
  const mailtoUrl = createMailtoLink('Project enquiry');
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-surface-deep/40">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.statement}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Quick Links
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {mobileNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Services
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm font-semibold text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                <span>
                  {headquarters.city}, {headquarters.state}, {headquarters.country}
                </span>
              </li>

              {contactConfig.isEmailConfigured && mailtoUrl ? (
                <li>
                  <a
                    href={mailtoUrl}
                    className="flex items-start gap-2.5 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                    <span className="break-all">{contactConfig.email}</span>
                  </a>
                </li>
              ) : null}

              {whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                      aria-hidden="true"
                    />
                    <span>WhatsApp</span>
                  </a>
                </li>
              ) : null}

              <li>
                <Link
                  to="/contact"
                  className="inline-flex text-sm font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                >
                  Contact page
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="nx-hairline my-10" />

        <div className="flex flex-col gap-3 text-xs font-semibold text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <p className="tracking-[0.24em]">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
