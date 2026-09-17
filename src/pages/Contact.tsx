import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Reveal } from '@/components/effects/Reveal';
import { branches } from '@/data/branches';
import { contactConfig, siteConfig } from '@/lib/config';
import { createWhatsAppDirectUrl } from '@/lib/whatsapp';
import { createMailtoLink } from '@/lib/email';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';
import { track } from '@/lib/analytics';

const WHAT_HAPPENS_NEXT = [
  'We read the requirement and come back with questions — usually about how the work runs today.',
  'If it is a fit, we describe the approach, what it depends on, and roughly what it takes.',
  'Nothing is committed until the scope is written down and agreed.',
];

export default function Contact() {
  const whatsappUrl = createWhatsAppDirectUrl();
  const mailtoUrl = createMailtoLink('Project enquiry');

  useSeo(routeSeo.contact);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're building"
        description="Share the problem, not a spec. We will come back with what we would build, how long it takes, and what it depends on."
        breadcrumbs={routeSeo.contact.breadcrumbs}
      />

      <section className="nx-section-tight pt-0" aria-label="Contact form and details">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <Reveal>
              <div className="nx-card p-6 sm:p-8">
                <h2 className="text-sub">Project inquiry</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Fill this in and choose how you would like to send it. Budget and timeline are
                  optional — leave them blank if you are still working them out.
                </p>
                <div className="mt-8">
                  <InquiryForm source="contact" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-4">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'contact' })}
                  className="nx-card group flex items-start gap-4 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1FA855]/15 text-[#3ED07E] ring-1 ring-inset ring-[#1FA855]/25">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base font-extrabold tracking-tight text-white">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      Fastest way to reach us. Opens a direct chat.
                    </span>
                  </span>
                </a>
              ) : null}

              {mailtoUrl && contactConfig.isEmailConfigured ? (
                <a
                  href={mailtoUrl}
                  onClick={() => track('email_click', { source: 'contact' })}
                  className="nx-card group flex items-start gap-4 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-extrabold tracking-tight text-white">
                      Email
                    </span>
                    <span className="mt-1 block break-all text-sm text-ink-muted">
                      {contactConfig.email}
                    </span>
                  </span>
                </a>
              ) : null}

              {contactConfig.isPhoneConfigured ? (
                <a
                  href={`tel:${contactConfig.phone.replace(/[^\d+]/g, '')}`}
                  onClick={() => track('phone_click', { source: 'contact' })}
                  className="nx-card group flex items-start gap-4 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-extrabold tracking-tight text-white">
                      Phone
                    </span>
                    <span className="mt-1 block text-sm text-ink-muted">{contactConfig.phone}</span>
                  </span>
                </a>
              ) : null}

              {branches.map((branch) => (
                <div key={branch.id} className="nx-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-cyan ring-1 ring-inset ring-white/10">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h2 className="mt-5 text-base font-extrabold tracking-tight text-white">
                    {branch.city}
                    {branch.isHeadquarters ? (
                      <span className="ml-2 rounded-full border border-hairline px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                        Head office
                      </span>
                    ) : null}
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {branch.address ? `${branch.address}, ` : ''}
                    {branch.state}, {branch.country}
                  </p>

                  {branch.phone ? (
                    <p className="mt-2 text-sm font-semibold text-ink-muted">{branch.phone}</p>
                  ) : null}

                  {branch.mapUrl ? (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-bold text-brand-cyan transition-opacity duration-200 hover:opacity-80"
                    >
                      View on map
                    </a>
                  ) : null}
                </div>
              ))}

              <div className="nx-card p-6">
                <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                  What happens next
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {WHAT_HAPPENS_NEXT.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-cyan/15 text-[0.625rem] font-extrabold text-brand-cyan">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {!whatsappUrl && !contactConfig.isEmailConfigured ? (
                <p className="rounded-xl border border-hairline px-4 py-3 text-xs leading-relaxed text-ink-faint">
                  Direct contact channels have not been configured yet. Set
                  <code className="mx-1 text-ink-muted">VITE_WHATSAPP_NUMBER</code>
                  and
                  <code className="mx-1 text-ink-muted">VITE_CONTACT_EMAIL</code>
                  in your environment file.
                </p>
              ) : null}

              <p className="px-1 text-xs leading-relaxed text-ink-faint">
                {siteConfig.name} works with businesses in {siteConfig.city} and across{' '}
                {siteConfig.region}, and remotely elsewhere in {siteConfig.country}.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
