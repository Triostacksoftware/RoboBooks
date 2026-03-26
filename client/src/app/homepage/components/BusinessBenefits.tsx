'use client';

import { useEffect, useState } from 'react';
import {
  BadgeIndianRupee,
  Calculator,
  CircleCheckBig,
  Globe2,
} from 'lucide-react';
import {
  defaultBusinessImpactContent,
  fetchPublicCmsSection,
  resolveCmsAssetUrl,
  type BusinessImpactCmsContent,
} from '@/services/cmsService';

const fallbackIcons = [BadgeIndianRupee, Calculator, Globe2] as const;

export default function BusinessBenefits() {
  const [content, setContent] = useState<BusinessImpactCmsContent>(defaultBusinessImpactContent);

  useEffect(() => {
    fetchPublicCmsSection<BusinessImpactCmsContent>(
      'businessImpact',
      defaultBusinessImpactContent
    ).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0f2344] py-16 text-white lg:py-20">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute left-[8%] top-12 h-64 w-64 rounded-full bg-[#0aa6c9] blur-3xl" />
        <div className="absolute right-[12%] bottom-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="py-2">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            {content.description}
          </p>

          <div className="mt-10 border-l-2 border-[#0aa6c9]/70 pl-6">
            <div className="flex items-start gap-4">
              {content.highlightIconUrl ? (
                <span className="mt-1 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#0aa6c9]/20 text-cyan-200">
                  <img
                    src={resolveCmsAssetUrl(content.highlightIconUrl)}
                    alt={content.highlightTitle}
                    className="h-7 w-7 object-contain"
                  />
                </span>
              ) : (
                <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#0aa6c9]/20 text-cyan-200">
                  <CircleCheckBig size={22} />
                </span>
              )}
              <div className="max-w-xl">
                <p className="text-lg font-semibold">{content.highlightTitle}</p>
                <p className="mt-2 text-base leading-7 text-slate-300">
                  {content.highlightDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {content.benefits.map(({ iconUrl, title, description }, index) => {
            const Icon = fallbackIcons[index % fallbackIcons.length];

            return (
              <div
                key={title}
                className={`pb-8 ${
                  index !== content.benefits.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-transparent text-cyan-200">
                    {iconUrl ? (
                      <img
                        src={resolveCmsAssetUrl(iconUrl)}
                        alt={title}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Icon size={28} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-slate-200">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
