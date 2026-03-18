'use client';

import {
  BadgeCheck,
  Lightbulb,
  Lock,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation with purpose',
    description: 'We build features that solve real finance bottlenecks, not just flashy product ideas.',
  },
  {
    icon: Sparkles,
    title: 'Simple by design',
    description: 'Even complex accounting flows should feel clear, guided, and easy to act on.',
  },
  {
    icon: Lock,
    title: 'Security first',
    description: 'Customer trust depends on strong data protection, role controls, and reliable infrastructure.',
  },
  {
    icon: BadgeCheck,
    title: 'Operational reliability',
    description: 'Businesses depend on us for everyday finance work, so stability matters in every release.',
  },
  {
    icon: Users,
    title: 'Customer empathy',
    description: 'We listen closely to teams using RoboBooks and shape the product around their real workflows.',
  },
  {
    icon: Target,
    title: 'Execution excellence',
    description: 'We value clarity, speed, and quality in the way we build and support the platform.',
  },
];

export default function AboutValues() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-16 scroll-mt-24 lg:py-20">
      <div className="absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute left-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            Our Values
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            Principles that shape every product decision
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            The RoboBooks team is driven by product clarity, customer trust, and
            a strong belief that finance software can be both powerful and easy
            to use.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[28px] border border-[#d8e7f1] bg-white p-8 shadow-[0_18px_45px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#0f2344] text-white">
                <Icon size={28} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[#0f2344]">{title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
