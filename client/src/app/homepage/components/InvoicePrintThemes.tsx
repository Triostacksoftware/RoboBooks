'use client';

import { useState } from 'react';

type TabKey = 'thermal' | 'a4' | 'a5';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'thermal', label: 'Thermal Prints' },
  { key: 'a4', label: 'A4 Prints' },
  { key: 'a5', label: 'A5 Prints' },
];

const invoicePreviewData = {
  stylish: {
    businessName: 'Ramesh Electronics',
    address: '12 Market Road, Sector 18, Noida, Uttar Pradesh',
    phone: '+91 98765 43210',
    gstin: '09AAECR4582M1ZX',
    invoiceNo: 'INV-5343',
    invoiceDate: '22/11/2023',
    dueDate: '22/12/2023',
    billToName: 'Shantanu Sharma',
    billToAddress: 'Kolkata, West Bengal, 700005',
    shipToName: 'Sample Party',
    shipToAddress: 'New Delhi, 110001',
    items: [
      ['Samsung Galaxy F54', '85171300', '1 PCS', '21,185.59', '24,999'],
      ['Bluetooth Neckband', '85183000', '2 PCS', '1,199.00', '2,398'],
    ],
    subtotal: '27,397',
    cgst: '1,233',
    sgst: '1,233',
    grandTotal: '29,863',
    bank: 'HDFC Bank 501002341221',
  },
  professional: {
    businessName: 'RoboBooks Foods',
    address: '12 Market Road, Sector 18, Noida, Uttar Pradesh',
    phone: '+91 98765 43210',
    gstin: '07AAJFR7622K1ZQ',
    invoiceNo: 'RB-2201',
    invoiceDate: '22/11/2023',
    dueDate: '22/12/2023',
    billToName: 'Metro Supermart',
    billToAddress: 'Jaipur, Rajasthan, 302001',
    shipToName: 'Metro Supermart',
    shipToAddress: 'Jaipur Warehouse, 302012',
    items: [
      ['Premium Basmati Rice 25kg', '10063020', '4 BAGS', '2,150.00', '8,600'],
      ['Cold Pressed Mustard Oil', '15149990', '6 TIN', '1,320.00', '7,920'],
    ],
    subtotal: '16,520',
    cgst: '1,487',
    sgst: '1,487',
    grandTotal: '19,494',
    bank: 'ICICI Bank 004510900221',
  },
};

