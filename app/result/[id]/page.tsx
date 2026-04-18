import { notFound } from "next/navigation";
import Link from "next/link";
import { ARCHETYPES, getArchetype } from "@/lib/archetypes";
import { seededDistribution } from "@/lib/seedStats";
import { fallbackRoast } from "@/lib/roast";
import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ARCHETYPES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const a = getArchetype(params.id);
  if (!a) return {};
  return {
    title: `I'm ${a.name} ${a.emoji} — Marketer DNA`,
    description: a.tagline,
    openGraph: {
      title: `I'm ${a.name} ${a.emoji}`,
      description: a.tagline,
      images: [`/api/og?a=${a.id}`],
    },
  };
}

export default function ResultPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { fp?: string };
}) {
  const a = getArchetype(params.id);
  if (!a) return notFound();

  const fingerprint = searchParams.fp ?? "dfdfdfdfdf";
  const fallback = fallbackRoast(a, fingerprint);
  const dist = seededDistribution();
  const mine = dist.find((d) => d.id === a.id);
  const rarityPercent = mine?.percent ?? a.rarity;

  return (
    <ResultClient
      archetype={a}
      fingerprint={fingerprint}
      fallbackBlurb={fallback}
      rarityPercent={rarityPercent}
    />
  );
}
