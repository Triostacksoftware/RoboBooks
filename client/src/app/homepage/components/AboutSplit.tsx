'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    name: 'Quarterly',
    price: 'Rs. 2,499',
    duration: '/3 months',
    description: 'A flexible entry plan for small businesses starting with structured invoicing and bookkeeping.',
    features: [
      'GST invoicing and expense tracking',
      'Basic financial dashboards',
      'Email support',
    ],
  },
  {
    name: 'Semi-Annual',
    price: 'Rs. 4,499',
    duration: '/6 months',
    description: 'Balanced pricing for growing teams that need deeper finance visibility and smoother operations.',
    features: [
      'Everything in Quarterly',
      'Bank reconciliation and reports',
      'Priority support',
    ],
  },
  {
    name: 'Annual',
    price: 'Rs. 7,999',
    duration: '/12 months',
    description: 'Best value for companies that want a complete accounting SaaS workflow throughout the year.',
    features: [
      'Everything in Semi-Annual',
      'Advanced analytics and team access',
      'Dedicated onboarding support',
    ],
  },
];

export default function AboutSplit() {
  const [selectedPlan, setSelectedPlan] = useState('Semi-Annual');

  const orderedPlans = [
    ...plans.filter((plan) => plan.name === selectedPlan),
    ...plans.filter((plan) => plan.name !== selectedPlan),
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute left-[-6rem] top-8 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            Pricing Plans
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            Choose the RoboBooks plan that fits your accounting cycle
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Simple pricing for businesses that want invoicing, bookkeeping, GST workflows, and finance visibility in one SaaS platform.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {plans.map((plan) => {
            const isActive = selectedPlan === plan.name;

            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => setSelectedPlan(plan.name)}
                className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition ${
                  isActive
                    ? 'bg-[#0f2344] text-white shadow-[0_14px_35px_rgba(15,35,68,0.18)]'
                    : 'border border-[#d8e7f1] bg-white text-[#0f2344] hover:border-[#0aa6c9] hover:text-[#0aa6c9]'
                }`}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {orderedPlans.map((plan) => {
            const isFeatured = selectedPlan === plan.name;

            return (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-[32px] border p-8 transition duration-300 ${
                  isFeatured
                    ? 'border-[#0aa6c9] bg-[#0f2344] text-white shadow-[0_26px_70px_rgba(15,35,68,0.24)]'
                    : 'border-[#d8e7f1] bg-[#f8fbff] text-[#0f2344] shadow-[0_20px_50px_rgba(15,35,68,0.08)]'
                }`}
              >
                {isFeatured && (
                  <div className="mb-6 inline-flex rounded-full bg-[#0aa6c9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    Selected Plan
                  </div>
                )}

                <p
                  className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                    isFeatured ? 'text-cyan-200' : 'text-[#0aa6c9]'
                  }`}
                >
                  {plan.name}
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={isFeatured ? 'text-slate-300' : 'text-slate-500'}>
                    {plan.duration}
                  </span>
                </div>

                <p className={`mt-5 text-base leading-7 ${isFeatured ? 'text-slate-200' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                <div className={`mt-8 space-y-4 border-t pt-7 ${isFeatured ? 'border-white/10' : 'border-[#d8e7f1]'}`}>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                          isFeatured ? 'bg-white/10 text-cyan-200' : 'bg-[#ebfaff] text-[#0aa6c9]'
                        }`}
                      >
                        <Check size={16} />
                      </span>
                      <p className={`text-base leading-7 ${isFeatured ? 'text-slate-100' : 'text-slate-700'}`}>
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className={`mt-10 inline-flex items-center gap-3 rounded-full px-7 py-3 text-base font-semibold transition ${
                    isFeatured
                      ? 'bg-[#0aa6c9] text-white hover:bg-[#0890ae]'
                      : 'bg-[#0f2344] text-white hover:bg-[#112c53]'
                  }`}
                >
                  Get started
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
