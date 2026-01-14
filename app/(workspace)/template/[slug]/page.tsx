import { SimpleEditor } from "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor";
import { api } from "@/convex/_generated/api";
import { JSONContent } from "@tiptap/react";
import { fetchQuery } from "convex/nextjs";
import { toast } from "sonner";

export async function generateStaticParams() {
  const templates = await fetchQuery(api.templates.getAllTemplates);

  if (!templates) {
    return [];
  }

  return templates.map((template: { slug: string }) => ({
    slug: template.slug,
  }));
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await fetchQuery(api.templates.getTemplateBySlug, { slug });

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
          <p className="text-muted-foreground">
            The requested template could not be found.
          </p>
        </div>
      </div>
    );
  }

  let content = {};
  try {
    content = template.content ? JSON.parse(template.content) : {};
  } catch (error) {
    console.error("Failed to parse template content:", error);
    toast.error("Failed to parse template content");
  }

  const transformedTemplate = {
    slug: template.slug,
    description: template.description,
    tags: template.tags,
    category: template.category,
    id: template._id,
    content: content as JSONContent,
    name: template.name,
    createdAt: new Date(template._creationTime),
    updatedAt: new Date(template._creationTime),
    previewImageUrl: null as string | null,
    isPro: template.isPro,
  };

  return (
    <SimpleEditor
      initialContent={content}
      template={transformedTemplate}
      existingDocumentData={null}
    />
  );
}
