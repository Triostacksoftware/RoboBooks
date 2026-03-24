"use client";

import { useEffect, useState } from "react";
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Contact Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the contact card, callback form headings, field labels, placeholders, and button text.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading contact section content...</p>
        ) : (
          <div className="space-y-5">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Left Contact Card</h2>
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
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#0f2344]">Callback Form</h2>
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
              {saving ? "Saving..." : "Save Contact Section Content"}
            </button>
          </div>
        )}
      </div>
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
