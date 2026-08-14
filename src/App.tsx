import { BrowserRouter } from 'react-router-dom';
import { InquiryProvider } from '@/context/InquiryContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { Preloader } from '@/components/ui/Preloader';

export default function App() {
  return (
    <BrowserRouter
      // Opt in early to the v7 behaviours so the console stays clean and the
      // upgrade is a version bump rather than a migration.
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <InquiryProvider>
        <Preloader />
        <AppRoutes />
      </InquiryProvider>
    </BrowserRouter>
  );
}
