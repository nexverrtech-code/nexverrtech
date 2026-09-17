import { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { FloatingWhatsApp } from '@/components/effects/FloatingWhatsApp';
import { ScrollToTop } from '@/components/navigation/ScrollToTop';
import { RouteFallback } from '@/components/ui/RouteFallback';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useInquiry } from '@/context/InquiryContext';

/**
 * The inquiry form carries the validation and form libraries with it — around
 * 23 kB gzipped that every visitor used to download whether or not they ever
 * opened the dialog. It is fetched on the first idle moment instead, so it is
 * in cache long before anyone clicks, and mounted only once it has been opened.
 */
const InquiryModal = lazy(() =>
  import('@/components/forms/InquiryModal').then((module) => ({ default: module.InquiryModal })),
);

function prefetchInquiry() {
  void import('@/components/forms/InquiryModal');
}

export function MainLayout() {
  const { isOpen } = useInquiry();
  const [everOpened, setEverOpened] = useState(false);

  useAnalytics();

  // Once opened it stays mounted, so closing keeps its exit transition.
  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  useEffect(() => {
    const idle = window.requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(prefetchInquiry, { timeout: 4000 });
      return () => window.cancelIdleCallback?.(handle);
    }

    const timer = window.setTimeout(prefetchInquiry, 2500);
    return () => window.clearTimeout(timer);
  }, []);

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

      {everOpened ? (
        <Suspense fallback={null}>
          <InquiryModal />
        </Suspense>
      ) : null}
    </div>
  );
}
