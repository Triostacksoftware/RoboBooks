'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, PhoneCall, Search, X, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Service' },
    { href: '/features', label: 'Pages' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
        {/* angled brand block to mirror mock */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
          aria-hidden
        >
          <div
            className="h-full w-[360px] bg-gradient-to-r from-[#08c1c9] via-[#04a6c7] to-[#006fae]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 74% 100%, 0 100%)' }}
          />
        </div>

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10 lg:pl-[340px]">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[360px] lg:items-center lg:justify-start lg:pl-4 lg:gap-0"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg lg:hidden">
              <Image
                src="/images/logo.png"
                alt="RoboBooks logo"
                width={42}
                height={42}
                priority
              />
            </div>
            <div className="hidden lg:flex items-center justify-center text-white">
              <Image
                src="/images/logo.png"
                alt="RoboBooks logo"
                width={170}
                height={52}
                className="h-12 w-auto object-contain drop-shadow-md"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#122241]">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition hover:text-[#0072b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15c2c5]/60"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <button
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-slate-300 hover:shadow md:inline-flex"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088c5] text-white shadow-md">
                <PhoneCall size={18} />
              </span>
              <div className="text-left leading-tight">
                <p className="text-xs text-slate-500">Requesting A Call:</p>
                <p className="text-sm font-semibold text-slate-900">(629) 555-0129</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-[#0088c5] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#006b9c] md:inline-flex"
            >
              Get a quote <ArrowRight size={16} />
            </Link>

            {/* Mobile menu trigger */}
            <button
              aria-label="Toggle menu"
              className="text-slate-900 md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-white md:hidden transition-transform duration-500 ${
          mobileOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-16" />
        <div className="flex flex-col items-center gap-6 px-6 py-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-lg font-medium text-slate-800 transition hover:text-[#0072b8]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0088c5] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#006b9c]"
          >
            Get a quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
