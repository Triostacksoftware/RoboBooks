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
      </div>
    </div>
  );
}
