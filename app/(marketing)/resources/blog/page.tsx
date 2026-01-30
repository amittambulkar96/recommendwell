import Link from "next/link";
import { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getBlogPosts, formatDate } from "@/lib/blog-utils";

export const metadata: Metadata = {
  title: "Blog | RecommendWell",
  description:
    "Guides and insights for writing better recommendation letters. Learn best practices, see examples, and improve your letter writing process.",
  alternates: {
    canonical: "https://www.recommendwell.com/resources/blog",
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

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
      <div className="mb-10 space-y-4">
        <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
          Resources
        </Badge>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
          Recommendation letter blog
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Practical advice, structure breakdowns, and examples to help you write
          confident, evidence-driven recommendation letters.
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No blog posts yet. Add MDX files in the /blogs directory to publish.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/resources/blog/${post.slug}`}>
              <Card className="h-full p-5 transition-colors hover:bg-muted/40">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-3 text-lg font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
