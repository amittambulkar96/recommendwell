import { SimpleEditor } from "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor";
import { ExampleIntroduction } from "@/components/workspace/common/ExampleIntroduction";
import { api } from "@/convex/_generated/api";
import { JSONContent } from "@tiptap/react";
import { fetchQuery } from "convex/nextjs";
import { toast } from "sonner";

export async function generateStaticParams() {
  const examples = await fetchQuery(api.examples.getAllExamples);

  if (!examples) {
    return [];
  }

  return examples.map((example: { slug: string }) => ({
    slug: example.slug,
  }));
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = await fetchQuery(api.examples.getExampleBySlug, { slug });

  if (!example) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Example Not Found</h1>
          <p className="text-muted-foreground">
            The requested example could not be found.
          </p>
        </div>
      </div>
    );
  }

  let content = {};
  try {
    content = example.content ? JSON.parse(example.content) : {};
  } catch (error) {
    console.error("Failed to parse example content:", error);
    toast.error("Failed to parse example content");
  }

  const transformedExample = {
    slug: example.slug,
    description: example.description,
    tags: example.tags,
    category: example.category,
    _id: example._id,
    content: content as JSONContent,
    name: example.name,
    createdAt: new Date(example._creationTime),
    updatedAt: new Date(example._creationTime),
    previewImageUrl: null as string | null,
    isPro: example.isPro,
  };

  return (
    <div>
      <SimpleEditor
        initialContent={content}
        example={transformedExample}
        existingDocumentData={null}
      />
      <ExampleIntroduction example={example} content={content} />
    </div>
  );
}
