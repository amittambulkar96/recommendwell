"use client";

import { SimpleEditor } from "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { JSONContent } from "@tiptap/react";
import { useQuery } from "convex/react";
import { use } from "react";

export default function TemplatePage({
  params,
}: {
  params: Promise<{ letterId: string }>;
}) {
  const { letterId } = use(params);

  const document = useQuery(api.letters.getUserLetterById, {
    _id: letterId as Id<"letters">,
  });

  const content = document?.content ? JSON.parse(document.content) : "";

  return (
    <SimpleEditor
      initialContent={content}
      existingDocument={{
        _id: document?._id || "",
        name: document?.name || "",
        slug: document?.slug || "",
        description: document?.description || "",
      }}
      template={null}
      existingDocumentData={
        document
          ? {
              _id: document._id,
              _creationTime: document._creationTime,
              description: document.description,
              name: document.name,
              content: content as JSONContent,
              slug: document.slug,
            }
          : null
      }
    />
  );
}
