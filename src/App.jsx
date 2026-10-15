import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/enquiry" element={<BookingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-warm-ivory text-warm-charcoal font-sans selection:bg-dusty-peach selection:text-warm-charcoal">
        <ScrollToTop />
        
        {/* Top Sticky Navbar */}
        <Navbar />

        {/* Dynamic Route View with Smooth Page Transition */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Persistent Floating WhatsApp Quick Button */}
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}
