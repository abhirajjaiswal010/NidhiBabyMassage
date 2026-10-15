import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/enquiry" element={<BookingPage />} />
        <Route path="/care-portal" element={<AdminPage />} />
        <Route path="/portal" element={<AdminPage />} />
        <Route path="/secure-portal" element={<AdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const isFormPage = location.pathname === '/book' || location.pathname === '/enquiry';
  const isAdminPage = 
    location.pathname.startsWith('/care-portal') ||
    location.pathname.startsWith('/portal') ||
    location.pathname.startsWith('/secure-portal') ||
    location.pathname.startsWith('/admin');
  const hidePublicChrome = isFormPage || isAdminPage;

  return (
    <div className="min-h-screen flex flex-col bg-warm-ivory text-warm-charcoal font-sans selection:bg-dusty-peach selection:text-warm-charcoal">
      <ScrollToTop />
      
      {/* Global Toast Notification System */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#FFFDF9',
            color: '#2D1E1A',
            border: '1px solid #FFCED8',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: '0 10px 25px -5px rgba(217, 107, 130, 0.18), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
            padding: '10px 16px',
            maxWidth: '420px',
          },
          success: {
            iconTheme: {
              primary: '#D96B82',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#E11D48',
              secondary: '#FFFFFF',
            },
            style: {
              background: '#FFF5F5',
              border: '1px solid #FECDD3',
              color: '#9F1239',
            },
          },
        }}
      />

      {/* Top Sticky Navbar - Hidden on the form and admin pages */}
      {!hidePublicChrome && <Navbar />}

      {/* Dynamic Route View with Smooth Page Transition */}
      <main className="flex-1">
        <AnimatedRoutes />
      </main>

      {/* Global Footer - Hidden on dedicated form and admin pages */}
      {!hidePublicChrome && <Footer />}

      {/* Persistent Floating WhatsApp Quick Button - Hidden on form and admin pages */}
      {!hidePublicChrome && <FloatingWhatsApp />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

