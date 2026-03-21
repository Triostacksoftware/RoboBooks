'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Palette,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';

type TabKey = 'thermal' | 'a4' | 'a5';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'thermal', label: 'Thermal Prints' },
  { key: 'a4', label: 'A4 Prints' },
  { key: 'a5', label: 'A5 Prints' },
];

const invoicePreviewData = {
  stylish: {
    businessName: 'SK Trading Company',
    address: '14 Main Bazaar, Rajendra Nagar, Indore, Madhya Pradesh',
    phone: '+91 81736 49520',
    gstin: '24GFHJI9012H1Z3',
    invoiceNo: 'SRM/25-26/336',
    invoiceDate: '11/03/2026',
    dueDate: '26/03/2026',
    billToName: 'Agarwal Distributors',
    billToAddress: 'Plot 15, Industrial Area, Surat, Gujarat, 395006',
    shipToName: 'Agarwal Distributors',
    shipToAddress: 'Surat Warehouse, Gujarat, 395006',
    items: [
      ['Dabur Red Label', '9023000', '6 GMS', '157.14', '990'],
      ['Colgate Toothpaste', '33061020', '7 PCS', '122.88', '1,015'],
    ],
    subtotal: '2,830.15',
    cgst: '154.53',
    sgst: '154.53',
    grandTotal: '3,715',
    bank: 'State Bank of India 342322443576423',
  },
  professional: {
    businessName: 'Parshwanath Medicare',
    address: '9876 Dream Avenue, Whitefield, Bengaluru, Karnataka',
    phone: '+91 98765 43123',
    gstin: '27ABCPM4501K1Z8',
    invoiceNo: 'DP/SL/23-24/731',
    invoiceDate: '11/03/2026 1:11 PM',
    dueDate: '10/04/2026',
    billToName: 'Bill To',
    billToAddress: 'Agarwal Distributors, Plot 15, Industrial Area, Surat, Gujarat',
    shipToName: 'Ship To',
    shipToAddress: 'Parshwanath Store, Whitefield, Bengaluru, Karnataka',
    items: [
      ['Combiflam', '4010', '25 STRP', '8.78', '206'],
      ['Crocin', '4010', '5 STRP', '43.26', '216.3'],
    ],
    subtotal: '566.5',
    cgst: '16.5',
    sgst: '16.5',
    grandTotal: '566.5',
    bank: 'ICICI Bank 36070150481',
  },
};

