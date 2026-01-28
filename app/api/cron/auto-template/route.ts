import {
  generateFreeTemplateHandler,
  generateProTemplateHandler,
} from "@/lib/template-generator";
import {
  addTemplateJobBackToQueue,
  claimNextTemplateJob,
  markTemplateJobDone,
} from "@/lib/upstash";
import { Receiver } from "@upstash/qstash";
import { NextRequest, NextResponse } from "next/server";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("upstash-signature");

    if (signature) {
      const isValid = await receiver.verify({
        signature,
        body: rawBody ?? "",
      });

      if (!isValid) {
        console.error("Invalid QStash signature");
        return new NextResponse("Unauthorized", { status: 401 });
      }
    } else if (process.env.NODE_ENV === "production") {
      console.error("Missing QStash signature");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const job = await claimNextTemplateJob();
    if (!job) {
      return NextResponse.json({ message: "No pending template jobs" });
    }

    try {
      const tasks: Array<Promise<unknown>> = [];
      if (job.tier === "free" || job.tier === "both") {
        tasks.push(generateFreeTemplateHandler(job.slug, job.keyword));
      }
      if (job.tier === "pro" || job.tier === "both") {
        tasks.push(generateProTemplateHandler(job.slug, job.keyword));
      }

      if (tasks.length === 0) {
        throw new Error(`Unsupported tier: ${job.tier}`);
      }

      await Promise.all(tasks);
      await markTemplateJobDone(job);

      return NextResponse.json({
        success: true,
        slug: job.slug,
        tier: job.tier,
      });
    } catch (error) {
      console.error(`Failed to generate template for ${job.slug}:`, error);
      await addTemplateJobBackToQueue(job);
      return NextResponse.json(
        { error: "Template generation failed", slug: job.slug, tier: job.tier },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Cron API error:", error);
    return NextResponse.json(
      { error: "Internal server error, please try again" },
      { status: 500 }
    );
  }
}
