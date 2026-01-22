import { TemplateInfoSchema } from "@/lib/TemplateInfoSchema";
import { generateObject } from "ai";
import { NextRequest } from "next/server";
// import { headers } from "next/headers";

export const maxDuration = 300;

// System prompt for template analysis
const SYSTEM_PROMPT = `You are an AI assistant specialized in analyzing resignation letter templates. Your task is to analyze the provided template content and generate structured information about its core components and customization tips.

Analyze the template and provide:
1.  **Core Components**: Exactly 4 core components. Each must have a 'title' and 'content'.
2.  **Customization Tips**: Exactly 4 customization tips. Each must have a 'title' and 'content'.

Each core component should identify a key structural element of the resignation letter.
Each customization tip should provide practical advice for adapting the template to different situations.

Return the analysis in a structured format. The final output must be a JSON object with a single key "templateInfo", which contains an array with a single object. This object should have two keys: "coreComponents" and "customizationTips". Do not use 'description' as a key; use 'content' instead.`;

/**
 * Core function to generate template info from content.
 * Can be called internally without authentication.
 */
export async function generateTemplateInfoCore(content: string) {
  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    prompt:
      `${SYSTEM_PROMPT}\n\nAnalyze this resignation letter template and provide core components and customization tips:\n\n` +
      content,
    schema: TemplateInfoSchema,
    temperature: 0.3,
  });

  return object; // { templateInfo: [...] }
}

export async function POST(req: NextRequest) {
  //TODO : First check for session and use and then the user should be ADMIN which is me

  // const isPro = true; // TODO: replace with real pro status

  try {
    // const session = await auth.api.getSession({ headers: await headers() });
    // if (!session || !session.user) {
    //   return new Response(
    //     "Please sign up to ResignWell Pro to use AI template analysis",
    //     { status: 401 },
    //   );
    // }
    // if (!isPro) {
    //   return new Response(
    //     "Please upgrade to ResignWell Pro to use AI template analysis",
    //     { status: 403 },
    //   );
    // }

    const body = await req.json();

    if (!body || typeof body !== "string") {
      return new Response("Missing or invalid template content", {
        status: 400,
      });
    }

    // Use the core function
    const result = await generateTemplateInfoCore(body);

    // Return the generated template info
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("AI template info generation error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
