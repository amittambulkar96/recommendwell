import { streamObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { TemplateInfoSchema } from "@/lib/TemplateInfoSchema";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    model: openai("gpt-4o") as any,
    schema: TemplateInfoSchema,
    prompt: `You are an AI assistant specialized in analyzing templates. Your task is to analyze the provided template content and generate structured information about its core components and customization tips.

Analyze the template and provide:
1. Core Components: Exactly 4 core components. Each must have a 'title' and 'content'.
2. Customization Tips: Exactly 4 customization tips. Each must have a 'title' and 'content'.

Here is the template content to analyze:
${prompt}`,
  });

  return result.toTextStreamResponse();
}
