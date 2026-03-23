import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';
import { getIndustryBySlug, industries } from '../industryData';

type IndustryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff]">
        <section className="relative overflow-hidden px-4 pb-10 pt-24 md:px-8 lg:px-10 lg:pb-16 lg:pt-28">
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#dff6fb] via-white to-transparent" />
          <div className="absolute right-[-8rem] top-16 h-60 w-60 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
          <div className="absolute left-[-8rem] bottom-0 h-60 w-60 rounded-full bg-[#0f2344]/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1400px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#c8dced] bg-white px-5 py-3 text-sm font-semibold text-[#0f2344] shadow-sm transition hover:border-[#0aa6c9]/50 hover:text-[#0aa6c9]"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <div className="mt-6 overflow-hidden rounded-[32px] border border-[#d6e6f2] bg-white shadow-[0_20px_55px_rgba(15,35,68,0.10)]">
              <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="p-7 sm:p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
                    {industry.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
                    {industry.heroTitle}
                  </h1>
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                    {industry.description}
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500">
                    {industry.overview}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
                    >
                      Start with {industry.title}
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-[#c8dced] px-7 py-3 text-base font-semibold text-[#0f2344] transition hover:bg-[#eff8fd]"
                    >
                      Request demo
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="border-t border-[#e2edf6] bg-[linear-gradient(180deg,#f6fbff_0%,#eef7ff_100%)] p-7 lg:border-l lg:border-t-0 lg:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0aa6c9]">
                    Industry Summary
                  </p>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[24px] border border-white bg-white/90 px-5 py-4 text-[#163150] shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Sector
                      </p>
                      <p className="mt-2 text-lg font-semibold">{industry.title}</p>
                    </div>
                    <div className="rounded-[24px] border border-white bg-white/90 px-5 py-4 text-[#163150] shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Focus
                      </p>
                      <p className="mt-2 text-[15px] leading-7">
                        Billing, bookkeeping, GST workflows, receivables, payables, and reporting adapted for {industry.title.toLowerCase()} operations.
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-white bg-white/90 px-5 py-4 text-[#163150] shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Outcome
                      </p>
                      <p className="mt-2 text-[15px] leading-7">
                        Cleaner books, faster follow-up, stronger control on margins, and clearer decision-ready reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#e2edf6] px-7 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-3">
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Accounting Focus
                    </h2>
                    <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#163150]">
                      {industry.accountingFocus.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Operational Workflows
                    </h2>
                    <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#163150]">
                      {industry.workflows.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Reports & Controls
                    </h2>
                    <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#163150]">
                      {industry.reports.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
