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
  let job: Awaited<ReturnType<typeof claimNextTemplateJob>> = null;
  try {
    console.log("[auto-template] cron start");
    const rawBody = await req.text();
    const signature = req.headers.get("upstash-signature");
    console.log("[auto-template] signature present:", Boolean(signature));

    if (signature) {
      const isValid = await receiver.verify({
        signature,
        body: rawBody ?? "",
      });

      if (!isValid) {
        console.error("Invalid QStash signature");
        return new NextResponse("Unauthorized", { status: 401 });
      }
      console.log("[auto-template] QStash signature verified");
    } else if (process.env.NODE_ENV === "production") {
      console.error("Missing QStash signature");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    job = await claimNextTemplateJob();
    if (!job) {
      console.log("[auto-template] no pending jobs");
      return NextResponse.json({ message: "No pending template jobs" });
    }
    console.log("[auto-template] claimed job", {
      slug: job.slug,
      tier: job.tier,
      hasKeyword: Boolean(job.keyword),
    });

    const freePromise =
      job.tier === "free" || job.tier === "both"
        ? generateFreeTemplateHandler(job.slug, job.keyword)
        : Promise.resolve(null);
    const proPromise =
      job.tier === "pro" || job.tier === "both"
        ? generateProTemplateHandler(job.slug, job.keyword)
        : Promise.resolve(null);

    if (job.tier !== "free" && job.tier !== "pro" && job.tier !== "both") {
      console.error("[auto-template] unsupported tier", job.tier);
      throw new Error(`Unsupported tier: ${job.tier}`);
    }

    console.log("[auto-template] generating templates");
    const [freeTemplate, proTemplate] = await Promise.all([
      freePromise,
      proPromise,
    ]);
    console.log("[auto-template] generation complete", {
      free: Boolean(freeTemplate),
      pro: Boolean(proTemplate),
    });

    const baseUrl = process.env.CONVEX_SITE_URL;
    if (!baseUrl) {
      console.error("[auto-template] missing CONVEX_SITE_URL");
      throw new Error("Missing CONVEX_SITE_URL for Convex HTTP actions");
    }
    console.log("[auto-template] using Convex URL", baseUrl);

    // Call convex httpAction route for template one
    if (freeTemplate) {
      console.log("[auto-template] free payload summary", {
        slug: (freeTemplate as { slug?: string }).slug,
        isPro: (freeTemplate as { isPro?: boolean }).isPro,
        hasContent: Boolean((freeTemplate as { content?: string }).content),
        tagsCount: Array.isArray((freeTemplate as { tags?: string[] }).tags)
          ? (freeTemplate as { tags?: string[] }).tags?.length
          : 0,
      });
      console.log("[auto-template] sending free template to Convex");
      const response = await fetch(
        `${process.env.CONVEX_SITE_URL}/internal/create-template`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CRON_INTERNAL_SECRET}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ template: freeTemplate }),
        },
      );

      const responseBody = await response.text();
      console.log("[auto-template] Convex response (free)", {
        status: response.status,
        body: responseBody,
      });

      if (!response.ok) {
        throw new Error("Failed to persist free template payload");
      }
      console.log("[auto-template] free template persisted", response.status);
    }

    if (proTemplate) {
      console.log("[auto-template] pro payload summary", {
        slug: (proTemplate as { slug?: string }).slug,
        isPro: (proTemplate as { isPro?: boolean }).isPro,
        hasContent: Boolean((proTemplate as { content?: string }).content),
        tagsCount: Array.isArray((proTemplate as { tags?: string[] }).tags)
          ? (proTemplate as { tags?: string[] }).tags?.length
          : 0,
      });
      console.log("[auto-template] sending pro template to Convex");
      const response = await fetch(`${baseUrl}/internal/create-template`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CRON_INTERNAL_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ template: proTemplate }),
      });

      const responseBody = await response.text();
      console.log("[auto-template] Convex response (pro)", {
        status: response.status,
        body: responseBody,
      });

      if (!response.ok) {
        throw new Error("Failed to persist pro template payload");
      }
      console.log("[auto-template] pro template persisted", response.status);
    }

    await markTemplateJobDone(job);
    console.log("[auto-template] job marked done", job.slug);

    return NextResponse.json({
      success: true,
      slug: job.slug,
      tier: job.tier,
    });
  } catch (error) {
    console.error("Cron API error:", error);
    if (job) {
      await addTemplateJobBackToQueue(job);
    }
    return NextResponse.json(
      { error: "Internal server error, please try again" },
      { status: 500 },
    );
  }
}
