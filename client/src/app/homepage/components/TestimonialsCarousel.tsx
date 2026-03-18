'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rohit Bansal',
    role: 'Founder, BrightLedger Retail',
    content:
      'RoboBooks helped us move away from scattered spreadsheets. Billing, dues, and reporting finally feel connected.',
    image: '/images/testimonial1.jpg',
  },
  {
    name: 'Neha Kapoor',
    role: 'Finance Lead, UrbanNest Services',
    content:
      'The interface is clean, the workflows are practical, and our month-end reviews take much less effort than before.',
    image: '/images/testimonial2.jpg',
  },
  {
    name: 'Arjun Mehta',
    role: 'Director, Mehta Supply Co.',
    content:
      'For a growing company, having invoicing, accounting visibility, and team access in one place is a major advantage.',
    image: '/images/testimonial3.jpg',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonials[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-[#0f2344] py-16 text-white lg:py-20">
      <div className="absolute left-[12%] top-16 h-64 w-64 rounded-full bg-[#0aa6c9]/18 blur-3xl" />
      <div className="absolute right-[8%] bottom-8 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Teams trust RoboBooks to keep their accounting calmer
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            The product is designed to reduce friction across billing, books, reporting, and daily finance collaboration.
          </p>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-white/10 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-[28px] bg-[#10294f] p-6">
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-[28px] border border-white/10">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-semibold">{current.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-cyan-200">
                  {current.role}
                </p>
              </div>
            </div>

            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0aa6c9] text-white">
                <Quote size={24} />
              </span>
              <blockquote className="mt-6 text-2xl font-medium leading-10 text-white sm:text-3xl sm:leading-[3rem]">
                "{current.content}"
              </blockquote>

              <div className="mt-10 flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-3 w-10 rounded-full transition ${
                        index === currentIndex ? 'bg-[#0aa6c9]' : 'bg-white/25'
                      }`}
                      aria-label={`Show testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0aa6c9] transition hover:bg-[#0890ae]"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
