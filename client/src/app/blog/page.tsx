'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Clock3, Tag, ArrowRight } from 'lucide-react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import InnerPageHero from '../components/InnerPageHero'
import { posts } from './posts'

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="Blog"
        title="Insights for teams building a smarter accounting workflow"
        description="Explore practical ideas around invoicing, bookkeeping, reporting, finance operations, and how modern SaaS tools can reduce accounting friction."
        primaryAction={{ href: '#blog-posts', label: 'Read latest posts' }}
        secondaryAction={{ href: '/register', label: 'Try RoboBooks' }}
        stats={[
          { value: '4+', label: 'Latest articles' },
          { value: '100%', label: 'Practical insights' },
          { value: 'Finance', label: 'Focused topics' },
          { value: 'Weekly', label: 'Fresh ideas' },
        ]}
      />

      <section id="blog-posts" className="relative overflow-hidden bg-[#f8fbff] py-16 lg:py-20">
        <div className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-20">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              Latest Articles
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              Compact cards for a cleaner blog layout
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group mx-auto w-full max-w-[300px] overflow-hidden rounded-[22px] border border-[#d8e7f1] bg-white text-left shadow-[0_12px_30px_rgba(15,35,68,0.05)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 50vw, 300px"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0f2344] shadow-sm">
                      <CalendarDays size={14} />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                      <Tag size={14} />
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#0f2344] px-3 py-1.5 text-xs font-semibold text-white">
                      <Clock3 size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3 flex items-center gap-4 text-slate-500">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <CalendarDays size={14} />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs">
                      <Clock3 size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-[1.1rem] font-semibold leading-[1.35] text-[#0f2344]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {post.excerpt}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0088c5] px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#006b9c]">
                    Read Article
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BlogPage
