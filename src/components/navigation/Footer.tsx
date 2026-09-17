import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import {
  footerCompanyLinks,
  footerServiceLinks,
  footerSolutionLinks,
  legalLinks,
  type NavLink,
} from '@/data/navigation';
import { contactConfig, siteConfig } from '@/lib/config';
import { createWhatsAppDirectUrl } from '@/lib/whatsapp';
import { createMailtoLink } from '@/lib/email';
import { headquarters } from '@/data/branches';
import { track } from '@/lib/analytics';

function FooterColumn({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
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
  );
}

/**
 * The site's second navigation, and its last chance to be useful.
 *
 * Contact rows only appear once the matching value is configured — an empty
 * phone or address is never rendered as a blank line, and no address is shown
 * at all beyond the city the company actually trades from.
 */
export function Footer() {
  const whatsappUrl = createWhatsAppDirectUrl();
  const mailtoUrl = createMailtoLink('Project enquiry');
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-surface-deep/40">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-5 text-[0.625rem] font-bold tracking-[0.3em] text-brand-cyan">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.name} builds business software and digital platforms around the way a
              business actually works — understand, design, build, support.
            </p>
          </div>

          <FooterColumn title="Services" links={footerServiceLinks} />
          <FooterColumn title="Solutions" links={footerSolutionLinks} />
          <FooterColumn title="Company" links={footerCompanyLinks} />

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
                    onClick={() => track('email_click', { source: 'footer' })}
                    className="flex items-start gap-2.5 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                    <span className="break-all">{contactConfig.email}</span>
                  </a>
                </li>
              ) : null}

              {contactConfig.isPhoneConfigured ? (
                <li>
                  <a
                    href={`tel:${contactConfig.phone.replace(/[^\d+]/g, '')}`}
                    onClick={() => track('phone_click', { source: 'footer' })}
                    className="flex items-start gap-2.5 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                    <span>{contactConfig.phone}</span>
                  </a>
                </li>
              ) : null}

              {whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('whatsapp_click', { source: 'footer' })}
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
                  onClick={() => track('contact_click', { source: 'footer' })}
                  className="inline-flex text-sm font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                >
                  Start a project
                </Link>
              </li>
            </ul>

            {siteConfig.socialProfiles.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                {siteConfig.socialProfiles.map((profile) => (
                  <li key={profile.url}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="nx-hairline my-10" />

        <div className="flex flex-col gap-4 text-xs font-semibold text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="transition-colors duration-200 hover:text-ink-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
