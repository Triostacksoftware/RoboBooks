'use client'

import React from 'react'
import Navbar from './homepage/components/Navbar'
import Hero from './homepage/components/Hero'
import AboutSection from './homepage/components/AboutSection'
import InvoicePrintThemes from './homepage/components/InvoicePrintThemes'
import FeaturesSection from './homepage/components/FeaturesSection'
import GstComplianceSection from './homepage/components/GstComplianceSection'
import ServicesSection from './homepage/components/ServicesSection'
import TrustedMarquee from './homepage/components/TrustedMarquee'
import IndustriesSection from './homepage/components/IndustriesSection'
import BusinessBenefits from './homepage/components/BusinessBenefits'
import AboutSplit from './homepage/components/AboutSplit'
import TeamManagement from './homepage/components/TeamManagement'
import TrustedAcrossIndustries from './homepage/components/TrustedAcrossIndustries'
import FaqSection from './homepage/components/FaqSection'
import TestimonialsCarousel from './homepage/components/TestimonialsCarousel'
import PreFooterCta from './homepage/components/PreFooterCta'
import MobileContactForm from './homepage/components/MobileContactForm'
import Footer from './homepage/components/Footer'
import Usability from './homepage/components/Usability'

const page = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutSection/>
    <InvoicePrintThemes/>
    <ServicesSection/>
    <IndustriesSection/>
    <GstComplianceSection/>
    <FeaturesSection/>
    <Usability/>
    <BusinessBenefits/>
    <AboutSplit/>
    <TrustedAcrossIndustries/>
    <TeamManagement/>
    <FaqSection/>
    <TrustedMarquee/>
    <TestimonialsCarousel/>
    <PreFooterCta/>
    <MobileContactForm/>
    <Footer/>
    </>
  )
}
export default page
