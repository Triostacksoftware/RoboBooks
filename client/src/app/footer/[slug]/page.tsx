"use client";

import { useParams } from "next/navigation";
import FooterDetailPageClient from "../FooterDetailPageClient";

export default function FooterDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || "";

  return <FooterDetailPageClient slug={slug} />;
}
