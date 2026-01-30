import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  excerpt: string;
  content: string;
};

export function getBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), "blogs");

  try {
    if (!fs.existsSync(blogsDirectory)) {
      return [];
    }

    const fileNames = fs
      .readdirSync(blogsDirectory)
      .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"));

    const blogPosts: BlogPost[] = [];

    for (const fileName of fileNames) {
      const filePath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const frontmatterMatch = fileContents.match(
        /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
      );

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const content = frontmatterMatch[2];

        const metadata: Record<string, string> = {};
        frontmatter.split("\n").forEach((line) => {
          const colonIndex = line.indexOf(":");
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line
              .substring(colonIndex + 1)
              .trim()
              .replace(/^["']|["']$/g, "");
            metadata[key] = value;
          }
        });

        const slug = fileName.replace(/\.(mdx|md)$/, "");
        const excerpt =
          content
            .replace(/[#*`]/g, "")
            .replace(/\n/g, " ")
            .trim()
            .substring(0, 150) + "...";

        blogPosts.push({
          slug,
          title: metadata.title || "Untitled",
          description: metadata.description || "",
          date: metadata.date || new Date().toISOString(),
          author: metadata.author || "RecommendWell Team",
          image: metadata.image || "",
          tags: metadata.tags
            ? metadata.tags.split(",").map((tag) => tag.trim())
            : [],
          excerpt: metadata.description || excerpt,
          content,
        });
      }
    }

    return blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
