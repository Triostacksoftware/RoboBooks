'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Copy, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

type PhoneItem = { label: string; number: string };
type EmailItem = { label: string; address: string };

type Props = {
  className?: string;
  hqTitle?: string;
  addressLines?: string[];
  phones?: PhoneItem[];
  emails?: EmailItem[];
  showMap?: boolean;
  placeQuery?: string;
  whatsAppNumber?: string;
};

export default function ContactDetails({
  className = '',
  hqTitle = 'Robo Books HQ',
  addressLines = ['Stact Inc, 06 Highley St, Victoria,', 'New York'],
  phones = [
    { label: 'Mobile', number: '(+61) 1990 6886' },
    { label: 'Hotline', number: '1800 1102' },
  ],
  emails = [
    { label: 'Info', address: 'info@robobooks.com' },
    { label: 'Support', address: 'support@robobooks.com' },
  ],
  showMap = true,
  placeQuery = 'Robo Books HQ New York',
  whatsAppNumber,
}: Props) {
  const waLink = useMemo(() => {
    if (!whatsAppNumber) return '';
    const digits = whatsAppNumber.replace(/[^\d]/g, '');
    const text = encodeURIComponent('Hello Robo Books! I want to know more.');
    return `https://wa.me/${digits}?text=${text}`;
  }, [whatsAppNumber]);

  return (
    <section
      id="contact-details"
      className={[
        'scroll-mt-28 md:scroll-mt-32 relative overflow-hidden bg-[#f8fbff] py-16 lg:py-20',
        className,
      ].join(' ')}
    >
      <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Contact Details
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Reach RoboBooks through the channel that works best for you
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Visit the office, call the team, or send a message. We have redesigned the section to feel cleaner, sharper, and more aligned with the homepage experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {whatsAppNumber && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0088c5]"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            )}
            <a
              href={`mailto:${emails[1]?.address ?? emails[0]?.address ?? 'support@robobooks.com'}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f1] bg-white px-6 py-3 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9] hover:text-[#0aa6c9]"
            >
              <Mail size={16} />
              Email Support
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-8 pt-2">
            <InfoBlock
              icon={<MapPin size={22} />}
              title={hqTitle}
              content={
                <div className="space-y-1 text-base leading-8 text-slate-600">
                  {addressLines.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              }
            />

            <InfoBlock
              icon={<Phone size={22} />}
              title="Call us"
              content={
                <div className="space-y-4">
                  {phones.map((item) => (
                    <CopyRow
                      key={item.label + item.number}
                      label={item.label}
                      value={item.number}
                      href={`tel:${item.number.replace(/[^\d+]/g, '')}`}
                    />
                  ))}
                </div>
              }
            />

            <InfoBlock
              icon={<Mail size={22} />}
              title="Mail us"
              content={
                <div className="space-y-4">
                  {emails.map((item) => (
                    <CopyRow
                      key={item.label + item.address}
                      label={item.label}
                      value={item.address}
                      href={`mailto:${item.address}`}
                    />
                  ))}
                </div>
              }
            />
          </div>

          <div className="rounded-[32px] border border-[#d8e7f1] bg-white p-6 shadow-[0_22px_60px_rgba(15,35,68,0.08)] lg:p-7">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0aa6c9]">
                  Location Map
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#0f2344]">
                  Find us on the map
                </h3>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2344] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#112c53]"
              >
                Open in Maps
                <ArrowUpRight size={16} />
              </a>
            </div>

            {showMap ? (
              <MapEmbed placeQuery={placeQuery} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <MiniStat value="1h" label="Avg. response" />
                <MiniStat value="98%" label="Satisfaction" />
                <MiniStat value="24k+" label="Issues solved" />
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <Tag>Wheelchair friendly</Tag>
              <Tag>Visitor parking</Tag>
              <Tag>Public transit 3 min</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#d8e7f1] pb-8 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#0f2344] text-white shadow-[0_14px_30px_rgba(15,35,68,0.12)]">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-semibold text-[#0f2344]">{title}</h3>
          <div className="mt-4">{content}</div>
        </div>
      </div>
    </div>
  );
}

function CopyRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="min-w-20 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      <a
        href={href}
        className="text-lg font-medium text-[#0f2344] underline decoration-[#cfe8f2] underline-offset-4 transition hover:text-[#0aa6c9]"
      >
        {value}
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {}
        }}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e7f1] bg-[#f8fbff] text-slate-500 transition hover:text-[#0aa6c9]"
      >
        <Copy size={16} />
        <span
          className={`pointer-events-none absolute -top-8 rounded-md bg-[#0f2344] px-2 py-1 text-xs text-white transition ${
            copied ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Copied
        </span>
      </button>
    </div>
  );
}

function MapEmbed({ placeQuery }: { placeQuery: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(placeQuery)}&output=embed`;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[26px] border border-[#d8e7f1] sm:aspect-[16/9] lg:aspect-[21/10]">
      <iframe
        title="Map"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[#d8e7f1] bg-[#f8fbff] px-4 py-2 text-sm font-medium text-slate-600">
      {children}
    </span>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-[#d8e7f1] bg-[#f8fbff] p-5 text-center">
      <p className="text-2xl font-bold text-[#0f2344]">{value}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
    </div>
  );
}
