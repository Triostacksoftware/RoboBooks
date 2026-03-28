import Link from "next/link";

export default function AdminCmsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-purple-600">
          CMS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="mt-2 text-gray-600">
          Choose which homepage section you want to edit from the admin panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/cms/logo"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Logo Section</h2>
          <p className="mt-3 text-gray-600">
            Upload and manage the main website logo used in the navbar and footer.
          </p>
        </Link>

        <Link
          href="/admin/cms/hero"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
          <p className="mt-3 text-gray-600">
            Edit headline, description, feature bullets, and CTA buttons for the homepage hero.
          </p>
        </Link>

        <Link
          href="/admin/cms/about"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">About Section</h2>
          <p className="mt-3 text-gray-600">
            Edit about headline, description, highlights, and trusted content block.
          </p>
        </Link>

        <Link
          href="/admin/cms/invoice-themes"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Invoice Themes Section</h2>
          <p className="mt-3 text-gray-600">
            Edit invoice themes heading, tabs, showcase labels, and feature cards on the homepage.
          </p>
        </Link>

        <Link
          href="/admin/cms/services"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Services Section</h2>
          <p className="mt-3 text-gray-600">
            Edit core services heading, highlight box, service cards, CTA block, and uploaded icons.
          </p>
        </Link>

        <Link
          href="/admin/cms/industries"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Industries Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the industries homepage section and manage each industry detail page separately.
          </p>
        </Link>

        <Link
          href="/admin/cms/gst-compliance"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">GST Compliance Section</h2>
          <p className="mt-3 text-gray-600">
            Edit GST compliance heading, tab content, uploaded icons, and preview images.
          </p>
        </Link>

        <Link
          href="/admin/cms/features"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Features Section</h2>
          <p className="mt-3 text-gray-600">
            Edit features heading, card text, uploaded icons, and CTA button.
          </p>
        </Link>

        <Link
          href="/admin/cms/usability"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Usability Section</h2>
          <p className="mt-3 text-gray-600">
            Edit product experience heading, intro text, usability cards, and uploaded icons.
          </p>
        </Link>

        <Link
          href="/admin/cms/business-impact"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Business Impact Section</h2>
          <p className="mt-3 text-gray-600">
            Edit business impact heading, highlight content, and right-side benefit items.
          </p>
        </Link>

        <Link
          href="/admin/cms/team-management"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Team Management Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the collaboration heading, intro text, and team management cards.
          </p>
        </Link>

        <Link
          href="/admin/cms/faq"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">FAQ Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the FAQ heading, intro copy, and expandable question and answer items.
          </p>
        </Link>

        <Link
          href="/admin/cms/trusted-partner"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Trusted Partner Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the partner marquee heading, description, and both scrolling rows.
          </p>
        </Link>

        <Link
          href="/admin/cms/pre-footer-cta"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">App CTA Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the start using RoboBooks CTA, feature pills, store badges, and mobile preview content.
          </p>
        </Link>

        <Link
          href="/admin/cms/contact-section"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Contact Section</h2>
          <p className="mt-3 text-gray-600">
            Edit the contact block, callback form heading, field labels, placeholders, and button text.
          </p>
        </Link>

        <Link
          href="/admin/cms/footer"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Footer Section</h2>
          <p className="mt-3 text-gray-600">
            View all footer groups, open footer dynamic pages, and manage the footer navigation structure overview.
          </p>
        </Link>

        <Link
          href="/admin/cms/pricing-plans"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Pricing Plans Section</h2>
          <p className="mt-3 text-gray-600">
            Edit pricing heading, plan cards, selected label, CTA, and feature lists.
          </p>
        </Link>

        <Link
          href="/admin/cms/testimonials"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Testimonials Section</h2>
          <p className="mt-3 text-gray-600">
            Edit testimonials heading, description, and each testimonial card separately.
          </p>
        </Link>

        <Link
          href="/admin/cms/blog"
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900">Blog Page</h2>
          <p className="mt-3 text-gray-600">
            Manage the public blog hero content and add, edit, remove, or reorder blog posts dynamically.
          </p>
        </Link>
      </div>
    </div>
  );
}
