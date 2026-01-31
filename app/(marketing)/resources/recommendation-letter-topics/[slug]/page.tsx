import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTopicKeywordBySlug, getTopicKeywords } from "@/lib/topic-keywords";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const topics = getTopicKeywords();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicKeywordBySlug(slug);

  if (!topic) {
    return {
      title: "Topic Not Found | RecommendWell",
      description: "The requested recommendation letter topic could not be found.",
    };
  }

  const url = `https://www.recommendwell.com/resources/recommendation-letter-topics/${topic.slug}`;

  return {
    title: `${topic.pageTitle} | RecommendWell`,
    description: topic.metaDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title: `${topic.pageTitle} | RecommendWell`,
      description: topic.metaDescription,
      siteName: "RecommendWell",
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.pageTitle} | RecommendWell`,
      description: topic.metaDescription,
    },
  };
}

export default async function RecommendationLetterTopicPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const topic = getTopicKeywordBySlug(slug);

  if (!topic) {
    return notFound();
  }

  const primaryHref =
    topic.targetType === "example"
      ? `/example/${topic.targetSlug}`
      : `/template/${topic.targetSlug}`;
  const primaryLabel =
    topic.targetType === "example" ? "View example" : "Start template";
  const secondaryHref =
    topic.targetType === "example" ? "/all-examples" : "/all-templates";
  const secondaryLabel =
    topic.targetType === "example" ? "Browse all examples" : "Browse all templates";

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16">
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
            <BreadcrumbLink href="/resources/recommendation-letter-topics">
              Recommendation letter topics
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{topic.pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
          {topic.source}
        </Badge>
        <h1 className="text-2xl md:text-4xl font-semibold text-foreground">
          {topic.pageTitle}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
          {topic.metaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>

      <Card className="mt-12 border-border/70 bg-muted/30">
        <CardContent className="grid gap-6">
          <div>
            <h2 className="text-lg font-semibold">How to use this topic</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Use this page to understand the structure and focus of a {topic.keyword}.
              The primary link takes you straight to the {topic.source} so you can
              start writing immediately.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resources/recommendation-letter-topics"
              className="text-sm text-primary underline"
            >
              Back to all topics
            </Link>
            <Link href="/resources" className="text-sm text-primary underline">
              Resources hub
            </Link>
          </div>
        </CardContent>
      </Card>

      {topic.faq.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Frequently asked questions
          </h2>
          <Accordion type="multiple" className="w-full -space-y-px">
            {topic.faq.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-background border border-border/70 px-4 py-1 first:rounded-t-xl last:rounded-b-xl"
              >
                <AccordionTrigger className="justify-start gap-3 py-2 text-sm leading-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground ps-7 pb-2 text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}
