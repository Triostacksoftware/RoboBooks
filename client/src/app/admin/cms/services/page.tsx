"use client";

import { useEffect, useState } from "react";
import {
  defaultServicesContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type ServicesCmsContent,
} from "@/services/cmsService";

export default function AdminCmsServicesPage() {
  const [content, setContent] = useState<ServicesCmsContent>(defaultServicesContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<ServicesCmsContent>("services")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default services content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateCard = (
    index: number,
    key: "slug" | "title" | "description" | "ctaLabel" | "iconUrl",
    value: string
  ) => {
    setContent((current) => {
      const nextCards = [...current.cards];
      nextCards[index] = {
        ...nextCards[index],
        [key]: value,
      };
      return { ...current, cards: nextCards };
    });
  };

  const uploadImage = async (
    key: string,
    file: File,
    onSuccess: (uploadedUrl: string) => void
  ) => {
    try {
      setUploadingKey(key);
      setMessage("");
      const response = await uploadAdminCmsImage(file);
      onSuccess(response.url);
      setMessage("Image uploaded successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("services", content);
      setMessage("Services section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save services content.");
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Services Section</h1>
        <p className="mt-2 text-gray-600">
          Update the core services content, card text, CTA block, and uploaded icons.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading services content...</p>
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

            <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Highlight Box</h2>
              <ImageUploader
                label="Highlight Icon"
                imageUrl={content.highlightIconUrl}
                uploading={uploadingKey === "highlight-icon"}
                onUpload={(file) =>
                  uploadImage("highlight-icon", file, (uploadedUrl) =>
                    setContent((current) => ({ ...current, highlightIconUrl: uploadedUrl }))
                  )
                }
                onRemove={() =>
                  setContent((current) => ({ ...current, highlightIconUrl: "" }))
                }
              />
              <Field
                label="Highlight Title"
                value={content.highlightTitle}
                onChange={(value) =>
                  setContent((current) => ({ ...current, highlightTitle: value }))
                }
              />
              <TextArea
                label="Highlight Description"
                value={content.highlightDescription}
                onChange={(value) =>
                  setContent((current) => ({ ...current, highlightDescription: value }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Service Cards</h2>
              {content.cards.map((card, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <ImageUploader
                    label={`Card ${index + 1} Icon`}
                    imageUrl={card.iconUrl}
                    uploading={uploadingKey === `service-card-${index}`}
                    onUpload={(file) =>
                      uploadImage(`service-card-${index}`, file, (uploadedUrl) =>
                        updateCard(index, "iconUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateCard(index, "iconUrl", "")}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label={`Card ${index + 1} Slug`}
                      value={card.slug}
                      onChange={(value) => updateCard(index, "slug", value)}
                    />
                    <Field
                      label={`Card ${index + 1} Title`}
                      value={card.title}
                      onChange={(value) => updateCard(index, "title", value)}
                    />
                  </div>
                  <TextArea
                    label={`Card ${index + 1} Description`}
                    value={card.description}
                    onChange={(value) => updateCard(index, "description", value)}
                    rows={3}
                  />
                  <Field
                    label={`Card ${index + 1} CTA Label`}
                    value={card.ctaLabel}
                    onChange={(value) => updateCard(index, "ctaLabel", value)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">Bottom CTA Block</h2>
              <Field
                label="CTA Eyebrow"
                value={content.ctaEyebrow}
                onChange={(value) => setContent((current) => ({ ...current, ctaEyebrow: value }))}
              />
              <Field
                label="CTA Title"
                value={content.ctaTitle}
                onChange={(value) => setContent((current) => ({ ...current, ctaTitle: value }))}
              />
              <TextArea
                label="CTA Description"
                value={content.ctaDescription}
                onChange={(value) =>
                  setContent((current) => ({ ...current, ctaDescription: value }))
                }
                rows={3}
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
              {saving ? "Saving..." : "Save Services Content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageUploader({
  label,
  imageUrl,
  uploading,
  onUpload,
  onRemove,
}: {
  label: string;
  imageUrl: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {imageUrl ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-medium text-red-600 transition hover:text-red-700"
          >
            Remove image
          </button>
        ) : null}
      </div>

      {imageUrl ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
          <img
            src={resolveCmsAssetUrl(imageUrl)}
            alt={label}
            className="max-h-32 w-auto rounded-lg object-contain"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-sm text-gray-500">
          No image uploaded yet.
        </div>
      )}

      <label className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-purple-400 hover:text-purple-700">
        {uploading ? "Uploading..." : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onUpload(file);
            }
            event.currentTarget.value = "";
          }}
        />
      </label>
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
