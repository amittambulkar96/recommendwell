import { httpRouter } from "convex/server";
import { createAuth } from "./auth";
import { authComponent } from "./authComponent";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

http.route({
  path: "/internal/create-template",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      // 1. Check the internal service auth
      const authHeader = request.headers.get("authorization") ?? "";
      const expected = `Bearer ${process.env.CRON_INTERNAL_SECRET}`;
      if (authHeader !== expected) {
        console.error("[convex-http] unauthorized create-template");
        return new Response("Unauthorized", { status: 401 });
      }
      const body = await request.json();
      console.log("[convex-http] create-template payload", {
        hasTemplate: Boolean(body?.template),
        slug: body?.template?.slug,
        isPro: body?.template?.isPro,
      });

      // 2. Send that data to the database using internal mutation from convex
      await ctx.runMutation(
        internal.templateExampleJobs.updateTemplateAutoJob,
        body,
      );

      console.log("[convex-http] create-template persisted", body?.template?.slug);
      return new Response("ok", { status: 200 });
    } catch (error) {
      console.error("Cron API error:", error);
      return new Response("Failed", { status: 500 });
    }
  }),
});

http.route({
  path: "/internal/create-example",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const authHeader = request.headers.get("authorization") ?? "";
      const expected = `Bearer ${process.env.CRON_INTERNAL_SECRET}`;
      if (authHeader !== expected) {
        console.error("[convex-http] unauthorized create-example");
        return new Response("Unauthorized", { status: 401 });
      }

      const body = await request.json();
      console.log("[convex-http] create-example payload", {
        hasExample: Boolean(body?.example),
        slug: body?.example?.slug,
        isPro: body?.example?.isPro,
      });
      await ctx.runMutation(
        internal.templateExampleJobs.updateExampleAutoJob,
        body,
      );

      console.log("[convex-http] create-example persisted", body?.example?.slug);
      return new Response("ok", { status: 200 });
    } catch (error) {
      console.error("Cron API error:", error);
      return new Response("Failed", { status: 500 });
    }
  }),
});

export default http;
