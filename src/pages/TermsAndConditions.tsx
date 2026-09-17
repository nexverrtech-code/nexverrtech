import { LegalPage } from './LegalPage';
import { termsAndConditions } from '@/data/legal';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';

export default function TermsAndConditions() {
  useSeo(routeSeo.terms);

  return (
    <LegalPage
      document={termsAndConditions}
      breadcrumbs={routeSeo.terms.breadcrumbs}
      counterpart={{ label: 'Privacy Policy', to: '/privacy-policy' }}
    />
  );
}
