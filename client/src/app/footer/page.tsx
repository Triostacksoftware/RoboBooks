import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  defaultFooterContent,
  fetchPublicCmsSection,
  type FooterCmsContent,
} from "@/services/cmsService";
import Navbar from "../homepage/components/Navbar";
import Footer from "../homepage/components/Footer";
import InnerPageHero from "../components/InnerPageHero";
import { footerCategories } from "./footerData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FooterHubPage() {
  const footerContent = await fetchPublicCmsSection<FooterCmsContent>(
    "footer",
    defaultFooterContent
  );

  const linksByCategory = {
    product: footerContent.productLinks,
    company: footerContent.companyLinks,
    legal: footerContent.legalLinks,
  } as const;

  return (
    <>
      <Navbar />
      <InnerPageHero
        eyebrow="Footer Navigation"
        title="Explore every footer page from one dynamic section"
        description="This footer hub collects all product, company, and legal links in one place. Every card below opens a dynamic detail page powered by shared footer data."
        primaryAction={{ href: "/register", label: "Start free trial" }}
        secondaryAction={{ href: "/contact", label: "Book a demo" }}
        variant="banner"
        breadcrumbLabel="Footer"
        stats={[
          { value: "13", label: "Footer links" },
          { value: "3", label: "Link groups" },
          { value: "1", label: "Shared config" },
          { value: "100%", label: "Dynamic pages" },
        ]}
      />

      <main className="bg-[#f7fbff] px-4 pb-16 pt-10 md:px-8 lg:px-12">
        <section className="mx-auto max-w-7xl space-y-10">
          {footerCategories.map((category) => {
            const links = linksByCategory[category.id];

            return (
              <div
                key={category.id}
                className="rounded-[28px] border border-[#d8e7f3] bg-white p-6 shadow-[0_20px_60px_rgba(15,35,68,0.08)] md:p-8"
              >
                <div className="flex flex-col gap-3 border-b border-[#e4eef6] pb-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
                      Footer Group
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#0f2344]">
                      {category.label}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-slate-500">
                    Each item below opens its own dynamic page so this footer section can scale from one shared content source.
                  </p>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {links.map((link) => (
                    <Link
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="group rounded-[24px] border border-[#d9e8f2] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-5 transition hover:-translate-y-1 hover:border-[#0aa6c9]/40 hover:shadow-[0_18px_40px_rgba(10,166,201,0.14)]"
                    >
                      <h3 className="mt-3 text-xl font-semibold text-[#0f2344]">
                        {link.label}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {link.href}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f2344] transition group-hover:text-[#0aa6c9]">
                        Open dynamic page
                        <ArrowRight size={16} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
