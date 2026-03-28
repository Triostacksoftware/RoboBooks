'use client';

import {
  BadgeCheck,
  Lightbulb,
  Lock,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { defaultAboutContent, fetchPublicCmsSection, type AboutCmsContent } from '@/services/cmsService';

const valueIcons = [Lightbulb, Sparkles, Lock, BadgeCheck, Users, Target];

export default function AboutValues() {
  const [content, setContent] = useState<AboutCmsContent>(defaultAboutContent);

  useEffect(() => {
    fetchPublicCmsSection<AboutCmsContent>('about', defaultAboutContent).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8fbff] py-16 scroll-mt-24 lg:py-20">
      <div className="absolute right-[-8rem] top-12 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute left-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            {content.values.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            {content.values.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {content.values.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.values.items.map(({ title, description }, index) => {
            const Icon = valueIcons[index % valueIcons.length];

            return (
            <div
              key={`${title}-${index}`}
              className="rounded-[28px] border border-[#d8e7f1] bg-white p-8 shadow-[0_18px_45px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#0f2344] text-white">
                <Icon size={28} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[#0f2344]">{title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
