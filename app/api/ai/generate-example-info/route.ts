import { generateObject } from "ai";
import { NextRequest } from "next/server";
// import { headers } from "next/headers";
import { ExampleInfoSchema } from "@/lib/ExampleInfoSchema";

export const maxDuration = 300;

const SYSTEM_PROMPT = `You are an AI assistant specialized in analyzing recommendation letter examples. Your task is to analyze the provided example content and generate structured information about its core components and customization tips.

Analyze the example and provide:
1.  **Core Components**: Exactly 4 core components. Each must have a 'title' and 'content'.
2.  **Customization Tips**: Exactly 4 customization tips. Each must have a 'title' and 'content'.

Each core component should identify a key structural element of the recommendation letter example.
Each customization tip should provide practical advice for adapting the example to different situations.

Return the analysis in a structured format. The final output must be a JSON object with a single key "exampleInfo", which contains an array with a single object. This object should have two keys: "coreComponents" and "customizationTips". Do not use 'description' as a key; use 'content' instead.`;

export async function generateExampleInfoCore(content: string) {
  const { object } = await generateObject({
    model: "moonshotai/kimi-k2-0905",
    prompt:
      `${SYSTEM_PROMPT}\n\nAnalyze this recommendation letter example and provide core components and customization tips:\n\n` +
      content,
    schema: ExampleInfoSchema,
    temperature: 0.3,
  });

  return object;
}

export async function POST(req: NextRequest) {
  try {
    //TODO : First check for session and use and then the user should be ADMIN which is me

    // const session = await auth.api.getSession({ headers: await headers() });
    // if (!session || !session.user) {
    //   return new Response(
    //     "Please sign up to ResignWell Pro to use AI example analysis",
    //     { status: 401 },
    //   );
    // }

    // const userProStatus = await getUserProStatus(session.user.id);
    // const isPro = userProStatus.isPro;

    // if (!isPro) {
    //   return new Response(
    //     "Please upgrade to ResignWell Pro to use AI example analysis",
    //     { status: 403 },
    //   );
    // }

    const body = await req.json();

    if (!body || typeof body !== "string") {
      return new Response("Missing or invalid example content", {
        status: 400,
      });
    }

    const result = await generateExampleInfoCore(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("AI example info generation error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
