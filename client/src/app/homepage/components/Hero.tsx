"use client";

import Link from "next/link";
import {
  PhoneCall,
  Plus,
  Mail,
  User,
  Phone,
  MessageSquare,
  Send,
} from "lucide-react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#0f2344] text-white">
      {/* layered background sweeps */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0, 190, 220, 0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0, 145, 215, 0.18), transparent 35%), radial-gradient(circle at 60% 60%, rgba(255,255,255,0.06), transparent 40%)",
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

      <div className="relative mx-auto flex max-w-[1380px] flex-col gap-12 px-4 pb-16 pt-24 md:px-8 lg:flex-row lg:items-center lg:px-10 lg:pb-20 lg:pt-28">
        <div className="flex-1 space-y-8">
          <div className="uppercase tracking-[0.35em] text-xs text-cyan-200">
            GST-ready accounting SaaS
          </div>
          <h1 className="text-4xl leading-[1.05] sm:text-5xl md:text-6xl font-bold">
            Automate Your Books,
            <br />
            Grow With Confidence
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Close books 2x faster with smart invoicing, bank feeds, GST filings,
            inventory, and payroll in one cloud platform built for modern Indian
            businesses.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0aa6c9] px-8 py-3 text-lg font-semibold text-white shadow-xl transition hover:bg-[#0088c5]"
            >
              Start free trial
              <Plus size={18} />
            </Link>

            <div className="flex items-center gap-4 text-slate-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-2 ring-cyan-400/50">
                <PhoneCall />
              </span>
              <div className="leading-tight">
                <p className="text-sm text-cyan-100">Talk to product expert</p>
                <p className="text-lg font-semibold text-white">
                  +91 9876543210
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -left-6 top-6 h-14 w-14 rounded-br-full bg-[#0aa6c9]" />
            <div className="absolute -right-8 -bottom-10 h-16 w-16 rounded-tl-full border-4 border-[#0aa6c9]/60" />
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/5 blur-3xl" />

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">
                    Contact
                  </p>
                  <h3 className="text-2xl font-semibold">Request a product demo</h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0aa6c9] text-white shadow-lg">
                  <PhoneCall />
                </span>
              </div>

              <form className="space-y-4">
                <label className="block text-sm text-slate-100/80">
                  <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <User size={16} />
                    Full name
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                    placeholder="Enter your name"
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
                    />
                  </div>
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
                    placeholder="+1 555 012 3456"
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
      </div>
    </section>
  );
};

export default Hero;
