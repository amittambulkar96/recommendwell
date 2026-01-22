import { z } from "zod";

// define a schema for the example info
export const ExampleInfoSchema = z.object({
  exampleInfo: z.array(
    z.object({
      coreComponents: z.array(
        z.object({
          title: z.string().describe("Title of the core component."),
          content: z.string().describe("Content of the core component."),
        })
      ),
      customizationTips: z.array(
        z.object({
          title: z.string().describe("Title of the customization tip."),
          content: z.string().describe("Content of the customization tip."),
        })
      ),
    })
  ),
});
