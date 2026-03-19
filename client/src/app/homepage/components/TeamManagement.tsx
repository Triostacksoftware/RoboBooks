'use client';

import { BriefcaseBusiness, LockKeyhole, Users2 } from 'lucide-react';

const teamFeatures = [
  {
    icon: LockKeyhole,
    title: 'Access by role',
    description: 'Control who can view reports, create invoices, approve entries, or edit accounting data.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Department coordination',
    description: 'Finance, ops, and founders can work from the same platform without breaking process ownership.',
  },
  {
    icon: Users2,
    title: 'Shared visibility',
    description: 'Everyone sees the latest status on billing, dues, and reports without relying on handoffs.',
  },
];

export default function TeamManagement() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            Team Management
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            Give every team member the right level of control
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            RoboBooks supports collaborative accounting without making the interface noisy. Teams stay aligned while permissions and financial discipline stay intact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {teamFeatures.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[30px] border border-[#d7e6f1] bg-white p-8 shadow-[0_18px_45px_rgba(15,35,68,0.07)]"
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
