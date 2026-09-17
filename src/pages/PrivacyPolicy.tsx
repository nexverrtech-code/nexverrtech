import { LegalPage } from './LegalPage';
import { privacyPolicy } from '@/data/legal';
import { useSeo } from '@/hooks/useSeo';
import { routeSeo } from '@/lib/routeSeo';

export default function PrivacyPolicy() {
  useSeo(routeSeo.privacy);

  return (
    <LegalPage
      document={privacyPolicy}
      breadcrumbs={routeSeo.privacy.breadcrumbs}
      counterpart={{ label: 'Terms & Conditions', to: '/terms-and-conditions' }}
    />
  );
}
