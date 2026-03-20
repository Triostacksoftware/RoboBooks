'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play, Star } from 'lucide-react';

const stories = [
  {
    title: 'Increased Turnover by 40%',
    name: 'Mohit Jain',
    company: 'Arihant Enterprises',
    image: '/images/testimonial-indian-1.jpg',
    quote:
      'Friends in the electronics trade told us to compare myBillBook with Vyapar and Tally before deciding. RoboBooks stood out because it handles large SKU billing smoothly.',
  },
  {
    title: 'Reduced Overdues by 80%',
    name: 'Akhil',
    company: 'Shuban Clothing',
    image: '/images/testimonial-indian-2.jpg',
    quote:
      'Many business owners asked me to evaluate multiple billing apps before choosing. After trying them, RoboBooks felt easier for staff adoption and payment follow-ups.',
  },
  {
    title: '50K to 35 Lacs Growth',
    name: 'Vishwaradhya',
    company: 'Sri Siddalingeshwara Enterprises',
    image: '/images/testimonial-indian-3.jpg',
    quote:
      'Before choosing a billing app, I compared RoboBooks with other options like Vyapar and Tally. After using it, the workflow felt the most seamless for our daily business.',
  },
];

export default function TrustedAcrossIndustries() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
      <div className="absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full bg-[#7c3aed]/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1380px] px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-[#232a36] sm:text-5xl lg:text-6xl">
            Our Testimonials
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500 sm:text-[1.45rem] sm:leading-10">
            Real stories from Indian business owners who streamlined billing, collections, and operations with RoboBooks
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="group overflow-hidden rounded-[22px] border border-[#e4e7ee] bg-white shadow-[0_22px_55px_rgba(15,35,68,0.1)]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,28,45,0.14)_0%,rgba(124,58,237,0.12)_36%,rgba(168,85,247,0.72)_100%)]" />

                <button
                  type="button"
                  aria-label={`Play ${story.name} story`}
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
                        src={story.image}
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
            href="/contact"
            className="inline-flex items-center gap-3 text-xl font-medium text-[#0f2344] transition hover:text-[#0aa6c9]"
          >
            View All Testimonials
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </section>
  );
}
