'use client';

import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import FaqSection from '../homepage/components/FaqSection';

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff] pt-24">
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
