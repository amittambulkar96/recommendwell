import Link from "next/link";

import { Button } from "@/components/ui/button";
import ExampleCard from "@/components/marketing/ExampleCard";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const metadata = {
  title: "All Examples | RecommendWell",
  description:
    "Browse real-world recommendation letter examples. Review tone, structure, and wording before you personalize your own letter.",
};

export const revalidate = 3600;

export default async function AllExamplesPage() {
  const examples = await fetchQuery(api.examples.getAllExamples);
  const sortedExamples = examples?.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Examples
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          All recommendation letter examples
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Review complete, realistic recommendation letters before writing your
          own. Find the tone, length, and structure that fits your situation.
        </p>
      </div>

      {sortedExamples?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedExamples.map((example) => (
            <ExampleCard
              key={example.slug}
              slug={example.slug}
              name={example.name}
              description={example.description}
              tags={example.tags}
              isPro={example.isPro}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No examples are available yet. Check back soon.
          </p>
        </div>
      )}

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/categories">Browse categories</Link>
        </Button>
      </div>
    </div>
  );
}