function SectionIntro() {
  return (
    <div className="max-w-5xl">
      <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#0aa6c9]">
        Invoice Themes
      </p>
      <h2 className="mt-4 text-4xl font-bold leading-tight text-[#0f2344] sm:text-5xl">
        Your bill, your brand and more with RoboBooks
      </h2>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
        Fully customizable GST and non-GST invoices with multiple invoice print options. Personalize every RoboBooks invoice so it reflects your brand clearly across thermal, A4, and A5 formats.
      </p>
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
    <div className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-full border border-[#d6e6f2] bg-white p-2 shadow-[0_16px_35px_rgba(15,35,68,0.06)]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setActiveTab(tab.key)}
          className={`rounded-full px-7 py-4 text-lg font-semibold transition ${
            activeTab === tab.key
              ? 'bg-[#6558df] text-white shadow-[0_12px_25px_rgba(101,88,223,0.28)]'
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
      <div className="relative rounded-md bg-white p-4 shadow-[0_22px_55px_rgba(15,35,68,0.12)]">
        <div className="font-mono text-[12px] leading-6 text-slate-700 sm:text-[14px]">
          <p className="text-[18px] font-bold text-slate-800">Sharma store</p>
          <p>Rama Nagar, Mumbai</p>
          <p>Mobile : 9876543210</p>
          <p>Invoice No. : 530</p>
          <p>Date : 20-12-2020</p>
          <p>Bill To : Mahesh Kumar</p>
          <div className="my-3 border-t border-dashed border-slate-300" />
          <div className="grid grid-cols-4 gap-3 text-right font-semibold">
            <span className="col-span-1 text-left">Item</span>
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
          </div>
          <div className="my-2 border-t border-dashed border-slate-300" />
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
          <div className="my-3 border-t border-dashed border-slate-300" />
          <div className="space-y-1 text-right">
            <p>Packing Charge 25.0</p>
            <p>Home Delivery 30.0</p>
            <p>Round Off -19</p>
            <p className="text-base font-bold text-slate-900">Total 517</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[-56px] rounded-r-md bg-white px-4 py-8 text-[18px] text-slate-800 shadow-[0_10px_25px_rgba(15,35,68,0.08)] [writing-mode:vertical-rl]">
        {widthLabel}
      </div>
    </div>
  );
}

function ThermalView() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top,_rgba(101,88,223,0.10),_transparent_35%),linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-6 pb-16 pt-10 lg:px-12">
      <div className="absolute left-[-10px] bottom-0 h-36 w-36 rounded-tr-[70px] bg-slate-200/80 blur-[1px]" />
      <div className="absolute right-0 bottom-0 h-40 w-40 rounded-tl-[90px] bg-slate-200/80 blur-[1px]" />

      <div className="relative flex min-h-[650px] items-end justify-center">
        <ThermalReceipt
          widthLabel="2 inch"
          className="absolute bottom-4 left-[18%] z-10 w-[260px] rotate-[-1deg] sm:w-[320px] lg:w-[400px]"
        />
        <ThermalReceipt
          widthLabel="3 inch"
          className="absolute bottom-0 left-1/2 z-20 w-[300px] -translate-x-1/2 sm:w-[380px] lg:w-[470px]"
        />
        <div className="absolute left-0 bottom-0 hidden h-48 w-48 rounded-tr-[32px] bg-[#a5a8ae] lg:block" />
        <div className="absolute right-0 bottom-0 hidden h-52 w-52 rounded-tl-[36px] bg-[#a5a8ae] lg:block" />
      </div>
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

  return (
    <div className="rounded-[30px] border border-[#d8e4f1] bg-white p-6 shadow-[0_18px_42px_rgba(15,35,68,0.06)]">
      <div className="rounded-[24px] border border-[#dde6ef] bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[#61728f]">
            {variant === 'stylish'
              ? 'Tax Invoice'
              : variant === 'professional'
                ? 'Best service guaranteed'
                : 'Business details'}
          </p>
          <span className="rounded-[10px] border border-[#d7e3ef] px-3 py-1 text-[12px] font-medium text-[#64748b]">
            Original for recipient
          </span>
        </div>

        {!isCustom ? (
          <>
            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[27px] font-bold leading-tight" style={{ color: accent }}>
                  {preview?.businessName ?? title}
                </h3>
                <p className="mt-3 text-[15px] leading-8 text-[#475569]">
                  {preview?.address}
                </p>
                <p className="text-[15px] leading-8 text-[#475569]">
                  Mobile: {preview?.phone}
                </p>
                <p className="text-[13px] leading-7 text-[#64748b]">
                  GSTIN: {preview?.gstin}
                </p>
              </div>
              <div
                className="flex h-[70px] w-[70px] items-center justify-center rounded-[20px] text-[30px] text-white"
                style={{ backgroundColor: accent }}
              >
                +
              </div>
            </div>

            <div className="mt-6 h-[6px] rounded-full" style={{ backgroundColor: accent }} />

            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                ['Invoice No.', preview?.invoiceNo ?? ''],
                ['Invoice Date', preview?.invoiceDate ?? ''],
                ['Due Date', preview?.dueDate ?? ''],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[16px] bg-[#f6f8fc] p-4">
                  <p className="text-[13px] text-[#94a3b8]">{label}</p>
                  <p className="mt-1.5 text-[15px] font-semibold text-[#0f2344]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-[#94a3b8]">
                  Bill To
                </p>
                <p className="mt-3 text-[17px] font-semibold text-[#0f2344]">{preview?.billToName}</p>
                <p className="text-[15px] leading-8 text-[#475569]">{preview?.billToAddress}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-[#94a3b8]">
                  Ship To
                </p>
                <p className="mt-3 text-[17px] font-semibold text-[#0f2344]">{preview?.shipToName}</p>
                <p className="text-[15px] leading-8 text-[#475569]">{preview?.shipToAddress}</p>
              </div>
            </div>

            <div className="mt-7 overflow-hidden rounded-[18px] border border-[#dde6f0]">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-[#f8fafc] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                <span>Items</span>
                <span>HSN</span>
                <span>Qty.</span>
                <span>Rate</span>
                <span>Amount</span>
              </div>
              {preview?.items.map(([item, hsn, qty, rate, amount]) => (
                <div
                  key={`${item}-${qty}`}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] border-t border-[#eef2f7] px-4 py-4 text-sm text-[#0f2344]"
                >
                  <span>{item}</span>
                  <span>{hsn}</span>
                  <span>{qty}</span>
                  <span>{rate}</span>
                  <span className="font-semibold">{amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[18px] border border-[#dde6f0] p-4">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
                  Bank Details
                </p>
                <p className="mt-3 text-[14px] leading-7 text-[#475569]">{preview?.bank}</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">
                  Terms
                </p>
                <p className="mt-2 text-[14px] leading-7 text-[#475569]">
                  Goods once sold will not be taken back. Subject to local jurisdiction only.
                </p>
              </div>

              <div className="rounded-[18px] border border-[#dde6f0] bg-[#fbfdff] p-4">
                {[
                  ['Subtotal', preview?.subtotal ?? ''],
                  ['CGST', preview?.cgst ?? ''],
                  ['SGST', preview?.sgst ?? ''],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-1.5 text-[14px] text-[#475569]">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
                <div className="mt-3 border-t border-[#dde6f0] pt-3">
                  <div className="flex items-center justify-between text-[16px] font-bold text-[#0f2344]">
                    <span>Total Amount</span>
                    <span>{preview?.grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 rounded-[22px] border-2 border-dashed border-[#8dc6ff] p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[14px] border-2 border-dashed border-[#8dc6ff] text-[26px] text-[#40a9ff]">
                  +
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-[#1f2937]">Business Name</p>
                  <p className="mt-1 text-[15px] text-slate-500">Business karne ka naya tareeka</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[18px] border border-[#d7e3ef] p-5 text-sm">
                <p className="font-semibold text-slate-700">BILL TO</p>
                <p className="mt-3 text-[15px] text-slate-500">Sample Party</p>
                <p className="text-[15px] text-slate-500">No F2, Outer Circle, New Delhi</p>
              </div>
              <div className="rounded-[18px] border border-[#d7e3ef] p-5 text-sm">
                <p className="font-semibold text-slate-700">SHIP TO</p>
                <p className="mt-3 text-[15px] text-slate-500">Sample Party</p>
                <p className="text-[15px] text-slate-500">Bengaluru 560001</p>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border-2 border-dashed border-[#8dc6ff] px-4 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#dff0ff] text-[30px] font-semibold text-[#40a9ff]">
                +
              </div>
              <p className="mt-5 text-[18px] font-semibold text-[#1f2937]">
                Customize your own Invoice
              </p>
              <p className="mt-2 text-[14px] text-slate-500">
                Add logo, columns, taxes, terms, bank details, and payment blocks
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function A4View() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.1),_transparent_32%),linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] px-6 py-10 lg:px-10 lg:py-12">
      <div className="absolute inset-x-[24%] top-0 h-24 bg-[radial-gradient(circle,_rgba(99,102,241,0.16),_transparent_72%)] blur-2xl" />
      <div className="relative mb-8 flex items-center justify-between">
        <p className="text-[18px] font-medium text-[#0f2344] sm:text-[20px]">Stylish</p>
        <button className="text-[18px] font-medium text-[#4a90ff]">Start Using Templates {'->'}</button>
      </div>
      <div className="relative grid gap-8 xl:grid-cols-3">
        <A4Card title="Ramesh Electronics" accent="#8b1fd1" variant="stylish" />
        <A4Card title="RoboBooks Foods" accent="#f59e0b" variant="professional" />
        <A4Card title="RoboBooks Custom" accent="#40b5ea" variant="custom" />
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
    <div className="rounded-[18px] border border-slate-300 bg-white p-5 shadow-[0_18px_45px_rgba(15,35,68,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-500 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Tax Invoice</p>
          <span className="mt-1 inline-block rounded border border-slate-300 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
            ORIGINAL FOR RECIPIENT
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-700">{topRight}</p>
      </div>

      <div className="border-b border-slate-500 py-4 text-center">
        <h3 className="text-[18px] font-bold text-[#1f2937]">{title}</h3>
        <p className="text-sm text-slate-600">
          Prasad Salai, Block 9, Chennai, Tamil Nadu, 600006
        </p>
        <p className="text-sm text-slate-600">Mobile: 7777333333</p>
      </div>

      <div className="grid grid-cols-4 border-b border-slate-500 text-sm">
        <div className="border-r border-slate-500 p-3">
          <p className="font-semibold">BILL TO</p>
          <p className="mt-1">SANAA SUPERMART</p>
        </div>
        <div className="border-r border-slate-500 p-3">
          <p className="font-semibold">Invoice No.</p>
          <p className="mt-1">144</p>
        </div>
        <div className="border-r border-slate-500 p-3">
          <p className="font-semibold">Invoice Date</p>
          <p className="mt-1">07/11/2023</p>
        </div>
        <div className="p-3">
          <p className="font-semibold">Due Date</p>
          <p className="mt-1">07/12/2023</p>
        </div>
      </div>

      <div className="border-b border-slate-500">
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] border-b border-slate-500 bg-slate-100 text-sm font-semibold">
          <div className="border-r border-slate-500 p-2 text-center">S.NO.</div>
          <div className="border-r border-slate-500 p-2 text-center">ITEMS</div>
          <div className="border-r border-slate-500 p-2 text-center">QTY.</div>
          <div className="p-2 text-center">AMOUNT</div>
        </div>
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] text-sm">
          <div className="border-r border-slate-500 p-2 text-center">1</div>
          <div className="border-r border-slate-500 p-2">Raju Namkeen-1</div>
          <div className="border-r border-slate-500 p-2 text-center">2 LAD</div>
          <div className="p-2 text-right">4,480</div>
        </div>
        <div className="grid grid-cols-[0.7fr_2.4fr_1fr_1fr] text-sm">
          <div className="border-r border-slate-500 p-2 text-center">2</div>
          <div className="border-r border-slate-500 p-2">Plain Wafers 100G</div>
          <div className="border-r border-slate-500 p-2 text-center">10 PCS</div>
          <div className="p-2 text-right">1,344</div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-slate-500 text-sm">
        <div className="border-r border-slate-500 p-3">
          <p className="font-semibold">Bank Details</p>
          <p className="mt-1 text-slate-600">A/c 377244... / SBI</p>
        </div>
        <div className="border-r border-slate-500 p-3">
          <p className="font-semibold">Payment QR Code</p>
          <div className="mt-2 h-16 w-16 border border-slate-400 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,#fff_2px,#fff_4px)]" />
        </div>
        <div className="p-3">
          <p className="font-semibold">Terms and Conditions</p>
          <p className="mt-1 text-slate-600">Goods once sold will not be taken back.</p>
        </div>
      </div>
    </div>
  );
}

function A5View() {
  return (
    <div className="mt-12 grid gap-8 xl:grid-cols-2">
      <A5Sheet title="Shree Raju Agencies" topRight="Trusted for quality" />
      <A5Sheet title="Shree Balaji Hardware Store" topRight="Most affordable Hardware store in town" />
    </div>
  );
}

export default function InvoicePrintThemes() {
  const [activeTab, setActiveTab] = useState<TabKey>('a4');

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f7fbff] to-transparent" />

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
