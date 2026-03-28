import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../homepage/components/Navbar";
import Footer from "../../homepage/components/Footer";
import {
  defaultFooterContent,
  fetchPublicCmsSection,
  getDefaultFooterPageCmsContent,
  type FooterCmsContent,
  type FooterPageCmsContent,
} from "@/services/cmsService";
import {
  footerLinks,
  getPublicFooterHrefBySlug,
  normalizeFooterLinkGroups,
} from "../footerData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type FooterDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return footerLinks.map((link) => ({
    slug: link.slug,
  }));
}

export default async function FooterDetailPage({
  params,
}: FooterDetailPageProps) {
  const { slug } = await params;
  const fallback = getDefaultFooterPageCmsContent(slug);

  if (!fallback) {
    notFound();
  }

  const response = await fetchPublicCmsSection<FooterPageCmsContent>(
    `footer-page-${slug}`,
    fallback
  );
  const page: FooterPageCmsContent = {
    ...fallback,
    ...response,
    cta: {
      ...fallback.cta,
      ...(response.cta || {}),
    },
    highlights: response.highlights?.length ? response.highlights : fallback.highlights,
  };

  const footerContent = normalizeFooterLinkGroups(
    await fetchPublicCmsSection<FooterCmsContent>(
      "footer",
      defaultFooterContent
    )
  );
  const currentPublicHref = getPublicFooterHrefBySlug(page.slug);
  const categoryLinks =
    page.category === "product"
      ? footerContent.productLinks
      : page.category === "company"
        ? footerContent.companyLinks
        : footerContent.legalLinks;
  const siblingLinks = categoryLinks.filter((link) => link.href !== currentPublicHref);

  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff] px-4 pb-16 pt-24 md:px-8 lg:px-12">
        <section className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-[#d6e6f2] bg-white shadow-[0_20px_55px_rgba(15,35,68,0.10)]">
          <div className="relative overflow-hidden bg-[#0f2344] px-6 py-10 text-white md:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,166,201,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_35%)]" />
            <div className="relative">
              <Link
                href="/footer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                <ArrowLeft size={16} />
                Back to footer section
              </Link>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                {page.description}
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <p className="text-base leading-8 text-slate-600">{page.summary}</p>

              <div className="mt-8 rounded-[24px] border border-[#d8e7f3] bg-[#f8fcff] p-6">
                <h2 className="text-xl font-semibold text-[#0f2344]">
                  What this page covers
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                  {page.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0aa6c9]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={page.cta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
                >
                  {page.cta.label}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/footer"
                  className="inline-flex items-center rounded-full border border-[#c8dced] px-7 py-3 text-base font-semibold text-[#0f2344] transition hover:bg-[#eff8fd]"
                >
                  Explore all footer links
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[#d8e7f3] bg-[linear-gradient(180deg,#ffffff_0%,#f2f9fd_100%)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                Related in {page.category}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#0f2344]">
                More footer pages
              </h2>
              <div className="mt-5 space-y-3">
                {siblingLinks.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="block rounded-2xl border border-[#d9e8f2] bg-white px-4 py-4 text-sm font-medium text-slate-700 transition hover:border-[#0aa6c9]/40 hover:text-[#0f2344]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
