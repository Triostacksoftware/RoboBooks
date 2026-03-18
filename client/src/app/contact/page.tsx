'use client'

import React from 'react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import InnerPageHero from '../components/InnerPageHero'
import ContactForm from './components/contactform'
import ContactDetails from './components/contact-details'

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <InnerPageHero
          eyebrow="Contact"
          title="Talk to the RoboBooks team about support, demos, or your accounting setup"
          description="Whether you need product guidance, help with onboarding, or answers about plans and workflows, our team is ready to respond with clarity and speed."
          primaryAction={{ href: '#contact-form', label: 'Get in touch' }}
          secondaryAction={{ href: '#contact-details', label: 'View contact details' }}
          stats={[
            { value: '24/7', label: 'Support desk' },
            { value: '1h', label: 'Fast response' },
            { value: '3', label: 'Ways to connect' },
            { value: '100%', label: 'Cloud support' },
          ]}
        />
        <ContactForm />
        <ContactDetails
          hqTitle="Robo Books HQ"
          addressLines={[
            '123 Business Park, Tech Hub',
            'Mumbai, Maharashtra 400001',
          ]}
          phones={[
            { label: 'Mobile', number: '+91 98765 43210' },
            { label: 'Support', number: '+91 1800 1102' },
          ]}
          emails={[
            { label: 'Info', address: 'hello@robobooks.com' },
            { label: 'Support', address: 'support@robobooks.com' },
          ]}
          showMap={true}
          placeQuery="Robo Books HQ Mumbai"
          whatsAppNumber="+91 98765 43210"
        />
      </div>
      <Footer />
    </>
  )
}

export default ContactPage
