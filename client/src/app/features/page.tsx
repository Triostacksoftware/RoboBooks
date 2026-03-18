'use client'

import React from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import FeaturesSection from '../homepage/components/FeaturesSection'
import Usability from '../homepage/components/Usability'
import TeamManagement from '../homepage/components/TeamManagement'
import FaqSection from '../homepage/components/FaqSection'
import InnerPageHero from '../components/InnerPageHero'

const FeaturesPage = () => {
  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="Features"
        title="Product features that make finance work cleaner, faster, and easier to trust"
        description="RoboBooks brings billing, bookkeeping, reconciliation, analytics, and collaboration into one interface so finance work feels connected instead of fragmented."
        primaryAction={{ href: '#feature-grid', label: 'Explore features' }}
        secondaryAction={{ href: '/contact', label: 'Book a walkthrough' }}
        stats={[
          { value: '8+', label: 'Core capabilities' },
          { value: '1', label: 'Unified workspace' },
          { value: '100%', label: 'Cloud access' },
          { value: '24/7', label: 'Support' },
        ]}
      />
      <div id="feature-grid">
        <FeaturesSection />
      </div>
      <Usability />
      <TeamManagement />
      <FaqSection />
      <Footer />
    </>
  )
}

export default FeaturesPage
