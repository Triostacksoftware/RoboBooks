"use client";

import { useEffect, useState } from "react";
import {
  defaultUsabilityContent,
  fetchAdminCmsSection,
  normalizeUsabilityContent,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type UsabilityCmsContent,
} from "@/services/cmsService";

type UsabilityCard = UsabilityCmsContent["cards"][number];

const emptyUsabilityCard = (): UsabilityCard => ({
  slug: "",
  title: "",
  description: "",
  iconUrl: "",
  detailEyebrow: "",
  detailTitle: "",
  detailDescription: "",
  detailHeroNote: "",
  detailCtaLabel: "",
  detailCtaUrl: "",
  detailHighlights: [""],
  detailStats: [{ value: "", label: "" }],
  detailSections: [{ title: "", description: "" }],
});

export default function AdminCmsUsabilityPage() {
  const [content, setContent] = useState<UsabilityCmsContent>(defaultUsabilityContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<UsabilityCmsContent>("usability")
      .then((response) => setContent(normalizeUsabilityContent(response.content)))
      .catch(() => {
        setMessage("Using default usability content because CMS data could not be loaded.");
        setContent(defaultUsabilityContent);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateCard = <K extends keyof UsabilityCard>(
    index: number,
    key: K,
    value: UsabilityCard[K]
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
      cards: [...current.cards, emptyUsabilityCard()],
    }));
  };

  const removeCard = (index: number) => {
    setContent((current) => ({
      ...current,
      cards: current.cards.filter((_, cardIndex) => cardIndex !== index),
    }));
  };

  const updateCardHighlight = (cardIndex: number, highlightIndex: number, value: string) => {
    const nextHighlights = [...content.cards[cardIndex].detailHighlights];
    nextHighlights[highlightIndex] = value;
    updateCard(cardIndex, "detailHighlights", nextHighlights);
  };

  const addCardHighlight = (cardIndex: number) => {
    updateCard(cardIndex, "detailHighlights", [...content.cards[cardIndex].detailHighlights, ""]);
  };

  const removeCardHighlight = (cardIndex: number, highlightIndex: number) => {
    updateCard(
      cardIndex,
      "detailHighlights",
      content.cards[cardIndex].detailHighlights.filter((_, index) => index !== highlightIndex)
    );
  };

  const updateCardStat = (
    cardIndex: number,
    statIndex: number,
    key: "value" | "label",
    value: string
  ) => {
    const nextStats = [...content.cards[cardIndex].detailStats];
    nextStats[statIndex] = {
      ...nextStats[statIndex],
      [key]: value,
    };
    updateCard(cardIndex, "detailStats", nextStats);
  };

  const addCardStat = (cardIndex: number) => {
    updateCard(cardIndex, "detailStats", [
      ...content.cards[cardIndex].detailStats,
      { value: "", label: "" },
    ]);
  };

  const removeCardStat = (cardIndex: number, statIndex: number) => {
    updateCard(
      cardIndex,
      "detailStats",
      content.cards[cardIndex].detailStats.filter((_, index) => index !== statIndex)
    );
  };

  const updateCardSection = (
    cardIndex: number,
    sectionIndex: number,
    key: "title" | "description",
    value: string
  ) => {
    const nextSections = [...content.cards[cardIndex].detailSections];
    nextSections[sectionIndex] = {
      ...nextSections[sectionIndex],
      [key]: value,
    };
    updateCard(cardIndex, "detailSections", nextSections);
  };

  const addCardSection = (cardIndex: number) => {
    updateCard(cardIndex, "detailSections", [
      ...content.cards[cardIndex].detailSections,
      { title: "", description: "" },
    ]);
  };

  const removeCardSection = (cardIndex: number, sectionIndex: number) => {
    updateCard(
      cardIndex,
      "detailSections",
      content.cards[cardIndex].detailSections.filter((_, index) => index !== sectionIndex)
    );
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
          Update the product experience cards, clickable detail pages, and all supporting copy from one CMS panel.
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
                <div key={index} className="space-y-5 rounded-2xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        Card {index + 1}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Public detail page: /product-experience/{card.slug || "your-slug"}
                      </p>
                    </div>
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Slug"
                      value={card.slug}
                      onChange={(value) => updateCard(index, "slug", value)}
                    />
                    <Field
                      label="Card Title"
                      value={card.title}
                      onChange={(value) => updateCard(index, "title", value)}
                    />
                  </div>

                  <TextArea
                    label="Card Description"
                    value={card.description}
                    onChange={(value) => updateCard(index, "description", value)}
                    rows={3}
                  />

                  <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <h4 className="text-base font-semibold text-gray-900">Detail Page Content</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Detail Eyebrow"
                        value={card.detailEyebrow}
                        onChange={(value) => updateCard(index, "detailEyebrow", value)}
                      />
                      <Field
                        label="Detail Title"
                        value={card.detailTitle}
                        onChange={(value) => updateCard(index, "detailTitle", value)}
                      />
                    </div>
                    <TextArea
                      label="Detail Description"
                      value={card.detailDescription}
                      onChange={(value) => updateCard(index, "detailDescription", value)}
                      rows={4}
                    />
                    <TextArea
                      label="Hero Note"
                      value={card.detailHeroNote}
                      onChange={(value) => updateCard(index, "detailHeroNote", value)}
                      rows={3}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Detail CTA Label"
                        value={card.detailCtaLabel}
                        onChange={(value) => updateCard(index, "detailCtaLabel", value)}
                      />
                      <Field
                        label="Detail CTA URL"
                        value={card.detailCtaUrl}
                        onChange={(value) => updateCard(index, "detailCtaUrl", value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-semibold text-gray-900">Highlights</h5>
                        <button
                          type="button"
                          onClick={() => addCardHighlight(index)}
                          className="text-sm font-semibold text-purple-700"
                        >
                          Add Highlight
                        </button>
                      </div>
                      {card.detailHighlights.map((highlight, highlightIndex) => (
                        <div
                          key={highlightIndex}
                          className="grid gap-3 rounded-xl border border-gray-200 bg-white p-3 md:grid-cols-[1fr_auto]"
                        >
                          <Field
                            label={`Highlight ${highlightIndex + 1}`}
                            value={highlight}
                            onChange={(value) => updateCardHighlight(index, highlightIndex, value)}
                          />
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removeCardHighlight(index, highlightIndex)}
                              className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-semibold text-gray-900">Detail Stats</h5>
                        <button
                          type="button"
                          onClick={() => addCardStat(index)}
                          className="text-sm font-semibold text-purple-700"
                        >
                          Add Stat
                        </button>
                      </div>
                      {card.detailStats.map((stat, statIndex) => (
                        <div
                          key={statIndex}
                          className="grid gap-4 rounded-xl border border-gray-200 bg-white p-3 md:grid-cols-[1fr_1fr_auto]"
                        >
                          <Field
                            label="Value"
                            value={stat.value}
                            onChange={(value) => updateCardStat(index, statIndex, "value", value)}
                          />
                          <Field
                            label="Label"
                            value={stat.label}
                            onChange={(value) => updateCardStat(index, statIndex, "label", value)}
                          />
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removeCardStat(index, statIndex)}
                              className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h5 className="text-sm font-semibold text-gray-900">Detail Sections</h5>
                        <button
                          type="button"
                          onClick={() => addCardSection(index)}
                          className="text-sm font-semibold text-purple-700"
                        >
                          Add Section
                        </button>
                      </div>
                      {card.detailSections.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="space-y-3 rounded-xl border border-gray-200 bg-white p-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <h6 className="text-sm font-semibold text-gray-900">
                              Section {sectionIndex + 1}
                            </h6>
                            <button
                              type="button"
                              onClick={() => removeCardSection(index, sectionIndex)}
                              className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                          <Field
                            label="Section Title"
                            value={section.title}
                            onChange={(value) => updateCardSection(index, sectionIndex, "title", value)}
                          />
                          <TextArea
                            label="Section Description"
                            value={section.description}
                            onChange={(value) =>
                              updateCardSection(index, sectionIndex, "description", value)
                            }
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
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
