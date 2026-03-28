"use client";

import { useEffect, useState } from "react";
import {
  defaultUsabilityContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type UsabilityCmsContent,
} from "@/services/cmsService";

export default function AdminCmsUsabilityPage() {
  const [content, setContent] = useState<UsabilityCmsContent>(defaultUsabilityContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<UsabilityCmsContent>("usability")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default usability content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateCard = (
    index: number,
    key: "title" | "description" | "iconUrl",
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

  const addCard = () => {
    setContent((current) => ({
      ...current,
      cards: [...current.cards, { title: "", description: "", iconUrl: "" }],
    }));
  };

  const removeCard = (index: number) => {
    setContent((current) => ({
      ...current,
      cards: current.cards.filter((_, cardIndex) => cardIndex !== index),
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
      await updateAdminCmsSection("usability", content);
      setMessage("Usability section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save usability content.");
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Usability Section</h1>
        <p className="mt-2 text-gray-600">
          Update the product experience heading, intro text, and usability cards.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading usability content...</p>
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Usability Cards</h2>
                <button
                  type="button"
                  onClick={addCard}
                  className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                >
                  Add Card
                </button>
              </div>
              {content.cards.map((card, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      Card {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete Card
                    </button>
                  </div>
                  <ImageUploader
                    label={`Card ${index + 1} Icon`}
                    imageUrl={card.iconUrl}
                    uploading={uploadingKey === `usability-card-${index}`}
                    onUpload={(file) =>
                      uploadImage(`usability-card-${index}`, file, (uploadedUrl) =>
                        updateCard(index, "iconUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateCard(index, "iconUrl", "")}
                  />
                  <Field
                    label={`Card ${index + 1} Title`}
                    value={card.title}
                    onChange={(value) => updateCard(index, "title", value)}
                  />
                  <TextArea
                    label={`Card ${index + 1} Description`}
                    value={card.description}
                    onChange={(value) => updateCard(index, "description", value)}
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
              {saving ? "Saving..." : "Save Usability Content"}
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
