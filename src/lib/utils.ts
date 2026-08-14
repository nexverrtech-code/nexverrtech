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
