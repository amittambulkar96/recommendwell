import { JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/core";
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
import { useMemo } from "react";

const extensions = [
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
];

export function useGeneratedHtml(content: JSONContent) {
  return useMemo(() => {
    if (!content) {
      return "";
    }
    return generateHTML(content, extensions);
  }, [content]);
}
