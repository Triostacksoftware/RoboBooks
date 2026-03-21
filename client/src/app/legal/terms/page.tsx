'use client';

import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff] px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <section className="mx-auto max-w-4xl rounded-[28px] border border-[#d8e7f3] bg-white p-8 shadow-[0_20px_60px_rgba(15,35,68,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#0f2344]">Terms of Service</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            These terms explain how RoboBooks can be used for invoicing,
            bookkeeping, GST workflows, reporting, and other connected business
            operations. By accessing or using the platform, you agree to use it
            responsibly and in line with applicable business and tax rules.
          </p>

          <div className="mt-10 space-y-8 text-base leading-8 text-slate-600">
            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Using RoboBooks</h2>
              <p className="mt-3">
                RoboBooks is designed to help teams manage accounting activity in
                one place. You may use the platform to create records, manage
                invoices, review reports, and maintain business information as
                part of your normal operations.
              </p>
              <p className="mt-3">
                You agree to use the product only for lawful business purposes
                and to avoid activity that disrupts the service, harms other
                users, or misuses product features.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Account Responsibilities</h2>
              <p className="mt-3">
                You are responsible for the information entered into your
                account, including contact details, invoices, taxes, inventory,
                ledger entries, and financial records. Please keep your account
                data accurate and updated.
              </p>
              <p className="mt-3">
                You are also responsible for protecting login credentials,
                managing access for team members, and reviewing who can view or
                change business data inside the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Billing, Reports, and Records</h2>
              <p className="mt-3">
                RoboBooks may help you prepare invoices, reports, and summaries,
                but you remain responsible for reviewing outputs before sharing,
                filing, exporting, or relying on them for compliance or business
                decisions.
              </p>
              <p className="mt-3">
                Because accounting and tax data can affect operations, we
                recommend that users validate key records, maintain backups where
                needed, and review generated information before final use.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Service Updates</h2>
              <p className="mt-3">
                We may improve, maintain, secure, or update the product over
                time. This can include interface changes, workflow updates,
                performance improvements, and operational maintenance required to
                keep the platform stable and useful.
              </p>
              <p className="mt-3">
                We may also refine product features as business workflows evolve,
                especially where invoicing, automation, dashboards, and GST
                support need ongoing improvements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Fair Use and Access</h2>
              <p className="mt-3">
                You should not attempt to interfere with the product, copy
                restricted areas, bypass access controls, or use the service in
                a way that creates risk for the platform or other customers.
              </p>
              <p className="mt-3">
                If misuse, abuse, or security-related concerns are identified,
                access may be limited or reviewed to protect service integrity.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
