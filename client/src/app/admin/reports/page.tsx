"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type ReportCategory =
  | "business_overview"
  | "sales"
  | "purchases_expenses"
  | "banking"
  | "accounting"
  | "time_tracking"
  | "inventory"
  | "budgets"
  | "currency"
  | "activity"
  | "advanced_financial"
  | "tds_reports"
  | "gst_reports";

interface Report {
  _id: string;
  name: string;
  description: string;
  type: "system" | "custom";
  category: ReportCategory;
  subCategory?: string;
  isFavorite: boolean;
  isPublic: boolean;
  lastRun?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ReportsResponse {
  success: boolean;
  data: Report[];
}

interface GenerateResponse {
  success: boolean;
  data: unknown;
}

interface CreateReportPayload {
  name: string;
  description: string;
  category: ReportCategory;
  subCategory: string;
  type: "custom";
  isPublic: boolean;
  parameters: Record<string, unknown>;
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    customers: string[];
    items: string[];
    categories: string[];
    status: string[];
  };
}

const reportCategories: { value: ReportCategory; label: string }[] = [
  { value: "business_overview", label: "Business Overview" },
  { value: "sales", label: "Sales" },
  { value: "purchases_expenses", label: "Purchases & Expenses" },
  { value: "banking", label: "Banking" },
  { value: "accounting", label: "Accounting" },
  { value: "time_tracking", label: "Time Tracking" },
  { value: "inventory", label: "Inventory" },
  { value: "budgets", label: "Budgets" },
  { value: "currency", label: "Currency" },
  { value: "activity", label: "Activity" },
  { value: "advanced_financial", label: "Advanced Financial" },
  { value: "tds_reports", label: "TDS Reports" },
  { value: "gst_reports", label: "GST Reports" },
];

const reportTemplates: Array<{
  name: string;
  description: string;
  category: ReportCategory;
}> = [
  {
    name: "Business Overview",
    description: "Invoice, customer, revenue, and recent activity summary.",
    category: "business_overview",
  },
  {
    name: "Sales Performance",
    description: "Track sales trends and top customer performance.",
    category: "sales",
  },
  {
    name: "Expense Summary",
    description: "Analyze purchases and expense movement.",
    category: "purchases_expenses",
  },
  {
    name: "Accounting Snapshot",
    description: "Review accounting-level totals and balances.",
    category: "accounting",
  },
  {
    name: "GST Report",
    description: "Prepare GST-facing report structures faster.",
    category: "gst_reports",
  },
  {
    name: "Activity Report",
    description: "Review recent system or business activity data.",
    category: "activity",
  },
];

const createInitialForm = (): CreateReportPayload => ({
  name: "",
  description: "System Generated",
  category: "business_overview",
  subCategory: "",
  type: "custom",
  isPublic: false,
  parameters: {},
  filters: {
    dateRange: {
      start: "",
      end: "",
    },
    customers: [],
    items: [],
    categories: [],
    status: [],
  },
});