function SectionIntro() {
  return (
    <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
          Invoice Themes
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
          Your bill, your brand and more with RoboBooks
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Fully customizable GST and non-GST invoices with multiple invoice print
          options. Personalize every RoboBooks invoice so it reflects your brand
          clearly across thermal, A4, and A5 formats.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:w-[640px] xl:translate-y-10">
        {[
          {
            icon: ReceiptText,
            title: 'Print-ready',
            body: 'Designed to feel like real client-facing invoices, not placeholder mockups.',
          },
          {
            icon: ShieldCheck,
            title: 'GST-ready',
            body: 'Important fields, totals, and tax summaries stay visible and believable.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="min-h-[280px] rounded-[30px] border border-[#d7e6f2] bg-white/90 p-7 shadow-[0_18px_40px_rgba(15,35,68,0.07)] backdrop-blur"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#ebfaff] text-[#0aa6c9]">
              <Icon size={24} />
            </span>
            <p className="mt-5 text-[28px] font-semibold leading-tight text-[#0f2344]">{title}</p>
            <p className="mt-3 text-base leading-8 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) {
  return (
    <div className="mt-10 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#d8e2ec] bg-white p-2 shadow-[0_14px_32px_rgba(15,35,68,0.06)]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveTab(tab.key)}
          className={`rounded-full px-7 py-3.5 text-lg font-semibold transition ${
            activeTab === tab.key
              ? 'bg-[#0aa6c9] text-white shadow-[0_12px_25px_rgba(10,166,201,0.26)]'
              : 'text-[#0f2344] hover:bg-[#f5f8fc]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ThermalReceipt({
  className,
  widthLabel,
}: {
  className?: string;
  widthLabel: string;
}) {
  return (
    <div className={className}>
      <div className="relative rounded-md border border-[#d7e6f1] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbfe_100%)] p-4 shadow-[0_22px_55px_rgba(15,35,68,0.12)]">
        <div className="font-mono text-[12px] leading-6 text-[#47627f] sm:text-[14px]">
          <p className="text-[18px] font-bold text-[#0f2344]">Sharma store</p>
          <p>Rama Nagar, Mumbai</p>
          <p>Mobile : 9876543210</p>
          <p>Invoice No. : 530</p>
          <p>Date : 20-12-2020</p>
          <p>Bill To : Mahesh Kumar</p>
          <div className="my-3 border-t border-dashed border-[#b8d9e7]" />
          <div className="grid grid-cols-4 gap-3 text-right font-semibold">
            <span className="col-span-1 text-left">Item</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
          </div>
          <div className="my-2 border-t border-dashed border-[#b8d9e7]" />
          {[
            ['Rajma', '1.0', '78', '78'],
            ['Sugar', '1.0', '35', '35'],
            ['Fortune Oil', '1.0', '110', '101'],
            ['Chana daal', '1.0', '68', '68'],
            ['Tata tea 250 gms', '1.0', '210', '199'],
          ].map(([item, qty, rate, amount]) => (
            <div key={item} className="grid grid-cols-4 gap-3 py-1 text-right">
              <span className="col-span-1 text-left">{item}</span>
              <span>{qty}</span>
              <span>{rate}</span>
              <span>{amount}</span>
            </div>
          ))}
          <div className="my-3 border-t border-dashed border-[#b8d9e7]" />
          <div className="space-y-1 text-right">
            <p>Packing Charge 25.0</p>
            <p>Home Delivery 30.0</p>
            <p>Round Off -19</p>
            <p className="text-base font-bold text-[#0f2344]">Total 517</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[-56px] rounded-r-md border border-[#d7e6f1] bg-white px-4 py-8 text-[18px] text-[#0f2344] shadow-[0_10px_25px_rgba(15,35,68,0.08)] [writing-mode:vertical-rl]">
        {widthLabel}
      </div>
    </div>
  );
}

function ThermalView() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[36px] border border-[#dce8f3] bg-[radial-gradient(circle_at_top,_rgba(10,166,201,0.08),_transparent_32%),linear-gradient(180deg,#fbfdff_0%,#eef5fb_100%)] px-6 pb-16 pt-10 shadow-[0_18px_50px_rgba(15,35,68,0.08)] lg:px-12">
      <div className="absolute left-[-10px] bottom-0 h-36 w-36 rounded-tr-[70px] bg-[#dbeaf2]/90 blur-[1px]" />
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-tl-[90px] bg-[#dbeaf2]/90 blur-[1px]" />

      <div className="relative flex min-h-[650px] items-end justify-center">
        <ThermalReceipt
          widthLabel="2 inch"
          className="absolute bottom-4 left-[18%] z-10 w-[260px] rotate-[-1deg] sm:w-[320px] lg:w-[400px]"
        />
        <ThermalReceipt
          widthLabel="3 inch"
          className="absolute bottom-0 left-1/2 z-20 w-[300px] -translate-x-1/2 sm:w-[380px] lg:w-[470px]"
        />
        <div className="absolute left-0 bottom-0 hidden h-48 w-48 rounded-tr-[32px] bg-[#cddfea] lg:block" />
        <div className="absolute right-0 bottom-0 hidden h-52 w-52 rounded-tl-[36px] bg-[#cddfea] lg:block" />
      </div>
    </div>
  );
}

function InvoiceQr() {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-[4px] border border-[#d7e8f1] bg-white p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]">
      <Image
        src="/images/payment-qr.png"
        alt="Payment QR code"
        fill
        className="object-contain p-[3px]"
        sizes="64px"
      />
    </div>
  );
}

function A4Card({
  title,
  accent,
  variant,
}: {
  title: string;
  accent: string;
  variant: 'stylish' | 'professional' | 'custom';
}) {
  const isCustom = variant === 'custom';
  const preview =
    variant === 'stylish'
      ? invoicePreviewData.stylish
      : variant === 'professional'
        ? invoicePreviewData.professional
        : null;
  const isStylish = variant === 'stylish';
  const isProfessional = variant === 'professional';
  const accentTint = `${accent}14`;

  if (isStylish && preview) {
    return (
      <div className="min-w-[420px] rounded-[18px] border border-[#dbe4ec] bg-white p-4 shadow-[0_16px_42px_rgba(15,35,68,0.08)]">
        <div className="relative overflow-hidden rounded-[12px] border border-[#d6e5f1] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-6">
          <div className="pointer-events-none absolute inset-4 rounded-[10px] border border-[#9fd9ea]/45" />
          <div className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l border-t border-[#0aa6c9]/60" />
          <div className="pointer-events-none absolute right-6 top-6 h-6 w-6 border-r border-t border-[#0aa6c9]/60" />
          <div className="pointer-events-none absolute left-6 bottom-6 h-6 w-6 border-l border-b border-[#0aa6c9]/60" />
          <div className="pointer-events-none absolute right-6 bottom-6 h-6 w-6 border-r border-b border-[#0aa6c9]/60" />
          <div className="pointer-events-none absolute right-6 top-8 h-20 w-20 rounded-full bg-[#0aa6c9]/10 blur-2xl" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="pt-10 text-[#87cfe0]">
                <ReceiptText size={44} strokeWidth={1.4} />
                <p className="mt-3 text-[12px] font-semibold tracking-[0.04em] text-[#70b8ca]">shreeram mart</p>
              </div>
              <div className="max-w-[62%] text-right">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#0f2344]">
                  Tax Invoice
                </p>
                <h3 className="mt-8 text-[28px] font-semibold leading-tight text-[#0f2344]">
                  {preview.businessName}
                </h3>
                <div className="mt-3 space-y-1 text-[11px] leading-5 text-[#47627f]">
                  <p>PAN No. AABCV5349</p>
                  <p>Mobile: 8173649520</p>
                  <p>{preview.address}, 452012</p>
                  <p>Website: https://invoice.robo</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-0 border-y border-[#d8e8f2] text-[10px] text-[#47627f]">
              {[
                ['Invoice No.', preview.invoiceNo],
                ['Invoice Date', preview.invoiceDate],
                ['Due Date', preview.dueDate],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-[#d8e8f2] px-3 py-2 last:border-r-0">
                  <p className="font-semibold uppercase tracking-[0.12em]">{label}</p>
                  <p className="mt-1 text-[11px] text-[#0f2344]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#47627f]">Bill To</p>
                <p className="mt-2 text-[15px] font-semibold text-[#0f2344]">{preview.billToName}</p>
                <p className="mt-1 text-[11px] leading-5 text-[#47627f]">{preview.billToAddress}</p>
                <p className="mt-1 text-[11px] text-[#47627f]">GSTIN {preview.gstin}</p>
              </div>
              <div className="text-right text-[11px] leading-5 text-[#47627f]">
                <p>Store Unit: https://robo/invoice</p>
                <p>Sub Company: Annapurna Catering</p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[6px] border border-[#cfe4ef]">
              <div className="grid grid-cols-[0.5fr_2fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr] bg-[#0f2344] px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                <span>No</span>
                <span>Items</span>
                <span>HSN</span>
                <span>Qty.</span>
                <span>MRP</span>
                <span>Tax</span>
                <span className="text-right">Total</span>
              </div>
              {[
                ['1', 'Brooke Bond Red Label', '9023000', '6 GMS', '180', '47.14', '990'],
                ['2', 'Colgate Toothpaste', '33061020', '7 PCS', '160', '154.83', '1,015'],
                ['3', 'Dabur Chyawanprash', '21069090', '6 GMS', '310', '81.43', '1,710'],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[0.5fr_2fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr] border-t border-[#e2edf4] px-2 py-2 text-[9px] text-[#47627f] even:bg-[#f7fbfe]"
                >
                  {row.map((cell, index) => (
                    <span key={index} className={index === row.length - 1 ? 'text-right font-semibold text-[#0f2344]' : ''}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
              <div className="grid grid-cols-[0.5fr_2fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr] border-t border-[#cfe4ef] bg-[#e9f8fc] px-2 py-2 text-[9px] font-semibold uppercase text-[#0f2344]">
                <span />
                <span>Subtotal</span>
                <span className="col-span-4" />
                <span className="text-right">3,715</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1.15fr_0.85fr] gap-6 text-[10px] text-[#6b7280]">
              <div className="space-y-2 leading-5">
                <p className="font-semibold uppercase tracking-[0.16em] text-[#0f2344]">Terms & Conditions</p>
                <p>Payment is due at the time of purchase. Goods once sold will not be returned.</p>
                <p>Taxes applicable as per government regulations.</p>
                <p className="mt-4 font-semibold uppercase tracking-[0.16em] text-[#0f2344]">Bank Details</p>
                <p>State Bank of India / A/c 342322443576423</p>
              </div>
              <div className="space-y-1 text-right">
                {[
                  ['Taxable Amount', '3,406.46'],
                  ['CGST 9%', '154.53'],
                  ['SGST 9%', '154.53'],
                  ['Total Amount', '3,715'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span>{label}</span>
                    <span className="font-semibold text-[#0f2344]">{value}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-end justify-between gap-4 pt-4">
                  <InvoiceQr />
                  <div className="text-right">
                    <div className="h-10 w-24 rounded border border-[#e5e7eb] bg-white" />
                    <p className="mt-1 text-[9px]">Signature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProfessional && preview) {
    return (
      <div className="min-w-[420px] rounded-[18px] border border-[#dbe4ec] bg-white p-4 shadow-[0_16px_42px_rgba(15,35,68,0.08)]">
        <div className="relative overflow-hidden rounded-[12px] border border-[#d4e6f1] bg-[linear-gradient(180deg,#ffffff_0%,#f5fbff_100%)] p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,166,201,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(15,35,68,0.04))]" />
          <div className="pointer-events-none absolute inset-x-6 top-[108px] h-[1px] bg-[#d7e8f1]" />
          <div className="pointer-events-none absolute inset-x-6 top-[206px] h-[1px] bg-[#d7e8f1]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_20%_100%,rgba(10,166,201,0.16),transparent_26%),radial-gradient(circle_at_55%_100%,rgba(15,35,68,0.10),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0),rgba(10,166,201,0.04))]" />

          <div className="relative">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0f2344]">
              <div className="flex items-center gap-2">
                <span>Tax Invoice</span>
                <span className="rounded bg-white/75 px-2 py-0.5 text-[9px] text-[#8b949e]">Original for recipient</span>
              </div>
              <span>Trusted Pharmacy Invoice</span>
            </div>

            <div className="mt-6 flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#bfe6f1] bg-[#ebfaff] text-[18px] font-semibold text-[#0aa6c9] shadow-sm">
                RX
              </div>
              <div className="flex-1">
                <h3 className="text-[27px] font-semibold leading-tight text-[#0f2344]">{preview.businessName}</h3>
                <div className="mt-2 grid gap-1 text-[10px] leading-5 text-[#47627f]">
                  <p>{preview.address}, 560102</p>
                  <p>PAN Number: FRTFA12345</p>
                  <p>Email: parshwa@gmail.com</p>
                  <p>Web Site: mybillbook.in</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-0 rounded-[4px] bg-[#e9f8fc] px-2 py-2 text-[10px] text-[#0f2344]">
              {[
                ['Invoice No.', preview.invoiceNo],
                ['Invoice Date', preview.invoiceDate],
                ['Due Date', preview.dueDate],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-[#cfe4ef] px-2 last:border-r-0">
                  <p className="font-semibold uppercase tracking-[0.08em]">{label}</p>
                  <p className="mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[1.05fr_0.95fr] gap-4 text-[10px] text-[#47627f]">
              <div>
                <p className="font-semibold uppercase tracking-[0.14em] text-[#0f2344]">Bill To</p>
                <p className="mt-2 font-semibold text-[#0f2344]">{preview.billToName}</p>
                <p className="mt-1">{preview.billToAddress}</p>
                <p>GSTIN: {preview.gstin}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold uppercase tracking-[0.14em] text-[#0f2344]">Ship To</p>
                <p className="mt-2 font-semibold text-[#0f2344]">{preview.shipToName}</p>
                <p className="mt-1">{preview.shipToAddress}</p>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-[6px] border border-[#cfe4ef] bg-white/80">
              <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.7fr_0.7fr_0.9fr] bg-[#0aa6c9] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                <span>Items</span>
                <span>HSN</span>
                <span>Batch</span>
                <span>Exp.</span>
                <span>MFG</span>
                <span>Qty.</span>
                <span>Rate</span>
                <span className="text-right">Amount</span>
              </div>
              {[
                ['Combiflam', '4010', 'BATCH #3', '09-04-2027', '07-04-2022', '25 STRP', '8.78', '206'],
                ['Crocin', '4010', 'BATCH #2', '08-04-2027', '27-07-2022', '5 STRP', '43.2', '216.3'],
                ['Dolo 650', '4010', 'BATCH #1', '07-04-2027', '27-07-2022', '7 STRP', '20.2', '144.2'],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.7fr_0.7fr_0.9fr] border-t border-[#e2edf4] px-3 py-2 text-[9px] text-[#47627f] even:bg-[#f7fbfe]"
                >
                  {row.map((cell, index) => (
                    <span key={index} className={index === row.length - 1 ? 'text-right font-semibold text-[#0f2344]' : ''}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
              <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.7fr_0.7fr_0.9fr] border-t border-[#cfe4ef] bg-[#e9f8fc] px-3 py-2 text-[9px] font-semibold uppercase text-[#0f2344]">
                <span>Subtotal</span>
                <span className="col-span-6" />
                <span className="text-right">{preview.grandTotal}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_0.9fr] gap-4 text-[10px] text-[#47627f]">
              <div className="space-y-2 leading-5">
                <p className="font-semibold uppercase tracking-[0.14em] text-[#0f2344]">Bank Details</p>
                <p>Name: Parminder</p>
                <p>IFSC Code: ICIC0003067</p>
                <p>Account No: 36070150481</p>
                <p className="pt-2 font-semibold uppercase tracking-[0.14em] text-[#0f2344]">Terms & Conditions</p>
                <p>Medicines once sold will not be taken back. Store in a cool and dry place.</p>
              </div>
              <div className="space-y-1 text-right">
                {[
                  ['Subtotal', preview.subtotal],
                  ['CGST', preview.cgst],
                  ['SGST', preview.sgst],
                  ['Total Amount', preview.grandTotal],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span>{label}</span>
                    <span className="font-semibold text-[#0f2344]">{value}</span>
                  </div>
                ))}
                <div className="mt-4 flex items-end justify-end gap-4">
                  <InvoiceQr />
                </div>
                <p className="text-[9px] leading-4">Five Hundred Sixty Six Rupees and Fifty Paise only.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[420px] rounded-[18px] border border-[#dbe4ec] bg-white p-4 shadow-[0_16px_42px_rgba(15,35,68,0.08)]">
      <div className="relative overflow-hidden rounded-[12px] border border-[#dce5ee] bg-[#fffefb] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(148,163,184,0.08),rgba(255,255,255,0))]" />
        <div className="relative">
          <>
            <div className="rounded-[22px] border border-[#d7e3ef] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-5 shadow-[0_10px_28px_rgba(15,35,68,0.04)]">
              <div className="flex items-center gap-4">
                <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[18px] border border-[#cfe3f5] bg-[#edf6ff] text-[#3196d9]">
                  <Palette size={28} />
                </div>
                <div>
                  <p className="text-[19px] font-semibold text-[#1f2937]">Business Name</p>
                  <p className="mt-1 text-[14px] leading-7 text-slate-500">
                    Business karne ka naya tareeka
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[18px] border border-[#d7e3ef] bg-white p-5 text-sm shadow-[0_8px_20px_rgba(15,35,68,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Bill To</p>
                <p className="mt-3 text-[16px] font-semibold text-slate-800">Sample Party</p>
                <p className="mt-1 text-[14px] leading-7 text-slate-500">No F2, Outer Circle, New Delhi</p>
              </div>
              <div className="rounded-[18px] border border-[#d7e3ef] bg-white p-5 text-sm shadow-[0_8px_20px_rgba(15,35,68,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Ship To</p>
                <p className="mt-3 text-[16px] font-semibold text-slate-800">Sample Party</p>
                <p className="mt-1 text-[14px] leading-7 text-slate-500">Bengaluru 560001</p>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-dashed border-[#97c9f0] bg-[linear-gradient(180deg,#fafdff_0%,#f0f8ff_100%)] px-5 py-12 text-center">
              <div className="mx-auto max-w-[310px] rounded-[24px] border border-[#d3e7f7] bg-white p-5 shadow-[0_8px_24px_rgba(64,169,255,0.10)]">
                <div className="grid grid-cols-[1.3fr_0.7fr] gap-3">
                  <div className="rounded-2xl bg-[#f3f8fc] p-3 text-left">
                    <div className="h-3 w-20 rounded-full bg-[#d9ecff]" />
                    <div className="mt-3 h-8 rounded-xl bg-[#edf6ff]" />
                    <div className="mt-3 h-16 rounded-xl bg-[#f7fbff]" />
                  </div>
                  <div className="rounded-2xl bg-[#edf6ff] p-3">
                    <div className="h-full rounded-xl bg-[#dff0ff]" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-xl bg-[#edf6ff]" />
                  <div className="h-10 rounded-xl bg-[#dff0ff]" />
                  <div className="h-10 rounded-xl bg-[#edf6ff]" />
                </div>
              </div>
              <p className="mt-6 text-[20px] font-semibold text-[#1f2937]">
                Customize your own Invoice
              </p>
              <p className="mx-auto mt-2 max-w-[340px] text-[14px] leading-7 text-slate-500">
                Item table columns, logo space, bank details, QR code, tax rows aur totals ko apne hisaab se set karo.
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

function A4View() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[34px] border border-[#dce8f3] bg-[radial-gradient(circle_at_top,_rgba(10,166,201,0.08),_transparent_26%),linear-gradient(180deg,#fbfdff_0%,#eef5fb_100%)] px-6 py-10 shadow-[0_18px_50px_rgba(15,35,68,0.08)] lg:px-10 lg:py-12">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 to-transparent" />
      <div className="absolute right-[-5rem] top-6 h-44 w-44 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute left-[-3rem] bottom-4 h-40 w-40 rounded-full bg-[#0f2344]/5 blur-3xl" />

      <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-6">
          <p className="text-[18px] font-medium text-[#0f2344] sm:text-[20px]">Special Themes</p>
          <div className="hidden h-6 w-px bg-[#dbe7f1] lg:block" />
          <div className="hidden items-center gap-2 rounded-full border border-[#d8e7f3] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f2344] lg:flex">
            <CheckCircle2 size={14} className="text-[#0aa6c9]" />
            Real invoice layouts
          </div>
        </div>

        <Link
          href="/register"
          className="inline-flex items-center gap-2 text-[16px] font-medium text-[#3290ff] transition hover:text-[#1d4ed8]"
        >
          Start Using Templates
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="relative overflow-x-auto pb-4">
        <div className="flex min-w-max gap-8">
        <A4Card title="SK Trading Company" accent="#8b1fd1" variant="stylish" />
        <A4Card title="Parshwanath Medicare" accent="#f59e0b" variant="professional" />
        <A4Card title="RoboBooks Custom" accent="#40b5ea" variant="custom" />
        </div>
      </div>
    </div>
  );
}

function A5Sheet({
  title,
  topRight,
}: {
  title: string;
  topRight: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#d7e6f1] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-5 shadow-[0_18px_45px_rgba(15,35,68,0.08)]">
      <div className="flex items-center justify-between border-b border-[#bfd9e7] pb-3">
        <div>
          <p className="text-xs font-semibold uppercase text-[#47627f]">Tax Invoice</p>
          <span className="mt-1 inline-block rounded border border-[#cfe4ef] px-2 py-0.5 text-[11px] font-semibold text-[#47627f]">
            ORIGINAL FOR RECIPIENT
          </span>
        </div>
        <p className="text-sm font-semibold text-[#0f2344]">{topRight}</p>
      </div>

      <div className="border-b border-[#bfd9e7] py-4 text-center">
        <h3 className="text-[18px] font-bold text-[#0f2344]">{title}</h3>
        <p className="text-sm text-[#47627f]">
          Prasad Salai, Block 9, Chennai, Tamil Nadu, 600006
        </p>
        <p className="text-sm text-[#47627f]">Mobile: 7777333333</p>
      </div>

      <div className="grid grid-cols-4 border-b border-[#bfd9e7] text-sm text-[#47627f]">
        <div className="border-r border-[#bfd9e7] p-3">
          <p className="font-semibold text-[#0f2344]">BILL TO</p>
          <p className="mt-1">SANAA SUPERMART</p>
        </div>
        <div className="border-r border-[#bfd9e7] p-3">
          <p className="font-semibold text-[#0f2344]">Invoice No.</p>
          <p className="mt-1">144</p>
        </div>
        <div className="border-r border-[#bfd9e7] p-3">
          <p className="font-semibold text-[#0f2344]">Invoice Date</p>
          <p className="mt-1">07/11/2023</p>
        </div>
        <div className="p-3">
          <p className="font-semibold text-[#0f2344]">Due Date</p>
          <p className="mt-1">07/12/2023</p>
        </div>
      </div>

      <div className="border-b border-[#bfd9e7]">
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] border-b border-[#bfd9e7] bg-[#0f2344] text-sm font-semibold text-white">
          <div className="border-r border-[#29466f] p-2 text-center">S.NO.</div>
          <div className="border-r border-[#29466f] p-2 text-center">ITEMS</div>
          <div className="border-r border-[#29466f] p-2 text-center">QTY.</div>
          <div className="p-2 text-center">AMOUNT</div>
        </div>
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] text-sm text-[#47627f]">
          <div className="border-r border-[#d7e6f1] p-2 text-center">1</div>
          <div className="border-r border-[#d7e6f1] p-2">Raju Namkeen-1</div>
          <div className="border-r border-[#d7e6f1] p-2 text-center">2 LAD</div>
          <div className="p-2 text-right font-medium text-[#0f2344]">4,480</div>
        </div>
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] border-t border-[#e2edf4] bg-[#f9fcff] text-sm text-[#47627f]">
          <div className="border-r border-[#d7e6f1] p-2 text-center">2</div>
          <div className="border-r border-[#d7e6f1] p-2">Plain Wafers 100G</div>
          <div className="border-r border-[#d7e6f1] p-2 text-center">10 PCS</div>
          <div className="p-2 text-right font-medium text-[#0f2344]">1,344</div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-[#bfd9e7] text-sm text-[#47627f]">
        <div className="border-r border-[#bfd9e7] p-3">
          <p className="font-semibold text-[#0f2344]">Bank Details</p>
          <p className="mt-1">A/c 377244... / SBI</p>
        </div>
        <div className="border-r border-[#bfd9e7] p-3">
          <p className="font-semibold text-[#0f2344]">Payment QR Code</p>
          <div className="mt-2">
            <InvoiceQr />
          </div>
        </div>
        <div className="p-3">
          <p className="font-semibold text-[#0f2344]">Terms and Conditions</p>
          <p className="mt-1">Goods once sold will not be taken back.</p>
        </div>
      </div>
    </div>
  );
}

function A5View() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[34px] border border-[#dce8f3] bg-[radial-gradient(circle_at_top,_rgba(10,166,201,0.08),_transparent_28%),linear-gradient(180deg,#fbfdff_0%,#eef5fb_100%)] p-6 shadow-[0_18px_50px_rgba(15,35,68,0.08)] lg:p-8">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent" />
      <div className="relative grid gap-8 xl:grid-cols-2">
      <A5Sheet title="Shree Raju Agencies" topRight="Trusted for quality" />
      <A5Sheet title="Shree Balaji Hardware Store" topRight="Most affordable Hardware store in town" />
      </div>
    </div>
  );
}

export default function InvoicePrintThemes() {
  const [activeTab, setActiveTab] = useState<TabKey>('a4');

  return (
    <section className="relative overflow-hidden bg-[#f7fbff] pb-16 pt-6 lg:pb-20 lg:pt-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute right-[-10rem] top-12 h-80 w-80 rounded-full bg-[#0aa6c9]/10 blur-3xl" />
      <div className="absolute left-[-8rem] bottom-0 h-80 w-80 rounded-full bg-[#0f2344]/6 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-4 md:px-8 lg:px-10">
        <SectionIntro />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'thermal' && <ThermalView />}
        {activeTab === 'a4' && <A4View />}
        {activeTab === 'a5' && <A5View />}
      </div>
    </section>
  );
}

