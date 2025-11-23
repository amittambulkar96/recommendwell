import { SimpleEditor } from "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor";

export default function BlankTemplatePage() {
  // Empty content for blank template
  const emptyContent: {
    type: "doc";
    content: Array<{
      type: string;
      attrs: Record<string, unknown>;
    }>;
  } = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          textAlign: null,
        },
      },
    ],
  };

  return (
    <SimpleEditor
      initialContent={emptyContent}
      template={null}
      existingDocumentData={null}
    />
  );
}
