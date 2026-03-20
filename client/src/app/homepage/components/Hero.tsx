"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Mail,
  User,
  Phone,
  Building2,
  BriefcaseBusiness,
  X,
} from "lucide-react";

const Hero: React.FC = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);

  const normalizedPhone = useMemo(
    () => phoneValue.replace(/\D/g, "").slice(0, 10),
    [phoneValue]
  );

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d+\s-]/g, "");
    setPhoneValue(cleaned);

    const digits = value.replace(/\D/g, "");
    if (digits.length >= 10 && !hasTriggeredModal) {
      setIsRegisterModalOpen(true);
      setHasTriggeredModal(true);
    }
  };

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

      <div className="relative mx-auto flex max-w-[1380px] flex-col gap-8 px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24 lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:pb-20 lg:pt-28">
        <div className="flex-1 space-y-8 lg:space-y-10">
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.16] sm:text-4xl md:text-5xl">
            Best GST Accounting Software for Business in India
          </h1>

          <div className="space-y-4 text-lg text-white sm:text-xl">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 flex-none text-[#34c759]" />
              <p>
                Reconcile books faster with <span className="font-semibold">real-time GST entries</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 flex-none text-[#34c759]" />
              <p>
                Track receivables, expenses, and tax dues in <span className="font-semibold">one live dashboard</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 flex-none text-[#34c759]" />
              <p>
                Close monthly accounting with <span className="font-semibold">clean audit-ready reports</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef6c10] px-8 py-3 text-lg font-semibold text-white shadow-xl transition hover:bg-[#d65f0c]"
            >
              Start Free Billing
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 text-lg font-medium text-white transition hover:bg-white/10"
            >
              Book Free Demo
            </Link>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -left-6 top-6 h-14 w-14 rounded-br-full bg-[#0aa6c9]" />
            <div className="absolute -right-8 -bottom-10 h-16 w-16 rounded-tl-full border-4 border-[#0aa6c9]/60" />
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/5 blur-3xl" />

            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5 lg:p-6">
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-100">
                    Contact
                  </p>
                  <h3 className="text-xl font-semibold sm:text-2xl">Request a product demo</h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0aa6c9] text-white shadow-lg">
                  <PhoneCall />
                </span>
              </div>

              <form className="space-y-3 sm:space-y-4">
                <label className="block text-sm text-slate-100/80">
                  <span className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    <User size={16} />
                    Full name
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                    placeholder="Enter your name"
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none sm:py-3"
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
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none sm:py-3"
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
                    value={phoneValue}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/50 shadow-inner shadow-black/20 focus:border-[#0aa6c9] focus:outline-none sm:py-3"
                  />
                </label>

                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-inner shadow-black/20">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.youtube.com/embed/YaiT6rz5YRA?autoplay=1&mute=1&loop=1&playlist=YaiT6rz5YRA&rel=0&playsinline=1"
                      title="RoboBooks Demo Video"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4">
          <div className="relative w-full max-w-[560px] rounded-[28px] border border-white/10 bg-[#13294a] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-8">
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              aria-label="Close registration modal"
            >
              <X size={18} />
            </button>

            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Register Now
              </p>
              <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Complete your details
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                Continue with your contact details and our team will help you get started.
              </p>
            </div>

            <form className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-100/80">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-white">
                  <User size={16} />
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-white">
                  <Mail size={16} />
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-white">
                  <Phone size={16} />
                  Phone
                </span>
                <input
                  type="tel"
                  defaultValue={normalizedPhone}
                  placeholder="Enter 10 digit phone"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-white">
                  <BriefcaseBusiness size={16} />
                  Designation
                </span>
                <input
                  type="text"
                  placeholder="Your designation"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <label className="block text-sm text-slate-100/80 sm:col-span-2">
                <span className="mb-2 inline-flex items-center gap-2 font-semibold text-white">
                  <Building2 size={16} />
                  Organization
                </span>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/45 focus:border-[#0aa6c9] focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#0aa6c9] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#0aa6c9]/25 transition hover:bg-[#0891b2] sm:col-span-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
