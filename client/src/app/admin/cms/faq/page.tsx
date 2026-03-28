"use client";

import { useEffect, useState } from "react";
import {
  defaultFaqContent,
  fetchAdminCmsSection,
  updateAdminCmsSection,
  type FaqCmsContent,
} from "@/services/cmsService";

export default function AdminCmsFaqPage() {
  const [content, setContent] = useState<FaqCmsContent>(defaultFaqContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<FaqCmsContent>("faq")
      .then((response) => setContent(response.content))
      .catch(() => {
        setMessage("Using default FAQ content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateFaq = (index: number, key: "question" | "answer", value: string) => {
    setContent((current) => {
      const nextItems = [...current.items];
      nextItems[index] = { ...nextItems[index], [key]: value };
      return { ...current, items: nextItems };
    });
  };

  const addFaq = () => {
    setContent((current) => ({
      ...current,
      items: [...current.items, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    setContent((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("faq", content);
      setMessage("FAQ section updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save FAQ content.");
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">FAQ Section</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Update the FAQ heading, intro text, and the expandable question list.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading FAQ content...</p>
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
                <h2 className="text-lg font-semibold text-[#0f2344]">FAQ Items</h2>
                <button
                  type="button"
                  onClick={addFaq}
                  className="rounded-full border border-[#0aa6c9]/25 bg-[#eff8ff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#dff4ff]"
                >
                  Add FAQ
                </button>
              </div>
              {content.items.map((item, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0f2344]">
                      FAQ {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-sm font-semibold text-red-600 transition hover:text-red-700"
                    >
                      Delete FAQ
                    </button>
                  </div>
                  <Field
                    label={`Question ${index + 1}`}
                    value={item.question}
                    onChange={(value) => updateFaq(index, "question", value)}
                  />
                  <TextArea
                    label={`Answer ${index + 1}`}
                    value={item.answer}
                    onChange={(value) => updateFaq(index, "answer", value)}
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
              {saving ? "Saving..." : "Save FAQ Content"}
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
