import { streamObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { ExampleInfoSchema } from "@/lib/ExampleInfoSchema";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    model: openai("gpt-4o") as any,
    schema: ExampleInfoSchema,
    prompt: `You are an AI assistant specialized in analyzing examples. Your task is to analyze the provided example content and generate structured information about its core components and customization tips.

Analyze the example and provide:
1. Core Components: Exactly 4 core components. Each must have a 'title' and 'content'.
2. Customization Tips: Exactly 4 customization tips. Each must have a 'title' and 'content'.

Here is the example content to analyze:
${prompt}`,
  });

  return result.toTextStreamResponse();
}
