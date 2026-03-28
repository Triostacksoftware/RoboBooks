'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import FeaturesSection from '../homepage/components/FeaturesSection'
import Usability from '../homepage/components/Usability'
import TeamManagement from '../homepage/components/TeamManagement'
import FaqSection from '../homepage/components/FaqSection'
import InnerPageHero from '../components/InnerPageHero'
import { defaultFeaturesContent, fetchPublicCmsSection, type FeaturesCmsContent } from '@/services/cmsService'

const FeaturesPage = () => {
  const [content, setContent] = useState<FeaturesCmsContent>(defaultFeaturesContent)

  useEffect(() => {
    fetchPublicCmsSection<FeaturesCmsContent>('features', defaultFeaturesContent).then(setContent)
  }, [])

  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow={content.pageEyebrow}
        title={content.pageTitle}
        description={content.pageDescription}
        primaryAction={{ href: content.pagePrimaryButtonUrl, label: content.pagePrimaryButtonLabel }}
        secondaryAction={{ href: content.pageSecondaryButtonUrl, label: content.pageSecondaryButtonLabel }}
        variant="banner"
        breadcrumbLabel="Features"
        stats={content.pageStats}
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
