'use client';

import Image from 'next/image';

const missionPoints = [
  'Make accounting accessible for small and growing businesses',
  'Reduce repetitive finance admin with guided automation',
  'Keep compliance, reporting, and books connected in one system',
  'Design finance software that teams actually enjoy using',
];

export default function AboutMission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden bg-white pb-16 pt-10 scroll-mt-24 lg:pb-20 lg:pt-12"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-[#f8fbff] lg:block" />
      <div className="absolute left-10 top-20 hidden h-40 w-40 rounded-full border border-[#0aa6c9]/10 lg:block" />

      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="space-y-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Our Mission
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Build accounting software that keeps business teams in control
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              RoboBooks exists to simplify the daily finance work that slows
              companies down. We bring invoicing, bookkeeping, reporting, and
              compliance into one experience so business owners and teams can act
              from clean numbers instead of scattered tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {missionPoints.map((point) => (
              <div
                key={point}
                className="rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] px-5 py-5 shadow-[0_14px_35px_rgba(15,35,68,0.05)]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#ebfaff] text-[#0aa6c9]">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6.003 10.803 3.2 8l-1.2 1.2 4.002 4L14 5.202 12.8 4l-6.797 6.803Z" />
                    </svg>
                  </span>
                  <p className="text-base leading-7 text-[#0f2344]">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[440px]">
          <div className="absolute left-0 top-0 h-[70%] w-[78%] overflow-hidden rounded-[30px] shadow-[0_24px_60px_rgba(15,35,68,0.14)]">
            <Image
              src="/images/homehero.png"
              alt="RoboBooks dashboard mission visual"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
          <div className="absolute right-0 top-12 rounded-[20px] bg-[#0aa6c9] px-6 py-5 text-white shadow-[0_18px_35px_rgba(10,166,201,0.28)]">
            <p className="text-4xl font-bold">1</p>
            <p className="mt-2 max-w-[140px] text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">
              unified finance workspace
            </p>
          </div>
          <div className="absolute bottom-0 right-10 h-[220px] w-[62%] overflow-hidden rounded-[26px] border-[10px] border-white bg-white shadow-[0_22px_45px_rgba(15,35,68,0.14)]">
            <Image
              src="/images/usability.png"
              alt="RoboBooks product mission support"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
