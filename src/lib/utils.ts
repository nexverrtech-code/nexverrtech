import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** `01`, `02`, … for step and index labels. */
export function padIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * `16 September 2026` from an ISO date. Formatted in en-IN with an explicit UTC
 * time zone so a reader east or west of the line never sees yesterday's date.
 */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
