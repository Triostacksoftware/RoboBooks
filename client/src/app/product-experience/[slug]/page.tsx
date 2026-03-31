'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2 } from 'lucide-react'
import Navbar from '../../homepage/components/Navbar'
import Footer from '../../homepage/components/Footer'
import {
  defaultUsabilityContent,
  fetchPublicCmsSection,
  getUsabilityCardBySlug,
  normalizeUsabilityContent,
  resolveCmsAssetUrl,
  type UsabilityCmsContent,
} from '@/services/cmsService'

export default function ProductExperienceDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const [content, setContent] = useState<UsabilityCmsContent>(defaultUsabilityContent)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchPublicCmsSection<UsabilityCmsContent>('usability', defaultUsabilityContent)
      .then((response) => setContent(normalizeUsabilityContent(response)))
      .finally(() => setLoaded(true))
  }, [])

  const card = useMemo(() => getUsabilityCardBySlug(content, slug), [content, slug])
  const otherCards = useMemo(
    () => content.cards.filter((item) => item.slug !== slug).slice(0, 3),
    [content.cards, slug]
  )

  return (
    <>
      <Navbar />
      <main className="bg-[#f6fbff] text-slate-900">
        {loaded && !card ? (
          <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
            <div className="rounded-full border border-[#bfe8f2] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#0aa6c9]">
              Experience Not Found
            </div>
            <h1 className="mt-6 text-4xl font-bold text-[#0f2344]">This product experience page is not available</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              The selected experience card could not be found in the current CMS content. You can go back to the homepage and open another card.
            </p>
            <Link
              href="/#product-experience"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0f2344] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#14325f]"
            >
              <ArrowLeft size={16} />
              Back to product experience
            </Link>
          </section>
        ) : card ? (
          <>
            <section className="relative overflow-hidden border-b border-[#d8edf2] bg-white">
              <div className="absolute inset-0">
                <div className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
                <div className="absolute right-[10%] top-12 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />
              </div>

              <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 lg:grid lg:grid-cols-[minmax(0,1.25fr)_360px] lg:gap-10 lg:py-24">
                <div>
                  <Link
                    href="/#product-experience"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f2344] transition hover:text-[#0aa6c9]"
                  >
                    <ArrowLeft size={16} />
                    Back to product experience
                  </Link>

                  <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#bfe8f2] bg-[#effbfe] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0aa6c9]">
                    <BadgeCheck size={16} />
                    {card.detailEyebrow}
                  </div>

                  <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-[#0f2344] md:text-6xl">
                    {card.detailTitle}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                    {card.detailDescription}
                  </p>

                  <div className="mt-8 rounded-[28px] border border-[#d9e9f5] bg-[#f8fcff] p-6 shadow-[0_16px_50px_rgba(15,35,68,0.07)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                      Why it matters
                    </p>
                    <p className="mt-3 text-base leading-8 text-slate-700">{card.detailHeroNote}</p>
                  </div>
                </div>

                <div className="mt-10 space-y-6 lg:mt-0">
                  <div className="rounded-[32px] border border-[#d9e9f5] bg-[#0f2344] p-7 text-white shadow-[0_18px_60px_rgba(15,35,68,0.2)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/10">
                      {card.iconUrl?.trim() ? (
                        <img
                          src={resolveCmsAssetUrl(card.iconUrl)}
                          alt={card.title}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold">{card.title.charAt(0)}</span>
                      )}
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold">{card.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{card.description}</p>
                    <Link
                      href={card.detailCtaUrl}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f2344] transition hover:bg-[#e8f8fd]"
                    >
                      {card.detailCtaLabel}
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {card.detailStats.map((stat, index) => (
                      <div
                        key={`${stat.label}-${index}`}
                        className="rounded-[24px] border border-[#d9e9f5] bg-white p-5 shadow-[0_10px_35px_rgba(15,35,68,0.05)]"
                      >
                        <div className="text-2xl font-bold text-[#0f2344]">{stat.value}</div>
                        <div className="mt-2 text-sm font-medium text-slate-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
              <div className="grid gap-6 lg:grid-cols-3">
                {card.detailHighlights.map((highlight, index) => (
                  <div
                    key={`${highlight}-${index}`}
                    className="rounded-[28px] border border-[#d9e9f5] bg-white p-6 shadow-[0_12px_40px_rgba(15,35,68,0.05)]"
                  >
                    <CheckCircle2 className="h-6 w-6 text-[#0aa6c9]" />
                    <p className="mt-4 text-base leading-8 text-slate-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
              <div className="rounded-[36px] border border-[#d9e9f5] bg-white p-8 shadow-[0_20px_60px_rgba(15,35,68,0.06)] md:p-10">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0aa6c9]">How it helps</p>
                  <h2 className="mt-4 text-3xl font-bold text-[#0f2344] md:text-4xl">
                    A practical workflow page for {card.title.toLowerCase()}
                  </h2>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                  {card.detailSections.map((section, index) => (
                    <div
                      key={`${section.title}-${index}`}
                      className="rounded-[28px] border border-slate-200 bg-[#fbfdff] p-6"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0aa6c9]">
                        0{index + 1}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-[#0f2344]">{section.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {otherCards.length > 0 ? (
              <section className="border-t border-[#d8edf2] bg-white">
                <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0aa6c9]">
                        Explore More
                      </p>
                      <h2 className="mt-3 text-3xl font-bold text-[#0f2344]">
                        More product experience highlights
                      </h2>
                    </div>
                    <Link
                      href="/#product-experience"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f2344] transition hover:text-[#0aa6c9]"
                    >
                      View all experience cards
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {otherCards.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/product-experience/${item.slug}`}
                        className="group rounded-[28px] border border-slate-200 bg-[#fbfdff] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#0aa6c9]/40 hover:bg-[#fafdff]"
                      >
                        <h3 className="text-xl font-semibold text-[#0f2344]">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0aa6c9]">
                          Open detail page
                          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-4 py-20 text-center">
            <div>
              <div className="rounded-full border border-[#bfe8f2] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#0aa6c9]">
                Loading Experience
              </div>
              <h1 className="mt-6 text-4xl font-bold text-[#0f2344]">Preparing your product experience page</h1>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
