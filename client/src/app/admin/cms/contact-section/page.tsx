"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  defaultContactSectionContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type ContactSectionCmsContent,
} from "@/services/cmsService";

export default function AdminCmsContactSectionPage() {
  const [content, setContent] = useState<ContactSectionCmsContent>(
    defaultContactSectionContent
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<ContactSectionCmsContent>("contactSection")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default contact section content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateHeroStat = (index: number, key: "value" | "label", value: string) => {
    setContent((current) => {
      const heroStats = [...current.heroStats];
      heroStats[index] = { ...heroStats[index], [key]: value };
      return { ...current, heroStats };
    });
  };

  const addHeroStat = () => {
    setContent((current) => ({
      ...current,
      heroStats: [...current.heroStats, { value: "", label: "" }],
    }));
  };

  const removeHeroStat = (index: number) => {
    setContent((current) => ({
      ...current,
      heroStats: current.heroStats.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateAddressLine = (index: number, value: string) => {
    setContent((current) => {
      const addressLines = [...current.addressLines];
      addressLines[index] = value;
      return { ...current, addressLines };
    });
  };

  const addAddressLine = () => {
    setContent((current) => ({
      ...current,
      addressLines: [...current.addressLines, ""],
    }));
  };

  const removeAddressLine = (index: number) => {
    setContent((current) => ({
      ...current,
      addressLines: current.addressLines.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updatePhone = (index: number, key: "label" | "number", value: string) => {
    setContent((current) => {
      const phones = [...current.phones];
      phones[index] = { ...phones[index], [key]: value };
      return { ...current, phones };
    });
  };

  const addPhone = () => {
    setContent((current) => ({
      ...current,
      phones: [...current.phones, { label: "", number: "" }],
    }));
  };

  const removePhone = (index: number) => {
    setContent((current) => ({
      ...current,
      phones: current.phones.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateEmail = (index: number, key: "label" | "address", value: string) => {
    setContent((current) => {
      const emails = [...current.emails];
      emails[index] = { ...emails[index], [key]: value };
      return { ...current, emails };
    });
  };

  const addEmail = () => {
    setContent((current) => ({
      ...current,
      emails: [...current.emails, { label: "", address: "" }],
    }));
  };

  const removeEmail = (index: number) => {
    setContent((current) => ({
      ...current,
      emails: current.emails.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateMapTag = (index: number, value: string) => {
    setContent((current) => {
      const mapTags = [...current.mapTags];
      mapTags[index] = value;
      return { ...current, mapTags };
    });
  };

  const addMapTag = () => {
    setContent((current) => ({
      ...current,
      mapTags: [...current.mapTags, ""],
    }));
  };

  const removeMapTag = (index: number) => {
    setContent((current) => ({
      ...current,
      mapTags: current.mapTags.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateFallbackStat = (index: number, key: "value" | "label", value: string) => {
    setContent((current) => {
      const fallbackStats = [...current.fallbackStats];
      fallbackStats[index] = { ...fallbackStats[index], [key]: value };
      return { ...current, fallbackStats };
    });
  };

  const addFallbackStat = () => {
    setContent((current) => ({
      ...current,
      fallbackStats: [...current.fallbackStats, { value: "", label: "" }],
    }));
  };

  const removeFallbackStat = (index: number) => {
    setContent((current) => ({
      ...current,
      fallbackStats: current.fallbackStats.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("contactSection", content);
      setMessage("Contact section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save contact section.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">CMS</p>
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Contact Page</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Manage contact page hero, details section, and form fields with dynamic add and delete controls.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading contact section content...</p>
        ) : (
          <div className="space-y-6">
            <SectionCard title="Contact Page Hero">
              <Field
                label="Hero Eyebrow"
                value={content.heroEyebrow}
                onChange={(value) => setContent((current) => ({ ...current, heroEyebrow: value }))}
              />
              <Field
                label="Hero Title"
                value={content.heroTitle}
                onChange={(value) => setContent((current) => ({ ...current, heroTitle: value }))}
              />
              <TextArea
                label="Hero Description"
                value={content.heroDescription}
                onChange={(value) =>
                  setContent((current) => ({ ...current, heroDescription: value }))
                }
                rows={3}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Primary Button Label"
                  value={content.heroPrimaryButtonLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, heroPrimaryButtonLabel: value }))
                  }
                />
                <Field
                  label="Primary Button URL"
                  value={content.heroPrimaryButtonUrl}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, heroPrimaryButtonUrl: value }))
                  }
                />
                <Field
                  label="Secondary Button Label"
                  value={content.heroSecondaryButtonLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, heroSecondaryButtonLabel: value }))
                  }
                />
                <Field
                  label="Secondary Button URL"
                  value={content.heroSecondaryButtonUrl}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, heroSecondaryButtonUrl: value }))
                  }
                />
              </div>

              <RepeatableHeader title="Hero Stats" buttonLabel="Add Stat" onAdd={addHeroStat} />
              {content.heroStats.map((item, index) => (
                <RepeatableCard
                  key={`hero-stat-${index}`}
                  title={`Hero Stat ${index + 1}`}
                  deleteLabel="Delete Stat"
                  onDelete={() => removeHeroStat(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Value"
                      value={item.value}
                      onChange={(value) => updateHeroStat(index, "value", value)}
                    />
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) => updateHeroStat(index, "label", value)}
                    />
                  </div>
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard title="Contact Details Section">
              <Field
                label="Details Eyebrow"
                value={content.detailsEyebrow}
                onChange={(value) => setContent((current) => ({ ...current, detailsEyebrow: value }))}
              />
              <Field
                label="Details Title"
                value={content.detailsTitle}
                onChange={(value) => setContent((current) => ({ ...current, detailsTitle: value }))}
              />
              <TextArea
                label="Details Description"
                value={content.detailsDescription}
                onChange={(value) =>
                  setContent((current) => ({ ...current, detailsDescription: value }))
                }
                rows={3}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="WhatsApp Button Label"
                  value={content.whatsappButtonLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, whatsappButtonLabel: value }))
                  }
                />
                <Field
                  label="WhatsApp Number"
                  value={content.whatsAppNumber}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, whatsAppNumber: value }))
                  }
                />
                <Field
                  label="Support Button Label"
                  value={content.supportButtonLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, supportButtonLabel: value }))
                  }
                />
                <Field
                  label="Support Email"
                  value={content.supportButtonEmail}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, supportButtonEmail: value }))
                  }
                />
                <Field
                  label="Address Title"
                  value={content.addressTitle}
                  onChange={(value) => setContent((current) => ({ ...current, addressTitle: value }))}
                />
                <Field
                  label="Place Query"
                  value={content.placeQuery}
                  onChange={(value) => setContent((current) => ({ ...current, placeQuery: value }))}
                />
                <Field
                  label="Map Eyebrow"
                  value={content.mapEyebrow}
                  onChange={(value) => setContent((current) => ({ ...current, mapEyebrow: value }))}
                />
                <Field
                  label="Map Title"
                  value={content.mapTitle}
                  onChange={(value) => setContent((current) => ({ ...current, mapTitle: value }))}
                />
                <Field
                  label="Map Button Label"
                  value={content.mapButtonLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, mapButtonLabel: value }))
                  }
                />
                <ToggleField
                  label="Show Embedded Map"
                  checked={content.showMap}
                  onChange={(checked) => setContent((current) => ({ ...current, showMap: checked }))}
                />
              </div>

              <RepeatableHeader
                title="Address Lines"
                buttonLabel="Add Address Line"
                onAdd={addAddressLine}
              />
              {content.addressLines.map((line, index) => (
                <RepeatableCard
                  key={`address-line-${index}`}
                  title={`Address Line ${index + 1}`}
                  deleteLabel="Delete Line"
                  onDelete={() => removeAddressLine(index)}
                >
                  <Field
                    label="Address Line"
                    value={line}
                    onChange={(value) => updateAddressLine(index, value)}
                  />
                </RepeatableCard>
              ))}

              <RepeatableHeader title="Phone Numbers" buttonLabel="Add Phone" onAdd={addPhone} />
              {content.phones.map((item, index) => (
                <RepeatableCard
                  key={`phone-${index}`}
                  title={`Phone ${index + 1}`}
                  deleteLabel="Delete Phone"
                  onDelete={() => removePhone(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) => updatePhone(index, "label", value)}
                    />
                    <Field
                      label="Number"
                      value={item.number}
                      onChange={(value) => updatePhone(index, "number", value)}
                    />
                  </div>
                </RepeatableCard>
              ))}

              <RepeatableHeader title="Emails" buttonLabel="Add Email" onAdd={addEmail} />
              {content.emails.map((item, index) => (
                <RepeatableCard
                  key={`email-${index}`}
                  title={`Email ${index + 1}`}
                  deleteLabel="Delete Email"
                  onDelete={() => removeEmail(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) => updateEmail(index, "label", value)}
                    />
                    <Field
                      label="Email Address"
                      value={item.address}
                      onChange={(value) => updateEmail(index, "address", value)}
                    />
                  </div>
                </RepeatableCard>
              ))}

              <RepeatableHeader title="Map Tags" buttonLabel="Add Tag" onAdd={addMapTag} />
              {content.mapTags.map((tag, index) => (
                <RepeatableCard
                  key={`map-tag-${index}`}
                  title={`Tag ${index + 1}`}
                  deleteLabel="Delete Tag"
                  onDelete={() => removeMapTag(index)}
                >
                  <Field label="Tag" value={tag} onChange={(value) => updateMapTag(index, value)} />
                </RepeatableCard>
              ))}

              <RepeatableHeader
                title="Fallback Stats"
                buttonLabel="Add Fallback Stat"
                onAdd={addFallbackStat}
              />
              {content.fallbackStats.map((item, index) => (
                <RepeatableCard
                  key={`fallback-stat-${index}`}
                  title={`Fallback Stat ${index + 1}`}
                  deleteLabel="Delete Stat"
                  onDelete={() => removeFallbackStat(index)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Value"
                      value={item.value}
                      onChange={(value) => updateFallbackStat(index, "value", value)}
                    />
                    <Field
                      label="Label"
                      value={item.label}
                      onChange={(value) => updateFallbackStat(index, "label", value)}
                    />
                  </div>
                </RepeatableCard>
              ))}
            </SectionCard>

            <SectionCard title="Left Contact Card">
              <Field
                label="Eyebrow"
                value={content.leftEyebrow}
                onChange={(value) => setContent((current) => ({ ...current, leftEyebrow: value }))}
              />
              <Field
                label="Title"
                value={content.leftTitle}
                onChange={(value) => setContent((current) => ({ ...current, leftTitle: value }))}
              />
              <TextArea
                label="Description"
                value={content.leftDescription}
                onChange={(value) =>
                  setContent((current) => ({ ...current, leftDescription: value }))
                }
                rows={4}
              />
              <div className="grid gap-4 md:grid-cols-3">
                <Field
                  label="Call Label"
                  value={content.callLabel}
                  onChange={(value) => setContent((current) => ({ ...current, callLabel: value }))}
                />
                <Field
                  label="Call Value"
                  value={content.callValue}
                  onChange={(value) => setContent((current) => ({ ...current, callValue: value }))}
                />
                <Field
                  label="Call Description"
                  value={content.callDescription}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, callDescription: value }))
                  }
                />
                <Field
                  label="Email Label"
                  value={content.emailLabel}
                  onChange={(value) => setContent((current) => ({ ...current, emailLabel: value }))}
                />
                <Field
                  label="Email Value"
                  value={content.emailValue}
                  onChange={(value) => setContent((current) => ({ ...current, emailValue: value }))}
                />
                <Field
                  label="Email Description"
                  value={content.emailDescription}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, emailDescription: value }))
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Contact Form">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Form Eyebrow"
                  value={content.formEyebrow}
                  onChange={(value) => setContent((current) => ({ ...current, formEyebrow: value }))}
                />
                <Field
                  label="Form Title"
                  value={content.formTitle}
                  onChange={(value) => setContent((current) => ({ ...current, formTitle: value }))}
                />
                <Field
                  label="Full Name Label"
                  value={content.fullNameLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, fullNameLabel: value }))
                  }
                />
                <Field
                  label="Full Name Placeholder"
                  value={content.fullNamePlaceholder}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, fullNamePlaceholder: value }))
                  }
                />
                <Field
                  label="Email Field Label"
                  value={content.emailFieldLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, emailFieldLabel: value }))
                  }
                />
                <Field
                  label="Email Field Placeholder"
                  value={content.emailFieldPlaceholder}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, emailFieldPlaceholder: value }))
                  }
                />
                <Field
                  label="Phone Field Label"
                  value={content.phoneFieldLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, phoneFieldLabel: value }))
                  }
                />
                <Field
                  label="Phone Field Placeholder"
                  value={content.phoneFieldPlaceholder}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, phoneFieldPlaceholder: value }))
                  }
                />
                <Field
                  label="Company Field Label"
                  value={content.companyFieldLabel}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, companyFieldLabel: value }))
                  }
                />
                <Field
                  label="Company Field Placeholder"
                  value={content.companyFieldPlaceholder}
                  onChange={(value) =>
                    setContent((current) => ({ ...current, companyFieldPlaceholder: value }))
                  }
                />
              </div>
              <TextArea
                label="Requirement Label"
                value={content.requirementLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, requirementLabel: value }))
                }
                rows={2}
              />
              <TextArea
                label="Requirement Placeholder"
                value={content.requirementPlaceholder}
                onChange={(value) =>
                  setContent((current) => ({ ...current, requirementPlaceholder: value }))
                }
                rows={4}
              />
              <Field
                label="Submit Button Label"
                value={content.submitButtonLabel}
                onChange={(value) =>
                  setContent((current) => ({ ...current, submitButtonLabel: value }))
                }
              />
            </SectionCard>

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
              {saving ? "Saving..." : "Save Contact Section Content"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4">
      <h2 className="text-lg font-semibold text-[#0f2344]">{title}</h2>
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
      <h3 className="text-base font-semibold text-[#0f2344]">{title}</h3>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
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
    <div className="space-y-4 rounded-[20px] border border-[#d8e7f1] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#0f2344]">{title}</p>
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
      <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-[#0f2344] outline-none transition focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex h-full min-h-[72px] items-center justify-between rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3">
      <span className="text-sm font-medium text-[#4d5f7c]">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-[#0aa6c9]"
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
