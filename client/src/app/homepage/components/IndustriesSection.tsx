'use client';

import Link from 'next/link';
import {
  BadgeIndianRupee,
  BookOpenText,
  Building2,
  Cpu,
  Factory,
  Gem,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Monitor,
  MonitorPlay,
  Pill,
  Plane,
  PlugZap,
  Receipt,
  Recycle,
  Shirt,
  ShoppingBag,
  Sofa,
  Sparkles,
  TrainFront,
  Truck,
  University,
  UtensilsCrossed,
  Wifi,
  Car,
  House,
  Fuel,
} from 'lucide-react';

const industries = [
  { title: 'Hotel', slug: 'hotel', icon: Hotel, span: 'xl:col-span-1' },
  { title: 'Export-Import', slug: 'export-import', icon: Plane, span: 'xl:col-span-2' },
  { title: 'Recycling', slug: 'recycling', icon: Recycle, span: 'xl:col-span-1' },
  { title: 'Telecom', slug: 'telecom', icon: Wifi, span: 'xl:col-span-2' },
  { title: 'IT Sector', slug: 'it-sector', icon: Monitor, span: 'xl:col-span-1' },
  { title: 'Beverages', slug: 'beverages', icon: Receipt, span: 'xl:col-span-3' },
  { title: 'Oil & Gas', slug: 'oil-gas', icon: Fuel, span: 'xl:col-span-1' },
  { title: 'Apparels', slug: 'apparels', icon: Shirt, span: 'xl:col-span-2' },
  { title: 'Entertainment', slug: 'entertainment', icon: MonitorPlay, span: 'xl:col-span-1' },
  { title: 'Manufacturing', slug: 'manufacturing', icon: Factory, span: 'xl:col-span-3' },
  { title: 'Retail', slug: 'retail', icon: ShoppingBag, span: 'xl:col-span-1' },
  { title: 'Banks', slug: 'banks', icon: University, span: 'xl:col-span-2' },
  { title: 'Finance', slug: 'finance', icon: BadgeIndianRupee, span: 'xl:col-span-1' },
  { title: 'BPO', slug: 'bpo', icon: Globe2, span: 'xl:col-span-2' },
  { title: 'Furniture', slug: 'furniture', icon: Sofa, span: 'xl:col-span-1' },
  { title: 'Real Estate', slug: 'real-estate', icon: House, span: 'xl:col-span-2' },
  { title: 'HealthCare', slug: 'healthcare', icon: HeartPulse, span: 'xl:col-span-1' },
  { title: 'Railways', slug: 'railways', icon: TrainFront, span: 'xl:col-span-2' },
  { title: 'Gems', slug: 'gems', icon: Gem, span: 'xl:col-span-1' },
  { title: 'Automobile', slug: 'automobile', icon: Car, span: 'xl:col-span-2' },
  { title: 'IOT', slug: 'iot', icon: Cpu, span: 'xl:col-span-1' },
  { title: 'Electrical', slug: 'electrical', icon: PlugZap, span: 'xl:col-span-2' },
  { title: 'Hardware', slug: 'hardware', icon: Cpu, span: 'xl:col-span-1' },
  { title: 'SaaS', slug: 'saas', icon: Building2, span: 'xl:col-span-2' },
  { title: 'Restaurant', slug: 'restaurant', icon: UtensilsCrossed, span: 'xl:col-span-1' },
  { title: 'Salon', slug: 'salon', icon: Sparkles, span: 'xl:col-span-1' },
  { title: 'Cloud Kitchen', slug: 'cloud-kitchen', icon: UtensilsCrossed, span: 'xl:col-span-2' },
  { title: 'Pharma', slug: 'pharma', icon: Pill, span: 'xl:col-span-1' },
  { title: 'Books', slug: 'books', icon: BookOpenText, span: 'xl:col-span-2' },
  { title: 'Education', slug: 'education', icon: GraduationCap, span: 'xl:col-span-2' },
  { title: 'Logistics', slug: 'logistics', icon: Truck, span: 'xl:col-span-2' },
  { title: 'Consulting', slug: 'consulting', icon: Building2, span: 'xl:col-span-1' },
];

export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute left-[-7rem] top-20 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-6rem] h-80 w-80 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="mx-auto max-w-[1500px] px-4 md:px-8 lg:px-10">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            Industries on RoboBooks
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            Industries we Serve
          </h2>
          <div className="mx-auto mt-4 h-2 w-20 rounded-full bg-[#0aa6c9]" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            RoboBooks supports billing, bookkeeping, GST workflows, and reporting across multiple industries with one connected accounting platform.
          </p>
        </div>

        <div className="relative mt-10 grid gap-[6px] md:grid-cols-2 xl:grid-cols-10">
          {industries.map(({ title, slug, icon: Icon, span }) => (
            <Link
              key={title}
              href={`/industries/${slug}`}
              className={`flex min-h-[138px] flex-col items-center justify-center rounded-2xl border border-[#d6e6f2] bg-[#0f2344] px-4 py-6 text-center text-white shadow-[0_18px_45px_rgba(15,35,68,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[#0aa6c9]/40 hover:bg-[#12305c] ${span}`}
            >
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-[#0aa6c9]/18 text-[#8ee7fb] ring-1 ring-white/10">
                <Icon size={34} strokeWidth={2.1} />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold leading-tight text-white sm:text-[19px]">
                {title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
