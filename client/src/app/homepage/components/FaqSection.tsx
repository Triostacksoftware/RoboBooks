'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import {
  defaultFaqContent,
  fetchPublicCmsSection,
  type FaqCmsContent,
} from '@/services/cmsService';

export default function FaqSection() {
  const [content, setContent] = useState<FaqCmsContent>(defaultFaqContent);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetchPublicCmsSection<FaqCmsContent>('faq', defaultFaqContent).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute left-[8%] top-20 h-56 w-56 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
      <div className="absolute right-[8%] bottom-0 h-64 w-64 rounded-full bg-[#0f2344]/7 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="space-y-4">
          {content.items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="rounded-[26px] border border-[#d8e7f1] bg-[#fbfdff] px-6 py-2 shadow-[0_14px_40px_rgba(15,35,68,0.05)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-[#0f2344] sm:text-xl">
                    {faq.question}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ebfaff] text-[#0aa6c9]">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen ? (
                  <div className="pb-5 pr-14 text-base leading-8 text-slate-600">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
