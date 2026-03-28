"use client";

import { useEffect, useState } from "react";
import {
  defaultTeamManagementContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type TeamManagementCmsContent,
} from "@/services/cmsService";

const iconOptions = [
  { label: "Lock", value: "lock" },
  { label: "Briefcase", value: "briefcase" },
  { label: "Users", value: "users" },
];

export default function AdminCmsTeamManagementPage() {
  const [content, setContent] = useState<TeamManagementCmsContent>(
    defaultTeamManagementContent
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<TeamManagementCmsContent>("teamManagement")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default team management content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateCard = (
    index: number,
    key: "title" | "description" | "iconKey",
    value: string
  ) => {
    setContent((current) => {
      const nextCards = [...current.cards];
      nextCards[index] = { ...nextCards[index], [key]: value };
      return { ...current, cards: nextCards };
    });
  };

  const addCard = () => {
    setContent((current) => ({
      ...current,
      cards: [
        ...current.cards,
        { title: "", description: "", iconKey: iconOptions[0].value },
      ],
    }));
  };

  const removeCard = (index: number) => {
    setContent((current) => ({
      ...current,
      cards: current.cards.filter((_, cardIndex) => cardIndex !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("teamManagement", content);
      setMessage("Team management section updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to save team management content."
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Team Management Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the collaboration heading, intro text, and management cards.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading team management content...</p>
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
                <h2 className="text-lg font-semibold text-[#0f2344]">Team Management Cards</h2>
                <button
                  type="button"
                  onClick={addCard}
                  className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
                >
                  Add Card
                </button>
              </div>
              {content.cards.map((card, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f2344]">
                      Card {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete Card
                    </button>
                  </div>
                  <SelectField
                    label={`Card ${index + 1} Icon`}
                    value={card.iconKey}
                    onChange={(value) => updateCard(index, "iconKey", value)}
                    options={iconOptions}
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
              {saving ? "Saving..." : "Save Team Management Content"}
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
