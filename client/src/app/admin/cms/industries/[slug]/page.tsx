"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { industries } from "@/app/industries/industryData";
import {
  fetchAdminCmsSection,
  getDefaultIndustryPageContent,
  updateAdminCmsSection,
  type IndustryPageCmsContent,
} from "@/services/cmsService";

type AdminIndustryPageProps = {
  params: {
    slug: string;
  };
};

export default function AdminIndustryCmsPageWrapper(props: AdminIndustryPageProps) {
  return <AdminIndustryCmsPage {...props} />;
}

function AdminIndustryCmsPage({ params }: AdminIndustryPageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [content, setContent] = useState<IndustryPageCmsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const resolvedSlug = params.slug;
    const fallback = getDefaultIndustryPageContent(resolvedSlug);
    if (!fallback) {
      setSlug(null);
      setContent(null);
      setLoading(false);
      return;
    }

    setSlug(resolvedSlug);
    fetchAdminCmsSection<IndustryPageCmsContent>(`industry-${resolvedSlug}`)
      .then((response) => {
        setContent({
          ...fallback,
          ...response.content,
        });
      })
      .catch(() => {
        setContent(fallback);
        setMessage("Using default industry content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  const updateList = (
    key: "accountingFocus" | "workflows" | "reports",
    index: number,
    value: string
  ) => {
    setContent((current) => {
      if (!current) return current;
      const nextItems = [...current[key]];
      nextItems[index] = value;
      return {
        ...current,
        [key]: nextItems,
      };
    });
  };

  const addListItem = (key: "accountingFocus" | "workflows" | "reports") => {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        [key]: [...current[key], ""],
      };
    });
  };

  const removeListItem = (
    key: "accountingFocus" | "workflows" | "reports",
    index: number
  ) => {
    setContent((current) => {
      if (!current) return current;
      return {
        ...current,
        [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const handleSave = async () => {
    if (!slug || !content) return;

    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection(`industry-${slug}`, content);
      setMessage(`${content.title} page updated successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save industry page.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-600">
            CMS
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {content?.title || "Industry"} Page
          </h1>
          <p className="mt-2 text-gray-600">
            Edit the content for this industry detail page.
          </p>
        </div>
        <Link
          href="/admin/cms/industries"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Back to Industries
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading industry content...</p>
        ) : !slug || !content ? (
          <div className="space-y-4">
            <p className="text-gray-600">Industry not found.</p>
            <Link
              href="/admin/cms/industries"
              className="inline-flex rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Back to Industries
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
                label="Title"
                value={content.title}
                onChange={(value) =>
                  setContent((current) => current && { ...current, title: value })
                }
              />
            </div>
            <Field
              label="Eyebrow"
              value={content.eyebrow}
              onChange={(value) =>
                setContent((current) => current && { ...current, eyebrow: value })
              }
            />
            <Field
              label="Hero Title"
              value={content.heroTitle}
              onChange={(value) =>
                setContent((current) => current && { ...current, heroTitle: value })
              }
            />
            <TextArea
              label="Description"
              value={content.description}
              onChange={(value) =>
                setContent((current) => current && { ...current, description: value })
              }
              rows={3}
            />
            <TextArea
              label="Overview"
              value={content.overview}
              onChange={(value) =>
                setContent((current) => current && { ...current, overview: value })
              }
              rows={6}
            />

            <ListEditor
              title="Accounting Focus"
              items={content.accountingFocus}
              onAdd={() => addListItem("accountingFocus")}
              onRemove={(index) => removeListItem("accountingFocus", index)}
              onChange={(index, value) => updateList("accountingFocus", index, value)}
            />
            <ListEditor
              title="Operational Workflows"
              items={content.workflows}
              onAdd={() => addListItem("workflows")}
              onRemove={(index) => removeListItem("workflows", index)}
              onChange={(index, value) => updateList("workflows", index, value)}
            />
            <ListEditor
              title="Reports & Controls"
              items={content.reports}
              onAdd={() => addListItem("reports")}
              onRemove={(index) => removeListItem("reports", index)}
              onChange={(index, value) => updateList("reports", index, value)}
            />

            <div className="rounded-2xl border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Jump</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/admin/cms/industries/${industry.slug}`}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                  >
                    {industry.title}
                  </Link>
                ))}
              </div>
            </div>

            {message ? (
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                {message}
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Industry Page"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ListEditor({
  title,
  items,
  onAdd,
  onRemove,
  onChange,
}: {
  title: string;
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
        >
          Add Item
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto]">
          <TextArea
            label={`${title} ${index + 1}`}
            value={item}
            onChange={(value) => onChange(index, value)}
            rows={3}
          />
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="rounded-xl border border-[#ffd0d0] bg-white px-4 py-3 text-sm font-semibold text-[#ff4d4f] transition hover:bg-[#fff5f5]"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
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
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />
    </label>
  );
}
