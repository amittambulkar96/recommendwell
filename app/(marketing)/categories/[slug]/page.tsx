import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExampleCard from "@/components/marketing/ExampleCard";
import TemplateCard from "@/components/marketing/TemplateCard";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await fetchQuery(api.categories.getCategoryIndex);
  return categories?.map((category) => ({ slug: category.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await fetchQuery(api.categories.getCategoryIndex);
  const category = categories?.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | RecommendWell",
      robots: { index: false, follow: false },
    };
  }

  const title = `${category.label} Recommendation Letter Templates & Examples`;
  const description = `Browse recommendation letter templates and examples for ${category.label}. Start with polished formats tailored to this category.`;

  return {
    title,
    description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await fetchQuery(api.categories.getCategoryContent, {
    slug,
  });

  if (!category) {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-3">
        <Link
          href="/categories"
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Categories
        </Link>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          {category.label}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Templates and real examples curated for {category.label}. Pick a
          starting point and personalize it in minutes.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{category.templateCount} Templates</Badge>
          <Badge variant="outline">{category.exampleCount} Examples</Badge>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Templates</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/all-templates">View all templates</Link>
          </Button>
        </div>
        {category.templates.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.templates.map((template) => (
              <TemplateCard key={template.slug} {...template} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-8 text-sm text-muted-foreground">
            No templates yet for this category.
          </div>
        )}
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Examples</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/all-examples">View all examples</Link>
          </Button>
        </div>
        {category.examples.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.examples.map((example) => (
              <ExampleCard key={example.slug} {...example} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-8 text-sm text-muted-foreground">
            No examples yet for this category.
          </div>
        )}
      </section>

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/categories">Back to categories</Link>
        </Button>
      </div>
    </div>
  );
}
