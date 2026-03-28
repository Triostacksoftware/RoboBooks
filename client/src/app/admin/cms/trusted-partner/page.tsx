"use client";

import { useEffect, useState } from "react";
import {
  defaultTrustedMarqueeContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type TrustedMarqueeCmsContent,
} from "@/services/cmsService";

const iconOptions = [
  { label: "Store", value: "store" },
  { label: "Factory", value: "factory" },
  { label: "Laptop", value: "laptop" },
  { label: "Utensils", value: "utensils" },
  { label: "Banknote", value: "banknote" },
  { label: "Heart", value: "heart" },
  { label: "Boxes", value: "boxes" },
  { label: "Shield", value: "shield" },
  { label: "Receipt", value: "receipt" },
  { label: "Shopping", value: "shopping" },
  { label: "Building", value: "building" },
  { label: "Truck", value: "truck" },
];

export default function AdminCmsTrustedPartnerPage() {
  const [content, setContent] = useState<TrustedMarqueeCmsContent>(
    defaultTrustedMarqueeContent
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<TrustedMarqueeCmsContent>("trustedMarquee")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default trusted partner content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateRowItem = (
    rowKey: "topRow" | "bottomRow",
    index: number,
    field: "label" | "iconKey" | "iconUrl" | "sublabel",
    value: string
  ) => {
    setContent((current) => {
      const nextRow = [...current[rowKey]];
      nextRow[index] = { ...nextRow[index], [field]: value };
      return { ...current, [rowKey]: nextRow };
    });
  };

  const addRowItem = (rowKey: "topRow" | "bottomRow") => {
    setContent((current) => ({
      ...current,
      [rowKey]: [
        ...current[rowKey],
        {
          label: "",
          iconKey: iconOptions[0].value,
          iconUrl: "",
          sublabel: "",
        },
      ],
    }));
  };

  const removeRowItem = (rowKey: "topRow" | "bottomRow", index: number) => {
    setContent((current) => ({
      ...current,
      [rowKey]: current[rowKey].filter((_, itemIndex) => itemIndex !== index),
    }));
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
      await updateAdminCmsSection("trustedMarquee", content);
      setMessage("Trusted partner section updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save trusted partner content."
      );
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Trusted Partner Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the partner marquee heading, description, and both scrolling rows.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading trusted partner content...</p>
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

            <RowEditor
              title="Top Row"
              items={content.topRow}
              uploadingKey={uploadingKey}
              onAdd={() => addRowItem("topRow")}
              onRemove={(index) => removeRowItem("topRow", index)}
              onChange={(index, field, value) => updateRowItem("topRow", index, field, value)}
              onUpload={(index, file) =>
                uploadImage(`top-row-${index}`, file, (uploadedUrl) =>
                  updateRowItem("topRow", index, "iconUrl", uploadedUrl)
                )
              }
            />

            <RowEditor
              title="Bottom Row"
              items={content.bottomRow}
              uploadingKey={uploadingKey}
              onAdd={() => addRowItem("bottomRow")}
              onRemove={(index) => removeRowItem("bottomRow", index)}
              onChange={(index, field, value) =>
                updateRowItem("bottomRow", index, field, value)
              }
              onUpload={(index, file) =>
                uploadImage(`bottom-row-${index}`, file, (uploadedUrl) =>
                  updateRowItem("bottomRow", index, "iconUrl", uploadedUrl)
                )
              }
            />

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
              {saving ? "Saving..." : "Save Trusted Partner Content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RowEditor({
  title,
  items,
  uploadingKey,
  onAdd,
  onRemove,
  onChange,
  onUpload,
}: {
  title: string;
  items: TrustedMarqueeCmsContent["topRow"];
  uploadingKey: string | null;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    field: "label" | "iconKey" | "iconUrl" | "sublabel",
    value: string
  ) => void;
  onUpload: (index: number, file: File) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#0f2344]">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
        >
          Add Item
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={`${title}-${index}`}
          className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0f2344]">
              Item {index + 1}
            </p>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-sm font-semibold text-red-600 transition hover:text-red-700"
            >
              Delete Item
            </button>
          </div>
          <Field
            label={`Item ${index + 1} Label`}
            value={item.label}
            onChange={(value) => onChange(index, "label", value)}
          />
          <SelectField
            label={`Item ${index + 1} Icon`}
            value={item.iconKey}
            onChange={(value) => onChange(index, "iconKey", value)}
            options={iconOptions}
          />
          <ImageUploader
            label={`Item ${index + 1} Custom Image/Icon`}
            imageUrl={item.iconUrl}
            uploading={uploadingKey === `${title === "Top Row" ? "top-row" : "bottom-row"}-${index}`}
            onUpload={(file) => onUpload(index, file)}
            onRemove={() => onChange(index, "iconUrl", "")}
          />
          <Field
            label={`Item ${index + 1} Sublabel`}
            value={item.sublabel}
            onChange={(value) => onChange(index, "sublabel", value)}
          />
        </div>
      ))}
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
            className="max-h-20 w-auto rounded-lg object-contain"
          />
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#b9d6e4] bg-[#f8fbff] px-4 py-6 text-sm text-[#5d708f]">
          No custom image uploaded. Default selected icon will be used.
        </div>
      )}

      <label className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#d8e7f1] bg-white px-4 py-3 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]">
        {uploading ? "Uploading..." : "Choose Image/Icon"}
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

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-[#0f2344] outline-none transition focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
