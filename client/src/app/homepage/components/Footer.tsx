'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const productLinks = [
  { href: '/about', label: 'About RoboBooks' },
  { href: '/contact', label: 'Book a demo' },
  { href: '/register', label: 'Start free trial' },
];

const companyLinks = [
  { href: '/about', label: 'Company' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

const legalLinks = [
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/cookies', label: 'Cookies' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#08182e] text-white">
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-[#0aa6c9]/12 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-4 py-16 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="RoboBooks"
                width={176}
                height={56}
                className="h-14 w-auto rounded-lg"
              />
            </Link>
            <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
              RoboBooks is an accounting SaaS platform for invoicing, bookkeeping, GST workflows, reporting, and operational finance control.
            </p>
            <div className="mt-7 flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Product
            </h3>
            <div className="mt-6 space-y-4">
              {productLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-base text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Company
            </h3>
            <div className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-base text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Legal
            </h3>
            <div className="mt-6 space-y-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-base text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} RoboBooks. All rights reserved.</p>
          <p>Built for modern accounting workflows and growing businesses.</p>
        </div>
      </div>
    </footer>
  );
}
