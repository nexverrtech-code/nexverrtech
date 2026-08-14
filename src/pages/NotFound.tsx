import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { AmbientGlow } from '@/components/effects/AmbientGlow';
import { primaryNav } from '@/data/navigation';
import { useSeo } from '@/hooks/useSeo';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useSeo({
    title: 'Page not found — NEXVERR TECHNOLOGIES',
    description: 'The page you were looking for does not exist.',
    path: '/404',
    noIndex: true,
  });

  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden py-24">
      <div aria-hidden="true" className="nx-grid-bg absolute inset-0 opacity-40" />
      <AmbientGlow className="left-1/2 top-1/3 -translate-x-1/2" tone="blue" size={560} />

      <Container className="relative text-center">
        <img
          src="/brand/nexverr-symbol.png"
          alt=""
          width={56}
          height={56}
          className="mx-auto h-14 w-14 opacity-50"
        />

        <p className="nx-eyebrow mt-8 justify-center">Error 404</p>
        <h1 className="mt-5 text-section">This page took a different route.</h1>
        <p className="mx-auto mt-5 max-w-prose text-lead text-ink-muted">
          The page you were looking for does not exist, or it has moved.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/">Back to Home</ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {primaryNav.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-bold text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
