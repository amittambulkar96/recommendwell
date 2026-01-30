import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JSONContent } from "@tiptap/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Doc } from "@/convex/_generated/dataModel";
import { StaticContent } from "../tiptap/tiptap-templates/simple/StaticContent";
// import CheckUserProAndRenderButton from "./CheckUserProAndRenderButton";

type Template = Doc<"templates">;

interface TemplateInfo {
  coreComponents: Array<{
    title: string;
    content: string;
  }>;
  customizationTips: Array<{
    title: string;
    content: string;
  }>;
}

interface TemplateIntroductionProps {
  template: Template;
  content: JSONContent;
}

// Define the content structure interface
interface ContentStructure {
  title: string;
  introduction: string;
  coreComponents: Array<{
    title: string;
    content: string;
  }>;
  customizationTips: Array<{
    title: string;
    content: string;
  }>;
  faq: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export async function TemplateIntroduction({
  template,
  content,
}: TemplateIntroductionProps) {
  // Base fallback content
  const baseFallbackContent: ContentStructure = {
    title: `Understanding Your ${template.name}`,
    introduction: `This ${template.name.toLowerCase()} is designed to help you resign professionally and maintain positive relationships with your employer.`,
    coreComponents: [],
    customizationTips: [],
    faq: [],
  };

  let currentContent: ContentStructure;
  const templateInfo: TemplateInfo | undefined = JSON.parse(
    template.templateInfo,
  )[0];

  if (templateInfo) {
    currentContent = {
      title: `Understanding Your ${template.name}`,
      introduction: `This ${template.name.toLowerCase()} is designed to help you resign professionally and maintain positive relationships with your employer.`,
      coreComponents: templateInfo.coreComponents || [],
      customizationTips: templateInfo.customizationTips || [],
      faq: [],
    };
  } else {
    currentContent = baseFallbackContent;
  }

  return (
    <section
      id="template-introduction"
      className="container mx-auto px-6 py-40"
    >
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          {currentContent.title}
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          {currentContent.introduction}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left Column - Template Preview */}
        <div className="relative">
          <h2 className="text-lg md:text-2xl font-semibold mb-6">
            Template Preview
          </h2>

          {/* <CheckUserProAndRenderButton templateIsPro={template.isPro} /> */}
          <div
            className={cn(
              "bg-background  border border-border rounded-lg p-6 relative",
            )}
          >
            <StaticContent content={content} />
          </div>
        </div>

        {/* Right Column - Template Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Understanding This Letter
          </h2>

          {/* Core Components */}
          {currentContent.coreComponents.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Key Components</h3>
              <div className="space-y-4">
                {currentContent.coreComponents.map((component, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary/20 pl-4"
                  >
                    <h4 className="font-medium text-sm mb-2">
                      {component.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {component.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customization Tips */}
          {currentContent.customizationTips.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Customization Tips</h3>
              <div className="space-y-3">
                {currentContent.customizationTips.map((tip, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tip.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      {currentContent.faq.length > 0 && (
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="multiple"
            className="w-full -space-y-px"
            defaultValue={currentContent.faq.map((item) => item.id)}
          >
            {currentContent.faq.map((item) => (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
              >
                <AccordionTrigger className="justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground ps-7 pb-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* CTA Section */}
      <div className="relative overflow-hidden text-center rounded-2xl border border-border bg-gradient-to-br from-emerald-100/50 via-blue-100/50 to-purple-100/50 dark:from-emerald-900/50 dark:via-blue-900/50 dark:to-purple-900/50 p-8 text-foreground shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-10 [background:radial-gradient(55%_60%_at_0%_0%,_white_0,_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-10 [background:radial-gradient(45%_55%_at_100%_0%,_white_0,_transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-3">
            Ready to write your resignation letter?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use the editor above to customize this template. Keep the right tone
            and include all the essentials—quickly and confidently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse More Templates
            </Link>
            <Link
              href="/resources/how-to-write-recommendation-letter"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium border border-input bg-background text-foreground hover:bg-accent transition-colors"
            >
              Writing Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
