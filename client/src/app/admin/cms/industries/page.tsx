"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { industries } from "@/app/industries/industryData";
import {
  defaultIndustriesContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type IndustriesCmsContent,
} from "@/services/cmsService";

export default function AdminCmsIndustriesPage() {
  const [content, setContent] = useState<IndustriesCmsContent>(defaultIndustriesContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<IndustriesCmsContent>("industries")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default industries content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateItem = (index: number, key: "title" | "iconUrl", value: string) => {
    setContent((current) => {
      const nextItems = [...current.items];
      nextItems[index] = {
        ...nextItems[index],
        [key]: value,
      };
      return { ...current, items: nextItems };
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
      await updateAdminCmsSection("industries", content);
      setMessage("Industries section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save industries content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
          CMS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Industries Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the industries homepage section and open each industry page editor below.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading industries content...</p>
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
              rows={3}
            />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Industry Tiles</h2>
              {content.items.map((item, index) => (
                <div
                  key={item.slug}
                  className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-[#0f2344]">{item.title}</p>
                      <p className="text-sm text-[#5d708f]">Slug: {item.slug}</p>
                    </div>
                    <Link
                      href={`/admin/cms/industries/${item.slug}`}
                      className="rounded-full border border-[#d8e7f1] bg-white px-4 py-2 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                    >
                      Edit Page
                    </Link>
                  </div>

                  <ImageUploader
                    label={`${item.title} Icon`}
                    imageUrl={item.iconUrl}
                    uploading={uploadingKey === `industry-icon-${item.slug}`}
                    onUpload={(file) =>
                      uploadImage(`industry-icon-${item.slug}`, file, (uploadedUrl) =>
                        updateItem(index, "iconUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateItem(index, "iconUrl", "")}
                  />

                  <Field
                    label={`${item.title} Label`}
                    value={item.title}
                    onChange={(value) => updateItem(index, "title", value)}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-[#d8e7f1] p-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Industry Detail Editors</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/admin/cms/industries/${industry.slug}`}
                    className="rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-sm font-medium text-[#0f2344] transition hover:border-[#0aa6c9]/30 hover:bg-[#f4fbff] hover:text-[#0088c5]"
                  >
                    {industry.title}
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
              {saving ? "Saving..." : "Save Industries Section"}
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
        <div className="overflow-hidden rounded-[20px] border border-[#d8e7f1] bg-[#f8fbff] p-3">
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
