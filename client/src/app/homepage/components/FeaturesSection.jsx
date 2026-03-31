'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  ChartColumnIncreasing,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Landmark,
  PackageCheck,
  UsersRound,
} from 'lucide-react';
import {
  defaultFeaturesContent,
  fetchPublicCmsSection,
  normalizeFeaturesContent,
  resolveCmsAssetUrl,
} from '@/services/cmsService';

const fallbackIcons = [
  UsersRound,
  Landmark,
  ClipboardList,
  CreditCard,
  FileCheck2,
  PackageCheck,
  ChartColumnIncreasing,
  BookOpenText,
];

export default function FeaturesSection() {
  const [content, setContent] = useState(defaultFeaturesContent);

  useEffect(() => {
    fetchPublicCmsSection('features', defaultFeaturesContent).then((response) => {
      setContent(normalizeFeaturesContent(response));
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pb-8 pt-12 lg:pb-10 lg:pt-14">
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-24 h-56 w-56 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
        <div className="absolute right-[8%] bottom-10 h-64 w-64 rounded-full bg-[#0f2344]/7 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bfe8f2] bg-[#effbfe] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
            <BadgeCheck size={16} />
            {content.eyebrow}
          </div>
          <h2 className="mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-5xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card, index) => {
            const Icon = fallbackIcons[index] || UsersRound;
            return (
            <Link
              key={`${card.title}-${index}`}
              href={`/features/${card.slug}`}
              className="group rounded-[28px] border border-slate-200 bg-[#fbfdff] p-7 shadow-[0_16px_40px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35 hover:bg-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#0f2344] text-white">
                {card.iconUrl?.trim() ? (
                  <img
                    src={resolveCmsAssetUrl(card.iconUrl)}
                    alt={card.title}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <Icon size={24} />
                )}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#0f2344]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0aa6c9]">
                Explore feature
                <ArrowRight
                  size={16}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          )})}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={content.ctaUrl}
            className="inline-flex items-center gap-3 rounded-full border border-[#0f2344] px-7 py-3 text-base font-semibold text-[#0f2344] transition hover:bg-[#0f2344] hover:text-white"
          >
            {content.ctaLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
