import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Workflow,
} from 'lucide-react';
import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';
import { getGstToolBySlug, gstTools } from '../toolData';

type GstToolDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return gstTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function GstToolDetailPage({ params }: GstToolDetailPageProps) {
  const { slug } = await params;
  const tool = getGstToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = gstTools.filter((item) => item.slug !== tool.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff]">
        <section className="relative overflow-hidden bg-[#0f2344] pt-24 text-white lg:pt-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(circle at 18% 24%, rgba(10,166,201,0.28), transparent 28%), radial-gradient(circle at 82% 12%, rgba(79,70,229,0.22), transparent 30%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.08), transparent 34%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-25">
            <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              <path
                d="M0,260 C250,420 500,140 820,300 C980,380 1080,300 1200,240"
                fill="none"
                stroke="#0aa6c9"
                strokeWidth="3"
                opacity="0.3"
              />
              <path
                d="M-20,530 C250,660 500,410 760,530 C980,620 1080,470 1240,560"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="3"
                opacity="0.22"
              />
            </svg>
          </div>

          <div className="relative mx-auto max-w-[1600px] px-4 pb-18 md:px-8 lg:px-10 lg:pb-24">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div className="max-w-3xl">
                <h1 className="max-w-[18ch] text-[clamp(2rem,3.8vw,3.6rem)] font-bold leading-[1.08]">
                  {tool.detailTitle}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                  {tool.detail}
                </p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  {tool.detailExtended}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0aa6c9] px-8 py-3 text-base font-semibold text-white shadow-xl transition hover:bg-[#0088c5]"
                  >
                    Start with {tool.label}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                  >
                    Book a demo
                  </Link>
                </div>

                <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100">
                      Workflow
                    </p>
                    <p className="mt-3 text-2xl font-bold text-white">{tool.badge}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Designed to keep your finance flow faster and cleaner.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100">
                      Focus
                    </p>
                    <p className="mt-3 text-2xl font-bold text-white">{tool.points.length} core tools</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Practical actions that support daily operations.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100">
                      Outcome
                    </p>
                    <p className="mt-3 text-2xl font-bold text-white">{tool.useCases.length} business fits</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Useful for teams scaling compliance and reporting work.
                    </p>
                  </div>
                </div>

              </div>

              <div className="relative">
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/8 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                  <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/8 px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
                        Module Preview
                      </p>
                      <p className="mt-2 text-xl font-semibold text-white">{tool.title}</p>
                    </div>
                    <span className="rounded-full bg-cyan-300/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[28px] bg-white">
                    <Image
                      src={tool.image}
                      alt={tool.label}
                      width={1400}
                      height={1000}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 py-16 md:px-8 lg:px-10 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#eaf4ff] to-transparent" />
          <div className="relative mx-auto max-w-[1600px]">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[30px] border border-[#d6e6f2] bg-white p-7 shadow-[0_18px_50px_rgba(15,35,68,0.07)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ebfaff] text-[#0aa6c9]">
                    <Layers3 size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Core Features
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#0f2344]">
                      What this page helps your team do
                    </h2>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {tool.points.map((point, index) => (
                    <div
                      key={point}
                      className="rounded-[24px] border border-[#e4eef7] bg-[#f9fcff] px-5 py-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f2344] text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-lg font-semibold text-[#163150]">{point}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            Built to reduce manual finance work and keep records more reliable across the workflow.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-[#d6e6f2] bg-white p-7 shadow-[0_18px_50px_rgba(15,35,68,0.07)] sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#4f46e5]">
                    <Workflow size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#4f46e5]">
                      Workflow Snapshot
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#0f2344]">
                      How RoboBooks makes it feel more connected
                    </h2>
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  {tool.highlights.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-[24px] border border-[#e5e9f4] bg-[linear-gradient(135deg,#ffffff_0%,#f6f9ff_100%)] px-5 py-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-[#4f46e5]">
                          <CheckCircle2 size={20} />
                        </span>
                        <div>
                          <p className="text-lg font-semibold text-[#163150]">
                            {index + 1}. {item}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            The interface, exports, and review flow stay aligned with the rest of your accounting workspace.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0f2344] py-16 text-white lg:py-20">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute left-[8%] top-12 h-64 w-64 rounded-full bg-[#0aa6c9] blur-3xl" />
            <div className="absolute right-[12%] bottom-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-cyan-200">
                  Best Fit
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                  Teams that get the most value from {tool.label}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
                  These use cases match the way RoboBooks is already designed across invoicing, books, GST workflows, and reporting.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {tool.useCases.map((item) => (
                  <div
                    key={item}
                    className="rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur"
                  >
                    <p className="text-lg font-semibold leading-8">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
                  Explore More
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
                  Related GST and finance workflows
                </h2>
              </div>
              <Link
                href="/#gst-compliance"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#0aa6c9]"
              >
                View all GST tools
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedTools.map((item) => (
                <Link
                  key={item.slug}
                  href={`/gst-tools/${item.slug}`}
                  className="group rounded-[30px] border border-[#d6e6f2] bg-white p-8 shadow-[0_20px_50px_rgba(15,35,68,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#0aa6c9]/40"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#0f2344]">{item.label}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0aa6c9]">
                    Open page
                    <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
