import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';
import { getServiceBySlug, services } from '../serviceData';

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
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

          <div className="relative mx-auto max-w-[1600px]">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-[#c8dced] bg-white px-5 py-3 text-sm font-semibold text-[#0f2344] shadow-sm transition hover:border-[#0aa6c9]/50 hover:text-[#0aa6c9]"
            >
              <ArrowLeft size={16} />
              Back to services
            </Link>

            <div className="mt-6 overflow-hidden rounded-[32px] border border-[#d6e6f2] bg-white shadow-[0_20px_55px_rgba(15,35,68,0.10)]">
              <div className="grid lg:grid-cols-[1fr_1.02fr]">
                <div className="p-7 sm:p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
                    {service.eyebrow}
                  </p>
                  <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
                    {service.detailTitle}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    {service.detail}
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
                    {service.detailExtended}
                  </p>

                  <div className="mt-8">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Core Features
                    </h2>
                    <ul className="mt-4 space-y-3 text-base leading-7 text-[#163150]">
                      {service.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
                    >
                      Start with {service.title}
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-[#c8dced] px-7 py-3 text-base font-semibold text-[#0f2344] transition hover:bg-[#eff8fd]"
                    >
                      Request demo
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                        Key Benefits
                      </h2>
                      <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#163150]">
                        {service.highlights.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                        Best For
                      </h2>
                      <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#163150]">
                        {service.useCases.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-[#0aa6c9]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[300px] overflow-hidden bg-[radial-gradient(circle_at_top,#85ddf1_0%,#dff6fb_40%,#183553_145%)] p-5 sm:p-6 lg:p-8">
                  <div className="absolute left-6 top-6 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#163150] backdrop-blur">
                    {service.title}
                  </div>
                  <div className="absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-white/25 blur-3xl" />
                  <div className="absolute bottom-[-4rem] left-[-2rem] h-52 w-52 rounded-full bg-[#0aa6c9]/20 blur-3xl" />

                  <div className="relative flex h-full items-center justify-center pt-14">
                    <div className="w-full max-w-[560px] rounded-[26px] border border-white/70 bg-white/82 p-3 shadow-[0_20px_50px_rgba(15,35,68,0.18)] backdrop-blur">
                      <div className="overflow-hidden rounded-[20px] bg-[#e8f8fd]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={1400}
                          height={1000}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </div>
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
