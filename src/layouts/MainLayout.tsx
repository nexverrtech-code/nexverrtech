import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { FloatingWhatsApp } from '@/components/effects/FloatingWhatsApp';
import { InquiryModal } from '@/components/forms/InquiryModal';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';
import { RouteFallback } from '@/components/ui/RouteFallback';

export function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <InquiryModal />
    </div>
  );
}
