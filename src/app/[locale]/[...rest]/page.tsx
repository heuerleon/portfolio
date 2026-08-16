import { redirect } from "@/i18n/navigation";

// Catch-all so unmatched paths send visitors home in their own locale
// instead of failing to resolve a route under the [locale] segment.
export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/", locale });
}
