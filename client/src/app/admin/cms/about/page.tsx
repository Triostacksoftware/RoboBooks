"use client";

import { useEffect, useState } from "react";
import {
  defaultAboutContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type AboutCmsContent,
} from "@/services/cmsService";

export default function AdminCmsAboutPage() {
  const [content, setContent] = useState<AboutCmsContent>(defaultAboutContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<AboutCmsContent>("about")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default about content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateHighlight = (index: number, value: string) => {
    setContent((current) => {
      const nextHighlights = [...current.highlights];
      nextHighlights[index] = value;
      return { ...current, highlights: nextHighlights };
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("about", content);
      setMessage("About section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save about content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-600">
          CMS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">About Section</h1>
        <p className="mt-2 text-gray-600">
          Update the homepage about section headline, description, highlights, and CTA.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading about content...</p>
        ) : (
          <div className="space-y-5">
            <Field
              label="Eyebrow"
              value={content.eyebrow}
              onChange={(value) => setContent((current) => ({ ...current, eyebrow: value }))}
            />
            <Field
              label="Title"
              value={content.title}
              onChange={(value) => setContent((current) => ({ ...current, title: value }))}
            />
            <TextArea
              label="Description"
              value={content.description}
              onChange={(value) => setContent((current) => ({ ...current, description: value }))}
              rows={5}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Primary Button Label"
                value={content.primaryButtonLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, primaryButtonLabel: value }))
                }
              />
              <Field
                label="Primary Button URL"
                value={content.primaryButtonUrl}
                onChange={(value) =>
                  setContent((current) => ({ ...current, primaryButtonUrl: value }))
                }
              />
              <Field
                label="Trusted Label"
                value={content.trustedLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, trustedLabel: value }))
                }
              />
              <Field
                label="Trusted Text"
                value={content.trustedText}
                onChange={(value) =>
                  setContent((current) => ({ ...current, trustedText: value }))
                }
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">About Highlights</h2>
              {content.highlights.map((highlight, index) => (
                <TextArea
                  key={index}
                  label={`Highlight ${index + 1}`}
                  value={highlight}
                  onChange={(value) => updateHighlight(index, value)}
                  rows={2}
                />
              ))}
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
              {saving ? "Saving..." : "Save About Content"}
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
