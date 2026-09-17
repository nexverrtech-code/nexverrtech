import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FieldWrapper, SelectInput, TextArea, TextInput } from './FormField';
import {
  budgetOptions,
  inquirySchema,
  timelineOptions,
  type InquiryFormValues,
} from './inquirySchema';
import { serviceOptions } from '@/data/services';
import { contactConfig } from '@/lib/config';
import { createWhatsAppInquiry } from '@/lib/whatsapp';
import { createEmailInquiry } from '@/lib/email';
import { track } from '@/lib/analytics';
import type { InquiryChannel } from '@/lib/inquiry';

interface InquiryFormProps {
  presetService?: string;
  /** Where the form is rendered, for analytics. */
  source?: string;
  /** Called after a successful hand-off, e.g. to close the modal. */
  onHandedOff?: (channel: InquiryChannel) => void;
}

/**
 * Eight fields, two of them optional, and two ways to send. There is no
 * backend, so the UI says the inquiry is *ready to send* — it never claims the
 * company has received anything.
 */
export function InquiryForm({ presetService, source = 'form', onHandedOff }: InquiryFormProps) {
  const fieldId = useId();
  const [handedOff, setHandedOff] = useState<InquiryChannel | null>(null);
  const [channelError, setChannelError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: presetService && serviceOptions.includes(presetService) ? presetService : '',
      budget: '',
      timeline: '',
      message: '',
    },
  });

  /** Fired once per mounted form, the first time someone actually engages. */
  const handleFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('form_start', { source, service: presetService });
  };

  const send = (channel: InquiryChannel) =>
    handleSubmit((values) => {
      setChannelError(null);

      const result =
        channel === 'whatsapp' ? createWhatsAppInquiry(values) : createEmailInquiry(values);

      if (!result.handedOff) {
        setChannelError(result.error ?? 'Something went wrong opening that app.');
        return;
      }

      track('form_submit', { channel, source, service: values.service });
      track(channel === 'whatsapp' ? 'whatsapp_click' : 'email_click', {
        source: `${source}-form`,
      });

      setHandedOff(channel);
      onHandedOff?.(channel);
    });

  const id = (field: string) => `${fieldId}-${field}`;

  return (
    // Enter anywhere in the form submits through WhatsApp, the primary channel.
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={send('whatsapp')}
      onFocusCapture={handleFirstInteraction}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper id={id('name')} label="Name" required error={errors.name?.message}>
          <TextInput
            id={id('name')}
            autoComplete="name"
            placeholder="Your full name"
            hasError={Boolean(errors.name)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id('name')}-error` : undefined}
            {...register('name')}
          />
        </FieldWrapper>

        <FieldWrapper
          id={id('company')}
          label="Company / Business"
          error={errors.company?.message}
        >
          <TextInput
            id={id('company')}
            autoComplete="organization"
            placeholder="Business name"
            hasError={Boolean(errors.company)}
            {...register('company')}
          />
        </FieldWrapper>

        <FieldWrapper id={id('email')} label="Email" required error={errors.email?.message}>
          <TextInput
            id={id('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            hasError={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id('email')}-error` : undefined}
            {...register('email')}
          />
        </FieldWrapper>

        <FieldWrapper
          id={id('phone')}
          label="WhatsApp / Phone"
          required
          error={errors.phone?.message}
        >
          <TextInput
            id={id('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 00000 00000"
            hasError={Boolean(errors.phone)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id('phone')}-error` : undefined}
            {...register('phone')}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper id={id('service')} label="Service" required error={errors.service?.message}>
        <SelectInput
          id={id('service')}
          hasError={Boolean(errors.service)}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? `${id('service')}-error` : undefined}
          {...register('service')}
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectInput>
      </FieldWrapper>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper id={id('budget')} label="Budget" error={errors.budget?.message}>
          <SelectInput id={id('budget')} {...register('budget')}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper id={id('timeline')} label="Timeline" error={errors.timeline?.message}>
          <SelectInput id={id('timeline')} {...register('timeline')}>
            <option value="">Not decided yet</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <FieldWrapper
        id={id('message')}
        label="Project Requirement"
        required
        error={errors.message?.message}
        hint="What are you trying to solve? A couple of sentences is plenty."
      >
        <TextArea
          id={id('message')}
          rows={4}
          placeholder="Tell us about the business problem, what exists today, and what you'd like it to do."
          hasError={Boolean(errors.message)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id('message')}-error` : `${id('message')}-hint`}
          {...register('message')}
        />
      </FieldWrapper>

      {channelError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
        >
          {channelError}
        </p>
      ) : null}

      {handedOff ? (
        <p
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-3 text-sm font-semibold text-ink"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
          <span>
            Your inquiry is ready. Continue sending your request through{' '}
            {handedOff === 'whatsapp' ? 'WhatsApp' : 'your email app'} to reach us.
          </span>
        </p>
      ) : null}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="whatsapp" fullWidth disabled={isSubmitting}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send via WhatsApp
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          disabled={isSubmitting}
          onClick={send('email')}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Send via Email
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-ink-faint">
        {contactConfig.isWhatsAppConfigured || contactConfig.isEmailConfigured
          ? 'Your details are not stored on this site — they are handed to WhatsApp or your email app so you can send them yourself.'
          : 'Contact channels are not configured yet. Add VITE_WHATSAPP_NUMBER and VITE_CONTACT_EMAIL to your .env file.'}
      </p>
    </form>
  );
}
