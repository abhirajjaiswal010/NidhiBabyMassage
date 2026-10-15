import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustHighlights from './components/TrustHighlights';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AboutNidhi from './components/AboutNidhi';
import BookingSteps from './components/BookingSteps';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import BookingCTA from './components/BookingCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-ivory text-warm-charcoal font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <TrustHighlights />
        <Services />
        <WhyChooseUs />
        <AboutNidhi />
        <BookingSteps />
        <Testimonials />
        <FAQs />
        <BookingCTA />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Sticky Floating WhatsApp Quick Consultation */}
      <FloatingWhatsApp />
    </div>
  );
}
