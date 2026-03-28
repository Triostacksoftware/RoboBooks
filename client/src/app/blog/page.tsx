import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Clock3, Tag, ArrowRight } from 'lucide-react'
import Navbar from '../homepage/components/Navbar'
import Footer from '../homepage/components/Footer'
import InnerPageHero from '../components/InnerPageHero'
import { defaultBlogContent, fetchPublicCmsSection } from '@/services/cmsService'

const BlogPage = async () => {
  const content = await fetchPublicCmsSection('blog', defaultBlogContent)

  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        primaryAction={{ href: content.primaryButtonUrl, label: content.primaryButtonLabel }}
        secondaryAction={{ href: content.secondaryButtonUrl, label: content.secondaryButtonLabel }}
        variant="banner"
        breadcrumbLabel="Blog"
        stats={content.stats}
      />

      <section id="blog-posts" className="relative overflow-hidden bg-[#f8fbff] pb-16 pt-12 lg:pb-20 lg:pt-14">
        <div className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

        <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
              {content.sectionEyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
              {content.sectionTitle}
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {content.posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group mx-auto flex h-full w-full max-w-[360px] flex-col overflow-hidden rounded-[24px] border border-[#d8e7f1] bg-white text-left shadow-[0_12px_30px_rgba(15,35,68,0.05)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/35"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 1280px) 50vw, 360px"
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

                <div className="flex flex-1 flex-col p-5">
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

                  <h3 className="text-[1.3rem] font-semibold leading-[1.35] text-[#0f2344]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">
                    {post.excerpt}
                  </p>

                  <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#0088c5] px-5 py-2.5 text-base font-semibold text-white transition group-hover:bg-[#006b9c]">
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
