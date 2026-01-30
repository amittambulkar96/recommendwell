import fs from "fs";
import path from "path";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

function readGuideFile(filePath: string, slug: string): Guide | null {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const frontmatterMatch = fileContents.match(
    /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  );

  if (!frontmatterMatch) {
    return null;
  }

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

  return {
    slug,
    title: metadata.title || "Untitled guide",
    description: metadata.description || "",
    date: metadata.date || new Date().toISOString(),
    content,
  };
}

export function getGuideBySlug(slug: string): Guide | null {
  const guidesDirectory = path.join(process.cwd(), "guides");
  const filePath = path.join(guidesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readGuideFile(filePath, slug);
}
