"use client";

import { useEffect, useState } from "react";
import {
  defaultPreFooterCtaContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  updateAdminCmsSection,
  uploadAdminCmsImage,
  type PreFooterCtaCmsContent,
} from "@/services/cmsService";

export default function AdminCmsPreFooterCtaPage() {
  const [content, setContent] = useState<PreFooterCtaCmsContent>(
    defaultPreFooterCtaContent
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<PreFooterCtaCmsContent>("preFooterCta")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default app CTA content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateBenefit = (index: number, value: string) => {
    setContent((current) => {
      const benefits = [...current.benefits];
      benefits[index] = value;
      return { ...current, benefits };
    });
  };

  const handleUpload = async (
    key: string,
    file: File,
    field: "playStoreImageUrl" | "appStoreImageUrl" | "dashboardPreviewImageUrl"
  ) => {
    try {
      setUploadingKey(key);
      setMessage("");
      const response = await uploadAdminCmsImage(file);
      setContent((current) => ({ ...current, [field]: response.url }));
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
      await updateAdminCmsSection("preFooterCta", content);
      setMessage("Pre footer CTA section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save app CTA content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">CMS</p>
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Pre Footer CTA Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the app download CTA, button labels, feature pills, store badges, and mobile preview.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading pre footer CTA content...</p>
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
              <h2 className="text-lg font-semibold text-[#0f2344]">Benefits</h2>
              {content.benefits.map((item, index) => (
                <Field
                  key={index}
                  label={`Benefit ${index + 1}`}
                  value={item}
                  onChange={(value) => updateBenefit(index, value)}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Download Label"
                value={content.downloadLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, downloadLabel: value }))
                }
              />
              <Field
                label="Phone Accent Color Class"
                value={content.phoneAccentColor}
                onChange={(value) =>
                  setContent((current) => ({ ...current, phoneAccentColor: value }))
                }
              />
              <Field
                label="Play Store URL"
                value={content.playStoreUrl}
                onChange={(value) =>
                  setContent((current) => ({ ...current, playStoreUrl: value }))
                }
              />
              <Field
                label="App Store URL"
                value={content.appStoreUrl}
                onChange={(value) =>
                  setContent((current) => ({ ...current, appStoreUrl: value }))
                }
              />
              <Field
                label="Phone Title"
                value={content.phoneTitle}
                onChange={(value) => setContent((current) => ({ ...current, phoneTitle: value }))}
              />
              <Field
                label="Phone Subtitle"
                value={content.phoneSubtitle}
                onChange={(value) =>
                  setContent((current) => ({ ...current, phoneSubtitle: value }))
                }
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Statistic Cards</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Field
                  label="Collected Label"
                  value={content.collectedLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, collectedLabel: value }))
                  }
                />
                <Field
                  label="Collected Value"
                  value={content.collectedValue}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, collectedValue: value }))
                  }
                />
                <Field
                  label="Collected Meta"
                  value={content.collectedMeta}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, collectedMeta: value }))
                  }
                />
                <Field
                  label="Invoices Label"
                  value={content.invoicesLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, invoicesLabel: value }))
                  }
                />
                <Field
                  label="Invoices Value"
                  value={content.invoicesValue}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, invoicesValue: value }))
                  }
                />
                <Field
                  label="Invoices Meta"
                  value={content.invoicesMeta}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, invoicesMeta: value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Images</h2>
              <div className="grid gap-4 lg:grid-cols-3">
                <ImageUploader
                  label="Play Store Badge"
                  imageUrl={content.playStoreImageUrl}
                  uploading={uploadingKey === "play-store"}
                  onUpload={(file) => handleUpload("play-store", file, "playStoreImageUrl")}
                  onRemove={() =>
                    setContent((current) => ({ ...current, playStoreImageUrl: "" }))
                  }
                />
                <ImageUploader
                  label="App Store Badge"
                  imageUrl={content.appStoreImageUrl}
                  uploading={uploadingKey === "app-store"}
                  onUpload={(file) => handleUpload("app-store", file, "appStoreImageUrl")}
                  onRemove={() =>
                    setContent((current) => ({ ...current, appStoreImageUrl: "" }))
                  }
                />
                <ImageUploader
                  label="Mobile Dashboard Preview"
                  imageUrl={content.dashboardPreviewImageUrl}
                  uploading={uploadingKey === "dashboard-preview"}
                  onUpload={(file) =>
                    handleUpload("dashboard-preview", file, "dashboardPreviewImageUrl")
                  }
                  onRemove={() =>
                    setContent((current) => ({ ...current, dashboardPreviewImageUrl: "" }))
                  }
                />
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
              {saving ? "Saving..." : "Save Pre Footer CTA Content"}
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
    <div className="space-y-3 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#4d5f7c]">{label}</p>
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
        <div className="overflow-hidden rounded-[20px] border border-[#d8e7f1] bg-white p-3">
          <img
            src={resolveCmsAssetUrl(imageUrl)}
            alt={label}
            className="max-h-32 w-auto rounded-lg object-contain"
          />
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#b9d6e4] bg-[#f8fbff] px-4 py-8 text-sm text-[#5d708f]">
          No image uploaded yet.
        </div>
      )}

      <label className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#d8e7f1] bg-white px-4 py-3 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]">
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
