import FooterDetailPageClient from "../footer/FooterDetailPageClient";

type PublicFooterSlugPageProps = {
  params: {
    slug: string;
  };
};

export default function PublicFooterSlugPage({
  params,
}: PublicFooterSlugPageProps) {
  return <FooterDetailPageClient slug={params.slug} />;
}
