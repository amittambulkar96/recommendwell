import Link from "next/link";
import type { ComponentProps } from "react";

type AnchorProps = ComponentProps<"a">;

export const mdxComponents = {
  a: ({ href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props} className="text-primary underline">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  h1: ({ children }: ComponentProps<"h1">) => (
    <h1 className="text-2xl font-semibold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: ComponentProps<"h2">) => (
    <h2 className="text-xl font-semibold mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }: ComponentProps<"h3">) => (
    <h3 className="text-lg font-semibold mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }: ComponentProps<"p">) => (
    <p className="text-base text-muted-foreground leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 text-muted-foreground mb-4">{children}</ul>
  ),
  ol: ({ children }: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 text-muted-foreground mb-4">{children}</ol>
  ),
  li: ({ children }: ComponentProps<"li">) => (
    <li className="mb-2">{children}</li>
  ),
  blockquote: ({ children }: ComponentProps<"blockquote">) => (
    <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground mb-4">
      {children}
    </blockquote>
  ),
};
