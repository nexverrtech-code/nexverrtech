import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
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
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
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
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
