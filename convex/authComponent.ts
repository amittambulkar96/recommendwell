import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { components, internal } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";

export const authComponent: any = createClient<DataModel>(
  components.betterAuth,
  {
    verbose: true,
  }
);
