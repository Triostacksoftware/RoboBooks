import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartColumnIncreasing,
  Handshake,
  ShieldCheck,
  Sparkles,
  Users2,
} from 'lucide-react';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import InnerPageHero from '../components/InnerPageHero';

export const metadata: Metadata = {
  title: 'RoboBooks Company',
  description:
    'Learn how RoboBooks builds modern accounting software for growing businesses.',
};

const companySignals = [
  {
    icon: Building2,
    title: 'Built for operators',
    description:
      'We design for founders, finance managers, and teams who need clean numbers without slow handoffs.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust by default',
    description:
      'Permissions, audit clarity, and dependable workflows are treated as product fundamentals.',
  },
  {
    icon: Sparkles,
    title: 'Modern product discipline',
    description:
      'RoboBooks aims to make serious accounting work feel sharp, guided, and easier to run daily.',
  },
  {
    icon: Handshake,
    title: 'Close customer partnership',
    description:
      'We shape the platform around real bookkeeping, GST, reporting, and cash-flow problems customers face.',
  },
];

const executionLanes = [
  {
    step: '01',
    title: 'Simplify the daily stack',
    text: 'Bring billing, expenses, banking, tax workflows, and reporting into one connected operating surface.',
  },
  {
    step: '02',
    title: 'Reduce finance drag',
    text: 'Cut repetitive manual follow-up so teams spend less time reconciling tools and more time acting on numbers.',
  },
  {
    step: '03',
    title: 'Create decision-ready visibility',
    text: 'Turn transaction activity into dashboards, review trails, and reporting views that leaders can actually use.',
  },
];

const companyMetrics = [
  { value: '10K+', label: 'Businesses supported' },
  { value: '24/7', label: 'Workflow coverage mindset' },
  { value: '99.9%', label: 'Reliability target' },
  { value: '1', label: 'Unified finance workspace' },
];

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="Company"
        title="The team behind RoboBooks is building accounting software with more clarity and less operational drag"
        description="RoboBooks exists for businesses that want invoicing, bookkeeping, GST workflows, and reporting to work like one system instead of a pile of disconnected tasks."
        primaryAction={{ href: '#company-story', label: 'Explore the company' }}
        secondaryAction={{ href: '/contact', label: 'Talk to RoboBooks' }}
        variant="banner"
        breadcrumbLabel="Company"
        stats={companyMetrics}
      />

      <main className="overflow-hidden bg-[#f4fbff]">
        <section
          id="company-story"
          className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-12 lg:py-20"
        >
          <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
          <div className="absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full bg-[#0f2344]/8 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0aa6c9]">
                Why We Exist
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
                Finance systems should give growing companies confidence, not friction
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                We built RoboBooks to help teams stay faster and more organized across
                billing, books, compliance, and management reporting. The product is
                shaped around practical finance operations, not isolated feature lists.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {companySignals.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-[26px] border border-[#d6e8f2] bg-white p-6 shadow-[0_18px_45px_rgba(15,35,68,0.06)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f2344] text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#0f2344]">
                      {title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[34px] bg-[#0f2344] p-6 text-white shadow-[0_30px_80px_rgba(15,35,68,0.22)] sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
                      Operating Blueprint
                    </p>
                    <h3 className="mt-3 text-3xl font-bold leading-tight">
                      A calmer way to run accounting-heavy teams
                    </h3>
                  </div>
                  <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-white/10 sm:flex">
                    <ChartColumnIncreasing size={28} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {executionLanes.map(({ step, title, text }) => (
                    <div
                      key={step}
                      className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur"
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl bg-[#0aa6c9] px-3 text-sm font-bold text-white">
                          {step}
                        </span>
                        <div>
                          <h4 className="text-xl font-semibold text-white">{title}</h4>
                          <p className="mt-2 text-sm leading-7 text-slate-200">
                            {text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[28px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(10,166,201,0.18),rgba(255,255,255,0.06))] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0f2344]">
                      <Users2 size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
                        Company Focus
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Practical software for teams scaling beyond spreadsheets
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 md:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0aa6c9]">
                What Companies Get
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
                A product direction centered on speed, accuracy, and control
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {[
                'Connected invoicing, books, and compliance flows',
                'Operational dashboards that surface real business movement',
                'Cleaner team collaboration across finance-heavy work',
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-[28px] border border-[#d6e8f2] bg-[#f8fcff] p-7 shadow-[0_18px_45px_rgba(15,35,68,0.05)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ebfaff] text-[#0aa6c9]">
                    <BadgeCheck size={22} />
                  </span>
                  <p className="mt-5 text-lg font-semibold leading-8 text-[#0f2344]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 md:px-8 lg:px-12 lg:pb-20">
          <div className="mx-auto max-w-7xl rounded-[36px] bg-[linear-gradient(135deg,#071529_0%,#0f2344_45%,#13396a_100%)] px-6 py-10 text-white shadow-[0_35px_90px_rgba(8,24,46,0.20)] sm:px-8 lg:px-12 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200">
                  Next Step
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                  If your team wants a more disciplined accounting workflow, RoboBooks is built for that shift
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
                  Explore the platform, book a product walkthrough, or talk with us
                  about the way your finance operations run today.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
                >
                  Start free trial
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Contact the team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
