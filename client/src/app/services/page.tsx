'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import ServicesSection from '../homepage/components/ServicesSection'
import BusinessBenefits from '../homepage/components/BusinessBenefits'
import PricingPlans from '../homepage/components/PricingPlans'
import InnerPageHero from '../components/InnerPageHero'
import { defaultServicesContent, fetchPublicCmsSection, type ServicesCmsContent } from '@/services/cmsService'

const ServicesPage = () => {
  const [content, setContent] = useState<ServicesCmsContent>(defaultServicesContent)

  useEffect(() => {
    fetchPublicCmsSection<ServicesCmsContent>('services', defaultServicesContent).then(setContent)
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
        breadcrumbLabel="Service"
        stats={content.pageStats}
      />
      <ServicesSection />
      <BusinessBenefits />
      <PricingPlans />
      <Footer />
    </>
  )
}

export default ServicesPage
