"use client";

import { useEffect, useState } from "react";
import {
  defaultInvoiceThemesContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type InvoiceThemesCmsContent,
} from "@/services/cmsService";

export default function AdminCmsInvoiceThemesPage() {
  const [content, setContent] = useState<InvoiceThemesCmsContent>(defaultInvoiceThemesContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<InvoiceThemesCmsContent>("invoiceThemes")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default invoice themes content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateInfoCard = (index: number, key: "title" | "body", value: string) => {
    setContent((current) => {
      const nextCards = [...current.infoCards];
      nextCards[index] = {
        ...nextCards[index],
        [key]: value,
      };
      return { ...current, infoCards: nextCards };
    });
  };

  const updateTabLabel = (index: number, value: string) => {
    setContent((current) => {
      const nextTabs = [...current.tabLabels];
      nextTabs[index] = value;
      return { ...current, tabLabels: nextTabs };
    });
  };

  const updateThermalImage = (
    index: number,
    key: "imageUrl" | "alt" | "widthLabel",
    value: string
  ) => {
    setContent((current) => {
      const nextImages = [...current.thermalImages];
      nextImages[index] = {
        ...nextImages[index],
        [key]: value,
      };
      return { ...current, thermalImages: nextImages };
    });
  };

  const updateA4Image = (index: number, key: "imageUrl" | "alt", value: string) => {
    setContent((current) => {
      const nextImages = [...current.a4Images];
      nextImages[index] = {
        ...nextImages[index],
        [key]: value,
      };
      return { ...current, a4Images: nextImages };
    });
  };

  const updateA5Image = (index: number, key: "imageUrl" | "alt", value: string) => {
    setContent((current) => {
      const nextImages = [...current.a5Images];
      nextImages[index] = {
        ...nextImages[index],
        [key]: value,
      };
      return { ...current, a5Images: nextImages };
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
      await updateAdminCmsSection("invoiceThemes", content);
      setMessage("Invoice themes section updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save invoice themes content."
      );
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Invoice Themes Section</h1>
        <p className="mt-2 text-gray-600">
          Update the invoice themes section heading, tabs, feature cards, showcase CTA, and preview images.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading invoice themes content...</p>
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

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Feature Cards</h2>
              {content.infoCards.map((card, index) => (
                <div key={index} className="grid gap-4 rounded-2xl border border-gray-200 p-4 md:grid-cols-2">
                  <Field
                    label={`Card ${index + 1} Title`}
                    value={card.title}
                    onChange={(value) => updateInfoCard(index, "title", value)}
                  />
                  <TextArea
                    label={`Card ${index + 1} Description`}
                    value={card.body}
                    onChange={(value) => updateInfoCard(index, "body", value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Tab Labels</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {content.tabLabels.map((label, index) => (
                  <Field
                    key={index}
                    label={`Tab ${index + 1}`}
                    value={label}
                    onChange={(value) => updateTabLabel(index, value)}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Showcase Title"
                value={content.showcaseTitle}
                onChange={(value) => setContent((current) => ({ ...current, showcaseTitle: value }))}
              />
              <Field
                label="Showcase Badge"
                value={content.showcaseBadge}
                onChange={(value) => setContent((current) => ({ ...current, showcaseBadge: value }))}
              />
              <Field
                label="Showcase CTA Label"
                value={content.showcaseCtaLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, showcaseCtaLabel: value }))
                }
              />
              <Field
                label="Showcase CTA URL"
                value={content.showcaseCtaUrl}
                onChange={(value) =>
                  setContent((current) => ({ ...current, showcaseCtaUrl: value }))
                }
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Thermal Preview Images</h2>
              {content.thermalImages.map((image, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <ImageUploader
                    label={`Thermal Image ${index + 1}`}
                    imageUrl={image.imageUrl}
                    uploading={uploadingKey === `thermal-${index}`}
                    onUpload={(file) =>
                      uploadImage(`thermal-${index}`, file, (uploadedUrl) =>
                        updateThermalImage(index, "imageUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateThermalImage(index, "imageUrl", "")}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label={`Thermal Image ${index + 1} Alt`}
                    value={image.alt}
                    onChange={(value) => updateThermalImage(index, "alt", value)}
                  />
                  <Field
                    label={`Thermal Image ${index + 1} Width Label`}
                    value={image.widthLabel}
                    onChange={(value) => updateThermalImage(index, "widthLabel", value)}
                  />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">A4 Preview Images</h2>
              {content.a4Images.map((image, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <ImageUploader
                    label={`A4 Image ${index + 1}`}
                    imageUrl={image.imageUrl}
                    uploading={uploadingKey === `a4-${index}`}
                    onUpload={(file) =>
                      uploadImage(`a4-${index}`, file, (uploadedUrl) =>
                        updateA4Image(index, "imageUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateA4Image(index, "imageUrl", "")}
                  />
                  <Field
                    label={`A4 Image ${index + 1} Alt`}
                    value={image.alt}
                    onChange={(value) => updateA4Image(index, "alt", value)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">A5 Preview Images</h2>
              {content.a5Images.map((image, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <ImageUploader
                    label={`A5 Image ${index + 1}`}
                    imageUrl={image.imageUrl}
                    uploading={uploadingKey === `a5-${index}`}
                    onUpload={(file) =>
                      uploadImage(`a5-${index}`, file, (uploadedUrl) =>
                        updateA5Image(index, "imageUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateA5Image(index, "imageUrl", "")}
                  />
                  <Field
                    label={`A5 Image ${index + 1} Alt`}
                    value={image.alt}
                    onChange={(value) => updateA5Image(index, "alt", value)}
                  />
                </div>
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
              {saving ? "Saving..." : "Save Invoice Themes Content"}
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
            className="max-h-48 w-auto rounded-lg object-contain"
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
