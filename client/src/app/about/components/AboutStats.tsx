'use client';

const stats = [
  {
    number: '10,000+',
    label: 'Businesses served',
    description: 'Teams trust RoboBooks for daily accounting workflows and reporting clarity.',
  },
  {
    number: 'Rs. 500Cr+',
    label: 'Transactions handled',
    description: 'A growing volume of business activity moves through the product with confidence.',
  },
  {
    number: '99.9%',
    label: 'Platform uptime',
    description: 'Reliability matters when businesses depend on finance software every day.',
  },
  {
    number: '50+',
    label: 'Team members',
    description: 'Product, engineering, support, and operations work together to improve the platform.',
  },
];

export default function AboutStats() {
  return (
    <section className="relative overflow-hidden bg-white py-16 scroll-mt-24 lg:py-20">
      <div className="absolute inset-y-0 left-0 hidden w-[30%] bg-[#f8fbff] lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Our Impact
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Numbers that reflect product trust and business adoption
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            These metrics represent more than scale. They show how many teams
            rely on RoboBooks to manage billing, books, compliance workflows,
            and finance visibility every single day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-[#d8e7f1] bg-[#fbfdff] p-7 shadow-[0_16px_40px_rgba(15,35,68,0.06)]"
            >
              <p className="text-4xl font-bold text-[#0f2344]">{stat.number}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                {stat.label}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
