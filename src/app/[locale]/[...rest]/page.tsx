import { notFound } from "next/navigation";

// Catch-all so unmatched paths render the localized not-found page
// instead of failing to resolve a route under the [locale] segment.
export default function CatchAllPage() {
  notFound();
}
