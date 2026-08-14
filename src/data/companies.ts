export interface CompanyLogo {
  name: string;
  /** Path under `public/companies/`. SVG preferred. */
  logo: string;
  url?: string;
}

/**
 * Client / partner logos.
 *
 * Intentionally empty — a logo wall is only credible when every logo is real and
 * the company has permission to display it. Add entries here and the strip
 * appears automatically; until then nothing is rendered.
 */
export const companies: CompanyLogo[] = [];

export const hasCompanies = companies.length > 0;
