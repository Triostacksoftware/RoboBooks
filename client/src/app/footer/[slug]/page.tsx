"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../../homepage/components/Navbar";
import Footer from "../../homepage/components/Footer";
import {
  createGenericFooterPageCmsContent,
  defaultFooterContent,
  fetchPublicCmsSection,
  getDefaultFooterPageCmsContent,
  type FooterCmsContent,
  type FooterPageCmsContent,
} from "@/services/cmsService";
import {
  getFooterSlugFromHref,
  normalizeFooterLinkGroups,
} from "../footerData";

function findFooterLinkBySlug(content: FooterCmsContent, slug: string) {
  const groups: Array<{
    category: FooterPageCmsContent["category"];
    links: Array<{ label: string; href: string }>;
  }> = [
    { category: "product", links: content.productLinks },
    { category: "company", links: content.companyLinks },
    { category: "legal", links: content.legalLinks },
    ...((content.extraGroups || []).map((group) => ({
      category: "product" as const,
      links: group.links,
    })) || []),
  ];

  for (const group of groups) {
    for (const link of group.links) {
      if (getFooterSlugFromHref(link.href) === slug) {
        return { ...link, category: group.category };
      }
    }
  }

  return null;
}

export default function FooterDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || "";
  const [footerContent, setFooterContent] = useState<FooterCmsContent>(defaultFooterContent);
  const [pageOverride, setPageOverride] = useState<FooterPageCmsContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      fetchPublicCmsSection<FooterCmsContent>("footer", defaultFooterContent),
      fetchPublicCmsSection<FooterPageCmsContent>(
        `footer-page-${slug}`,
        getDefaultFooterPageCmsContent(slug) ||
          createGenericFooterPageCmsContent({
            slug,
            label: slug,
            category: "product",
            href: "/contact",
          })
      ),
    ])
      .then(([footerResponse, pageResponse]) => {
        if (!isMounted) return;
        setFooterContent(normalizeFooterLinkGroups(footerResponse));
        setPageOverride(pageResponse);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const page = useMemo(() => {
    const matchedLink = findFooterLinkBySlug(footerContent, slug);
    const fallback =
      getDefaultFooterPageCmsContent(slug) ||
      (matchedLink
        ? createGenericFooterPageCmsContent({
            slug,
            label: matchedLink.label,
            category: matchedLink.category,
            href: matchedLink.href,
          })
        : null);

    if (!fallback) {
      return null;
    }

    return {
      ...fallback,
      ...pageOverride,
      cta: {
        ...fallback.cta,
        ...(pageOverride?.cta || {}),
      },
      highlights:
        pageOverride?.highlights?.length ? pageOverride.highlights : fallback.highlights,
    };
  }, [footerContent, pageOverride, slug]);

  if (!loading && !page) {
    notFound();
  }

  const siblingLinks = page
    ? (
        page.category === "product"
          ? footerContent.productLinks
          : page.category === "company"
            ? footerContent.companyLinks
            : footerContent.legalLinks
      ).filter((link) => getFooterSlugFromHref(link.href) !== page.slug)
    : [];

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
                {page?.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                {page?.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                {page?.description}
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div>
              <p className="text-base leading-8 text-slate-600">{page?.summary}</p>

              <div className="mt-8 rounded-[24px] border border-[#d8e7f3] bg-[#f8fcff] p-6">
                <h2 className="text-xl font-semibold text-[#0f2344]">
                  What this page covers
                </h2>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                  {page?.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0aa6c9]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={page?.cta.href || "/contact"}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0aa6c9] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#0890ae]"
                >
                  {page?.cta.label || "Open page"}
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
                Related in {page?.category}
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
