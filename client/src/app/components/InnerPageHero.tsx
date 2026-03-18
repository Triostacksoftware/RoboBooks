'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  User,
} from 'lucide-react';

type Action = {
  href: string;
  label: string;
};

type Stat = {
  label: string;
  value: string;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: Action;
  secondaryAction?: Action;
  stats?: Stat[];
};

export default function InnerPageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#0f2344] pt-28 text-white lg:pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(0, 190, 220, 0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0, 145, 215, 0.18), transparent 35%), radial-gradient(circle at 60% 60%, rgba(255,255,255,0.06), transparent 40%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <svg
          viewBox="0 0 800 800"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,250 C300,430 500,150 800,320"
            fill="none"
            stroke="#0aa6c9"
            strokeWidth="3"
            opacity="0.25"
          />
          <path
            d="M0,480 C260,620 540,360 820,520"
            fill="none"
            stroke="#1781bf"
            strokeWidth="3"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8 lg:px-20 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0aa6c9] px-8 py-3 text-base font-semibold text-white shadow-xl transition hover:bg-[#0088c5]"
              >
                {primaryAction.label}
                <ArrowRight size={18} />
              </Link>

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.30)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-100">
                  Contact
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Request a product demo
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0aa6c9] text-white shadow-lg">
                <PhoneCall size={20} />
              </span>
            </div>

            <form className="mt-6 space-y-4">
              <label className="block text-sm text-slate-100/80">
                <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <User size={16} />
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail size={16} />
                  Work email
                </span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Phone size={16} />
                  Phone
                </span>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <MessageSquare size={16} />
                  What do you want to automate?
                </span>
                <textarea
                  rows={3}
                  placeholder="e.g. GST filing, invoice automation, bank reconciliation"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0aa6c9] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-[#0aa6c9]/30 transition hover:bg-[#0088c5]"
              >
                Book demo <Send size={16} />
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
