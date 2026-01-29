import Link from "next/link";

import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/marketing/CategoryCard";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const metadata = {
  title: "Categories | RecommendWell",
  description:
    "Browse recommendation letter templates and examples organized by category. Find the right structure for every scenario.",
};

export const revalidate = 3600;

export default async function CategoriesPage() {
  const categories = await fetchQuery(api.categories.getCategoryIndex);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Categories
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Recommendation letter templates by category
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Discover templates and real-world examples grouped by the situations
          you are writing for. Each category bundles the most relevant formats
          in one place.
        </p>
      </div>

      {categories?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              label={category.label}
              templateCount={category.templateCount}
              exampleCount={category.exampleCount}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No categories are available yet. Check back soon.
          </p>
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/all-templates">View all templates</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/all-examples">View all examples</Link>
        </Button>
      </div>
    </div>
  );
}
