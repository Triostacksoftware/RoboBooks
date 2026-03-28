'use client';

import { useEffect, useState } from 'react';
import { defaultAboutContent, fetchPublicCmsSection, type AboutCmsContent } from '@/services/cmsService';

export default function AboutStats() {
  const [content, setContent] = useState<AboutCmsContent>(defaultAboutContent);

  useEffect(() => {
    fetchPublicCmsSection<AboutCmsContent>('about', defaultAboutContent).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-16 scroll-mt-24 lg:py-20">
      <div className="absolute inset-y-0 left-0 hidden w-[30%] bg-[#f8fbff] lg:block" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              {content.stats.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              {content.stats.title}
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            {content.stats.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.stats.items.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
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
