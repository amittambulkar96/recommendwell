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
  let job: Awaited<ReturnType<typeof claimNextExampleJob>> = null;
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

    job = await claimNextExampleJob();
    if (!job) {
      return NextResponse.json({ message: "No pending example jobs" });
    }
    const freePromise =
      job.tier === "free" || job.tier === "both"
        ? generateFreeExampleHandler(job.slug, job.keyword)
        : Promise.resolve(null);
    const proPromise =
      job.tier === "pro" || job.tier === "both"
        ? generateProExampleHandler(job.slug, job.keyword)
        : Promise.resolve(null);

    if (job.tier !== "free" && job.tier !== "pro" && job.tier !== "both") {
      throw new Error(`Unsupported tier: ${job.tier}`);
    }

    const [freeExample, proExample] = await Promise.all([
      freePromise,
      proPromise,
    ]);

    const baseUrl = process.env.CONVEX_SITE_URL;
    if (!baseUrl) {
      throw new Error("Missing CONVEX_SITE_URL for Convex HTTP actions");
    }

    if (freeExample) {
      const response = await fetch(
        `${process.env.CONVEX_SITE_URL}/internal/create-example`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CRON_INTERNAL_SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ example: freeExample }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to persist free example payload");
      }
    }

    if (proExample) {
      const response = await fetch(`${baseUrl}/internal/create-example`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CRON_INTERNAL_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ example: proExample }),
      });

      if (!response.ok) {
        throw new Error("Failed to persist pro example payload");
      }
    }

    await markExampleJobDone(job);

    return NextResponse.json({
      success: true,
      slug: job.slug,
      tier: job.tier,
    });
  } catch (error) {
    console.error("Cron API error:", error);
    if (job) {
      await addExampleJobBackToQueue(job);
    }
    return NextResponse.json(
      { error: "Internal server error, please try again" },
      { status: 500 },
    );
  }
}
