import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TrustHighlights from '../components/TrustHighlights';
import Services from '../components/Services';
import MomentsGallery from '../components/MomentsGallery';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutNidhi from '../components/AboutNidhi';
import BookingSteps from '../components/BookingSteps';
import Testimonials from '../components/Testimonials';
import FAQs from '../components/FAQs';
import BookingCTA from '../components/BookingCTA';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1"
    >
      <Hero />
      <TrustHighlights />
      <Services />
      <MomentsGallery />
      <WhyChooseUs />
      <AboutNidhi />
      <BookingSteps />
      <Testimonials />
      <FAQs />
      <BookingCTA />
    </motion.div>
  );
}
