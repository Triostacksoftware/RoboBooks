"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "@/lib/api";
import {
  ArrowPathIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeIcon,
  ReceiptPercentIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type ActiveTab = "recurringBills" | "bills" | "invoices" | "payments";

interface RecurringBill {
  _id: string;
  name: string;
  vendorName: string;
  vendorEmail?: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  amount: number;
  currency: string;
  nextDueDate: string;
  status: "active" | "inactive" | "paused";
  description?: string;
  lastCreated?: string;
}

interface BillItem {
  itemId: string;
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  taxAmount?: number;
}

interface Bill {
  _id: string;
  billNumber: string;
  vendorName: string;
  vendorEmail?: string;
  billDate: string;
  dueDate: string;
  status: "draft" | "sent" | "received" | "overdue" | "paid" | "cancelled";
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  notes?: string;
  paidAt?: string;
  items: BillItem[];
}

interface InvoiceItem {
  details: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail?: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  amountPaid: number;
  balanceDue: number;
  status:
    | "Draft"
    | "Sent"
    | "Viewed"
    | "Unpaid"
    | "Paid"
    | "Overdue"
    | "Partially Paid"
    | "Cancelled"
    | "Void";
  items: InvoiceItem[];
}

interface Payment {
  _id: string;
  paymentNumber: string;
  vendorName: string;
  paymentDate: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  reference?: string;
  billIds?: Array<{
    _id: string;
    billNumber: string;
    totalAmount: number;
    status: string;
  }>;
}

interface BillingStats {
  monthlyRevenue: number;
  activeRecurringBills: number;
  paidInvoices: number;
  overdueInvoices: number;
  totalBills: number;
  completedPayments: number;
}

interface BillingData {
  recurringBills: RecurringBill[];
  bills: Bill[];
  invoices: Invoice[];
  payments: Payment[];
  stats: BillingStats;
}

interface BillingResponse {
  success: boolean;
  billingData: BillingData;
}

interface DetailResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

type DetailState =
  | { type: "bill"; data: Bill }
  | { type: "invoice"; data: Invoice }
  | { type: "payment"; data: Payment }
  | null;

const emptyData: BillingData = {
  recurringBills: [],
  bills: [],
  invoices: [],
  payments: [],
  stats: {
    monthlyRevenue: 0,
    activeRecurringBills: 0,
    paidInvoices: 0,
    overdueInvoices: 0,
    totalBills: 0,
    completedPayments: 0,
  },
};

export default function AdminBillingPage() {
  const [billingData, setBillingData] = useState<BillingData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("recurringBills");
  const [detail, setDetail] = useState<DetailState>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const tabs = useMemo(
    () => [
      { id: "recurringBills" as const, name: "Recurring Bills", count: billingData.recurringBills.length },
      { id: "bills" as const, name: "Bills", count: billingData.bills.length },
      { id: "invoices" as const, name: "Invoices", count: billingData.invoices.length },
      { id: "payments" as const, name: "Payments", count: billingData.payments.length },
    ],
    [billingData]
  );

  useEffect(() => {
    void fetchBillingData();
  }, []);

  const fetchBillingData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");
      const response = await api<BillingResponse>("/api/admin/billing");
      if (!response.success) {
        throw new Error("Failed to load billing data");
      }
      setBillingData(response.billingData);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load billing data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const openBill = async (id: string) => {
    try {
      setBusyKey(`bill-view-${id}`);
      const response = await api<DetailResponse<Bill>>(`/api/admin/billing/bills/${id}`);
      setDetail({ type: "bill", data: response.data });
    } catch (viewError) {
      setError(viewError instanceof Error ? viewError.message : "Failed to load bill details");
    } finally {
      setBusyKey(null);
    }
  };

  const openInvoice = async (id: string) => {
    try {
      setBusyKey(`invoice-view-${id}`);
      const response = await api<DetailResponse<Invoice>>(`/api/admin/billing/invoices/${id}`);
      setDetail({ type: "invoice", data: response.data });
    } catch (viewError) {
      setError(viewError instanceof Error ? viewError.message : "Failed to load invoice details");
    } finally {
      setBusyKey(null);
    }
  };

  const openPayment = async (id: string) => {
    try {
      setBusyKey(`payment-view-${id}`);
      const response = await api<DetailResponse<Payment>>(`/api/admin/billing/payments/${id}`);
      setDetail({ type: "payment", data: response.data });
    } catch (viewError) {
      setError(viewError instanceof Error ? viewError.message : "Failed to load payment details");
    } finally {
      setBusyKey(null);
    }
  };

  const generateBill = async (id: string) => {
    try {
      setBusyKey(`generate-${id}`);
      setMessage("");
      await api<{ success: boolean; message: string }>(
        `/api/admin/billing/recurring-bills/${id}/create-bill`,
        { method: "POST" }
      );
      setMessage("Bill generated successfully.");
      setActiveTab("bills");
      await fetchBillingData(true);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Failed to generate bill");
    } finally {
      setBusyKey(null);
    }
  };

  const markBillPaid = async (id: string) => {
    try {
      setBusyKey(`bill-paid-${id}`);
      setMessage("");
      await api<{ success: boolean; message: string }>(`/api/admin/billing/bills/${id}/pay`, {
        method: "POST",
      });
      setMessage("Bill marked as paid.");
      await fetchBillingData(true);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Failed to update bill");
    } finally {
      setBusyKey(null);
    }
  };

  const markInvoicePaid = async (id: string) => {
    try {
      setBusyKey(`invoice-paid-${id}`);
      setMessage("");
      await api<{ success: boolean; message: string }>(
        `/api/admin/billing/invoices/${id}/mark-paid`,
        { method: "POST" }
      );
      setMessage("Invoice marked as paid.");
      await fetchBillingData(true);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Failed to update invoice");
    } finally {
      setBusyKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <p className="text-gray-600">Loading billing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
          <p className="mt-1 text-gray-600">
            Manage recurring bills, bill generation, invoices, and payment tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchBillingData(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowPathIcon className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {message ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BanknotesIcon className="h-6 w-6 text-white" />}
          iconClassName="bg-green-500"
          label="Monthly Revenue"
          value={formatCurrency(billingData.stats.monthlyRevenue)}
        />
        <StatCard
          icon={<ReceiptPercentIcon className="h-6 w-6 text-white" />}
          iconClassName="bg-blue-500"
          label="Active Recurring Bills"
          value={String(billingData.stats.activeRecurringBills)}
        />
        <StatCard
          icon={<DocumentTextIcon className="h-6 w-6 text-white" />}
          iconClassName="bg-purple-500"
          label="Paid Invoices"
          value={String(billingData.stats.paidInvoices)}
        />
        <StatCard
          icon={<XCircleIcon className="h-6 w-6 text-white" />}
          iconClassName="bg-red-500"
          label="Overdue Invoices"
          value={String(billingData.stats.overdueInvoices)}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap gap-6 px-6" aria-label="Billing tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <span>{tab.name}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-900">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "recurringBills" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {billingData.recurringBills.length === 0 ? (
                <EmptyState label="No recurring bills found." />
              ) : (
                billingData.recurringBills.map((bill) => (
                  <div key={bill._id} className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bill.name}</h3>
                        <p className="text-sm text-gray-600">{bill.vendorName}</p>
                        <p className="text-xs text-gray-500">
                          Next due: {formatDate(bill.nextDueDate)}
                        </p>
                        <p className="text-xs text-gray-500">Frequency: {capitalize(bill.frequency)}</p>
                        {bill.vendorEmail ? (
                          <p className="text-xs text-gray-500">{bill.vendorEmail}</p>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(bill.amount, bill.currency)}
                        </p>
                        <StatusBadge status={bill.status} />
                      </div>
                    </div>

                    {bill.description ? (
                      <p className="mt-4 text-sm text-gray-600">{bill.description}</p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void generateBill(bill._id)}
                        disabled={busyKey === `generate-${bill._id}` || bill.status !== "active"}
                        className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <DocumentTextIcon className="h-4 w-4" />
                        <span>
                          {busyKey === `generate-${bill._id}` ? "Generating..." : "Generate Bill"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {activeTab === "bills" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {billingData.bills.length === 0 ? (
                <EmptyState label="No bills found." />
              ) : (
                billingData.bills.map((bill) => (
                  <div key={bill._id} className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bill.vendorName}</h3>
                        <p className="text-sm text-gray-600">{bill.billNumber}</p>
                        <p className="text-xs text-gray-500">Bill date: {formatDate(bill.billDate)}</p>
                        <p className="text-xs text-gray-500">Due: {formatDate(bill.dueDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(bill.totalAmount, bill.currency)}
                        </p>
                        <StatusBadge status={bill.status} />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void openBill(bill._id)}
                        disabled={busyKey === `bill-view-${bill._id}`}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View Bill</span>
                      </button>
                      {bill.status !== "paid" && bill.status !== "cancelled" ? (
                        <button
                          type="button"
                          onClick={() => void markBillPaid(bill._id)}
                          disabled={busyKey === `bill-paid-${bill._id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-green-600 transition hover:bg-green-50"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>
                            {busyKey === `bill-paid-${bill._id}` ? "Updating..." : "Mark Paid"}
                          </span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {activeTab === "invoices" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {billingData.invoices.length === 0 ? (
                <EmptyState label="No invoices found." />
              ) : (
                billingData.invoices.map((invoice) => (
                  <div key={invoice._id} className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{invoice.customerName}</h3>
                        <p className="text-sm text-gray-600">{invoice.invoiceNumber}</p>
                        <p className="text-xs text-gray-500">
                          Invoice date: {formatDate(invoice.invoiceDate)}
                        </p>
                        <p className="text-xs text-gray-500">Due: {formatDate(invoice.dueDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(invoice.total)}
                        </p>
                        <StatusBadge status={invoice.status} />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void openInvoice(invoice._id)}
                        disabled={busyKey === `invoice-view-${invoice._id}`}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View Invoice</span>
                      </button>
                      {invoice.status !== "Paid" && invoice.status !== "Cancelled" && invoice.status !== "Void" ? (
                        <button
                          type="button"
                          onClick={() => void markInvoicePaid(invoice._id)}
                          disabled={busyKey === `invoice-paid-${invoice._id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-green-600 transition hover:bg-green-50"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>
                            {busyKey === `invoice-paid-${invoice._id}` ? "Updating..." : "Mark Paid"}
                          </span>
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {activeTab === "payments" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {billingData.payments.length === 0 ? (
                <EmptyState label="No payments found." />
              ) : (
                billingData.payments.map((payment) => (
                  <div key={payment._id} className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{payment.vendorName}</h3>
                        <p className="text-sm text-gray-600">{payment.paymentNumber}</p>
                        <p className="text-xs text-gray-500">
                          Payment date: {formatDate(payment.paymentDate)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Method: {formatMethod(payment.paymentMethod)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </p>
                        <StatusBadge status={payment.status} />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void openPayment(payment._id)}
                        disabled={busyKey === `payment-view-${payment._id}`}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>View Payment</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}
        </div>
      </div>

      {detail ? (
        <DetailModal detail={detail} onClose={() => setDetail(null)} />
      ) : null}
    </div>
  );
}

function StatCard({
  icon,
  iconClassName,
  label,
  value,
}: {
  icon: ReactNode;
  iconClassName: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${iconClassName}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
      {label}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const className =
    normalized === "paid" || normalized === "completed" || normalized === "active"
      ? "bg-green-100 text-green-800"
      : normalized === "overdue" || normalized === "failed" || normalized === "cancelled"
      ? "bg-red-100 text-red-800"
      : normalized === "paused"
      ? "bg-orange-100 text-orange-800"
      : "bg-yellow-100 text-yellow-800";

  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>{status}</span>;
}

function DetailModal({
  detail,
  onClose,
}: {
  detail: DetailState;
  onClose: () => void;
}) {
  if (!detail) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {detail.type === "bill"
                ? `Bill ${detail.data.billNumber}`
                : detail.type === "invoice"
                ? `Invoice ${detail.data.invoiceNumber}`
                : `Payment ${detail.data.paymentNumber}`}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed view for the selected billing record.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          {detail.type === "bill" ? <BillDetailView bill={detail.data} /> : null}
          {detail.type === "invoice" ? <InvoiceDetailView invoice={detail.data} /> : null}
          {detail.type === "payment" ? <PaymentDetailView payment={detail.data} /> : null}
        </div>
      </div>
    </div>
  );
}

function BillDetailView({ bill }: { bill: Bill }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard label="Vendor" value={bill.vendorName} />
        <InfoCard label="Status" value={bill.status} />
        <InfoCard label="Bill Date" value={formatDate(bill.billDate)} icon={<CalendarDaysIcon className="h-4 w-4" />} />
        <InfoCard label="Due Date" value={formatDate(bill.dueDate)} icon={<ClockIcon className="h-4 w-4" />} />
        <InfoCard label="Subtotal" value={formatCurrency(bill.subtotal, bill.currency)} />
        <InfoCard label="Tax Amount" value={formatCurrency(bill.taxAmount, bill.currency)} />
        <InfoCard label="Total Amount" value={formatCurrency(bill.totalAmount, bill.currency)} />
        <InfoCard label="Paid At" value={bill.paidAt ? formatDate(bill.paidAt) : "Not paid yet"} />
      </div>

      {bill.notes ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">Notes</p>
          <p className="mt-2 text-sm text-gray-600">{bill.notes}</p>
        </div>
      ) : null}

      <LineItemsTable
        title="Bill Items"
        rows={bill.items.map((item) => ({
          title: item.itemName,
          subtitle: item.description || `${item.quantity} x ${formatCurrency(item.unitPrice, bill.currency)}`,
          amount: formatCurrency(item.totalPrice, bill.currency),
        }))}
      />
    </>
  );
}

function InvoiceDetailView({ invoice }: { invoice: Invoice }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard label="Customer" value={invoice.customerName} />
        <InfoCard label="Status" value={invoice.status} />
        <InfoCard
          label="Invoice Date"
          value={formatDate(invoice.invoiceDate)}
          icon={<CalendarDaysIcon className="h-4 w-4" />}
        />
        <InfoCard label="Due Date" value={formatDate(invoice.dueDate)} icon={<ClockIcon className="h-4 w-4" />} />
        <InfoCard label="Total" value={formatCurrency(invoice.total)} />
        <InfoCard label="Amount Paid" value={formatCurrency(invoice.amountPaid)} />
        <InfoCard label="Balance Due" value={formatCurrency(invoice.balanceDue)} />
        <InfoCard label="Email" value={invoice.customerEmail || "Not available"} />
      </div>

      <LineItemsTable
        title="Invoice Items"
        rows={invoice.items.map((item) => ({
          title: item.details,
          subtitle: item.description || `${item.quantity} x ${formatCurrency(item.rate)}`,
          amount: formatCurrency(item.amount),
        }))}
      />
    </>
  );
}

function PaymentDetailView({ payment }: { payment: Payment }) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard label="Vendor" value={payment.vendorName} />
        <InfoCard label="Status" value={payment.status} />
        <InfoCard
          label="Payment Date"
          value={formatDate(payment.paymentDate)}
          icon={<CalendarDaysIcon className="h-4 w-4" />}
        />
        <InfoCard
          label="Method"
          value={formatMethod(payment.paymentMethod)}
          icon={<CreditCardIcon className="h-4 w-4" />}
        />
        <InfoCard label="Amount" value={formatCurrency(payment.amount, payment.currency)} />
        <InfoCard label="Reference" value={payment.reference || "Not available"} />
      </div>

      <LineItemsTable
        title="Linked Bills"
        rows={(payment.billIds || []).map((bill) => ({
          title: bill.billNumber,
          subtitle: bill.status,
          amount: formatCurrency(bill.totalAmount, payment.currency),
        }))}
        emptyLabel="No linked bills found."
      />
    </>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function LineItemsTable({
  title,
  rows,
  emptyLabel = "No items found.",
}: {
  title: string;
  rows: Array<{ title: string; subtitle: string; amount: string }>;
  emptyLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200">
      <div className="border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-4 text-sm text-gray-500">{emptyLabel}</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <div key={`${row.title}-${index}`} className="flex items-start justify-between gap-4 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{row.title}</p>
                <p className="mt-1 text-sm text-gray-500">{row.subtitle}</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{row.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatCurrency(amount: number, _currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatMethod(method: string) {
  return method
    .split("_")
    .map(capitalize)
    .join(" ");
}
