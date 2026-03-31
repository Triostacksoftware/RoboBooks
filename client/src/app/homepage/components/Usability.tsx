'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Clock3,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';
import {
  defaultUsabilityContent,
  fetchPublicCmsSection,
  normalizeUsabilityContent,
  resolveCmsAssetUrl,
} from '@/services/cmsService';

const fallbackIcons = [
  LayoutDashboard,
  Clock3,
  Smartphone,
  Bot,
  Workflow,
  Sparkles,
];

export default function Usability() {
  const [content, setContent] = useState(defaultUsabilityContent);

  useEffect(() => {
    fetchPublicCmsSection('usability', defaultUsabilityContent).then((response) => {
      setContent(normalizeUsabilityContent(response));
    });
  }, []);

  return (
    <section
      id="product-experience"
      className="relative overflow-hidden bg-[#f8fbff] pb-16 pt-10 lg:pb-20 lg:pt-12"
    >
      <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              {content.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">{content.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.cards.map((card, index) => {
            const Icon = fallbackIcons[index] || LayoutDashboard;
            return (
              <Link
                key={`${card.title}-${index}`}
                href={`/product-experience/${card.slug}`}
                className="group rounded-[30px] border border-[#d8e7f1] bg-white p-8 shadow-[0_18px_42px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#edfaff] text-[#0aa6c9]">
                  {card.iconUrl?.trim() ? (
                    <img
                      src={resolveCmsAssetUrl(card.iconUrl)}
                      alt={card.title}
                      className="h-7 w-7 object-contain"
                    />
                  ) : (
                    <Icon size={28} />
                  )}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[#0f2344]">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{card.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0aa6c9]">
                  Explore experience
                  <ArrowRight
                    size={16}
                    className="transition duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
