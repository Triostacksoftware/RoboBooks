'use client';
import { useEffect, useState } from 'react';
import { defaultAboutContent, fetchPublicCmsSection, type AboutCmsContent } from '@/services/cmsService';

export default function AboutTimeline() {
  const [content, setContent] = useState<AboutCmsContent>(defaultAboutContent);

  useEffect(() => {
    fetchPublicCmsSection<AboutCmsContent>('about', defaultAboutContent).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-16 scroll-mt-24 lg:py-20">
      <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            {content.timeline.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            {content.timeline.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {content.timeline.description}
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-[#0aa6c9] via-[#8fd9ea] to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-1">
            {content.timeline.items.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={`${item.year}-${index}`}
                  className="relative grid items-start gap-2 md:grid-cols-2 md:gap-4"
                >
                  <div
                    className={`pl-14 md:pl-0 ${
                      isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'
                    }`}
                  >
                    <div className="rounded-[30px] border border-[#d8e7f1] bg-white p-7 shadow-[0_18px_45px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0aa6c9]/35">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex rounded-full bg-[#ebfaff] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0aa6c9]">
                          {item.year}
                        </span>
                        <span className="inline-flex rounded-full border border-[#d8e7f1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Milestone
                        </span>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold leading-9 text-[#0f2344]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-slate-600">
                        {item.description}
                      </p>

                      <div className="mt-6 border-t border-[#e7f0f6] pt-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0aa6c9]">
                          Key outcome
                        </p>
                        <p className="mt-2 text-base leading-7 text-[#0f2344]">
                          {item.achievement}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-0 top-8 flex items-center md:left-1/2 md:-translate-x-1/2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f8fbff] bg-[#0aa6c9] shadow-[0_10px_25px_rgba(10,166,201,0.25)]">
                      <span className="h-3 w-3 rounded-full bg-white" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
