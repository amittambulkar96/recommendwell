import { generateObject } from "ai";
import { z } from "zod";
import { generateTemplateInfoCore } from "@/app/api/ai/generate-template-info/route";

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

const freeTemplateSystemPrompt = `You are a helpful assistant that generates professional recommendation letter templates.

## Free Template Guidelines:
Generate a concise but professional recommendation letter template.

### Structure:
- Professional greeting
- Clear statement of recommendation
- Relationship context (how you know the candidate)
- 2-3 key strengths or examples
- Endorsement and closing

### Placeholders to use (adapt based on context):
- [Your Name]
- [Your Title]
- [Organization]
- [Date]
- [Recipient Name]
- [Recipient Title]
- [Recipient Organization]
- [Candidate Name]
- [Relationship]
- [Program/Position]

Return ONLY the letter content, no explanations, no code fences.`;

const proTemplateSystemPrompt = `You are a helpful assistant that generates professional recommendation letter templates.

## Pro Template Guidelines:
Generate a concise but professional recommendation letter template with more detail.

### Structure:
- Professional greeting
- Clear statement of recommendation
- Relationship context and duration
- 2-3 detailed strengths with examples
- Comparison or endorsement statement
- Offer to provide more details
- Professional closing

### Placeholders to use (adapt based on context):
- [Your Name]
- [Your Title]
- [Organization]
- [Date]
- [Recipient Name]
- [Recipient Title]
- [Recipient Organization]
- [Candidate Name]
- [Relationship]
- [Program/Position]
- [Duration]

Return ONLY the letter content, no explanations, no code fences.`;

export function textToTipTapJson(text: string): TipTapDocument {
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

export async function generateFreeTemplatePayload(
  slug: string,
  contentHint?: string,
) {
  const prompt = `You are an assistant that generates metadata for recommendation letter templates based on the slug.
This is the title: ${contentHint || slug} and you need to generate below data as per the schema.

1. Content: The actual content of the template.
2. Title: The title of the template.
3. Description: A concise summary of the template.
4. Tags: Relevant keywords associated with the template. 3-5 keywords in an array.
5. Category: The main category the template belongs to (e.g., academics, professional, admissions, mentorship).

Refer this guidelines while generating the actual template content ${freeTemplateSystemPrompt}

Respond in JSON format with the following fields: title, description, tags, category.
`;

  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    schema: z.object({
      content: z.string(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
    }),
    prompt,
  });

  return object;
}

export async function generateProTemplatePayload(
  slug: string,
  contentHint?: string,
) {
  const prompt = `You are an assistant that generates metadata for recommendation letter templates based on the slug.
This is the title: ${contentHint || slug} and you need to generate below data as per the schema.

1. Content: The actual content of the template.
2. Title: The title of the template.
3. Description: A concise summary of the template.
4. Tags: Relevant keywords associated with the template. 3-5 keywords in an array.
5. Category: The main category the template belongs to (e.g., academics, professional, admissions, mentorship).

Refer this guidelines while generating the actual template content ${proTemplateSystemPrompt}

Respond in JSON format with the following fields: title, description, tags, category.
`;

  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    schema: z.object({
      content: z.string(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
    }),
    prompt,
  });

  return object;
}

async function buildTemplatePayload(
  slug: string,
  content: string,
  title: string,
  description: string,
  tags: string[],
  category: string,
  isPro: boolean,
) {
  const tipTapContent = textToTipTapJson(content);
  let templateInfo: Array<{ coreComponents: unknown[]; customizationTips: unknown[] }> = [];
  try {
    const templateInfoResult = await generateTemplateInfoCore(content);
    templateInfo = templateInfoResult.templateInfo ?? [];
  } catch (error) {
    console.error("Template info generation failed, using fallback:", error);
    templateInfo = [{ coreComponents: [], customizationTips: [] }];
  }

  return {
    name: title,
    description,
    slug,
    content: JSON.stringify(tipTapContent),
    templateInfo: JSON.stringify(templateInfo),
    tags,
    category: category.toLowerCase(),
    isPro,
  };
}

export async function generateFreeTemplateHandler(
  slug: string,
  keyword?: string,
) {
  try {
    const objectFree = await generateFreeTemplatePayload(slug, keyword);
    return await buildTemplatePayload(
      slug,
      objectFree.content,
      objectFree.title,
      objectFree.description,
      objectFree.tags,
      objectFree.category,
      false,
    );
  } catch (error) {
    console.error("Error generating free template:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate the template and related data due to an unexpected error",
    );
  }
}

export async function generateProTemplateHandler(
  slug: string,
  keyword?: string,
) {
  try {
    const objectPro = await generateProTemplatePayload(slug, keyword);
    return await buildTemplatePayload(
      `${slug}-pro`,
      objectPro.content,
      objectPro.title,
      objectPro.description,
      objectPro.tags,
      objectPro.category,
      true,
    );
  } catch (error) {
    console.error("Error generating pro template:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate the template and related data due to an unexpected error",
    );
  }
}
