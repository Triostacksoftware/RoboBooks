'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import InnerPageHero from '../components/InnerPageHero'
import ContactForm from './components/contactform'
import ContactDetails from './components/contact-details'
import {
  defaultContactSectionContent,
  fetchPublicCmsSection,
  type ContactSectionCmsContent,
} from '@/services/cmsService'

const ContactPage = () => {
  const [content, setContent] = useState<ContactSectionCmsContent>(defaultContactSectionContent)

  useEffect(() => {
    fetchPublicCmsSection<ContactSectionCmsContent>(
      'contactSection',
      defaultContactSectionContent
    ).then(setContent)
  }, [])

  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        primaryAction={{ href: content.heroPrimaryButtonUrl, label: content.heroPrimaryButtonLabel }}
        secondaryAction={{ href: content.heroSecondaryButtonUrl, label: content.heroSecondaryButtonLabel }}
        variant="banner"
        breadcrumbLabel="Contact"
        stats={content.heroStats}
      />
      <ContactForm />
      <ContactDetails
        hqTitle={content.addressTitle}
        addressLines={content.addressLines}
        phones={content.phones}
        emails={content.emails}
        showMap={content.showMap}
        placeQuery={content.placeQuery}
        whatsAppNumber={content.whatsAppNumber}
        detailsEyebrow={content.detailsEyebrow}
        detailsTitle={content.detailsTitle}
        detailsDescription={content.detailsDescription}
        whatsappButtonLabel={content.whatsappButtonLabel}
        supportButtonLabel={content.supportButtonLabel}
        supportButtonEmail={content.supportButtonEmail}
        mapEyebrow={content.mapEyebrow}
        mapTitle={content.mapTitle}
        mapButtonLabel={content.mapButtonLabel}
        mapTags={content.mapTags}
        fallbackStats={content.fallbackStats}
      />
      <Footer />
    </>
  )
}

export default ContactPage
