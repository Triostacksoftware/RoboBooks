"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  defaultFooterContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type FooterCmsContent,
} from "@/services/cmsService";
import { footerLinks } from "@/app/footer/footerData";

type FooterLink = {
  label: string;
  href: string;
};

export default function AdminCmsFooterPage() {
  const [content, setContent] = useState<FooterCmsContent>(defaultFooterContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<FooterCmsContent>("footer")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default footer content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("footer", content);
      setMessage("Footer section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save footer section.");
    } finally {
      setSaving(false);
    }
  };

  const updateLinks = (
    key: "productLinks" | "companyLinks" | "legalLinks",
    nextLinks: FooterLink[]
  ) => {
    setContent((current) => ({
      ...current,
      [key]: nextLinks,
    }));
  };

  const addLink = (key: "productLinks" | "companyLinks" | "legalLinks") => {
    updateLinks(key, [...content[key], { label: "New Page", href: "/footer/new-page" }]);
  };

  const updateLink = (
    key: "productLinks" | "companyLinks" | "legalLinks",
    index: number,
    field: keyof FooterLink,
    value: string
  ) => {
    const nextLinks = [...content[key]];
    nextLinks[index] = { ...nextLinks[index], [field]: value };
    updateLinks(key, nextLinks);
  };

  const removeLink = (
    key: "productLinks" | "companyLinks" | "legalLinks",
    index: number
  ) => {
    updateLinks(
      key,
      content[key].filter((_, currentIndex) => currentIndex !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
          CMS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Footer Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update footer headings, text, links, and open each footer page editor below.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading footer content...</p>
        ) : (
          <div className="space-y-5">
            <TextAreaField
              label="Brand Description"
              value={content.brandDescription}
              rows={4}
              onChange={(value) =>
                setContent((current) => ({ ...current, brandDescription: value }))
              }
            />

            <div className="grid gap-4 md:grid-cols-3">
              <Field
                label="Product Title"
                value={content.productTitle}
                onChange={(value) =>
                  setContent((current) => ({ ...current, productTitle: value }))
                }
              />
              <Field
                label="Company Title"
                value={content.companyTitle}
                onChange={(value) =>
                  setContent((current) => ({ ...current, companyTitle: value }))
                }
              />
              <Field
                label="Legal Title"
                value={content.legalTitle}
                onChange={(value) =>
                  setContent((current) => ({ ...current, legalTitle: value }))
                }
              />
            </div>

            <LinkGroupEditor
              title={content.productTitle}
              links={content.productLinks}
              onAdd={() => addLink("productLinks")}
              onChange={(index, field, value) =>
                updateLink("productLinks", index, field, value)
              }
              onRemove={(index) => removeLink("productLinks", index)}
            />

            <LinkGroupEditor
              title={content.companyTitle}
              links={content.companyLinks}
              onAdd={() => addLink("companyLinks")}
              onChange={(index, field, value) =>
                updateLink("companyLinks", index, field, value)
              }
              onRemove={(index) => removeLink("companyLinks", index)}
            />

            <LinkGroupEditor
              title={content.legalTitle}
              links={content.legalLinks}
              onAdd={() => addLink("legalLinks")}
              onChange={(index, field, value) =>
                updateLink("legalLinks", index, field, value)
              }
              onRemove={(index) => removeLink("legalLinks", index)}
            />

            <div className="rounded-[24px] border border-[#d8e7f1] p-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Footer Detail Editors</h2>
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

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Copyright Text"
                value={content.copyrightText}
                onChange={(value) =>
                  setContent((current) => ({ ...current, copyrightText: value }))
                }
              />
              <Field
                label="Bottom Text"
                value={content.bottomText}
                onChange={(value) =>
                  setContent((current) => ({ ...current, bottomText: value }))
                }
              />
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
              {saving ? "Saving..." : "Save Footer Section"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LinkGroupEditor({
  title,
  links,
  onAdd,
  onChange,
  onRemove,
}: {
  title: string;
  links: FooterLink[];
  onAdd: () => void;
  onChange: (index: number, field: keyof FooterLink, value: string) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0f2344]">{title} Links</h2>
          <p className="text-sm text-[#5d708f]">Link label aur target URL edit kar sakte ho.</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-[#d8e7f1] bg-white px-4 py-2 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
        >
          Add Page Link
        </button>
      </div>

      {links.map((link, index) => {
        const derivedSlug = link.href.startsWith("/footer/")
          ? link.href.replace("/footer/", "")
          : null;

        return (
          <div
            key={`${title}-${index}`}
            className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-white p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[#0f2344]">{link.label}</p>
                <p className="text-sm text-[#5d708f]">URL: {link.href}</p>
              </div>
              {derivedSlug && footerLinks.some((item) => item.slug === derivedSlug) ? (
                <Link
                  href={`/admin/cms/footer/${derivedSlug}`}
                  className="rounded-full border border-[#d8e7f1] bg-white px-4 py-2 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                >
                  Edit Page
                </Link>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_auto]">
              <Field
                label="Label"
                value={link.label}
                onChange={(value) => onChange(index, "label", value)}
              />
              <Field
                label="URL"
                value={link.href}
                onChange={(value) => onChange(index, "href", value)}
              />
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="rounded-full border border-[#ffd0d0] bg-white px-4 py-3 text-sm font-semibold text-[#ff4d4f] transition hover:bg-[#fff5f5]"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
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

function TextAreaField({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (value: string) => void;
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
