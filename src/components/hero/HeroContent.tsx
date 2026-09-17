import type { CSSProperties } from 'react';
import { siteConfig } from '@/lib/config';
import { HeroCTA } from './HeroCTA';
import { HeroLocation } from './HeroLocation';
import { HeroTrustStrip } from './HeroTrustStrip';

/**
 * The message, in the order a visitor actually forms questions:
 * who is this → can they help me → what do I do next.
 *
 * The heading deliberately has no entrance animation. It is the largest
 * contentful element on the page, so anything that fades it in — even by a
 * fifth of a second — is a fifth of a second added to LCP for every visitor.
 * Everything around it animates in CSS, which needs no JavaScript to start and
 * collapses to an instant appearance under `prefers-reduced-motion`.
 */
const enter = (delay: number): CSSProperties => ({ animationDelay: `${delay}s` });

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-3xl">
      <div
        className="flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-3"
        style={enter(0.04)}
      >
        <p className="nx-eyebrow">
          <span aria-hidden="true" className="h-px w-8 bg-brand-cyan/60" />
          {siteConfig.tagline}
        </p>
        <HeroLocation />
      </div>

      <h1 id="hero-heading" className="mt-6 text-display">
        Turn Your Business Challenges
        <br className="hidden sm:block" />{' '}
        <span className="nx-gradient-text">Into Digital Solutions.</span>
      </h1>

      <p className="mt-6 max-w-xl animate-fade-up text-lead text-ink-muted" style={enter(0.1)}>
        We understand how your business works, then build the software, systems and digital
        experiences that help it work better — from{' '}
        {siteConfig.city}, {siteConfig.region}.
      </p>

      <div className="mt-9 animate-fade-up" style={enter(0.18)}>
        <HeroCTA />
      </div>

      <div className="mt-10 animate-fade-up" style={enter(0.26)}>
        <HeroTrustStrip />
      </div>
    </div>
  );
}
