import Link from "next/link";
import { BookOpenIcon, FileTextIcon } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
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
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="mb-8 mt-20">
        <h1 className="text-lg md:text-2xl font-semibold mb-2 text-left">
          Resources
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left max-w-2xl">
          Guides, tips, and insights for writing better recommendation letters.
          Learn best practices, find templates, and improve your letter writing
          skills.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors">
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
      <div className="mt-12 rounded-lg border border-dashed p-8 text-center">
        <FileTextIcon
          className="mx-auto h-10 w-10 text-muted-foreground/50"
          weight="duotone"
        />
        <h3 className="mt-4 text-lg font-medium">More resources coming soon</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;re working on templates, guides, and tips to help you write
          better recommendation letters.
        </p>
      </div>
    </div>
  );
}
