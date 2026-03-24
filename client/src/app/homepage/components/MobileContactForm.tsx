'use client';

import { Mail, Phone, Send, User2, Building2, Flag } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  defaultContactSectionContent,
  fetchPublicCmsSection,
  type ContactSectionCmsContent,
} from '@/services/cmsService';

export default function MobileContactForm() {
  const [content, setContent] = useState<ContactSectionCmsContent>(
    defaultContactSectionContent
  );

  useEffect(() => {
    fetchPublicCmsSection<ContactSectionCmsContent>(
      'contactSection',
      defaultContactSectionContent
    ).then(setContent);
  }, []);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
        <div className="rounded-[32px] bg-[#0f2344] p-8 text-white shadow-[0_24px_60px_rgba(15,35,68,0.16)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
            {content.leftEyebrow}
          </p>
          <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight">
            {content.leftTitle}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-200">
            {content.leftDescription}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={<Phone size={20} />}
              label={content.callLabel}
              value={content.callValue}
              description={content.callDescription}
            />
            <InfoCard
              icon={<Mail size={20} />}
              label={content.emailLabel}
              value={content.emailValue}
              description={content.emailDescription}
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-[#dbe8f1] bg-[#f8fbff] p-6 shadow-[0_24px_60px_rgba(15,35,68,0.08)] lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
            {content.formEyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-[#0f2344]">
            {content.formTitle}
          </h2>

          <form className="mt-8 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label={content.fullNameLabel}
                placeholder={content.fullNamePlaceholder}
                icon={<User2 size={16} />}
              />
              <Field
                label={content.emailFieldLabel}
                placeholder={content.emailFieldPlaceholder}
                icon={<Mail size={16} />}
              />
              <Field
                label={content.phoneFieldLabel}
                placeholder={content.phoneFieldPlaceholder}
                icon={<Phone size={16} />}
              />
              <Field
                label={content.companyFieldLabel}
                placeholder={content.companyFieldPlaceholder}
                icon={<Building2 size={16} />}
              />
            </div>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f2344]">
                <Flag size={16} className="text-[#0f2344]" />
                {content.requirementLabel}
              </span>
              <textarea
                rows={5}
                placeholder={content.requirementPlaceholder}
                className="w-full rounded-[20px] border border-[#d3e3ef] bg-white px-4 py-3 text-[#0f2344] outline-none transition placeholder:text-[#8aa0bb] focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
              />
            </label>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(135deg,#0aa6c9_0%,#1ca7d6_100%)] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_30px_rgba(10,166,201,0.24)] transition hover:brightness-105"
            >
              {content.submitButtonLabel}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0aa6c9] text-white">
        {icon}
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold leading-tight">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function Field({
  label,
  placeholder,
  icon,
}: {
  label: string;
  placeholder: string;
  icon: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f2344]">
        <span className="text-[#0f2344]">{icon}</span>
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="w-full rounded-[18px] border border-[#d3e3ef] bg-white px-4 py-3 text-[#0f2344] outline-none transition placeholder:text-[#8aa0bb] focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      />
    </label>
  );
}
