export interface TeamMember {
  name: string;
  role: string;
  /** Path under `public/team/`. Initials are shown when absent. */
  image?: string;
  linkedin?: string;
}

/**
 * Founding team, exactly as stated in the company profile.
 * No biographies, titles or credentials beyond what was supplied.
 */
export const foundingTeam: TeamMember[] = [
  {
    name: 'Mohammed Riyaz',
    role: 'Co-Founder / Full Stack Developer',
  },
  {
    name: 'Panneer Selvam M',
    role: 'Co-Founder / Software Developer',
  },
  {
    name: 'Moneswar S',
    role: 'Co-Founder / UI/UX & Frontend Developer',
  },
  {
    name: 'Abhishek',
    role: 'Co-Founder / Business Development & Client Acquisition',
  },
];

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
