'use client';

import { Mail, MessageSquare, Phone, Send, User } from 'lucide-react';

export default function HeroContactSection() {
  return (
    <section className="relative bg-white py-14 lg:py-16">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f3f8fe] to-transparent" />

      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            Contact RoboBooks
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[#0f2344] sm:text-4xl">
            Talk to our team right after exploring the product
          </h2>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Share your business details and we will help you with invoicing, GST workflows, bookkeeping, and the right RoboBooks setup for your team.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[#d7e7f2] bg-[#f7fbff] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                Call us
              </p>
              <p className="mt-2 text-2xl font-bold text-[#0f2344]">+91 9876543210</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Quick help for demos, onboarding, and product questions.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#d7e7f2] bg-[#f7fbff] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                Email us
              </p>
              <p className="mt-2 text-2xl font-bold text-[#0f2344]">hello@robobooks.in</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send your requirement and our team will get back shortly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] border border-[#d6e6f2] bg-[#0f2344] p-5 shadow-[0_28px_75px_rgba(15,35,68,0.16)] sm:p-6 lg:p-8">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200">
              Request a callback
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Get a RoboBooks expert in touch
            </h3>
          </div>

          <form className="grid gap-4 md:grid-cols-2">
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
                Company name
              </span>
              <input
                type="text"
                placeholder="Your company"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <label className="block text-sm text-slate-100/80 md:col-span-2">
              <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                <MessageSquare size={16} />
                How can RoboBooks help?
              </span>
              <textarea
                rows={4}
                placeholder="Tell us about your invoicing, accounting, GST, or reporting needs"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0aa6c9] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#0aa6c9]/30 transition hover:bg-[#0890ae] md:col-span-2"
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
