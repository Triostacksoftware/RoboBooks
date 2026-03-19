'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const highlights = [
  'Automated invoicing, recurring billing, and payment reminders',
  'GST-ready reports, expense tracking, and bank reconciliation',
  'Inventory, payroll, and financial dashboards in one workspace',
  'Role-based access and cloud security for growing teams',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 scroll-mt-24 lg:py-20"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[#f8fbff] lg:block" />
      <div className="absolute left-10 top-28 hidden h-36 w-36 rounded-full border border-[#0aa6c9]/10 lg:block" />
      <div className="absolute bottom-16 right-24 hidden h-44 w-44 rounded-full border border-[#0f2344]/5 lg:block" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-16 px-4 md:px-8 lg:grid-cols-[1.02fr_1fr] lg:px-12">
        <div className="relative">
          <div className="relative mx-auto min-h-[560px] max-w-[620px]">
            <div className="absolute -left-5 bottom-10 hidden h-32 w-32 rounded-full border-2 border-dotted border-[#0aa6c9]/40 lg:block" />

            <div className="relative h-[390px] w-[78%] overflow-hidden rounded-[30px] shadow-[0_24px_60px_rgba(15,35,68,0.14)]">
              <Image
                src="/images/homehero.png"
                alt="RoboBooks accounting dashboard overview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>

            <div className="absolute right-0 top-10 rounded-[22px] bg-[#0aa6c9] px-7 py-5 text-white shadow-[0_18px_35px_rgba(10,166,201,0.28)]">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold leading-none">24/7</span>
                <span className="max-w-[110px] text-lg font-semibold leading-6">
                  financial visibility
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 right-6 h-[240px] w-[66%] overflow-hidden rounded-[28px] border-[10px] border-white bg-white shadow-[0_22px_45px_rgba(15,35,68,0.14)]">
              <Image
                src="/images/usability.png"
                alt="RoboBooks workflow for bookkeeping teams"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>

            <div className="absolute right-[4%] top-[36%] hidden h-32 w-12 flex-col justify-between lg:flex">
              <span className="h-8 w-full rounded-full border-2 border-[#0f2344]/15 border-t-transparent border-b-transparent" />
              <span className="h-8 w-full rounded-full border-2 border-[#0f2344]/15 border-t-transparent border-b-transparent" />
              <span className="h-8 w-full rounded-full border-2 border-[#0f2344]/15 border-t-transparent border-b-transparent" />
            </div>
          </div>
        </div>

        <div className="relative space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#0aa6c9]">
              About RoboBooks
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Accounting Software That Keeps Every Number in Sync
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              RoboBooks is an accounting SaaS platform built for businesses that
              want faster bookkeeping, cleaner compliance, and complete control
              over cash flow. From invoices to tax-ready reports, every workflow
              stays connected in one simple dashboard.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-[#0aa6c9] bg-white" />
                <p className="text-lg leading-8 text-[#0f2344]">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link
              href="/about"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-[#0b7ea1] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#096b8a]"
            >
              About RoboBooks
              <Plus size={20} />
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Trusted for
              </p>
              <p className="mt-1 text-xl font-bold text-[#0f2344]">
                billing, books, tax, and team operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
