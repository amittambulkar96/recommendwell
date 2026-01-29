import Link from "next/link";

import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/marketing/TemplateCard";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const metadata = {
  title: "All Templates | RecommendWell",
  description:
    "Browse every recommendation letter template in RecommendWell. Find the right structure for admissions, professional, and academic use cases.",
};

export const revalidate = 3600;

export default async function AllTemplatesPage() {
  const templates = await fetchQuery(api.templates.getAllTemplates);
  const sortedTemplates = templates?.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Templates
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          All recommendation letter templates
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Explore every template in the library. Start with a professional
          structure, then tailor the tone, examples, and details to your story.
        </p>
      </div>

      {sortedTemplates?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTemplates.map((template) => (
            <TemplateCard
              key={template.slug}
              slug={template.slug}
              name={template.name}
              description={template.description}
              tags={template.tags}
              isPro={template.isPro}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No templates are available yet. Check back soon.
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
