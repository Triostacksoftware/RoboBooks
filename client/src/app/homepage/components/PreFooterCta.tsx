'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';

const benefits = [
  'GST-ready invoicing',
  'Books, banking, and reports in one place',
  'Built for growing Indian businesses',
];

export default function PreFooterCta() {
  return (
    <section className="relative overflow-hidden bg-[#eef3fb] py-16 text-slate-900 lg:py-20">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1380px] gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0f2344]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0f2344] shadow-sm backdrop-blur">
            <Sparkles size={14} className="text-[#0aa6c9]" />
            Start with RoboBooks
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-[#18263c] sm:text-5xl">
            Start using RoboBooks today
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Bring invoicing, GST workflows, payment follow-ups, and accounting visibility together in one clean workspace your whole team can rely on.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4f46e5] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#4f46e5]/20 transition hover:bg-[#4338ca]"
            >
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Book Demo
              <Play size={18} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <CheckCircle2 size={16} className="text-[#0aa6c9]" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Download app on
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-2xl bg-black px-4 py-2 shadow-md transition hover:scale-[1.02]"
                aria-label="Download RoboBooks on Google Play"
              >
                <Image
                  src="/images/playstore.png"
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  className="h-12 w-auto"
                />
              </Link>
              <Link
                href="/register"
                className="rounded-2xl bg-black px-4 py-2 shadow-md transition hover:scale-[1.02]"
                aria-label="Download RoboBooks on App Store"
              >
                <Image
                  src="/images/appstore.png"
                  alt="Download on the App Store"
                  width={180}
                  height={54}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[620px] justify-center pb-4 pt-6 lg:items-center lg:pb-10">
          <div className="absolute left-10 top-16 hidden h-40 w-40 rounded-full bg-[#0aa6c9]/14 blur-3xl lg:block" />
          <div className="absolute right-8 bottom-12 hidden h-40 w-40 rounded-full bg-[#4f46e5]/12 blur-3xl lg:block" />

          <div className="relative h-[390px] w-full max-w-[560px] sm:h-[450px]">
            <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 sm:w-[60%]">
              <PhoneMockup
                title="RoboBooks App"
                subtitle="Collections"
                accent="bg-emerald-500"
                imageClassName="object-left-top"
              />
            </div>

            <div className="absolute left-[2%] top-[18%] hidden rounded-[28px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_45px_rgba(15,35,68,0.14)] backdrop-blur lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#0aa6c9]">Collected</p>
              <p className="mt-2 text-3xl font-bold text-[#18263c]">Rs. 11.4L</p>
              <p className="mt-1 text-sm text-slate-500">This month</p>
            </div>

            <div className="absolute bottom-[12%] right-[2%] hidden rounded-[28px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_45px_rgba(15,35,68,0.14)] backdrop-blur lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#0aa6c9]">Invoices</p>
              <p className="mt-2 text-3xl font-bold text-[#18263c]">126</p>
              <p className="mt-1 text-sm text-slate-500">Auto-tracked in RoboBooks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type PhoneMockupProps = {
  title: string;
  subtitle: string;
  accent: string;
  imageClassName?: string;
};

function PhoneMockup({ title, subtitle, accent, imageClassName }: PhoneMockupProps) {
  return (
    <div className="rounded-[2.8rem] bg-[#111827] p-[10px] shadow-[0_30px_80px_rgba(15,35,68,0.28)]">
      <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-white">
        <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[#111827]" />

        <div className="relative z-10 flex items-center justify-between bg-[linear-gradient(135deg,#0f2344_0%,#173664_100%)] px-5 pb-4 pt-10 text-white">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              {subtitle}
            </p>
            <p className="mt-1 text-lg font-semibold">{title}</p>
          </div>
          <span className={`h-3 w-3 rounded-full ${accent}`} />
        </div>

        <div className="relative aspect-[10/18] bg-[#f8fbff]">
          <Image
            src="/images/dashboard.png"
            alt={`${title} mobile preview`}
            fill
            className={`object-cover ${imageClassName ?? ''}`}
            sizes="(max-width: 768px) 45vw, 240px"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f8fbff] via-[#f8fbff]/70 to-transparent" />
        </div>
      </div>
    </div>
  );
}
