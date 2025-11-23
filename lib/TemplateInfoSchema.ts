import { z } from "zod";

// define a schema for the notifications
export const TemplateInfoSchema = z.object({
  templateInfo: z.array(
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
