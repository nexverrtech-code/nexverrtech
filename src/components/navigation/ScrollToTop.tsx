import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Every route change starts at the top, without fighting the smooth-scroll CSS. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
