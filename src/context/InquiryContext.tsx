import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface InquiryContextValue {
  isOpen: boolean;
  /** Optional service to preselect in the form. */
  presetService?: string;
  openInquiry: (presetService?: string) => void;
  closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

/**
 * One inquiry modal for the whole app. Any CTA anywhere can open it, optionally
 * preselecting the service the visitor was reading about.
 */
export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const openInquiry = useCallback((service?: string) => {
    setPresetService(service);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetService, openInquiry, closeInquiry }),
    [isOpen, presetService, openInquiry, closeInquiry],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry(): InquiryContextValue {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used inside an InquiryProvider');
  }
  return context;
}
