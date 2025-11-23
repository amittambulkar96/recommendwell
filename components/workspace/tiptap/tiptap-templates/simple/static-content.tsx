import { renderToHTMLString } from "@tiptap/static-renderer";
import { JSONContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import { HorizontalRule } from "@/components/workspace/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

// Match your SimpleEditor extensions (server-safe only)
const staticExtensions = [
  StarterKit.configure({
    horizontalRule: false,
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }),
  HorizontalRule,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  TextStyle,
  // Skip client-only extensions: Selection, Placeholder, ImageUploadNode
];

interface StaticContentProps {
  content: JSONContent;
  className?: string;
}

export async function StaticContent({
  content,
  className = "",
}: StaticContentProps) {
  if (!content) return null;

  const htmlString = renderToHTMLString({
    extensions: staticExtensions,
    content,
    options: {
      // Handle custom nodes that might not render properly
      nodeMapping: {
        imageUploadNode: () => "", // Skip upload nodes in static render
      },
      unhandledNode: ({ node }: { node: { type: { name: string } } }) => {
        console.warn(`Unhandled node type: ${node.type.name}`);
        return "";
      },
    },
  });

  return (
    <div
      className={`
        static-content tiptap ProseMirror static-content-preview       
        ${"prose prose-slate max-w-none"} 
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}
