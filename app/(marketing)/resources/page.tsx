import Link from "next/link";
import {
  BookOpenIcon,
  FileTextIcon,
  ListMagnifyingGlassIcon,
} from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Resources | RecommendWell",
  description:
    "Guides, tips, and insights for writing better recommendation letters. Learn best practices, find templates, and improve your letter writing skills.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-4">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
          Resources
        </Badge>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Everything you need to write confidently
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
          Guides, tips, and insights for writing better recommendation letters.
          Learn best practices, find templates, and improve your letter writing
          skills.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ListMagnifyingGlassIcon
                className="h-5 w-5 text-primary"
                weight="duotone"
              />
            </div>
            <CardTitle className="text-xl">
              Recommendation letter topics
            </CardTitle>
            <CardDescription>
              Browse every topic, from teacher and student letters to
              scholarship and immigration recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/resources/recommendation-letter-topics">
                Explore topics
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpenIcon className="h-5 w-5 text-primary" weight="duotone" />
            </div>
            <CardTitle className="text-xl">How to write</CardTitle>
            <CardDescription>
              Step-by-step guidance on writing recommendation letters with the
              right evidence, tone, and structure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/resources/how-to-write-recommendation-letter">
                Read the guide
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BookOpenIcon className="h-5 w-5 text-primary" weight="duotone" />
            </div>
            <CardTitle className="text-xl">Blog</CardTitle>
            <CardDescription>
              Latest articles on recommendation letters, templates, and best
              practices for educators and professionals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/resources/blog">Browse Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future resources */}
      <Card className="mt-12 border-dashed border-border/70 bg-muted/20 text-center">
        <CardContent className="py-10">
          <FileTextIcon
            className="mx-auto h-10 w-10 text-muted-foreground/50"
            weight="duotone"
          />
          <h3 className="mt-4 text-lg font-medium">
            More resources coming soon
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re working on templates, guides, and tips to help you write
            better recommendation letters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
