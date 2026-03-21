'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Banknote,
  Boxes,
  ChartNoAxesCombined,
  FileSpreadsheet,
  ReceiptText,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { services } from '../../services/serviceData';

const serviceIcons = {
  'Smart Invoicing': ReceiptText,
  'Cash Flow Tracking': Banknote,
  'Inventory Control': Boxes,
  'Customer & Vendor Books': Users,
  'GST & Compliance': FileSpreadsheet,
  'Decision Dashboards': ChartNoAxesCombined,
};

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] pb-16 pt-12 lg:pb-20 lg:pt-14">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute right-[-10rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute bottom-0 left-[-8rem] h-80 w-80 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Core Services
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              One accounting workspace for every daily finance workflow
            </h2>
          </div>
          <div className="max-w-xl rounded-[28px] border border-[#d8e8f4] bg-white/80 px-6 py-5 shadow-[0_18px_40px_rgba(15,35,68,0.08)] backdrop-blur">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f2344] text-white">
                <ShieldCheck size={22} />
              </span>
              <div>
                <p className="text-base font-semibold text-[#0f2344]">
                  Built for accounting-heavy teams
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  RoboBooks combines billing, bookkeeping, tax preparation, and finance visibility in a single cloud system.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ slug, title, desc }) => {
            const Icon = serviceIcons[title as keyof typeof serviceIcons];

            return (
              <Link
                key={title}
                href={`/services/${slug}`}
                className="group block rounded-[30px] border border-[#d6e6f2] bg-white p-8 text-left shadow-[0_20px_50px_rgba(15,35,68,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/40"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#ebfaff] text-[#0aa6c9] transition group-hover:bg-[#0f2344] group-hover:text-white">
                  <Icon size={30} />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[#0f2344]">{title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{desc}</p>
                <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                  <span>Available in RoboBooks</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-[34px] bg-[#0f2344] px-8 py-10 text-white shadow-[0_24px_70px_rgba(15,35,68,0.2)] lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Scale Faster
            </p>
            <h3 className="mt-3 text-3xl font-bold sm:text-4xl">
              Replace scattered tools with one finance-ready SaaS stack
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-200">
              Move from spreadsheets and disconnected software to a guided accounting workflow that saves time every week.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
            >
              Start free trial
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
