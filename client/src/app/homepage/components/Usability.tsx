'use client';

import {
  Bot,
  Clock3,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';

const usabilityItems = [
  {
    icon: LayoutDashboard,
    title: 'Clean navigation',
    description: 'Important accounting actions stay visible so your team can move without hunting through menus.',
  },
  {
    icon: Clock3,
    title: 'Faster setup',
    description: 'Onboard your company, taxes, books, and billing structure quickly with guided workflows.',
  },
  {
    icon: Smartphone,
    title: 'Work from anywhere',
    description: 'Use RoboBooks across devices to review approvals, collections, and reports on the move.',
  },
  {
    icon: Bot,
    title: 'Less repetitive work',
    description: 'Automate common accounting steps like reminders, categorization, and recurring invoice creation.',
  },
  {
    icon: Workflow,
    title: 'Connected modules',
    description: 'Sales, inventory, expenses, and bookkeeping stay linked so nothing has to be entered twice.',
  },
  {
    icon: Sparkles,
    title: 'Simple for teams',
    description: 'Owners, accountants, and operations teams can use the same interface without extra complexity.',
  },
];

export default function Usability() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] pb-16 pt-10 lg:pb-20 lg:pt-12">
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Product Experience
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Made to feel simple even when accounting gets complex
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            RoboBooks follows the same design tone as the hero and about sections: focused, professional, and easy to act on. The interface is built to reduce confusion and speed up daily finance work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {usabilityItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[30px] border border-[#d8e7f1] bg-white p-8 shadow-[0_18px_42px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#edfaff] text-[#0aa6c9]">
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
