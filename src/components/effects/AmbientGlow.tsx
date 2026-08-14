import { cn } from '@/lib/utils';

interface AmbientGlowProps {
  className?: string;
  /** Tailwind colour stop used for the radial centre. */
  tone?: 'cyan' | 'blue' | 'violet';
  size?: number;
}

const tones: Record<NonNullable<AmbientGlowProps['tone']>, string> = {
  cyan: 'rgba(0, 200, 255, 0.16)',
  blue: 'rgba(0, 106, 245, 0.20)',
  violet: 'rgba(123, 31, 255, 0.16)',
};

/**
 * A single blurred radial light. Rendered as a CSS gradient rather than a blur
 * filter so it costs nothing to composite.
 */
export function AmbientGlow({ className, tone = 'blue', size = 640 }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('nx-ambient rounded-full', className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${tones[tone]} 0%, transparent 68%)`,
      }}
    />
  );
}
