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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mdxComponents } from "@/mdx-components";
import { formatDate, getBlogPosts } from "@/lib/blog-utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const blogPosts = getBlogPosts();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = getBlogPosts().find((post) => post.slug === slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found | RecommendWell",
      description: "The requested blog post could not be found.",
    };
  }

  const url = `https://www.recommendwell.com/resources/blog/${slug}`;

  return {
    title: `${blogPost.title} | RecommendWell Blog`,
    description: blogPost.excerpt,
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
      title: `${blogPost.title} | RecommendWell Blog`,
      description: blogPost.excerpt,
      siteName: "RecommendWell",
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogPost.title} | RecommendWell Blog`,
      description: blogPost.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const blogPost = getBlogPosts().find((post) => post.slug === slug);

  if (!blogPost) {
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
            <BreadcrumbLink href="/resources/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blogPost.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="space-y-4 mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {formatDate(blogPost.date)}
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
          {blogPost.title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {blogPost.excerpt}
        </p>
        {blogPost.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      <Card className="border-border/70 bg-white/80">
        <CardContent className="prose max-w-none">
          <MDXRemote
            source={blogPost.content}
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
              <h2 className="text-lg font-semibold">Write your next letter</h2>
              <p className="text-sm text-muted-foreground">
                Start from a template or explore topics tailored to your scenario.
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
