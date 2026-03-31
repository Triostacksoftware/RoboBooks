'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, Play, Star, X } from 'lucide-react';
import {
  defaultTestimonialCardsContent,
  fetchPublicCmsSection,
  resolveCmsAssetUrl,
  type TestimonialCardsCmsContent,
} from '@/services/cmsService';

export default function TrustedAcrossIndustries() {
  const [content, setContent] = useState<TestimonialCardsCmsContent>(
    defaultTestimonialCardsContent
  );
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    video: string;
    poster: string;
  } | null>(null);

  useEffect(() => {
    fetchPublicCmsSection<TestimonialCardsCmsContent>(
      'testimonial-cards',
      defaultTestimonialCardsContent
    ).then(setContent);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full bg-[#7c3aed]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1380px] px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-[#232a36] sm:text-5xl lg:text-6xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500 sm:text-[1.45rem] sm:leading-10">
            {content.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {content.stories.map((story) => (
            <article
              key={story.title}
              className="group overflow-hidden rounded-[22px] border border-[#e4e7ee] bg-white shadow-[0_22px_55px_rgba(15,35,68,0.1)]"
            >
              <div className="relative h-[420px] overflow-hidden">
                {story.video ? (
                  <video
                    src={resolveCmsAssetUrl(story.video)}
                    poster={story.image ? resolveCmsAssetUrl(story.image) : undefined}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <Image
                    src={resolveCmsAssetUrl(story.image)}
                    alt={story.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,28,45,0.14)_0%,rgba(124,58,237,0.12)_36%,rgba(168,85,247,0.72)_100%)]" />

                <button
                  type="button"
                  aria-label={`Play ${story.name} story`}
                  onClick={() => {
                    if (!story.video) {
                      return;
                    }

                    setActiveVideo({
                      title: story.title,
                      video: resolveCmsAssetUrl(story.video),
                      poster: story.image ? resolveCmsAssetUrl(story.image) : '',
                    });
                  }}
                  disabled={!story.video}
                  className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111827] shadow-2xl transition group-hover:scale-105"
                >
                  <Play size={30} className="ml-1 fill-current" />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-[1.05rem] font-bold leading-tight sm:text-[1.15rem]">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-xl font-medium">{story.name}</p>
                  <p className="mt-1 text-base text-white/85">{story.company}</p>
                </div>
              </div>

              <div className="border-t border-[#eef2f7] bg-white px-5 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#d9e3ef]">
                      <Image
                        src={resolveCmsAssetUrl(story.image)}
                        alt={story.company}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <p className="text-[1.05rem] font-semibold text-[#0f2344]">{story.company}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[#ffb400]">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={16} className="fill-current" />
                    ))}
                  </div>
                </div>

                <p className="mt-4 max-h-[108px] overflow-hidden text-lg italic leading-9 text-slate-600">
                  "{story.quote}"
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href={content.ctaUrl}
            className="inline-flex items-center gap-3 text-xl font-medium text-[#0f2344] transition hover:text-[#0aa6c9]"
          >
            {content.ctaLabel}
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>

      {activeVideo ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0f172a]/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-[28px] bg-[#020817] p-4 shadow-[0_30px_80px_rgba(2,8,23,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <video
              key={activeVideo.video}
              src={activeVideo.video}
              poster={activeVideo.poster || undefined}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full rounded-[20px] bg-black"
            />
            <p className="px-2 pb-2 pt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {activeVideo.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
