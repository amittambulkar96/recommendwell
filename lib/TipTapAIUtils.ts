import { Editor, JSONContent } from "@tiptap/react";

/**
 * Extracts formatting information from a selection in TipTap editor
 */
export function extractSelectionContext(editor: Editor): {
  from: number;
  to: number;
  originalContent: JSONContent[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marks: any[];
  parentNode: JSONContent | null;
} {
  const { from, to } = editor.state.selection;
  const { doc } = editor.state;

  // Get the selected content as JSON to preserve structure
  const slice = doc.slice(from, to);
  const originalContent: JSONContent[] = [];

  // Extract content nodes
  slice.content.forEach((node) => {
    originalContent.push(node.toJSON());
  });

  // Get marks (formatting) at the selection start and convert to JSON-friendly form
  const marks = Array.from(doc.resolve(from).marks()).map((mark) => {
    // ProseMirror Mark has .type.name and .attrs; many implementations expose .toJSON
    // Normalize to { type, attrs }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maybeToJSON = (mark as unknown as { toJSON?: () => any }).toJSON;
    if (typeof maybeToJSON === "function") {
      return maybeToJSON.call(mark);
    }
    return { type: mark.type?.name, attrs: mark.attrs || undefined };
  });

  // Get parent node context
  const parentPos = doc.resolve(from);
  const parentNode = parentPos.parent.toJSON();

  return {
    from,
    to,
    originalContent,
    marks,
    parentNode,
  };
}

/**
 * Creates new TipTap content by applying AI text to original formatting context
 */
export function createFormattedContent(
  aiText: string,
  originalContext: ReturnType<typeof extractSelectionContext>
): JSONContent[] {
  // If original content was just plain text in a paragraph, preserve that structure
  if (originalContext.originalContent.length === 1) {
    const originalNode = originalContext.originalContent[0];

    if (originalNode.type === "text") {
      // Simple text replacement - preserve marks
      return [
        {
          type: "text",
          text: aiText,
          marks: originalNode.marks || [],
        },
      ];
    }

    if (originalNode.type === "paragraph") {
      // Replace paragraph content while preserving structure
      return [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: aiText,
              marks: originalNode.content?.[0]?.marks || [],
            },
          ],
        },
      ];
    }
  }

  // For complex selections, try to preserve the structure of the first element
  const firstNode = originalContext.originalContent[0];
  const marks =
    (firstNode?.type === "paragraph"
      ? firstNode.content?.[0]?.marks
      : firstNode?.marks) ||
    originalContext.marks ||
    [];

  // First, split by double line breaks (paragraph breaks)
  const paragraphs = aiText.split(/\n\s*\n/).filter(Boolean);

  if (paragraphs.length > 1) {
    // Multiple paragraphs - create paragraph nodes
    return paragraphs.map((text, index) => ({
      type: "paragraph",
      content: [
        {
          type: "text",
          text: text.trim(),
          marks: index === 0 ? marks : [], // Only apply marks to first paragraph
        },
      ],
    }));
  } else {
    // Check for single line breaks within the text
    const lines = aiText.split(/\n/).filter((line) => line.trim() !== "");

    if (lines.length > 1) {
      // Multiple lines with single line breaks - create separate paragraphs for each line
      return lines.map((line, index) => ({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: line.trim(),
            marks: index === 0 ? marks : [], // Only apply marks to first line
          },
        ],
      }));
    } else {
      // Single line - preserve original structure type
      const text = aiText.trim();

      // If original was in a heading, preserve heading level
      if (firstNode?.type === "heading") {
        return [
          {
            type: "heading",
            attrs: { level: firstNode.attrs?.level || 1 },
            content: [
              {
                type: "text",
                text,
                marks,
              },
            ],
          },
        ];
      }

      // Default to paragraph
      return [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text,
              marks,
            },
          ],
        },
      ];
    }
  }
}

/**
 * Replaces selected content with AI-generated text while preserving formatting
 */
export function replaceSelectionWithFormatting(
  editor: Editor,
  aiText: string
): void {
  if (!editor || !aiText) return;

  const context = extractSelectionContext(editor);
  const newContent = createFormattedContent(aiText, context);

  // Replace the selection with the new formatted content
  editor.chain().focus().deleteSelection().insertContent(newContent).run();
}

/**
 * Inserts AI-generated content below selection while preserving formatting context
 */
export function insertBelowSelectionWithFormatting(
  editor: Editor,
  aiText: string
): void {
  if (!editor || !aiText) return;

  const { to } = editor.state.selection;
  const context = extractSelectionContext(editor);
  let newContent = createFormattedContent(aiText, context);

  // Ensure block-valid insertion: wrap lone text node in a paragraph for below-insert
  if (
    newContent.length === 1 &&
    newContent[0] &&
    newContent[0].type === "text"
  ) {
    newContent = [
      {
        type: "paragraph",
        content: [newContent[0]],
      },
    ];
  }

  // Insert content below current selection
  editor
    .chain()
    .focus()
    .insertContentAt(to, [
      { type: "paragraph", content: [{ type: "text", text: "" }] }, // Empty line
      ...newContent,
    ])
    .run();
}

/**
 * Inserts AI-generated content after selection while preserving formatting context
 */
export function insertAfterSelectionWithFormatting(
  editor: Editor,
  aiText: string
): void {
  if (!editor || !aiText) return;

  const { to } = editor.state.selection;
  const context = extractSelectionContext(editor);

  // For inline insertion, just use text with preserved marks
  const marks =
    (context.originalContent[0]?.type === "paragraph"
      ? context.originalContent[0]?.content?.[0]?.marks
      : context.originalContent[0]?.marks) ||
    context.marks ||
    [];

  editor
    .chain()
    .focus()
    .insertContentAt(to, [
      {
        type: "text",
        text: " " + aiText,
        marks,
      },
    ])
    .run();
}
