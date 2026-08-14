import { ArrowRight } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { useInquiry } from '@/context/InquiryContext';

/** The hero's two actions: commit, or keep looking. Nothing else competes. */
export function HeroCTA() {
  const { openInquiry } = useInquiry();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button size="lg" onClick={() => openInquiry()} className="w-full sm:w-auto">
        Start Your Project
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Button>

      <ButtonLink to="/projects" variant="secondary" size="lg" className="w-full sm:w-auto">
        Explore Our Work
      </ButtonLink>
    </div>
  );
}
