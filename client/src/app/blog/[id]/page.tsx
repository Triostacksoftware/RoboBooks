import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag,
} from 'lucide-react'
import Navbar from '../../homepage/components/Navbar'
import Footer from '../../homepage/components/Footer'
import { defaultBlogContent, fetchPublicCmsSection } from '@/services/cmsService'

function normalizeRichText(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  const hasHtmlTag = /<\/?[a-z][\s\S]*>/i.test(trimmed)
  if (hasHtmlTag) {
    return trimmed
  }

  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function RichTextContent({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: normalizeRichText(value) }}
    />
  )
}

type BlogDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params
  const blogContent = await fetchPublicCmsSection('blog', defaultBlogContent)
  const posts = blogContent.posts
  const post = posts.find((item) => item.id === id)
  const relatedPosts = posts.filter((item) => item.id !== id).slice(0, 3)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-[#f8fbff] pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-0 h-72 w-72 rounded-full bg-[#0f2344]/8 blur-3xl" />

        <div className="relative mx-auto max-w-[1650px] px-4 md:px-8 lg:px-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_380px] xl:items-start">
            <div>
              <div className="mb-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f1] bg-white px-5 py-3 text-sm font-semibold text-[#0f2344] shadow-[0_12px_30px_rgba(15,35,68,0.06)] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                >
                  <ArrowLeft size={16} />
                  Back to blog
                </Link>

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f1] bg-white px-4 py-2 font-semibold text-[#0f2344]">
                    <CalendarDays size={15} />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-4 py-2 font-semibold text-white">
                    <Tag size={15} />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0f2344] px-4 py-2 font-semibold text-white">
                    <Clock3 size={15} />
                    {post.readTime}
                  </span>
                </div>

                <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] text-[#0f2344] sm:text-5xl md:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
                  {post.excerpt}
                </p>
              </div>

              <div className="overflow-hidden rounded-[34px] border border-[#d8e7f1] bg-white shadow-[0_22px_60px_rgba(15,35,68,0.08)]">
                <div className="relative aspect-[3/2] max-h-[240px] w-full overflow-hidden bg-[#eef4f8] sm:max-h-[300px] lg:max-h-[340px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1280px) 100vw, 860px"
                  />
                </div>

                <div className="flex flex-wrap gap-3 p-4 sm:p-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f1] bg-[#f8fbff] px-4 py-2 text-sm font-semibold text-[#0f2344]">
                    <CalendarDays size={15} />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-4 py-2 text-sm font-semibold text-white">
                    <Tag size={15} />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f1] bg-[#0f2344] px-4 py-2 text-sm font-semibold text-white">
                    <Clock3 size={15} />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <article className="mt-8 rounded-[34px] border border-[#d8e7f1] bg-white p-6 shadow-[0_22px_60px_rgba(15,35,68,0.08)] lg:p-10">
                <div className="mb-8 rounded-[28px] bg-[linear-gradient(135deg,#eff8ff_0%,#f8fbff_100%)] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                    In This Article
                  </p>
                  <p className="mt-3 text-lg leading-8 text-slate-600">
                    {post.excerpt}
                  </p>
                </div>

                <div className="space-y-7 text-lg leading-9 text-slate-600 [&_a]:font-semibold [&_a]:text-[#0088c5] [&_a]:underline-offset-4 hover:[&_a]:text-[#006b9c] [&_blockquote]:rounded-[24px] [&_blockquote]:border-l-4 [&_blockquote]:border-[#0aa6c9]/35 [&_blockquote]:bg-[#f8fbff] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#0f2344] [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0f2344] [&_img]:my-6 [&_img]:max-h-[420px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-[24px] [&_li]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-2 [&_p]:leading-9 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-2 [&_video]:my-6 [&_video]:max-h-[420px] [&_video]:w-full [&_video]:rounded-[24px]">
                  {post.content.map((paragraph, index) => (
                    <RichTextContent key={index} value={paragraph} />
                  ))}
                </div>

                <div className="mt-10 rounded-[28px] bg-[#0f2344] p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#7fe7ff]">
                    Accounting SaaS Takeaway
                  </p>
                  <RichTextContent
                    value={post.takeaway}
                    className="mt-3 text-base leading-8 text-slate-200 sm:text-lg [&_a]:font-semibold [&_a]:text-white [&_blockquote]:border-l-4 [&_blockquote]:border-white/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_img]:my-4 [&_img]:max-h-[320px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-[20px] [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:pl-2 [&_ul]:list-disc [&_ul]:pl-2 [&_video]:my-4 [&_video]:w-full [&_video]:rounded-[20px]"
                  />
                </div>
              </article>
            </div>

            <aside className="xl:sticky xl:top-28">
              <div className="rounded-[34px] border border-[#d8e7f1] bg-white p-5 shadow-[0_22px_60px_rgba(15,35,68,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0aa6c9]">
                  More To Read
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-[#0f2344]">
                  Explore related RoboBooks articles
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Keep reading more accounting SaaS ideas around collections,
                  reporting, automation, and finance visibility.
                </p>

                <div className="mt-6 space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.id}`}
                      className="group block overflow-hidden rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] transition duration-300 hover:-translate-y-1 hover:border-[#0aa6c9]/40 hover:bg-white"
                    >
                      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#eef4f8]">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-contain object-center transition duration-500 group-hover:scale-105"
                          sizes="340px"
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f3f8fc] px-2.5 py-1">
                            <CalendarDays size={12} />
                            {relatedPost.date}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#0f2344] px-2.5 py-1 text-white">
                            <Clock3 size={12} />
                            {relatedPost.readTime}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-semibold leading-7 text-[#0f2344] transition group-hover:text-[#0088c5]">
                          {relatedPost.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {relatedPost.excerpt}
                        </p>

                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0088c5]">
                          Read this next
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,#0aa6c9_0%,#0088c5_100%)] p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                    Need A Smarter Stack?
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-8">
                    See how RoboBooks turns accounting workflows into one clean
                    SaaS system.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0f2344] transition hover:bg-[#e9f7ff]"
                  >
                    Talk to our team
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
