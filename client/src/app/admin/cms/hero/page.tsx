"use client";

import { useEffect, useState } from "react";
import {
  defaultHeroContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type HeroCmsContent,
} from "@/services/cmsService";

export default function AdminCmsHeroPage() {
  const [content, setContent] = useState<HeroCmsContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<HeroCmsContent>("hero")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default hero content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateFeature = (index: number, value: string) => {
    setContent((current) => {
      const nextFeatures = [...current.features];
      nextFeatures[index] = value;
      return { ...current, features: nextFeatures };
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("hero", content);
      setMessage("Hero section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save hero content.");
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Hero Section</h1>
        <p className="mt-2 text-gray-600">
          Update the homepage hero text, bullet points, and CTA buttons from the admin panel.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading hero content...</p>
        ) : (
          <div className="space-y-5">
            <Field
              label="Eyebrow"
              value={content.eyebrow}
              onChange={(value) => setContent((current) => ({ ...current, eyebrow: value }))}
            />
            <Field
              label="Title Line 1"
              value={content.titleLine1}
              onChange={(value) => setContent((current) => ({ ...current, titleLine1: value }))}
            />
            <Field
              label="Title Line 2"
              value={content.titleLine2}
              onChange={(value) => setContent((current) => ({ ...current, titleLine2: value }))}
            />
            <TextArea
              label="Description"
              value={content.description}
              onChange={(value) => setContent((current) => ({ ...current, description: value }))}
              rows={4}
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
                label="Secondary Button Label"
                value={content.secondaryButtonLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, secondaryButtonLabel: value }))
                }
              />
              <Field
                label="Secondary Button URL"
                value={content.secondaryButtonUrl}
                onChange={(value) =>
                  setContent((current) => ({ ...current, secondaryButtonUrl: value }))
                }
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Hero Bullet Points</h2>
              {content.features.map((feature, index) => (
                <TextArea
                  key={index}
                  label={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(value) => updateFeature(index, value)}
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
              {saving ? "Saving..." : "Save Hero Content"}
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
