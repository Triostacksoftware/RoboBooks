'use client';

import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff] px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <section className="mx-auto max-w-4xl rounded-[28px] border border-[#d8e7f3] bg-white p-8 shadow-[0_20px_60px_rgba(15,35,68,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#0f2344]">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            This privacy policy explains the types of information RoboBooks may
            collect, how that information supports the product experience, and
            the steps users can take to manage access and business data more
            carefully.
          </p>

          <div className="mt-10 space-y-8 text-base leading-8 text-slate-600">
            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Information We Collect</h2>
              <p className="mt-3">
                RoboBooks may collect account, business, contact, and usage
                information that helps deliver invoicing, reporting, onboarding,
                and support experiences. This can include names, business
                details, email addresses, phone numbers, and transaction-related
                records entered by your team.
              </p>
              <p className="mt-3">
                We may also collect product interaction data such as session
                activity, navigation behavior, or feature usage patterns to help
                improve usability and performance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">How Information Is Used</h2>
              <p className="mt-3">
                Your information is used to operate the platform, power product
                workflows, improve reporting experiences, respond to support
                requests, and maintain secure access across the product.
              </p>
              <p className="mt-3">
                Information may also be used to improve design decisions,
                optimize performance, and help our team understand where users
                may need a smoother or more reliable workflow.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Business Data and Access</h2>
              <p className="mt-3">
                Business records stored in RoboBooks can include financial,
                customer, tax, and reporting information. We encourage customers
                to review internal permissions regularly so only the right people
                have access to sensitive data.
              </p>
              <p className="mt-3">
                Access controls, account reviews, and careful team management can
                help reduce the chance of accidental exposure or misuse.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Security Approach</h2>
              <p className="mt-3">
                We design the product to support a more secure and controlled
                business experience. While no system can promise absolute
                security, we work to improve reliability, reduce unnecessary
                exposure, and support safer day-to-day use of the platform.
              </p>
              <p className="mt-3">
                Users can strengthen privacy protection further by using strong
                passwords, limiting shared access, and keeping account details up
                to date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">User Choices</h2>
              <p className="mt-3">
                You can review account information, update business details, and
                manage who can access your workspace. Browser settings and device
                preferences may also affect how some website features behave.
              </p>
              <p className="mt-3">
                If you have questions about the information you share through the
                platform, it is a good idea to contact the RoboBooks team for
                clarification and support.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