const formatDate = (value?: string | null) => {
  if (!value) {
    return "Never";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const prettifyCategory = (category: ReportCategory) =>
  reportCategories.find((item) => item.value === category)?.label ?? category;

const sanitizeFileName = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const downloadJson = (fileName: string, data: unknown) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

function PreviewModal({
  reportName,
  previewData,
  onClose,
}: {
  reportName: string;
  previewData: unknown;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{reportName}</h3>
            <p className="text-sm text-slate-500">Generated preview</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto px-6 py-5">
          <pre className="whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {JSON.stringify(previewData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

function GenerateReportModal({
  formData,
  isSubmitting,
  onClose,
  onChange,
  onSubmit,
}: {
  formData: CreateReportPayload;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: (next: CreateReportPayload) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Generate New Report</h3>
            <p className="text-sm text-slate-500">Create a reusable report entry from template or custom details.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Report Name
              </label>
              <input
                value={formData.name}
                onChange={(e) => onChange({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Enter report name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  onChange({
                    ...formData,
                    category: e.target.value as ReportCategory,
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              >
                {reportCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                onChange({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              placeholder="Enter description"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.filters.dateRange.start}
                onChange={(e) =>
                  onChange({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      dateRange: {
                        ...formData.filters.dateRange,
                        start: e.target.value,
                      },
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.filters.dateRange.end}
                onChange={(e) =>
                  onChange({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      dateRange: {
                        ...formData.filters.dateRange,
                        end: e.target.value,
                      },
                    },
                  })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateReportPayload>(createInitialForm);
  const [previewReportName, setPreviewReportName] = useState("");
  const [previewData, setPreviewData] = useState<unknown>(null);
  const { showToast } = useToast();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await api<ReportsResponse>("/api/admin/reports");
      setReports(response.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to load reports",
        "error"
      );
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const generatedReports = useMemo(
    () => reports.filter((report) => Boolean(report.lastRun)).length,
    [reports]
  );

  const pendingReports = reports.length - generatedReports;

  const createReport = async () => {
    if (!formData.name.trim()) {
      showToast("Report name is required", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await api("/api/admin/reports", {
        method: "POST",
        json: formData,
      });
      showToast("Report created successfully", "success");
      setShowGenerateModal(false);
      setFormData(createInitialForm());
      await fetchReports();
    } catch (error) {
      console.error("Error creating report:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to create report",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReportData = async (report: Report, mode: "view" | "download") => {
    try {
      setActiveReportId(report._id);
      const response = await api<GenerateResponse>(
        `/api/admin/reports/${report._id}/generate`,
        {
          method: "POST",
          json: {
            filters: {},
          },
        }
      );

      if (mode === "download") {
        const datePart = new Date().toISOString().split("T")[0];
        downloadJson(
          `${sanitizeFileName(report.name || "report")}-${datePart}.json`,
          response.data
        );
        showToast("Report downloaded successfully", "success");
      } else {
        setPreviewReportName(report.name);
        setPreviewData(response.data);
      }

      await fetchReports();
    } catch (error) {
      console.error("Error generating report:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to generate report",
        "error"
      );
    } finally {
      setActiveReportId(null);
    }
  };

  const openTemplate = (template: (typeof reportTemplates)[number]) => {
    setFormData({
      ...createInitialForm(),
      name: template.name,
      description: template.description,
      category: template.category,
    });
    setShowGenerateModal(true);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
          <p className="text-slate-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="mt-1 text-slate-600">
            Generate, preview, and download reports from live data.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData(createInitialForm());
            setShowGenerateModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 font-medium text-white transition hover:bg-violet-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Generate New Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-xl bg-blue-500 p-3">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Total Reports</p>
              <p className="text-2xl font-bold text-slate-900">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-xl bg-green-500 p-3">
              <CheckCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Generated</p>
              <p className="text-2xl font-bold text-slate-900">{generatedReports}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-xl bg-amber-500 p-3">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Pending Run</p>
              <p className="text-2xl font-bold text-slate-900">{pendingReports}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {reports.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 lg:col-span-2">
            No reports found yet. Create one from the button above or pick a template below.
          </div>
        ) : (
          reports.map((report) => {
            const isBusy = activeReportId === report._id;
            const statusLabel = report.lastRun ? "generated" : "pending";

            return (
              <div
                key={report._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-blue-500 p-3">
                      <DocumentTextIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {report.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {prettifyCategory(report.category)}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {report.description || "System Generated"}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        Last generated: {formatDate(report.lastRun)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      report.lastRun
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => generateReportData(report, "view")}
                    disabled={isBusy}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>{isBusy ? "Working..." : "View"}</span>
                  </button>
                  <button
                    onClick={() => generateReportData(report, "download")}
                    disabled={isBusy}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span>{isBusy ? "Preparing..." : "Download"}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Report Templates</h3>
        <p className="mt-1 text-sm text-slate-500">
          Click any template to prefill the generator and create a working report.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((template) => (
            <button
              key={template.name}
              onClick={() => openTemplate(template)}
              className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-sky-300 hover:bg-sky-50"
            >
              <h4 className="font-semibold text-slate-900">{template.name}</h4>
              <p className="mt-1 text-sm text-slate-600">{template.description}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-sky-700">
                {prettifyCategory(template.category)}
              </p>
            </button>
          ))}
        </div>
      </div>

      {showGenerateModal && (
        <GenerateReportModal
          formData={formData}
          isSubmitting={isSubmitting}
          onClose={() => setShowGenerateModal(false)}
          onChange={setFormData}
          onSubmit={createReport}
        />
      )}

      {previewData !== null && (
        <PreviewModal
          reportName={previewReportName}
          previewData={previewData}
          onClose={() => {
            setPreviewData(null);
            setPreviewReportName("");
          }}
        />
      )}
    </div>
  );
}
