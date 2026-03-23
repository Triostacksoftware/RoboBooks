"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
import { defaultHeroContent, fetchPublicCmsSection, type HeroCmsContent } from "@/services/cmsService";

const heroSlides = [
  "/images/homehero.png",
  "/images/dashboard.png",
  "/images/usability.png",
  "/images/your-illustration.png",
  "/images/businessbenifits.png",
];

const Hero: React.FC = () => {
  const [content, setContent] = useState<HeroCmsContent>(defaultHeroContent);
  const [phoneValue, setPhoneValue] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [hasTriggeredModal, setHasTriggeredModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const normalizedPhone = useMemo(
    () => phoneValue.replace(/\D/g, "").slice(0, 10),
    [phoneValue]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPublicCmsSection("hero", defaultHeroContent).then(setContent);
  }, []);

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
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide}
              alt="Accounting software background"
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[#07162d]/78" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(10,166,201,0.16),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(15,35,68,0.2),transparent_28%),linear-gradient(90deg,rgba(7,22,45,0.9)_0%,rgba(7,22,45,0.72)_42%,rgba(7,22,45,0.82)_100%)]" />

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

      <div className="relative mx-auto flex max-w-[1480px] flex-col gap-8 px-4 pb-12 pt-16 md:px-8 md:pb-16 md:pt-24 lg:flex-row lg:items-center lg:gap-6 lg:px-12 lg:pb-20 lg:pt-28 xl:px-16">
        <div className="relative flex-[1.12] space-y-6 lg:space-y-7">
          <div className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-[#00c2c7]/10 blur-3xl" />

          <div className="relative max-w-5xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100 shadow-[0_10px_30px_rgba(10,166,201,0.16)]">
              {content.eyebrow}
            </div>
            <div className="pointer-events-none absolute -left-6 top-12 h-28 w-28 rounded-full bg-[#39d98a]/10 blur-3xl" />
            <div className="pointer-events-none absolute left-16 top-24 h-20 w-56 rounded-full bg-[#0aa6c9]/12 blur-3xl" />
            <div className="relative">
              <div className="pointer-events-none absolute -inset-x-3 top-8 h-24 rounded-[32px] bg-[linear-gradient(90deg,rgba(10,166,201,0),rgba(10,166,201,0.12),rgba(57,217,138,0.08),rgba(10,166,201,0))] blur-2xl" />
              <h1 className="relative max-w-[16ch] text-[1.98rem] font-extrabold leading-[1.08] tracking-[-0.028em] text-white drop-shadow-[0_14px_34px_rgba(5,18,38,0.55)] sm:max-w-[15ch] sm:text-[2.85rem] md:max-w-[16ch] md:text-[3.12rem] lg:max-w-[17ch] lg:text-[3.35rem]">
                <span className="block whitespace-nowrap">{content.titleLine1}</span>
                <span className="relative mt-2 block w-fit whitespace-nowrap bg-[linear-gradient(180deg,#ffffff_0%,#e6f7ff_100%)] bg-clip-text text-transparent">
                  {content.titleLine2}
                  <span className="absolute -bottom-2 left-0 h-[10px] w-full rounded-full bg-[linear-gradient(90deg,rgba(57,217,138,0),rgba(57,217,138,0.75),rgba(10,166,201,0))] blur-[2px]" />
                </span>
              </h1>
            </div>
            <div className="mt-5 h-px w-40 bg-[linear-gradient(90deg,rgba(10,166,201,0.9),rgba(57,217,138,0.65),rgba(255,255,255,0))]" />
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              {content.description}
            </p>
          </div>

          <div className="space-y-3.5 text-[1rem] text-white sm:text-[1.06rem] lg:text-[1.1rem]">
            {content.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3.5 py-0.5">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#34c759]/12 ring-1 ring-[#34c759]/30">
                  <CheckCircle2 className="h-6 w-6 text-[#34c759]" />
                </span>
                <p className="flex-1 leading-[1.45]">{feature}</p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <div className="pointer-events-none absolute -left-4 top-1/2 h-24 w-48 -translate-y-1/2 rounded-full bg-[#ef6c10]/20 blur-3xl" />
            <Link
              href={content.primaryButtonUrl}
              className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[#ef6c10] px-8 py-3 text-lg font-semibold text-white shadow-[0_18px_36px_rgba(239,108,16,0.32)] transition hover:-translate-y-0.5 hover:bg-[#d65f0c]"
            >
              {content.primaryButtonLabel}
              <ArrowRight size={18} />
            </Link>

            <Link
              href={content.secondaryButtonUrl}
              className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/[0.03] px-8 py-3 text-lg font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {content.secondaryButtonLabel}
            </Link>
          </div>
        </div>

        <div className="relative flex-[0.9] lg:ml-2 xl:ml-4">
          <div className="relative mx-auto flex w-full max-w-[440px] flex-col gap-5 lg:mr-0 lg:ml-auto">
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
              </form>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    Watch RoboBooks in action
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  Video
                </span>
              </div>

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
