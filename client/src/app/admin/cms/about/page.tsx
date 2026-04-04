"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  defaultAboutContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  updateAdminCmsSection,
  type AboutCmsContent,
} from "@/services/cmsService";

export default function AdminCmsAboutPage() {
  const [content, setContent] = useState<AboutCmsContent>(defaultAboutContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<AboutCmsContent>("about")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default about content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateHomepageHighlight = (index: number, value: string) => {
    setContent((current) => {
      const highlights = [...current.highlights];
      highlights[index] = value;
      return { ...current, highlights };
    });
  };

  const addHomepageHighlight = () => {
    setContent((current) => ({
      ...current,
      highlights: [...current.highlights, ""],
    }));
  };

  const removeHomepageHighlight = (index: number) => {
    setContent((current) => ({
      ...current,
      highlights: current.highlights.filter((_, itemIndex) => itemIndex !== index),
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

  const updateMissionHighlight = (index: number, value: string) => {
    setContent((current) => {
      const highlights = [...current.mission.highlights];
      highlights[index] = value;
      return {
        ...current,
        mission: {
          ...current.mission,
          highlights,
        },
      };
    });
  };

  const addMissionHighlight = () => {
    setContent((current) => ({
      ...current,
      mission: {
        ...current.mission,
        highlights: [...current.mission.highlights, ""],
      },
    }));
  };

  const removeMissionHighlight = (index: number) => {
    setContent((current) => ({
      ...current,
      mission: {
        ...current.mission,
        highlights: current.mission.highlights.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const updateValueItem = (
    index: number,
    key: "title" | "description",
    value: string
  ) => {
    setContent((current) => {
      const items = [...current.values.items];
      items[index] = {
        ...items[index],
        [key]: value,
      };
      return {
        ...current,
        values: {
          ...current.values,
          items,
        },
      };
    });
  };

  const addValueItem = () => {
    setContent((current) => ({
      ...current,
      values: {
        ...current.values,
        items: [...current.values.items, { title: "", description: "" }],
      },
    }));
  };

  const removeValueItem = (index: number) => {
    setContent((current) => ({
      ...current,
      values: {
        ...current.values,
        items: current.values.items.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const updateStatItem = (
    index: number,
    key: "number" | "label" | "description",
    value: string
  ) => {
    setContent((current) => {
      const items = [...current.stats.items];
      items[index] = {
        ...items[index],
        [key]: value,
      };
      return {
        ...current,
        stats: {
          ...current.stats,
          items,
        },
      };
    });
  };

  const addStatItem = () => {
    setContent((current) => ({
      ...current,
      stats: {
        ...current.stats,
        items: [...current.stats.items, { number: "", label: "", description: "" }],
      },
    }));
  };

  const removeStatItem = (index: number) => {
    setContent((current) => ({
      ...current,
      stats: {
        ...current.stats,
        items: current.stats.items.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const updateTimelineItem = (
    index: number,
    key: "year" | "title" | "description" | "achievement",
    value: string
  ) => {
    setContent((current) => {
      const items = [...current.timeline.items];
      items[index] = {
        ...items[index],
        [key]: value,
      };
      return {
        ...current,
        timeline: {
          ...current.timeline,
          items,
        },
      };
    });
  };

  const addTimelineItem = () => {
    setContent((current) => ({
      ...current,
      timeline: {
        ...current.timeline,
        items: [
          ...current.timeline.items,
          { year: "", title: "", description: "", achievement: "" },
        ],
      },
    }));
  };

  const removeTimelineItem = (index: number) => {
    setContent((current) => ({
      ...current,
      timeline: {
        ...current.timeline,
        items: current.timeline.items.filter((_, itemIndex) => itemIndex !== index),
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("about", content);
      setMessage("About section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save about content.");
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
        <h1 className="mt-2 text-3xl font-bold text-gray-900">About Section</h1>
        <p className="mt-2 text-gray-600">
          Manage homepage about content and dynamic About Us page sections from one place.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-gray-600">Loading about content...</p>
        ) : (
          <div className="space-y-6">
            <SectionCard
              title="Homepage About Section"
              description="This content powers the homepage about block."
            >
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
                  label="Trusted Label"
                  value={content.trustedLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, trustedLabel: value }))
                  }
                />
                <Field
                  label="Trusted Text"
                  value={content.trustedText}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, trustedText: value }))
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ImageUploader
                  label="Hero Image"
                  imageUrl={content.heroImageUrl}
                  uploading={uploadingKey === 'about-hero-image'}
                  onUpload={(file) =>
                    uploadImage('about-hero-image', file, (uploadedUrl) =>
                      setContent((current) => ({ ...current, heroImageUrl: uploadedUrl }))
                    )
                  }
                  onRemove={() =>
                    setContent((current) => ({ ...current, heroImageUrl: '' }))
                  }
                />
                <ImageUploader
                  label="Dashboard Image"
                  imageUrl={content.dashboardImageUrl}
                  uploading={uploadingKey === 'about-dashboard-image'}
                  onUpload={(file) =>
                    uploadImage('about-dashboard-image', file, (uploadedUrl) =>
                      setContent((current) => ({ ...current, dashboardImageUrl: uploadedUrl }))
                    )
                  }
                  onRemove={() =>
                    setContent((current) => ({ ...current, dashboardImageUrl: '' }))
                  }
                />
              </div>

              <RepeatableHeader
                title="Homepage Highlights"
                buttonLabel="Add Highlight"
                onAdd={addHomepageHighlight}
              />
              {content.highlights.map((highlight, index) => (
                <RepeatableCard
                  key={`homepage-highlight-${index}`}
                  title={`Highlight ${index + 1}`}
                  deleteLabel="Delete Highlight"
                  onDelete={() => removeHomepageHighlight(index)}
                >
                  <TextArea
                    label={`Highlight ${index + 1}`}
                    value={highlight}
                    onChange={(value) => updateHomepageHighlight(index, value)}
                    rows={2}
                  />
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard
              title="About Us Mission Section"
              description="This content appears at the top of the About Us page."
            >
              <Field
                label="Mission Eyebrow"
                value={content.mission.eyebrow}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    mission: { ...current.mission, eyebrow: value },
                  }))
                }
              />
              <Field
                label="Mission Title"
                value={content.mission.title}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    mission: { ...current.mission, title: value },
                  }))
                }
              />
              <TextArea
                label="Mission Description"
                value={content.mission.description}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    mission: { ...current.mission, description: value },
                  }))
                }
                rows={4}
              />

              <RepeatableHeader
                title="Mission Highlights"
                buttonLabel="Add Mission Point"
                onAdd={addMissionHighlight}
              />
              {content.mission.highlights.map((highlight, index) => (
                <RepeatableCard
                  key={`mission-highlight-${index}`}
                  title={`Mission Point ${index + 1}`}
                  deleteLabel="Delete Point"
                  onDelete={() => removeMissionHighlight(index)}
                >
                  <TextArea
                    label={`Mission Point ${index + 1}`}
                    value={highlight}
                    onChange={(value) => updateMissionHighlight(index, value)}
                    rows={2}
                  />
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard
              title="About Us Values Section"
              description="These cards are shown in the principles and values grid."
            >
              <Field
                label="Values Eyebrow"
                value={content.values.eyebrow}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    values: { ...current.values, eyebrow: value },
                  }))
                }
              />
              <Field
                label="Values Title"
                value={content.values.title}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    values: { ...current.values, title: value },
                  }))
                }
              />
              <TextArea
                label="Values Description"
                value={content.values.description}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    values: { ...current.values, description: value },
                  }))
                }
                rows={3}
              />

              <RepeatableHeader
                title="Value Cards"
                buttonLabel="Add Value Card"
                onAdd={addValueItem}
              />
              {content.values.items.map((item, index) => (
                <RepeatableCard
                  key={`value-item-${index}`}
                  title={item.title || `Value Card ${index + 1}`}
                  deleteLabel="Delete Card"
                  onDelete={() => removeValueItem(index)}
                >
                  <Field
                    label={`Value Card ${index + 1} Title`}
                    value={item.title}
                    onChange={(value) => updateValueItem(index, "title", value)}
                  />
                  <TextArea
                    label={`Value Card ${index + 1} Description`}
                    value={item.description}
                    onChange={(value) => updateValueItem(index, "description", value)}
                    rows={3}
                  />
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard
              title="About Us Stats Section"
              description="These number cards appear in the impact section."
            >
              <Field
                label="Stats Eyebrow"
                value={content.stats.eyebrow}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    stats: { ...current.stats, eyebrow: value },
                  }))
                }
              />
              <Field
                label="Stats Title"
                value={content.stats.title}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    stats: { ...current.stats, title: value },
                  }))
                }
              />
              <TextArea
                label="Stats Description"
                value={content.stats.description}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    stats: { ...current.stats, description: value },
                  }))
                }
                rows={3}
              />

              <RepeatableHeader
                title="Stats Cards"
                buttonLabel="Add Stats Card"
                onAdd={addStatItem}
              />
              {content.stats.items.map((item, index) => (
                <RepeatableCard
                  key={`stat-item-${index}`}
                  title={item.label || `Stats Card ${index + 1}`}
                  deleteLabel="Delete Card"
                  onDelete={() => removeStatItem(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label={`Stats Card ${index + 1} Number`}
                      value={item.number}
                      onChange={(value) => updateStatItem(index, "number", value)}
                    />
                    <Field
                      label={`Stats Card ${index + 1} Label`}
                      value={item.label}
                      onChange={(value) => updateStatItem(index, "label", value)}
                    />
                  </div>
                  <TextArea
                    label={`Stats Card ${index + 1} Description`}
                    value={item.description}
                    onChange={(value) => updateStatItem(index, "description", value)}
                    rows={3}
                  />
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard
              title="About Us Timeline Section"
              description="These milestones power the journey timeline on the About page."
            >
              <Field
                label="Timeline Eyebrow"
                value={content.timeline.eyebrow}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    timeline: { ...current.timeline, eyebrow: value },
                  }))
                }
              />
              <Field
                label="Timeline Title"
                value={content.timeline.title}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    timeline: { ...current.timeline, title: value },
                  }))
                }
              />
              <TextArea
                label="Timeline Description"
                value={content.timeline.description}
                onChange={(value) =>
                  setContent((current) => ({
                    ...current,
                    timeline: { ...current.timeline, description: value },
                  }))
                }
                rows={3}
              />

              <RepeatableHeader
                title="Timeline Items"
                buttonLabel="Add Timeline Item"
                onAdd={addTimelineItem}
              />
              {content.timeline.items.map((item, index) => (
                <RepeatableCard
                  key={`timeline-item-${index}`}
                  title={item.title || `Timeline Item ${index + 1}`}
                  deleteLabel="Delete Item"
                  onDelete={() => removeTimelineItem(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label={`Timeline Item ${index + 1} Year`}
                      value={item.year}
                      onChange={(value) => updateTimelineItem(index, "year", value)}
                    />
                    <Field
                      label={`Timeline Item ${index + 1} Title`}
                      value={item.title}
                      onChange={(value) => updateTimelineItem(index, "title", value)}
                    />
                  </div>
                  <TextArea
                    label={`Timeline Item ${index + 1} Description`}
                    value={item.description}
                    onChange={(value) => updateTimelineItem(index, "description", value)}
                    rows={3}
                  />
                  <TextArea
                    label={`Timeline Item ${index + 1} Key Outcome`}
                    value={item.achievement}
                    onChange={(value) => updateTimelineItem(index, "achievement", value)}
                    rows={2}
                  />
                </RepeatableCard>
              ))}
            </SectionCard>

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
              {saving ? "Saving..." : "Save About Content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function RepeatableHeader({
  title,
  buttonLabel,
  onAdd,
}: {
  title: string;
  buttonLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function RepeatableCard({
  title,
  deleteLabel,
  onDelete,
  children,
}: {
  title: string;
  deleteLabel: string;
  onDelete: () => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <button
          type="button"
          onClick={onDelete}
          className="text-sm font-semibold text-red-600 transition hover:text-red-700"
        >
          {deleteLabel}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
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
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {imageUrl ? (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-semibold text-red-600 transition hover:text-red-700"
          >
            Remove
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
