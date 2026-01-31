import { Metadata } from "next";
import Link from "next/link";

import { getTopicKeywords } from "@/lib/topic-keywords";
import TopicSearch from "@/components/marketing/TopicSearch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Recommendation Letter Topics | RecommendWell",
  description:
    "Browse every recommendation letter topic, from templates to examples. Find the right structure for professors, teachers, employers, and more.",
  alternates: {
    canonical:
      "https://www.recommendwell.com/resources/recommendation-letter-topics",
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

export default function RecommendationLetterTopicsPage() {
  const topics = getTopicKeywords();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-4">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
          Resources
        </Badge>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Recommendation letter topics
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Explore every recommendation letter topic. Each page links to the best
          template or example so you can start writing fast with the right
          structure.
        </p>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span>{topics.length} topics</span>
          <span>•</span>
          <Link href="/resources">Back to resources</Link>
        </div>
      </div>

      <TopicSearch
        topics={topics}
        basePath="/resources/recommendation-letter-topics"
      />
      <Separator className="mt-10" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={`${topic.slug}-${topic.source}`}
            href={`/resources/recommendation-letter-topics/${topic.slug}`}
            className="group"
          >
            <Card className="h-full border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
              <div className="flex min-h-[72px] items-center justify-between gap-3 p-5">
                <p className="text-base font-medium text-foreground">
                  {topic.keyword.charAt(0).toUpperCase() +
                    topic.keyword.slice(1)}
                </p>
                <Badge variant="outline" className="text-[10px] uppercase">
                  {topic.source}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
