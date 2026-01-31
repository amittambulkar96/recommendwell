import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mdxComponents } from "@/mdx-components";
import { getGuideBySlug } from "@/lib/guide-utils";

export const metadata: Metadata = {
  title: "How to Write a Recommendation Letter | RecommendWell",
  description:
    "Learn how to write a recommendation letter with clear structure, credible evidence, and the right tone. Use this guide to draft faster with confidence.",
  alternates: {
    canonical: "https://www.recommendwell.com/resources/how-to-write-recommendation-letter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function HowToWriteRecommendationLetterPage() {
  const guide = getGuideBySlug("how-to-write-recommendation-letter");

  if (!guide) {
    return notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-24 pb-16">
      <Breadcrumb className="mb-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/resources">Resources</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>How to write a recommendation letter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
          {guide.title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {guide.description}
        </p>
      </div>

      <Card className="border-border/70 bg-white/80">
        <CardContent className="prose max-w-none">
          <MDXRemote
            source={guide.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="mt-12 border-border/70 bg-muted/30">
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Ready to start writing?</h2>
              <p className="text-sm text-muted-foreground">
                Jump into a template or explore recommendation letter topics.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="/all-templates">Browse templates</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/resources/recommendation-letter-topics">
                  Explore topics
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
