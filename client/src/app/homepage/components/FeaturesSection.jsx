'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChartColumnIncreasing,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Landmark,
  PackageCheck,
  UsersRound,
} from 'lucide-react';

const features = [
  {
    icon: UsersRound,
    title: 'Customer Accounts',
    desc: 'Maintain customer ledgers, credits, dues, and GST details with complete visibility.',
  },
  {
    icon: Landmark,
    title: 'Bank Reconciliation',
    desc: 'Match bank activity against books faster and reduce month-end closing effort.',
  },
  {
    icon: ClipboardList,
    title: 'Purchase Workflows',
    desc: 'Handle purchase orders, bills, and vendor liabilities from one connected process.',
  },
  {
    icon: CreditCard,
    title: 'Recurring Billing',
    desc: 'Automate subscription invoices, due date alerts, and consistent payment collection.',
  },
  {
    icon: FileCheck2,
    title: 'Tax-Ready Reports',
    desc: 'Export clean summaries for GST, audits, and internal reviews without manual cleanup.',
  },
  {
    icon: PackageCheck,
    title: 'Inventory Linking',
    desc: 'Connect stock movement directly to sales and purchase entries to avoid blind spots.',
  },
  {
    icon: ChartColumnIncreasing,
    title: 'Growth Analytics',
    desc: 'Understand margins, revenue trends, and business health with executive-friendly dashboards.',
  },
  {
    icon: BookOpenText,
    title: 'Bookkeeping History',
    desc: 'Track every adjustment, approval, and transaction with structured accounting records.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-12 lg:pb-10 lg:pt-14">
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-24 h-56 w-56 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
        <div className="absolute right-[8%] bottom-10 h-64 w-64 rounded-full bg-[#0f2344]/7 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bfe8f2] bg-[#effbfe] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
            <BadgeCheck size={16} />
            Product Features
          </div>
          <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            Purpose-built features for modern accounting operations
          </h2>
          <p className="mx-auto mt-5 max-w-5xl text-lg leading-8 text-slate-600">
            Every feature is designed to reduce finance admin, improve accuracy, and help teams move from transaction entry to business insight.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-[28px] border border-slate-200 bg-[#fbfdff] p-7 shadow-[0_16px_40px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35 hover:bg-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#0f2344] text-white">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#0f2344]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-3 rounded-full border border-[#0f2344] px-7 py-3 text-base font-semibold text-[#0f2344] transition hover:bg-[#0f2344] hover:text-white"
          >
            Explore RoboBooks
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
