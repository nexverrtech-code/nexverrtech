import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const controlBase =
  'w-full rounded-xl border bg-[rgba(3,9,34,0.6)] px-4 text-[0.9375rem] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-brand-cyan/60 focus:outline-none focus:ring-2 focus:ring-brand-cyan/20';

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function FieldWrapper({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-bold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-brand-cyan" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-semibold text-ink-faint">(optional)</span>
        )}
      </label>

      {children}

      {error ? (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-semibold text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean };

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { className, hasError, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(controlBase, 'h-12', hasError ? 'border-red-400/60' : 'border-hairline', className)}
      {...rest}
    />
  );
});

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean };

/**
 * The chevron is an overlaid icon rather than a background image, so the native
 * control keeps our solid dark fill on every platform. `option` elements are
 * painted by the OS, so they get an explicit colour too.
 */
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(function SelectInput(
  { className, hasError, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          controlBase,
          'h-12 appearance-none bg-[#050d29] pr-11 [&>option]:bg-[#07112f] [&>option]:text-ink',
          hasError ? 'border-red-400/60' : 'border-hairline',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        aria-hidden="true"
      />
    </div>
  );
});

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, hasError, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        controlBase,
        'min-h-[7.5rem] resize-y py-3 leading-relaxed',
        hasError ? 'border-red-400/60' : 'border-hairline',
        className,
      )}
      {...rest}
    />
  );
});
