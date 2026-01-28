import {
  generateFreeExampleHandler,
  generateProExampleHandler,
} from "@/lib/example-generator";
import {
  addExampleJobBackToQueue,
  claimNextExampleJob,
  markExampleJobDone,
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

    const job = await claimNextExampleJob();
    if (!job) {
      return NextResponse.json({ message: "No pending example jobs" });
    }

    try {
      const tasks: Array<Promise<unknown>> = [];
      if (job.tier === "free" || job.tier === "both") {
        tasks.push(generateFreeExampleHandler(job.slug, job.keyword));
      }
      if (job.tier === "pro" || job.tier === "both") {
        tasks.push(generateProExampleHandler(job.slug, job.keyword));
      }

      if (tasks.length === 0) {
        throw new Error(`Unsupported tier: ${job.tier}`);
      }

      await Promise.all(tasks);
      await markExampleJobDone(job);

      return NextResponse.json({
        success: true,
        slug: job.slug,
        tier: job.tier,
      });
    } catch (error) {
      console.error(`Failed to generate example for ${job.slug}:`, error);
      await addExampleJobBackToQueue(job);
      return NextResponse.json(
        { error: "Example generation failed", slug: job.slug, tier: job.tier },
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
