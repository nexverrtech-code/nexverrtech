export interface ApproachStep {
  id: string;
  title: string;
  description: string;
}

/**
 * The working method stated in the company profile:
 * understand the business, design the right solution, build it, support it.
 */
export const approachSteps: ApproachStep[] = [
  {
    id: 'understand',
    title: 'Understand',
    description: 'We understand your workflow before building anything.',
  },
  {
    id: 'design',
    title: 'Design',
    description: 'We design around your actual requirements, not a template.',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'We develop scalable, maintainable and tested technology.',
  },
  {
    id: 'support',
    title: 'Support',
    description: 'We keep supporting the product after it goes live.',
  },
];

/** Factual capability statements used in the hero trust strip. */
export const capabilityStatements: string[] = [
  'Custom Solutions',
  'Business-Focused',
  'Scalable Technology',
  'End-to-End Support',
];
