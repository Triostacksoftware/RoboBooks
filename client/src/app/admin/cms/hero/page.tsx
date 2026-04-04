"use client";

import { useEffect, useState } from "react";
import {
  defaultHeroContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  uploadAdminCmsMedia,
  updateAdminCmsSection,
  type HeroCmsContent,
} from "@/services/cmsService";

export default function AdminCmsHeroPage() {
  const [content, setContent] = useState<HeroCmsContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
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

  const addFeature = () => {
    setContent((current) => ({
      ...current,
      features: [...current.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setContent((current) => ({
      ...current,
      features: current.features.filter((_, featureIndex) => featureIndex !== index),
    }));
  };

  const updateSlide = (
    index: number,
    key: "imageUrl" | "alt",
    value: string
  ) => {
    setContent((current) => {
      const slides = [...current.slides];
      slides[index] = {
        ...slides[index],
        [key]: value,
      };
      return { ...current, slides };
    });
  };

  const addSlide = () => {
    setContent((current) => ({
      ...current,
      slides: [...current.slides, { imageUrl: "", alt: "" }],
    }));
  };

  const removeSlide = (index: number) => {
    setContent((current) => ({
      ...current,
      slides: current.slides.filter((_, slideIndex) => slideIndex !== index),
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

  const uploadVideo = async (file: File) => {
    try {
      setUploadingKey("hero-video");
      setMessage("");
      const response = await uploadAdminCmsMedia(file);
      if (response.kind !== "video") {
        setMessage("Please upload a video file.");
        return;
      }
      setContent((current) => ({ ...current, heroVideoUrl: response.url }));
      setMessage("Video uploaded successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload video.");
    } finally {
      setUploadingKey(null);
    }
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
              <Field
                label="Slide Change Time (ms)"
                value={String(content.slideIntervalMs)}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    slideIntervalMs: Number(value) || 3000,
                  }))
                }
              />
            </div>

            <div className="space-y-5 rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-900">Hero Video</p>
                <button
                  type="button"
                  onClick={() => setContent((current) => ({ ...current, heroVideoUrl: "" }))}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Remove Video
                </button>
              </div>

              <Field
                label="Hero Video URL"
                value={content.heroVideoUrl || ""}
                onChange={(value) =>
                  setContent((current) => ({ ...current, heroVideoUrl: value }))
                }
              />

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center justify-center rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-purple-400 hover:text-purple-700">
                  {uploadingKey === "hero-video" ? "Uploading..." : "Upload Video"}
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    disabled={uploadingKey === "hero-video"}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        uploadVideo(file);
                      }
                      event.currentTarget.value = "";
                    }}
                  />
                </label>
                {content.heroVideoUrl ? (
                  <a
                    href={resolveCmsAssetUrl(content.heroVideoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-cyan-700 underline"
                  >
                    Preview video URL
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Hero Background Slides</h2>
                <button
                  type="button"
                  onClick={addSlide}
                  className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                >
                  Add Slide
                </button>
              </div>
              {content.slides.map((slide, index) => (
                <div key={index} className="space-y-4 rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">Slide {index + 1}</p>
                    <button
                      type="button"
                      onClick={() => removeSlide(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete Slide
                    </button>
                  </div>

                  <ImageUploader
                    label={`Slide ${index + 1} Image`}
                    imageUrl={slide.imageUrl}
                    uploading={uploadingKey === `hero-slide-${index}`}
                    onUpload={(file) =>
                      uploadImage(`hero-slide-${index}`, file, (uploadedUrl) =>
                        updateSlide(index, "imageUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updateSlide(index, "imageUrl", "")}
                  />

                  <Field
                    label={`Slide ${index + 1} Alt Text`}
                    value={slide.alt}
                    onChange={(value) => updateSlide(index, "alt", value)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">Hero Bullet Points</h2>
                <button
                  type="button"
                  onClick={addFeature}
                  className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                >
                  Add Bullet Point
                </button>
              </div>
              {content.features.map((feature, index) => (
                <div key={index} className="space-y-3 rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Bullet Point {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                  <TextArea
                    label={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(value) => updateFeature(index, value)}
                    rows={2}
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
              {saving ? "Saving..." : "Save Hero Content"}
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
            className="max-h-40 w-full rounded-lg object-cover"
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
