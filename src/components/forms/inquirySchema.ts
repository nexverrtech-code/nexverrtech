import { z } from 'zod';

/** Friendly, specific messages — validation should read like a person wrote it. */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please tell us your name.')
    .max(80, 'That name is a little too long.'),
  company: z.string().trim().max(120, 'That company name is a little too long.').optional(),
  email: z
    .string()
    .trim()
    .min(1, 'We need an email address to reply to.')
    .email('That email address does not look right.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please add a number we can reach you on.')
    .max(20, 'That number looks too long.')
    .regex(/^[+\d][\d\s\-()]*$/, 'Use digits, spaces or +country code only.'),
  service: z.string().trim().min(1, 'Pick the closest service — we can refine it together.'),
  message: z
    .string()
    .trim()
    .min(12, 'A sentence or two about the project is enough to get started.')
    .max(1500, 'Please keep it under 1500 characters — we can go deeper on a call.'),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
