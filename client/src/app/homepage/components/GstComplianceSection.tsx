'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowLeftRight,
  BarChart3,
  FileDigit,
  FileSpreadsheet,
  Landmark,
  ReceiptText,
  ScrollText,
} from 'lucide-react';
import { gstTools } from '../../gst-tools/toolData';

type ComplianceKey = (typeof gstTools)[number]['key'];

const iconMap = {
  gstr: FileSpreadsheet,
  einvoice: FileDigit,
  eway: ReceiptText,
  tally: ScrollText,
  bank: Landmark,
  data: ArrowLeftRight,
  reporting: BarChart3,
} satisfies Record<ComplianceKey, ComponentType<{ size?: number; className?: string }>>;

const items = gstTools.map((tool) => ({
  ...tool,
  icon: iconMap[tool.key as ComplianceKey],
}));

export default function GstComplianceSection() {
  const [active, setActive] = useState<ComplianceKey>('gstr');
  const current = items.find((item) => item.key === active) ?? items[0];

  return (
    <section id="gst-compliance" className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-16 h-56 w-56 rounded-full bg-[#6558df]/8 blur-3xl" />
        <div className="absolute right-[12%] bottom-8 h-64 w-64 rounded-full bg-[#0aa6c9]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
            GST Compliance
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl lg:text-6xl">
            Experience effortless GST compliance with RoboBooks invoicing software
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
          <div className="space-y-5">
            {items.map(({ key, label, icon: Icon }) => {
              const isActive = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActive(key)}
                  className={`flex w-full items-center gap-6 rounded-[26px] border px-6 py-6 text-left transition ${
                    isActive
                      ? 'border-[#dcd9ff] bg-[#f3f0ff] text-[#4f46e5] shadow-[0_16px_40px_rgba(79,70,229,0.08)]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-[#d6e6f2] hover:bg-[#fbfdff]'
                  }`}
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                      isActive
                        ? 'border-[#dcd9ff] bg-white text-[#4f46e5]'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    <Icon size={24} />
                  </span>
                  <span className="flex-1 text-[20px] font-medium">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#dbe5ef] bg-[#f5f7fb] shadow-[0_24px_70px_rgba(15,35,68,0.08)]">
            <div className="grid min-h-[640px] grid-rows-[1fr_auto]">
              <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
                <CompliancePreview current={current} />
              </div>

              <div className="border-t border-slate-200 bg-white px-6 py-6 sm:px-8 lg:px-10">
                <p className="max-w-5xl text-lg leading-8 text-slate-700">
                  {current.description}
                </p>
                <Link
                  href={`/gst-tools/${current.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-lg font-semibold text-[#4a90ff]"
                >
                  Explore GST tools
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompliancePreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  if (current.key === 'gstr') return <SalesOrdersPreview current={current} />;
  if (current.key === 'einvoice') return <InvoicesPreview current={current} />;
  if (current.key === 'eway') return <DeliveryChallanPreview current={current} />;
  if (current.key === 'tally') return <CreditNotesPreview current={current} />;
  if (current.key === 'data') return <DataImportExportPreview current={current} />;
  if (current.key === 'reporting') return <FinancialReportingPreview current={current} />;
  return <BankReconciliationPreview current={current} />;
}

function PreviewShell({
  current,
  children,
}: {
  current: (typeof items)[number];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#d6e2ee] bg-white shadow-[0_20px_55px_rgba(15,35,68,0.08)]">
      <div className="flex items-center justify-between bg-[#1f2b40] px-5 py-4 text-white">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-[#2563eb] px-3 py-2 text-sm font-semibold">RoboBooks</div>
          <div className="hidden rounded-full bg-white/8 px-4 py-2 text-sm text-slate-200 md:block">
            Search in Customers
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-xl bg-[#2e3c57] px-3 py-2 text-sm text-slate-200 sm:block">
            {current.badge}
          </div>
          <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold">+ New</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function FinanceSidebar({ activeItem }: { activeItem: string }) {
  return (
    <div className="border-r border-[#e2e8f0] bg-white px-4 py-5">
      <p className="text-2xl font-semibold text-[#0f172a]">Books</p>
      <div className="mt-6 space-y-2 text-[15px] text-slate-700">
        {['Home', 'Items', 'Banking'].map((entry) => (
          <div key={entry} className="rounded-xl px-4 py-3">
            {entry}
          </div>
        ))}
        <div className="rounded-xl bg-[#eaf1ff] px-4 py-3 font-medium text-[#2563eb]">
          Finance
        </div>
        <div className="space-y-2 pl-5 text-slate-600">
          {['Bank Reconciliation', 'Import Data', 'Export Data', 'Reports', 'Profit & Loss', 'Balance Sheet'].map((entry) => (
            <div
              key={entry}
              className={`rounded-lg px-4 py-2 ${
                entry === activeItem ? 'bg-[#eef4ff] font-medium text-[#2563eb]' : ''
              }`}
            >
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesSidebar({ activeItem }: { activeItem: string }) {
  return (
    <div className="border-r border-[#e2e8f0] bg-white px-4 py-5">
      <p className="text-2xl font-semibold text-[#0f172a]">Books</p>
      <div className="mt-6 space-y-2 text-[15px] text-slate-700">
        {['Home', 'Items', 'Banking'].map((entry) => (
          <div key={entry} className="rounded-xl px-4 py-3">
            {entry}
          </div>
        ))}
        <div className="rounded-xl bg-[#eaf1ff] px-4 py-3 font-medium text-[#2563eb]">
          Sales
        </div>
        <div className="space-y-2 pl-5 text-slate-600">
          {['Customers', 'Quotes', 'Sales Orders', 'Delivery Challans', 'Invoices', 'Credit Notes'].map((entry) => (
            <div
              key={entry}
              className={`rounded-lg px-4 py-2 ${
                entry === activeItem ? 'bg-[#eef4ff] font-medium text-[#2563eb]' : ''
              }`}
            >
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SalesOrdersPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <SalesSidebar activeItem="Sales Orders" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-[#d7e3ef] px-4 py-2 text-sm text-slate-600">
                  Back
                </button>
                <h3 className="text-[22px] font-bold text-[#0f172a]">All Sales Orders</h3>
              </div>
              <p className="text-sm text-slate-500">2 of 2 sales orders</p>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search sales orders...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  All Status
                </div>
              </div>
            </div>
            <div className="overflow-hidden px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1fr_0.9fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Sales Order</span>
                  <span>Customer</span>
                  <span>Order Date</span>
                  <span>Delivery Date</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {[
                  ['INV-000005', 'suraj jha', '15 Oct 2025', '14 Nov 2025', 'Rs 5,900.00', 'Sent'],
                  ['INV-0091', 'Nitin jha', '1 Sept 2025', '5 Oct 2025', 'Rs 35,400.00', 'Sent'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1fr_0.9fr] items-center border-t border-[#e2e8f0] px-4 py-4 text-sm text-slate-600"
                  >
                    <span className="font-semibold text-[#2563eb]">{row[0]}</span>
                    <span>
                      <span className="block font-medium text-slate-800">{row[1]}</span>
                      <span className="block text-slate-500">{row[1].replace(' ', '')}@gmail.com</span>
                    </span>
                    <span>{row[2]}</span>
                    <span>{row[3]}</span>
                    <span className="font-semibold text-slate-800">{row[4]}</span>
                    <span>
                      <span className="rounded-full bg-[#e7f0ff] px-3 py-1 text-xs font-semibold text-[#2563eb]">
                        {row[5]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function DeliveryChallanPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <SalesSidebar activeItem="Delivery Challans" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="border-b border-[#e2e8f0] px-5 py-5">
              <h3 className="text-[22px] font-bold text-[#0f172a]">Delivery Challans</h3>
              <p className="mt-1 text-slate-500">Manage and track delivery of goods</p>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search by DC#, customer, reference...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  Filters
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
                  <div className="text-xl font-semibold text-[#0f172a]">All Delivery Challans</div>
                  <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white">+ New</div>
                </div>
                <div className="grid grid-cols-[1fr_1.2fr_0.8fr_2.3fr_0.8fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Date</span>
                  <span>Delivery Challan #</span>
                  <span>Reference No.</span>
                  <span>Customer Name</span>
                  <span>Status</span>
                </div>
                <div className="grid grid-cols-[1fr_1.2fr_0.8fr_2.3fr_0.8fr] items-center border-t border-[#e2e8f0] px-4 py-5 text-sm text-slate-600">
                  <span>13/09/2025</span>
                  <span className="font-semibold text-[#2563eb]">DC-2025-0001</span>
                  <span>02</span>
                  <span className="text-slate-800">Chetak House, Old Delhi Gurgaon Road, Kapashera</span>
                  <span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Draft
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function InvoicesPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <SalesSidebar activeItem="Invoices" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-[#d7e3ef] px-4 py-2 text-sm text-slate-600">
                  Back
                </button>
                <h3 className="text-[22px] font-bold text-[#0f172a]">All Invoices</h3>
              </div>
              <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white">+ New</div>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search invoices...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  All Status
                </div>
              </div>
            </div>
            <div className="overflow-hidden px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="grid grid-cols-[1.1fr_1.6fr_1fr_1fr_1fr_0.9fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Invoice</span>
                  <span>Customer</span>
                  <span>Date</span>
                  <span>Due Date</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {[
                  ['INV-000003', 'sachin kumar', '18 Sep 2025', '18 Oct 2025', 'Rs 35,400.00', 'Overdue', 'bg-red-100 text-red-600'],
                  ['INV-0000002', 'Lakshay Kapoor', '18 Sep 2025', '2 Nov 2025', 'Rs 27,397.23', 'Sent', 'bg-blue-100 text-blue-600'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.1fr_1.6fr_1fr_1fr_1fr_0.9fr] items-center border-t border-[#e2e8f0] px-4 py-4 text-sm text-slate-600"
                  >
                    <span className="font-semibold text-[#2563eb]">{row[0]}</span>
                    <span>
                      <span className="block font-medium text-slate-800">{row[1]}</span>
                      <span className="block text-slate-500">{row[1].replace(' ', '')}@gmail.com</span>
                    </span>
                    <span>{row[2]}</span>
                    <span>{row[3]}</span>
                    <span className="font-semibold text-slate-800">{row[4]}</span>
                    <span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row[6]}`}>
                        {row[5]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function CreditNotesPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <SalesSidebar activeItem="Credit Notes" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-5">
              <div>
                <h3 className="text-[22px] font-bold text-[#0f172a]">Credit Notes</h3>
                <p className="mt-1 text-slate-500">Manage and track your credit notes</p>
              </div>
              <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white">
                + New Credit Note
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 border-b border-[#e2e8f0] px-5 py-5">
              {[
                ['Total Credit Notes', '3', 'text-blue-600'],
                ['Total Amount', 'Rs 7,500.00', 'text-emerald-600'],
                ['Paid Amount', 'Rs 1,800.00', 'text-green-600'],
                ['Pending Amount', 'Rs 5,700.00', 'text-orange-500'],
              ].map(([label, value, color]) => (
                <div key={label} className="rounded-[18px] border border-[#dbe4ef] p-4">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className={`mt-3 text-[18px] font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search credit notes...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  All Status
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  Export
                </div>
              </div>
            </div>
            <div className="overflow-hidden px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.9fr_0.9fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Credit Note</span>
                  <span>Customer</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Date</span>
                </div>
                {[
                  ['CN-2024-001', 'Acme Corporation', '$2,500', 'Sent', '15/01/2024'],
                  ['CN-2024-002', 'Tech Solutions Ltd', '$1,800', 'Paid', '10/01/2024'],
                  ['CN-2024-003', 'Global Industries', '$3,200', 'Draft', '20/01/2024'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.9fr_0.9fr] items-center border-t border-[#e2e8f0] px-4 py-4 text-sm text-slate-600"
                  >
                    <span>
                      <span className="block font-semibold text-slate-800">{row[0]}</span>
                      <span className="block text-slate-500">Credit note entry</span>
                    </span>
                    <span>{row[1]}</span>
                    <span className="font-semibold text-slate-800">{row[2]}</span>
                    <span>
                      <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#2563eb]">
                        {row[3]}
                      </span>
                    </span>
                    <span>{row[4]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function BankReconciliationPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <FinanceSidebar activeItem="Bank Reconciliation" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-[#d7e3ef] px-4 py-2 text-sm text-slate-600">
                  Back
                </button>
                <h3 className="text-[22px] font-bold text-[#0f172a]">Bank Reconciliation</h3>
              </div>
              <p className="text-sm text-slate-500">3 bank accounts connected</p>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search transaction, narration...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  Match Status
                </div>
              </div>
            </div>
            <div className="overflow-hidden px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1fr_0.9fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Date</span>
                  <span>Description</span>
                  <span>Reference</span>
                  <span>Bank</span>
                  <span>Amount</span>
                  <span>Match</span>
                </div>
                {[
                  ['15 Oct 2025', 'UPI collection from Suraj Jha', 'BNK-2034', 'HDFC Current', 'Rs 5,900.00', 'Matched'],
                  ['1 Sept 2025', 'Vendor payout to Tech Solutions', 'BNK-1982', 'ICICI Current', 'Rs 35,400.00', 'Review'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_1fr_0.9fr] items-center border-t border-[#e2e8f0] px-4 py-4 text-sm text-slate-600"
                  >
                    <span>{row[0]}</span>
                    <span className="font-medium text-slate-800">{row[1]}</span>
                    <span>{row[2]}</span>
                    <span>{row[3]}</span>
                    <span className="font-semibold text-slate-800">{row[4]}</span>
                    <span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        row[5] === 'Matched' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {row[5]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function DataImportExportPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <FinanceSidebar activeItem="Import Data" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="border-b border-[#e2e8f0] px-5 py-5">
              <h3 className="text-[22px] font-bold text-[#0f172a]">Import and Export Data</h3>
              <p className="mt-1 text-slate-500">Move records between RoboBooks and external systems</p>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search files, modules, templates...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  File Type
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
                  <div className="text-xl font-semibold text-[#0f172a]">Recent Import Export Jobs</div>
                  <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white">+ New Job</div>
                </div>
                <div className="grid grid-cols-[1fr_1.2fr_0.8fr_2.3fr_0.8fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Module</span>
                  <span>Template</span>
                  <span>Rows</span>
                  <span>Direction</span>
                  <span>Status</span>
                </div>
                {[
                  ['Invoices', 'GST Sales Template', '245', 'Export to Excel', 'Completed'],
                  ['Customers', 'Bulk Import CSV', '120', 'Import from CSV', 'Processing'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1fr_1.2fr_0.8fr_2.3fr_0.8fr] items-center border-t border-[#e2e8f0] px-4 py-5 text-sm text-slate-600"
                  >
                    <span className="font-medium text-slate-800">{row[0]}</span>
                    <span className="font-semibold text-[#2563eb]">{row[1]}</span>
                    <span>{row[2]}</span>
                    <span className="text-slate-800">{row[3]}</span>
                    <span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        row[4] === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {row[4]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function FinancialReportingPreview({
  current,
}: {
  current: (typeof items)[number];
}) {
  return (
    <PreviewShell current={current}>
      <div className="grid min-h-[470px] grid-cols-[220px_1fr] bg-[#f8fafc]">
        <FinanceSidebar activeItem="Reports" />
        <div className="p-5">
          <div className="rounded-[24px] border border-[#dbe4ef] bg-white">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex items-center gap-3">
                <button className="rounded-xl border border-[#d7e3ef] px-4 py-2 text-sm text-slate-600">
                  Back
                </button>
                <h3 className="text-[22px] font-bold text-[#0f172a]">Financial Reports</h3>
              </div>
              <div className="rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white">+ New Report</div>
            </div>
            <div className="border-b border-[#e2e8f0] px-5 py-4">
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-400">
                  Search reports...
                </div>
                <div className="rounded-xl border border-[#d7e3ef] px-4 py-3 text-slate-600">
                  This Quarter
                </div>
              </div>
            </div>
            <div className="overflow-hidden px-5 py-5">
              <div className="overflow-hidden rounded-[18px] border border-[#dbe4ef]">
                <div className="grid grid-cols-[1.1fr_1.6fr_1fr_1fr_1fr_0.9fr] bg-[#f8fafc] px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  <span>Report</span>
                  <span>Category</span>
                  <span>Period</span>
                  <span>Owner</span>
                  <span>Value</span>
                  <span>Status</span>
                </div>
                {[
                  ['Profit & Loss', 'Performance', 'Q2 FY25', 'Finance Team', 'Rs 4.2L', 'Ready', 'bg-emerald-100 text-emerald-600'],
                  ['Cash Flow', 'Liquidity', 'Q2 FY25', 'Accounts', 'Rs 1.1L', 'Live', 'bg-blue-100 text-blue-600'],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.1fr_1.6fr_1fr_1fr_1fr_0.9fr] items-center border-t border-[#e2e8f0] px-4 py-4 text-sm text-slate-600"
                  >
                    <span className="font-semibold text-[#2563eb]">{row[0]}</span>
                    <span>
                      <span className="block font-medium text-slate-800">{row[1]}</span>
                      <span className="block text-slate-500">{row[1].replace(' ', '')}@gmail.com</span>
                    </span>
                    <span>{row[2]}</span>
                    <span>{row[3]}</span>
                    <span className="font-semibold text-slate-800">{row[4]}</span>
                    <span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row[6]}`}>
                        {row[5]}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="rounded-[22px] border border-[#dbe4ef] bg-white px-6 py-5">
                <p className="text-center text-[20px] font-semibold text-[#0f172a]">
                  Reporting overview
                </p>
                <div className="mt-6 grid grid-cols-4 gap-3 text-center">
                  {[
                    ['Balance Sheet', 'bg-slate-100', 'text-slate-500'],
                    ['P&L', 'bg-blue-100', 'text-blue-600'],
                    ['Cash Flow', 'bg-yellow-100', 'text-yellow-600'],
                    ['Tax Summary', 'bg-emerald-100', 'text-emerald-600'],
                  ].map(([label, bg, color]) => (
                    <div key={label} className="flex flex-col items-center">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} ${color}`}>
                        <current.icon size={24} />
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}
