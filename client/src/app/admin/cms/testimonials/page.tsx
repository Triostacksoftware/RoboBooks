"use client";

import { useEffect, useState } from "react";
import {
  defaultTestimonialsContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsMedia,
  updateAdminCmsSection,
  type TestimonialsCmsContent,
} from "@/services/cmsService";

export default function AdminCmsTestimonialsPage() {
  const [content, setContent] = useState<TestimonialsCmsContent>(
    defaultTestimonialsContent
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<TestimonialsCmsContent>("testimonials")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default testimonials content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateTestimonial = (
    index: number,
    field: "name" | "role" | "content" | "image" | "video",
    value: string
  ) => {
    setContent((current) => {
      const nextTestimonials = [...current.testimonials];
      nextTestimonials[index] = { ...nextTestimonials[index], [field]: value };
      return { ...current, testimonials: nextTestimonials };
    });
  };

  const addTestimonial = () => {
    setContent((current) => ({
      ...current,
      testimonials: [
        ...current.testimonials,
        { name: "", role: "", content: "", image: "", video: "" },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((current) => ({
      ...current,
      testimonials: current.testimonials.filter((_, testimonialIndex) => testimonialIndex !== index),
    }));
  };

  const uploadMedia = async (
    key: string,
    file: File,
    expectedType: "image" | "video",
    onSuccess: (uploadedUrl: string) => void
  ) => {
    try {
      setUploadingKey(key);
      setMessage("");
      const response = await uploadAdminCmsMedia(file);

      if (response.kind !== expectedType) {
        setMessage(
          expectedType === "image"
            ? "Please upload an image file."
            : "Please upload a video file."
        );
        return;
      }

      onSuccess(response.url);
      setMessage(
        expectedType === "image"
          ? "Image uploaded successfully."
          : "Video uploaded successfully."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload media.");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("testimonials", content);
      setMessage("Testimonials section updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save testimonials content."
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Testimonial Carousel</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update `ss2` on the homepage: the dark-blue testimonial carousel section with image/video media and testimonial content.
        </p>
        <p className="mt-2 text-sm text-[#7b8ca6]">
          Note: `ss1` is the separate `Our Testimonials` card section and is currently handled in
          `TrustedAcrossIndustries.tsx`.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading testimonials content...</p>
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
                <h2 className="text-lg font-semibold text-[#0f2344]">Testimonial Cards</h2>
                <button
                  type="button"
                  onClick={addTestimonial}
                  className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
                >
                  Add Testimonial
                </button>
              </div>
              {content.testimonials.map((item, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f2344]">
                      Testimonial {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete Testimonial
                    </button>
                  </div>
                  <Field
                    label={`Card ${index + 1} Name`}
                    value={item.name}
                    onChange={(value) => updateTestimonial(index, "name", value)}
                  />
                  <Field
                    label={`Card ${index + 1} Role`}
                    value={item.role}
                    onChange={(value) => updateTestimonial(index, "role", value)}
                  />
                  <Field
                    label={`Card ${index + 1} Image URL`}
                    value={item.image}
                    onChange={(value) => updateTestimonial(index, "image", value)}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <MediaUploadField
                      label={`Card ${index + 1} Image Upload`}
                      accept="image/*"
                      previewUrl={item.image}
                      uploading={uploadingKey === `testimonial-image-${index}`}
                      onUpload={(file) =>
                        uploadMedia(`testimonial-image-${index}`, file, "image", (uploadedUrl) =>
                          updateTestimonial(index, "image", uploadedUrl)
                        )
                      }
                    />
                    <MediaUploadField
                      label={`Card ${index + 1} Video Upload`}
                      accept="video/*"
                      previewUrl={item.video || ""}
                      previewType="video"
                      uploading={uploadingKey === `testimonial-video-${index}`}
                      onRemove={
                        item.video
                          ? () => updateTestimonial(index, "video", "")
                          : undefined
                      }
                      onUpload={(file) =>
                        uploadMedia(`testimonial-video-${index}`, file, "video", (uploadedUrl) =>
                          updateTestimonial(index, "video", uploadedUrl)
                        )
                      }
                    />
                  </div>
                  <Field
                    label={`Card ${index + 1} Video URL`}
                    value={item.video || ""}
                    onChange={(value) => updateTestimonial(index, "video", value)}
                  />
                  <TextArea
                    label={`Card ${index + 1} Quote`}
                    value={item.content}
                    onChange={(value) => updateTestimonial(index, "content", value)}
                    rows={4}
                  />
                </div>
              ))}
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
              {saving ? "Saving..." : "Save Testimonials Content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MediaUploadField({
  label,
  accept,
  previewUrl,
  previewType = "image",
  uploading,
  onRemove,
  onUpload,
}: {
  label: string;
  accept: string;
  previewUrl: string;
  previewType?: "image" | "video";
  uploading: boolean;
  onRemove?: () => void;
  onUpload: (file: File) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-[#4d5f7c]">
        <span>{label}</span>
        {previewUrl && onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold text-red-600 transition hover:text-red-700"
          >
            Remove {previewType}
          </button>
        ) : null}
      </span>
      <div className="rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] p-4">
        {previewUrl ? (
          previewType === "video" ? (
            <video
              src={resolveCmsAssetUrl(previewUrl)}
              controls
              className="mb-3 h-40 w-full rounded-[16px] bg-[#0f2344] object-cover"
            />
          ) : (
            <img
              src={resolveCmsAssetUrl(previewUrl)}
              alt="Uploaded testimonial media"
              className="mb-3 h-40 w-full rounded-[16px] object-cover"
            />
          )
        ) : (
          <div className="mb-3 flex h-40 w-full items-center justify-center rounded-[16px] border border-dashed border-[#d8e7f1] text-sm text-[#7b8ca6]">
            No {previewType} selected
          </div>
        )}
        <input
          type="file"
          accept={accept}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            onUpload(file);
            event.currentTarget.value = "";
          }}
          className="block w-full text-sm text-[#0f2344] file:mr-4 file:rounded-full file:border-0 file:bg-[#eff8ff] file:px-4 file:py-2 file:font-semibold file:text-[#0088c5] hover:file:bg-[#dff4ff]"
        />
        {uploading ? (
          <p className="mt-2 text-xs font-medium text-[#0088c5]">Uploading...</p>
        ) : null}
      </div>
    </label>
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
