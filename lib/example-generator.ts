import { generateObject } from "ai";
import { z } from "zod";
import { generateExampleInfoCore } from "@/app/api/ai/generate-example-info/route";
import { createExampleInternal } from "@/lib/convex-internal";

interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string }[];
}

interface TipTapDocument {
  type: "doc";
  content: TipTapNode[];
}

const freeExampleSystemPrompt = `You are a helpful assistant that generates professional recommendation letter EXAMPLES.

## Free Example Guidelines:
Generate a recommendation letter EXAMPLE with REAL dummy data (not placeholders).

### Dummy Data Guidelines:
- Use realistic names: "Sarah Lee", "Michael Chen", "Emily Watson", "James Wilson"
- Use realistic organizations: "Brighton High School", "Arcadia Labs", "Summit University"
- Use realistic titles: "Professor", "Team Lead", "Department Chair", "Principal"
- Use realistic dates: "March 15, 2026", "April 1, 2026", "December 31, 2025"
- Use realistic roles: "Research Assistant", "Software Engineer", "Student Teacher"

### Structure:
- Professional greeting with actual name
- Clear statement of recommendation
- Relationship context with specifics
- 2-3 strengths with brief evidence
- Closing endorsement and signature

Return ONLY the letter content, no explanations, no code fences.`;

const proExampleSystemPrompt = `You are a helpful assistant that generates professional recommendation letter EXAMPLES.

## Pro Example Guidelines:
Generate a recommendation letter EXAMPLE with REAL dummy data (not placeholders).

### Dummy Data Guidelines:
- Use realistic names: "Sarah Lee", "Michael Chen", "Emily Watson", "James Wilson"
- Use realistic organizations: "Brighton High School", "Arcadia Labs", "Summit University"
- Use realistic titles: "Professor", "Team Lead", "Department Chair", "Principal"
- Use realistic dates: "March 15, 2026", "April 1, 2026", "December 31, 2025"
- Use realistic roles: "Research Assistant", "Software Engineer", "Student Teacher"

### Structure:
- Professional greeting with actual name
- Clear statement of recommendation
- Relationship context and duration
- 2-3 detailed strengths with examples
- Comparative endorsement or ranking
- Offer to provide additional details
- Closing endorsement and signature

Return ONLY the letter content, no explanations, no code fences.`;

function textToTipTapJson(text: string): TipTapDocument {
  const paragraphs = text.split(/\n\n+/);

  const content: TipTapNode[] = paragraphs.map((para) => {
    if (/^[\s]*[-*][\s]/.test(para)) {
      const items = para.split(/\n/).filter((line) => line.trim());
      return {
        type: "bulletList",
        content: items.map((item) => ({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: item.replace(/^[\s]*[-*][\s]*/, "").trim(),
                },
              ],
            },
          ],
        })),
      };
    }

    const marks: { type: string }[] = [];
    let plainText = para;

    if (plainText.includes("**")) {
      marks.push({ type: "bold" });
      plainText = plainText.replace(/\*\*/g, "");
    }
    if (plainText.includes("*")) {
      marks.push({ type: "italic" });
      plainText = plainText.replace(/\*/g, "");
    }

    return {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: plainText.trim(),
          ...(marks.length > 0 ? { marks } : {}),
        },
      ],
    };
  });

  return {
    type: "doc",
    content,
  };
}

async function generateFreeExamplePayload(slug: string, contentHint?: string) {
  const prompt = `You are an assistant that generates metadata for recommendation letter examples based on the slug.
This is the title: ${contentHint || slug} and you need to generate below data as per the schema.

1. Content: The actual content of the example with real dummy data (no placeholders).
2. Title: The title of the example.
3. Description: A concise summary of the example.
4. Tags: Relevant keywords associated with the example. 3-5 keywords in an array.
5. Category: The main category the example belongs to (e.g., academics, professional, admissions, mentorship).

Refer this guidelines while generating the actual example content ${freeExampleSystemPrompt}

Respond in JSON format with the following fields: title, description, tags, category.
`;

  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    schema: z.object({
      content: z.string(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string().transform((name) => ({ name }))),
      category: z.string(),
    }),
    prompt,
  });

  return object;
}

async function generateProExamplePayload(slug: string, contentHint?: string) {
  const prompt = `You are an assistant that generates metadata for recommendation letter examples based on the slug.
This is the title: ${contentHint || slug} and you need to generate below data as per the schema.

1. Content: The actual content of the example with real dummy data (no placeholders).
2. Title: The title of the example.
3. Description: A concise summary of the example.
4. Tags: Relevant keywords associated with the example. 3-5 keywords in an array.
5. Category: The main category the example belongs to (e.g., academics, professional, admissions, mentorship).

Refer this guidelines while generating the actual example content ${proExampleSystemPrompt}

Respond in JSON format with the following fields: title, description, tags, category.
`;

  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    schema: z.object({
      content: z.string(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string().transform((name) => ({ name }))),
      category: z.string(),
    }),
    prompt,
  });

  return object;
}

async function createExampleRecord(
  slug: string,
  content: string,
  title: string,
  description: string,
  tags: Array<{ name: string }>,
  category: string,
  isPro: boolean
) {
  const tipTapContent = textToTipTapJson(content);
  const exampleInfoResult = await generateExampleInfoCore(content);
  const exampleInfo = exampleInfoResult.exampleInfo ?? [];

  await createExampleInternal({
    name: title,
    description,
    slug,
    content: JSON.stringify(tipTapContent),
    exampleInfo: JSON.stringify(exampleInfo),
    tags: tags.map((tag) => tag.name),
    category: category.toLowerCase(),
    isPro,
  });
}

export async function generateFreeExampleHandler(slug: string, keyword?: string) {
  try {
    const object = await generateFreeExamplePayload(slug, keyword);

    await createExampleRecord(
      slug,
      object.content,
      object.title,
      object.description,
      object.tags,
      object.category,
      false
    );

    return { success: true, slug };
  } catch (error) {
    console.error("Error generating free example:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate the example and related data due to an unexpected error"
    );
  }
}

export async function generateProExampleHandler(slug: string, keyword?: string) {
  try {
    const object = await generateProExamplePayload(slug, keyword);

    await createExampleRecord(
      `${slug}-pro`,
      object.content,
      object.title,
      object.description,
      object.tags,
      object.category,
      true
    );

    return { success: true, slug: `${slug}-pro` };
  } catch (error) {
    console.error("Error generating pro example:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate the example and related data due to an unexpected error"
    );
  }
}
