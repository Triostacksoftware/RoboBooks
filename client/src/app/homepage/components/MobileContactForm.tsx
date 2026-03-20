'use client';

import { Building2, Mail, MessageSquare, Phone, Send, User } from 'lucide-react';

export default function MobileContactForm() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute inset-0">
        <div className="absolute left-[-5rem] top-10 h-64 w-64 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
        <div className="absolute right-[-4rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:px-12">
        <div className="rounded-[32px] bg-[#0f2344] p-7 text-white shadow-[0_28px_80px_rgba(15,35,68,0.18)] sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Contact Us
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Talk to RoboBooks after exploring the mobile experience
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
            Share your requirement and our team will help with invoicing, GST billing, payment follow-ups, and the right setup for your business.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0aa6c9] text-white">
                <Phone size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Call
              </p>
              <p className="mt-2 text-xl font-semibold">+91 98765 43210</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Demo booking, onboarding, and product guidance.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0aa6c9] text-white">
                <Mail size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Email
              </p>
              <p className="mt-2 text-xl font-semibold">hello@robobooks.in</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Send your details and our team will reach out quickly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#d9e5f2] bg-[#f8fbff] p-6 shadow-[0_24px_60px_rgba(15,35,68,0.1)] sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0aa6c9]">
              Request A Callback
            </p>
            <h3 className="mt-3 text-3xl font-bold text-[#0f2344]">
              Let us get in touch
            </h3>
          </div>

          <form className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 font-semibold text-[#0f2344]">
                <User size={16} />
                Full name
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-[#d7e3ef] bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 font-semibold text-[#0f2344]">
                <Mail size={16} />
                Work email
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-[#d7e3ef] bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 font-semibold text-[#0f2344]">
                <Phone size={16} />
                Phone number
              </span>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-2xl border border-[#d7e3ef] bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <label className="block text-sm text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 font-semibold text-[#0f2344]">
                <Building2 size={16} />
                Company name
              </span>
              <input
                type="text"
                placeholder="Your business name"
                className="w-full rounded-2xl border border-[#d7e3ef] bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <label className="block text-sm text-slate-700 md:col-span-2">
              <span className="mb-2 inline-flex items-center gap-2 font-semibold text-[#0f2344]">
                <MessageSquare size={16} />
                Your requirement
              </span>
              <textarea
                rows={4}
                placeholder="Tell us what you want help with: billing, GST, accounting, reports, inventory, or demo setup."
                className="w-full rounded-2xl border border-[#d7e3ef] bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0aa6c9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0aa6c9]/25 transition hover:bg-[#0891b2] md:col-span-2"
            >
              Submit enquiry
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
