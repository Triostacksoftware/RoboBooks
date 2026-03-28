"use client";

import { useEffect, useState } from "react";
import {
  defaultPricingPlansContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type PricingPlansCmsContent,
} from "@/services/cmsService";

export default function AdminCmsPricingPlansPage() {
  const [content, setContent] = useState<PricingPlansCmsContent>(defaultPricingPlansContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<PricingPlansCmsContent>("pricingPlans")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default pricing content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updatePlan = (
    index: number,
    key: "name" | "price" | "duration" | "imageUrl" | "description",
    value: string
  ) => {
    setContent((current) => {
      const nextPlans = [...current.plans];
      nextPlans[index] = {
        ...nextPlans[index],
        [key]: value,
      };
      return { ...current, plans: nextPlans };
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

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    setContent((current) => {
      const nextPlans = [...current.plans];
      const nextFeatures = [...nextPlans[planIndex].features];
      nextFeatures[featureIndex] = value;
      nextPlans[planIndex] = {
        ...nextPlans[planIndex],
        features: nextFeatures,
      };
      return { ...current, plans: nextPlans };
    });
  };

  const addPlan = () => {
    setContent((current) => ({
      ...current,
      plans: [
        ...current.plans,
        {
          name: "",
          price: "",
          duration: "",
          imageUrl: "",
          description: "",
          features: [""],
        },
      ],
    }));
  };

  const removePlan = (planIndex: number) => {
    setContent((current) => ({
      ...current,
      plans: current.plans.filter((_, index) => index !== planIndex),
    }));
  };

  const addFeature = (planIndex: number) => {
    setContent((current) => {
      const nextPlans = [...current.plans];
      nextPlans[planIndex] = {
        ...nextPlans[planIndex],
        features: [...nextPlans[planIndex].features, ""],
      };
      return { ...current, plans: nextPlans };
    });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    setContent((current) => {
      const nextPlans = [...current.plans];
      nextPlans[planIndex] = {
        ...nextPlans[planIndex],
        features: nextPlans[planIndex].features.filter((_, index) => index !== featureIndex),
      };
      return { ...current, plans: nextPlans };
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("pricingPlans", content);
      setMessage("Pricing plans section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save pricing plans content.");
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Pricing Plans Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update pricing heading, selected label, CTA, and all plan cards.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading pricing plans content...</p>
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
                label="Selected Plan Label"
                value={content.selectedPlanLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, selectedPlanLabel: value }))
                }
              />
              <Field
                label="CTA Label"
                value={content.ctaLabel}
                onChange={(value) => setContent((current) => ({ ...current, ctaLabel: value }))}
              />
            </div>

            <Field
              label="CTA URL"
              value={content.ctaUrl}
              onChange={(value) => setContent((current) => ({ ...current, ctaUrl: value }))}
            />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#0f2344]">Plan Cards</h2>
                <button
                  type="button"
                  onClick={addPlan}
                  className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
                >
                  Add Plan
                </button>
              </div>
              {content.plans.map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f2344]">
                      Plan {planIndex + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removePlan(planIndex)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete Plan
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field
                      label={`Plan ${planIndex + 1} Name`}
                      value={plan.name}
                      onChange={(value) => updatePlan(planIndex, "name", value)}
                    />
                    <Field
                      label={`Plan ${planIndex + 1} Price`}
                      value={plan.price}
                      onChange={(value) => updatePlan(planIndex, "price", value)}
                    />
                    <Field
                      label={`Plan ${planIndex + 1} Duration`}
                      value={plan.duration}
                      onChange={(value) => updatePlan(planIndex, "duration", value)}
                    />
                  </div>

                  <ImageUploader
                    label={`Plan ${planIndex + 1} Image`}
                    imageUrl={plan.imageUrl}
                    uploading={uploadingKey === `plan-image-${planIndex}`}
                    onUpload={(file) =>
                      uploadImage(`plan-image-${planIndex}`, file, (uploadedUrl) =>
                        updatePlan(planIndex, "imageUrl", uploadedUrl)
                      )
                    }
                    onRemove={() => updatePlan(planIndex, "imageUrl", "")}
                  />

                  <TextArea
                    label={`Plan ${planIndex + 1} Description`}
                    value={plan.description}
                    onChange={(value) => updatePlan(planIndex, "description", value)}
                    rows={3}
                  />

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4d5f7c]">
                        Features
                      </h3>
                      <button
                        type="button"
                        onClick={() => addFeature(planIndex)}
                        className="rounded-full border border-[#d8e7f1] bg-white px-3 py-1.5 text-xs font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                      >
                        Add Feature
                      </button>
                    </div>
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="grid gap-3 md:grid-cols-[1fr_auto]"
                      >
                        <Field
                          label={`Feature ${featureIndex + 1}`}
                          value={feature}
                          onChange={(value) => updateFeature(planIndex, featureIndex, value)}
                        />
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeFeature(planIndex, featureIndex)}
                            className="rounded-full border border-[#ffd0d0] bg-white px-4 py-3 text-sm font-semibold text-[#ff4d4f] transition hover:bg-[#fff5f5]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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
              {saving ? "Saving..." : "Save Pricing Plans Content"}
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
        <div className="overflow-hidden rounded-[20px] border border-[#d8e7f1] bg-white p-3">
          <img
            src={resolveCmsAssetUrl(imageUrl)}
            alt={label}
            className="max-h-40 w-full rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#d8e7f1] bg-white px-4 py-8 text-sm text-[#6b7a90]">
          No image uploaded yet.
        </div>
      )}

      <label className="flex w-full cursor-pointer items-center justify-center rounded-[20px] border border-[#d8e7f1] bg-white px-4 py-3 text-sm font-medium text-[#0f2344] transition hover:border-[#0aa6c9] hover:text-[#0aa6c9]">
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
