"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { footerLinks } from "@/app/footer/footerData";
import {
  fetchAdminCmsSection,
  getDefaultFooterPageCmsContent,
  updateAdminCmsSection,
  type FooterPageCmsContent,
} from "@/services/cmsService";

type AdminFooterPageProps = {
  params: {
    slug: string;
  };
};

export default function AdminFooterCmsPageWrapper(
  props: AdminFooterPageProps
) {
  return <AdminFooterCmsPage {...props} />;
}

function AdminFooterCmsPage({ params }: AdminFooterPageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [content, setContent] = useState<FooterPageCmsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const resolvedSlug = params.slug;
    const fallback = getDefaultFooterPageCmsContent(resolvedSlug);

    if (!fallback) {
      setSlug(null);
      setContent(null);
      setLoading(false);
      return;
    }

    setSlug(resolvedSlug);
    fetchAdminCmsSection<FooterPageCmsContent>(`footer-page-${resolvedSlug}`)
      .then((response) => {
        setContent({
          ...fallback,
          ...response.content,
          cta: {
            ...fallback.cta,
            ...(response.content?.cta || {}),
          },
          highlights:
            response.content?.highlights?.length > 0
              ? response.content.highlights
              : fallback.highlights,
        });
      })
      .catch(() => {
        setContent(fallback);
        setMessage("Using default footer page content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  const updateHighlight = (index: number, value: string) => {
    setContent((current) => {
      if (!current) return current;
      const nextHighlights = [...current.highlights];
      nextHighlights[index] = value;
      return {
        ...current,
        highlights: nextHighlights,
      };
    });
  };

  const handleSave = async () => {
    if (!slug || !content) return;

    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection(`footer-page-${slug}`, content);
      setMessage(`${content.label} page updated successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save footer page.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
            CMS
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">
            {content?.label || "Footer"} Page
          </h1>
          <p className="mt-2 text-[#4d5f7c]">
            Edit the content for this footer detail page.
          </p>
        </div>
        <Link
          href="/admin/cms/footer"
          className="rounded-full border border-[#d8e7f1] px-4 py-2 text-sm font-medium text-[#0f2344] transition hover:bg-[#f4fbff]"
        >
          Back to Footer
        </Link>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading footer page content...</p>
        ) : !slug || !content ? (
          <div className="space-y-4">
            <p className="text-[#4d5f7c]">Footer page not found.</p>
            <Link
              href="/admin/cms/footer"
              className="inline-flex rounded-full border border-[#d8e7f1] px-4 py-2 text-sm font-medium text-[#0f2344] transition hover:bg-[#f4fbff]"
            >
              Back to Footer
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Slug"
                value={content.slug}
                onChange={(value) => setContent((current) => current && { ...current, slug: value })}
              />
              <Field
                label="Label"
                value={content.label}
                onChange={(value) =>
                  setContent((current) => current && { ...current, label: value })
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Category"
                value={content.category}
                onChange={(value) =>
                  setContent(
                    (current) =>
                      current && {
                        ...current,
                        category: value as FooterPageCmsContent["category"],
                      }
                  )
                }
              />
              <Field
                label="Eyebrow"
                value={content.eyebrow}
                onChange={(value) =>
                  setContent((current) => current && { ...current, eyebrow: value })
                }
              />
            </div>

            <Field
              label="Title"
              value={content.title}
              onChange={(value) =>
                setContent((current) => current && { ...current, title: value })
              }
            />

            <TextArea
              label="Description"
              value={content.description}
              onChange={(value) =>
                setContent((current) => current && { ...current, description: value })
              }
              rows={4}
            />

            <TextArea
              label="Summary"
              value={content.summary}
              onChange={(value) =>
                setContent((current) => current && { ...current, summary: value })
              }
              rows={4}
            />

            <div className="space-y-4 rounded-[24px] border border-[#d8e7f1] p-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Highlights</h2>
              {content.highlights.map((highlight, index) => (
                <TextArea
                  key={index}
                  label={`Highlight ${index + 1}`}
                  value={highlight}
                  onChange={(value) => updateHighlight(index, value)}
                  rows={3}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="CTA Label"
                value={content.cta.label}
                onChange={(value) =>
                  setContent(
                    (current) =>
                      current && {
                        ...current,
                        cta: { ...current.cta, label: value },
                      }
                  )
                }
              />
              <Field
                label="CTA URL"
                value={content.cta.href}
                onChange={(value) =>
                  setContent(
                    (current) =>
                      current && {
                        ...current,
                        cta: { ...current.cta, href: value },
                      }
                  )
                }
              />
            </div>

            <div className="rounded-[24px] border border-[#d8e7f1] p-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Quick Jump</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/admin/cms/footer/${link.slug}`}
                    className="rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-sm font-medium text-[#0f2344] transition hover:border-[#0aa6c9]/30 hover:bg-[#f4fbff] hover:text-[#0088c5]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {message ? (
              <div className="rounded-[20px] border border-[#d8e7f1] bg-[linear-gradient(135deg,#eff8ff_0%,#f8fbff_100%)] px-4 py-3 text-sm text-[#0f2344]">
                {message}
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#0aa6c9_0%,#0088c5_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(10,166,201,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Footer Page"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-[#0f2344] outline-none transition focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-[#0f2344] outline-none transition focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      />
    </label>
  );
}
