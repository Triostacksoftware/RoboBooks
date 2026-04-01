import { redirect } from "next/navigation";
import FooterDetailPageClient from "../footer/FooterDetailPageClient";
import { defaultFeaturesContent } from "@/services/cmsService";
import { gstTools } from "../gst-tools/toolData";
import {
  getCanonicalRouteForFooterSlug,
  getFooterLinkBySlug,
} from "../footer/footerData";

type PublicFooterSlugPageProps = {
  params: {
    slug: string;
  };
};

export default function PublicFooterSlugPage({
  params,
}: PublicFooterSlugPageProps) {
  const featureExists = defaultFeaturesContent.cards.some((card) => card.slug === params.slug);
  if (featureExists) {
    redirect(`/features/${params.slug}`);
  }

  const gstToolExists = gstTools.some((tool) => tool.slug === params.slug);
  if (gstToolExists) {
    redirect(`/gst-tools/${params.slug}`);
  }

  const canonicalFooterRoute = getCanonicalRouteForFooterSlug(params.slug);
  if (canonicalFooterRoute) {
    redirect(canonicalFooterRoute);
  }

  if (!getFooterLinkBySlug(params.slug)) {
    redirect("/footer");
  }

  return <FooterDetailPageClient slug={params.slug} />;
}
