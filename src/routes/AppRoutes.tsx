import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import Home from '@/pages/Home';

/**
 * Home ships in the main bundle because it is the landing page for almost every
 * visitor. Every other route is code-split and fetched on demand.
 */
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Solutions = lazy(() => import('@/pages/Solutions'));
const SolutionDetail = lazy(() => import('@/pages/SolutionDetail'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<SolutionDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />

        {/* The host serves dist/404.html for unknown URLs; this renders it. */}
        <Route path="404" element={<NotFound />} />

        {/* Legacy paths kept working so an old link never dies. */}
        <Route path="terms" element={<Navigate to="/terms-and-conditions" replace />} />
        <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
