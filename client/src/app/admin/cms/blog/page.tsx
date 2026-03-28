"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import {
  defaultBlogContent,
  fetchAdminCmsSection,
  resolveCmsAssetUrl,
  uploadAdminCmsImage,
  uploadAdminCmsMedia,
  updateAdminCmsSection,
  type BlogCmsContent,
} from "@/services/cmsService";

const createEmptyPost = () => ({
  id: `post-${Date.now()}`,
  title: "New blog title",
  excerpt: "",
  category: "Accounting",
  readTime: "5 min read",
  date: new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  image: "",
  takeaway: "",
  content: [""],
});

export default function AdminCmsBlogPage() {
  const [content, setContent] = useState<BlogCmsContent>(defaultBlogContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminCmsSection<BlogCmsContent>("blog")
      .then((response) => {
        setContent(response.content);
      })
      .catch(() => {
        setMessage("Using default blog content because CMS data could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateField = (
    key:
      | "eyebrow"
      | "title"
      | "description"
      | "primaryButtonLabel"
      | "primaryButtonUrl"
      | "secondaryButtonLabel"
      | "secondaryButtonUrl"
      | "sectionEyebrow"
      | "sectionTitle",
    value: string
  ) => {
    setContent((current) => ({ ...current, [key]: value }));
  };

  const updateStat = (index: number, key: "value" | "label", value: string) => {
    setContent((current) => {
      const stats = [...current.stats];
      stats[index] = { ...stats[index], [key]: value };
      return { ...current, stats };
    });
  };

  const updatePost = (
    index: number,
    key:
      | "id"
      | "title"
      | "excerpt"
      | "category"
      | "readTime"
      | "date"
      | "image"
      | "takeaway",
    value: string
  ) => {
    setContent((current) => {
      const posts = [...current.posts];
      posts[index] = { ...posts[index], [key]: value };
      return { ...current, posts };
    });
  };

  const updateParagraph = (postIndex: number, paragraphIndex: number, value: string) => {
    setContent((current) => {
      const posts = [...current.posts];
      const paragraphs = [...posts[postIndex].content];
      paragraphs[paragraphIndex] = value;
      posts[postIndex] = { ...posts[postIndex], content: paragraphs };
      return { ...current, posts };
    });
  };

  const addParagraph = (postIndex: number) => {
    setContent((current) => {
      const posts = [...current.posts];
      posts[postIndex] = {
        ...posts[postIndex],
        content: [...posts[postIndex].content, ""],
      };
      return { ...current, posts };
    });
  };

  const removeParagraph = (postIndex: number, paragraphIndex: number) => {
    setContent((current) => {
      const posts = [...current.posts];
      const nextParagraphs = posts[postIndex].content.filter(
        (_item, index) => index !== paragraphIndex
      );

      posts[postIndex] = {
        ...posts[postIndex],
        content: nextParagraphs.length > 0 ? nextParagraphs : [""],
      };

      return { ...current, posts };
    });
  };

  const addPost = () => {
    setContent((current) => ({
      ...current,
      posts: [...current.posts, createEmptyPost()],
      stats: current.stats.map((stat, index) =>
        index === 0 ? { ...stat, value: `${current.posts.length + 1}+` } : stat
      ),
    }));
  };

  const removePost = (index: number) => {
    setContent((current) => {
      const posts = current.posts.filter((_post, postIndex) => postIndex !== index);
      return {
        ...current,
        posts,
        stats: current.stats.map((stat, statIndex) =>
          statIndex === 0 ? { ...stat, value: `${posts.length}+` } : stat
        ),
      };
    });
  };

  const movePost = (index: number, direction: "up" | "down") => {
    setContent((current) => {
      const posts = [...current.posts];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= posts.length) {
        return current;
      }

      [posts[index], posts[targetIndex]] = [posts[targetIndex], posts[index]];
      return { ...current, posts };
    });
  };

  const uploadImage = async (postIndex: number, file: File) => {
    try {
      setUploadingKey(`post-${postIndex}`);
      setMessage("");
      const response = await uploadAdminCmsImage(file);
      updatePost(postIndex, "image", response.url);
      setMessage("Blog image uploaded successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to upload blog image.");
    } finally {
      setUploadingKey(null);
    }
  };

  const uploadEditorMedia = async (file: File) => {
    const response = await uploadAdminCmsMedia(file);
    setMessage(
      response.kind === "video"
        ? "Video uploaded and inserted successfully."
        : "Image uploaded and inserted successfully."
    );
    return response;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      await updateAdminCmsSection("blog", content);
      setMessage("Blog page updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save blog page.");
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
        <h1 className="mt-2 text-3xl font-bold text-[#0f2344]">Blog Page</h1>
        <p className="mt-2 text-[#4d5f7c]">
          Manage the blog hero area and publish dynamic blog cards and detail pages from admin.
        </p>
      </div>

      <div className="rounded-[28px] border border-[#d8e7f1] bg-white p-6 shadow-[0_16px_40px_rgba(15,35,68,0.06)]">
        {loading ? (
          <p className="text-[#4d5f7c]">Loading blog content...</p>
        ) : (
          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-[#0f2344]">Hero Content</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Eyebrow"
                  value={content.eyebrow}
                  onChange={(value) => updateField("eyebrow", value)}
                />
                <Field
                  label="Hero Title"
                  value={content.title}
                  onChange={(value) => updateField("title", value)}
                />
                <Field
                  label="Primary Button Label"
                  value={content.primaryButtonLabel}
                  onChange={(value) => updateField("primaryButtonLabel", value)}
                />
                <Field
                  label="Primary Button URL"
                  value={content.primaryButtonUrl}
                  onChange={(value) => updateField("primaryButtonUrl", value)}
                />
                <Field
                  label="Secondary Button Label"
                  value={content.secondaryButtonLabel}
                  onChange={(value) => updateField("secondaryButtonLabel", value)}
                />
                <Field
                  label="Secondary Button URL"
                  value={content.secondaryButtonUrl}
                  onChange={(value) => updateField("secondaryButtonUrl", value)}
                />
              </div>
              <TextArea
                label="Hero Description"
                value={content.description}
                onChange={(value) => updateField("description", value)}
                rows={4}
              />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-[#0f2344]">Top Stats</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {content.stats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className="rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff] p-4"
                  >
                    <Field
                      label={`Stat ${index + 1} Value`}
                      value={stat.value}
                      onChange={(value) => updateStat(index, "value", value)}
                    />
                    <div className="mt-4">
                      <Field
                        label={`Stat ${index + 1} Label`}
                        value={stat.label}
                        onChange={(value) => updateStat(index, "label", value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-[#0f2344]">Listing Section</h2>
              <Field
                label="Section Eyebrow"
                value={content.sectionEyebrow}
                onChange={(value) => updateField("sectionEyebrow", value)}
              />
              <Field
                label="Section Title"
                value={content.sectionTitle}
                onChange={(value) => updateField("sectionTitle", value)}
              />
            </section>

            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#0f2344]">Blog Posts</h2>
                  <p className="mt-1 text-sm text-[#5d708f]">
                    Add new posts, edit existing content, and control blog detail pages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addPost}
                  className="rounded-full border border-[#b7e9f2] bg-[#effbff] px-5 py-2.5 text-sm font-semibold text-[#0088c5] transition hover:bg-[#e0f7ff]"
                >
                  Add New Blog
                </button>
              </div>

              <div className="space-y-5">
                {content.posts.map((post, index) => (
                  <div
                    key={`${post.id}-${index}`}
                    className="space-y-5 rounded-[28px] border border-[#d8e7f1] bg-[#fbfdff] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-[#0f2344]">
                          Blog {index + 1}
                        </p>
                        <p className="text-sm text-[#5d708f]">
                          URL: /blog/{post.id || "your-slug"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => movePost(index, "up")}
                          className="rounded-full border border-[#d8e7f1] bg-white px-4 py-2 text-sm font-medium text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                        >
                          Move Up
                        </button>
                        <button
                          type="button"
                          onClick={() => movePost(index, "down")}
                          className="rounded-full border border-[#d8e7f1] bg-white px-4 py-2 text-sm font-medium text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
                        >
                          Move Down
                        </button>
                        <button
                          type="button"
                          onClick={() => removePost(index)}
                          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Blog Slug"
                        value={post.id}
                        onChange={(value) =>
                          updatePost(
                            index,
                            "id",
                            value
                              .toLowerCase()
                              .trim()
                              .replace(/[^a-z0-9\s-]/g, "")
                              .replace(/\s+/g, "-")
                          )
                        }
                      />
                      <Field
                        label="Category"
                        value={post.category}
                        onChange={(value) => updatePost(index, "category", value)}
                      />
                      <Field
                        label="Read Time"
                        value={post.readTime}
                        onChange={(value) => updatePost(index, "readTime", value)}
                      />
                      <Field
                        label="Published Date"
                        value={post.date}
                        onChange={(value) => updatePost(index, "date", value)}
                      />
                    </div>

                    <Field
                      label="Blog Title"
                      value={post.title}
                      onChange={(value) => updatePost(index, "title", value)}
                    />

                    <TextArea
                      label="Excerpt"
                      value={post.excerpt}
                      onChange={(value) => updatePost(index, "excerpt", value)}
                      rows={3}
                    />

                    <RichTextEditor
                      label="Takeaway Box Content"
                      value={post.takeaway}
                      onChange={(value) => updatePost(index, "takeaway", value)}
                      minHeight={140}
                      onUploadMedia={uploadEditorMedia}
                    />

                    <ImageUploader
                      label="Blog Card / Detail Image"
                      imageUrl={post.image}
                      uploading={uploadingKey === `post-${index}`}
                      onUpload={(file) => uploadImage(index, file)}
                      onRemove={() => updatePost(index, "image", "")}
                    />

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-[#0f2344]">
                          Article Paragraphs
                        </h3>
                        <button
                          type="button"
                          onClick={() => addParagraph(index)}
                          className="rounded-full border border-[#b7e9f2] bg-[#effbff] px-4 py-2 text-sm font-semibold text-[#0088c5] transition hover:bg-[#e0f7ff]"
                        >
                          Add Paragraph
                        </button>
                      </div>

                      {post.content.map((paragraph, paragraphIndex) => (
                        <div
                          key={`${post.id}-paragraph-${paragraphIndex}`}
                          className="rounded-[22px] border border-[#d8e7f1] bg-white p-4"
                        >
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[#0f2344]">
                              Paragraph {paragraphIndex + 1}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeParagraph(index, paragraphIndex)}
                              className="text-sm font-medium text-red-600 transition hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <RichTextEditor
                            label=""
                            value={paragraph}
                            onChange={(value) => updateParagraph(index, paragraphIndex, value)}
                            minHeight={180}
                            onUploadMedia={uploadEditorMedia}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

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
              {saving ? "Saving..." : "Save Blog Page"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const RICH_TEXT_ACTIONS: Array<{
  label: string;
  command: string;
  title: string;
  value?: string;
}> = [
  { label: "B", command: "bold", title: "Bold" },
  { label: "I", command: "italic", title: "Italic" },
  { label: "U", command: "underline", title: "Underline" },
  { label: "H2", command: "formatBlock", value: "h2", title: "Heading" },
  { label: "Quote", command: "formatBlock", value: "blockquote", title: "Quote" },
  { label: "List", command: "insertUnorderedList", title: "Bullet list" },
  { label: "Link", command: "createLink", title: "Add link" },
];

function normalizeRichText(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const hasHtmlTag = /<\/?[a-z][\s\S]*>/i.test(trimmed);
  if (hasHtmlTag) {
    return trimmed;
  }

  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function normalizeEditorOutput(value: string) {
  return value
    .replace(/<div><br><\/div>/gi, "<p><br></p>")
    .replace(/<div>/gi, "<p>")
    .replace(/<\/div>/gi, "</p>")
    .replace(/&nbsp;/gi, " ")
    .trim();
}

function RichTextEditor({
  label,
  value,
  onChange,
  minHeight = 180,
  onUploadMedia,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
  onUploadMedia: (file: File) => Promise<{ url: string; kind: "image" | "video"; mimeType: string }>;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const normalizedValue = useMemo(() => normalizeRichText(value), [value]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    if (editor.innerHTML !== normalizedValue) {
      editor.innerHTML = normalizedValue;
    }
  }, [normalizedValue]);

  const emitChange = () => {
    const nextValue = normalizeEditorOutput(editorRef.current?.innerHTML ?? "");
    onChange(
      nextValue === "<br>" || nextValue === "<p><br></p>" || !nextValue ? "" : nextValue
    );
  };

  const applyCommand = (command: string, commandValue?: string) => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    editor.focus();

    if (command === "createLink") {
      const url = window.prompt("Enter link URL", "https://");
      if (!url) {
        return;
      }

      document.execCommand(command, false, url);
      emitChange();
      return;
    }

    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const moveCaretToPoint = (x: number, y: number) => {
    if (typeof document === "undefined") {
      return;
    }

    const doc = document as Document & {
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
      caretPositionFromPoint?: (
        x: number,
        y: number
      ) => { offsetNode: Node; offset: number } | null;
    };

    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    const caretRangeFromPoint = doc.caretRangeFromPoint?.(x, y);
    if (caretRangeFromPoint) {
      selection.removeAllRanges();
      selection.addRange(caretRangeFromPoint);
      return;
    }

    const caretPosition = doc.caretPositionFromPoint?.(x, y);
    if (caretPosition) {
      const range = document.createRange();
      range.setStart(caretPosition.offsetNode, caretPosition.offset);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const insertMedia = async (file: File, coordinates?: { x: number; y: number }) => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }

    try {
      setIsUploadingMedia(true);
      editor.focus();

      if (coordinates) {
        moveCaretToPoint(coordinates.x, coordinates.y);
      }

      const media = await onUploadMedia(file);
      const mediaHtml =
        media.kind === "video"
          ? `<video controls playsinline><source src="${media.url}" type="${media.mimeType}"></video>`
          : `<img src="${media.url}" alt="${file.name.replace(/"/g, "&quot;")}">`;

      document.execCommand("insertHTML", false, mediaHtml);
      emitChange();
    } catch (error) {
      console.error("Failed to upload editor media", error);
    } finally {
      setIsUploadingMedia(false);
      setIsDragging(false);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = Array.from(event.dataTransfer.files).find((item) =>
      item.type.startsWith("image/") || item.type.startsWith("video/")
    );

    if (!file) {
      setIsDragging(false);
      return;
    }

    await insertMedia(file, { x: event.clientX, y: event.clientY });
  };

  return (
    <div className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      ) : null}

      <div className="overflow-hidden rounded-[24px] border border-[#d8e7f1] bg-[#fbfdff]">
        <div className="flex flex-wrap gap-2 border-b border-[#d8e7f1] bg-white px-3 py-3">
          {RICH_TEXT_ACTIONS.map((action) => (
            <button
              key={`${action.command}-${action.label}`}
              type="button"
              title={action.title}
              onClick={() => applyCommand(action.command, action.value)}
              className="rounded-full border border-[#d8e7f1] bg-[#fbfdff] px-3 py-1.5 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]"
            >
              {action.label}
            </button>
          ))}
          <label className="rounded-full border border-[#d8e7f1] bg-[#fbfdff] px-3 py-1.5 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]">
            {isUploadingMedia ? "Uploading..." : "Media"}
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              disabled={isUploadingMedia}
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (file) {
                  await insertMedia(file);
                }
                event.currentTarget.value = "";
              }}
            />
          </label>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={emitChange}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`w-full px-4 py-3 text-[#0f2344] outline-none [&_blockquote]:border-l-4 [&_blockquote]:border-[#0aa6c9]/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_img]:my-4 [&_img]:max-h-[360px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-[20px] [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:min-h-[1.5rem] [&_ul]:list-disc [&_ul]:pl-4 [&_video]:my-4 [&_video]:max-h-[360px] [&_video]:w-full [&_video]:rounded-[20px] ${
            isDragging ? "bg-[#effbff]" : ""
          }`}
          style={{ minHeight }}
        />
      </div>

      <p className="mt-2 text-xs text-[#6b7d99]">
        Bold, italic, underline, heading, quote, list, links, aur image/video drag-and-drop support karta hai.
      </p>
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
        <div className="overflow-hidden rounded-[20px] border border-[#d8e7f1] bg-[#f8fbff] p-3">
          <img
            src={resolveCmsAssetUrl(imageUrl)}
            alt={label}
            className="max-h-48 w-auto rounded-lg object-contain"
          />
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#b9d6e4] bg-[#f8fbff] px-4 py-8 text-sm text-[#5d708f]">
          No image uploaded yet.
        </div>
      )}

      <label className="flex w-full cursor-pointer items-center justify-center rounded-full border border-[#d8e7f1] bg-white px-4 py-3 text-sm font-semibold text-[#0f2344] transition hover:border-[#0aa6c9]/35 hover:text-[#0088c5]">
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
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      ) : null}
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
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#4d5f7c]">{label}</span>
      ) : null}
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[20px] border border-[#d8e7f1] bg-[#fbfdff] px-4 py-3 text-[#0f2344] outline-none transition focus:border-[#0aa6c9] focus:ring-2 focus:ring-[#0aa6c9]/15"
      />
    </label>
  );
}
