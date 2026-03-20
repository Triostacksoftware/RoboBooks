'use client'

import React from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import InnerPageHero from '../components/InnerPageHero'
import AboutMission from './components/AboutMission'
import AboutValues from './components/AboutValues'
import AboutStats from './components/AboutStats'
import AboutTimeline from './components/AboutTimeline'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="About RoboBooks"
        title="The accounting SaaS team helping businesses work with more confidence"
        description="We build RoboBooks for companies that need smart invoicing, cleaner bookkeeping, dependable compliance workflows, and a product experience that feels modern from the first click."
        primaryAction={{ href: '#mission', label: 'Explore our mission' }}
        variant="banner"
        breadcrumbLabel="About"
        stats={[
          { value: '10K+', label: 'Businesses served' },
          { value: '99.9%', label: 'Platform uptime' },
          { value: '24/7', label: 'Support ready' },
          { value: '2020', label: 'Founded' },
        ]}
      />
      <AboutMission />
      <AboutValues />
      <AboutStats />
      <AboutTimeline />
      <Footer />
    </>
  )
}

export default AboutPage
