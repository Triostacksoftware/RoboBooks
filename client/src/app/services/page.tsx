'use client'

import React from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import ServicesSection from '../homepage/components/ServicesSection'
import BusinessBenefits from '../homepage/components/BusinessBenefits'
import AboutSplit from '../homepage/components/AboutSplit'
import InnerPageHero from '../components/InnerPageHero'

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="Services"
        title="Accounting modules that feel connected across every business workflow"
        description="From GST invoicing to books, reporting, reconciliations, and operational finance visibility, RoboBooks is designed to help teams move faster with less friction."
        primaryAction={{ href: '/register', label: 'Start free trial' }}
        secondaryAction={{ href: '/contact', label: 'Schedule demo' }}
        stats={[
          { value: '6+', label: 'Core modules' },
          { value: '500+', label: 'Active teams' },
          { value: '99.9%', label: 'Reliability' },
          { value: '24/7', label: 'Support' },
        ]}
      />
      <ServicesSection />
      <BusinessBenefits />
      <AboutSplit />
      <Footer />
    </>
  )
}

export default ServicesPage
