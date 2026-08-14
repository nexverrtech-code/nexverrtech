import { Modal } from '@/components/ui/Modal';
import { InquiryForm } from './InquiryForm';
import { useInquiry } from '@/context/InquiryContext';

/** Mounted once in the layout; opened from any CTA through the inquiry context. */
export function InquiryModal() {
  const { isOpen, presetService, closeInquiry } = useInquiry();

  return (
    <Modal
      open={isOpen}
      onClose={closeInquiry}
      title="Start Your Project"
      description="Tell us what you're building. We'll come back with the right approach — not a generic quote."
    >
      <InquiryForm presetService={presetService} />
    </Modal>
  );
}
