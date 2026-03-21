'use client';

import Navbar from '../../homepage/components/Navbar';
import Footer from '../../homepage/components/Footer';

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f7fbff] px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <section className="mx-auto max-w-4xl rounded-[28px] border border-[#d8e7f3] bg-white p-8 shadow-[0_20px_60px_rgba(15,35,68,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0aa6c9]">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#0f2344]">Cookies Policy</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            This cookies policy explains how RoboBooks may use browser storage
            and similar technologies to support sign-in, preferences,
            performance, and a smoother website experience.
          </p>

          <div className="mt-10 space-y-8 text-base leading-8 text-slate-600">
            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">What Cookies Do</h2>
              <p className="mt-3">
                Cookies are small pieces of information stored in your browser to
                help websites remember activity between visits. They can improve
                convenience by keeping sessions active, remembering preferences,
                and making repeat visits smoother.
              </p>
              <p className="mt-3">
                Similar browser technologies may also be used to support product
                features and improve reliability across devices and sessions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">How RoboBooks Uses Cookies</h2>
              <p className="mt-3">
                RoboBooks may use cookies and related storage tools to support
                secure sign-in, maintain navigation state, remember display or
                workflow preferences, and improve product performance.
              </p>
              <p className="mt-3">
                These technologies can also help us understand how parts of the
                experience are being used so the website and application can be
                made clearer and faster over time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Essential and Experience Cookies</h2>
              <p className="mt-3">
                Some cookies support core functionality, such as account access,
                session continuity, and reliable navigation. Others may help with
                convenience features, layout preferences, or performance
                optimization.
              </p>
              <p className="mt-3">
                Without some essential browser storage, certain product areas may
                not work as expected.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Managing Cookies</h2>
              <p className="mt-3">
                You can manage cookies through your browser settings, including
                clearing stored data, blocking specific types of cookies, or
                limiting tracking-related settings where supported.
              </p>
              <p className="mt-3">
                Disabling some storage features may affect sign-in persistence,
                saved preferences, or the smooth functioning of parts of the
                website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#0f2344]">Questions and Preferences</h2>
              <p className="mt-3">
                If you want more control over how website data is stored, review
                your browser privacy settings regularly and keep device software
                updated.
              </p>
              <p className="mt-3">
                For product-related questions about cookies or sign-in behavior,
                RoboBooks support channels can help clarify how the experience is
                intended to work.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
