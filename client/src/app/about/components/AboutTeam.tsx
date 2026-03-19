'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO & Founder',
    image: '/images/testimonial1.jpg',
    description: 'Former finance leader focused on building reliable accounting systems for growing companies.',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    image: '/images/testimonial2.jpg',
    description: 'Drives platform quality, product scale, and the engineering behind a smoother finance workflow.',
  },
  {
    name: 'Amit Patel',
    role: 'Head of Product',
    image: '/images/testimonial3.jpg',
    description: 'Shapes the user experience so finance tools feel practical, modern, and simple to adopt.',
  },
  {
    name: 'Neha Singh',
    role: 'Head of Customer Success',
    image: '/images/testimonial4.jpg',
    description: 'Helps customers onboard faster and get more value from every RoboBooks workflow.',
  },
];

export default function AboutTeam() {
  return (
    <section
      id="team-section"
      className="relative overflow-hidden bg-white py-16 scroll-mt-24 lg:py-20"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[30%] bg-[#f8fbff] lg:block" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Meet The Team
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              The people building RoboBooks behind the scenes
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our team combines product thinking, finance understanding, and customer empathy to make accounting software easier for businesses to trust.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center rounded-full bg-[#0f2344] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#112c53]"
          >
            Talk to our team
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-[28px] border border-[#d8e7f1] bg-[#fbfdff] p-6 shadow-[0_18px_45px_rgba(15,35,68,0.06)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-[#ebfaff]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#0f2344]">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#0aa6c9]">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{member.description}</p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f2344] text-white transition hover:bg-[#0aa6c9]"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebfaff] text-[#0aa6c9] transition hover:bg-[#0aa6c9] hover:text-white"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
