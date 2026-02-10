import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CountriesPage from './pages/CountriesPage';
import ProcessPage from './pages/ProcessPage';
import Contact from './pages/Contact';
import BlogPage from './pages/BlogPage';
import WhyUsPage from './pages/WhyUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import TitleUpdater from './components/TitleUpdater';
import EligibilityAnalysis from './pages/EligibilityAnalysis';
import GenericPage from './pages/GenericPage';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {/* Services Routes */}
          <Route path="services" element={<Services />} />
          <Route path="services/:type" element={<ServiceDetail />} />

          <Route path="countries" element={<CountriesPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="why-us" element={<WhyUsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="eligibility" element={<EligibilityAnalysis />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
