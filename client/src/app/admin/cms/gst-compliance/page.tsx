"use client";

import { useEffect, useState } from "react";
import {
  defaultGstComplianceContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type GstComplianceCmsContent,
} from "@/services/cmsService";

export default function AdminCmsGstCompliancePage() {
  const [content, setContent] = useState<GstComplianceCmsContent>(defaultGstComplianceContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<GstComplianceCmsContent>("gstCompliance")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default GST compliance content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateTool = (
    index: number,
    key: "label" | "badge" | "description" | "iconUrl" | "previewImageUrl",
    value: string
  ) => {
    setContent((current) => {
      const nextTools = [...current.tools];
      nextTools[index] = {
        ...nextTools[index],
        [key]: value,
      };
      return { ...current, tools: nextTools };
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
      await updateAdminCmsSection("gstCompliance", content);
      setMessage("GST compliance section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save GST compliance content.");
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">GST Compliance Section</h1>
        <p className="mt-2 text-gray-600">
          Update the GST compliance section heading, tabs, icons, and preview images.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading GST compliance content...</p>
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
            <Field
              label="Explore CTA Label"
              value={content.exploreLabel}
              onChange={(value) =>
                setContent((current) => ({ ...current, exploreLabel: value }))
              }
            />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">GST Tabs</h2>
              {content.tools.map((tool, index) => (
                <div key={tool.key} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <div>
                    <p className="text-base font-semibold text-gray-900">{tool.label}</p>
                    <p className="text-sm text-gray-500">
                      Key: {tool.key} | Slug: {tool.slug}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <ImageUploader
                      label={`${tool.label} Icon`}
                      imageUrl={tool.iconUrl}
                      uploading={uploadingKey === `gst-icon-${tool.key}`}
                      onUpload={(file) =>
                        uploadImage(`gst-icon-${tool.key}`, file, (uploadedUrl) =>
                          updateTool(index, "iconUrl", uploadedUrl)
                        )
                      }
                      onRemove={() => updateTool(index, "iconUrl", "")}
                    />
                    <ImageUploader
                      label={`${tool.label} Preview Image`}
                      imageUrl={tool.previewImageUrl}
                      uploading={uploadingKey === `gst-preview-${tool.key}`}
                      onUpload={(file) =>
                        uploadImage(`gst-preview-${tool.key}`, file, (uploadedUrl) =>
                          updateTool(index, "previewImageUrl", uploadedUrl)
                        )
                      }
                      onRemove={() => updateTool(index, "previewImageUrl", "")}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label={`${tool.label} Tab Label`}
                      value={tool.label}
                      onChange={(value) => updateTool(index, "label", value)}
                    />
                    <Field
                      label={`${tool.label} Badge`}
                      value={tool.badge}
                      onChange={(value) => updateTool(index, "badge", value)}
                    />
                  </div>

                  <TextArea
                    label={`${tool.label} Description`}
                    value={tool.description}
                    onChange={(value) => updateTool(index, "description", value)}
                    rows={3}
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
              {saving ? "Saving..." : "Save GST Compliance Content"}
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
