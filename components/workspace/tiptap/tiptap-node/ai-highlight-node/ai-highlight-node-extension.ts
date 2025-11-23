import { Mark, mergeAttributes } from "@tiptap/core";

export interface AIHighlightOptions {
  multicolor: boolean;
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiHighlight: {
      /**
       * Set an AI highlight mark
       */
      setAIHighlight: (attributes?: { color?: string }) => ReturnType;
      /**
       * Toggle an AI highlight mark
       */
      toggleAIHighlight: (attributes?: { color?: string }) => ReturnType;
      /**
       * Unset an AI highlight mark
       */
      unsetAIHighlight: () => ReturnType;
    };
  }
}

export const AIHighlight = Mark.create<AIHighlightOptions>({
  name: "aiHighlight",

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }

    return {
      color: {
        default: "#c1ecf970",
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; border-radius: 2px; padding: 0 2px;`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
        getAttrs: (element) => {
          if (typeof element === "string") return false;
          const hasDataAttribute = element.hasAttribute("data-ai-highlight");
          return hasDataAttribute ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-ai-highlight": "",
        class: "ai-highlight",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setAIHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleAIHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetAIHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

// Helper functions for text manipulation
export const getSelectedText = (editor: {
  state: {
    selection: { from: number; to: number; empty: boolean };
    doc: { textBetween: (from: number, to: number) => string };
  };
}): string => {
  if (!editor) return "";

  // First try to get text from TipTap's selection
  const { from, to, empty } = editor.state.selection;
  if (!empty) {
    return editor.state.doc.textBetween(from, to);
  }

  // If TipTap's selection is empty, check browser's native selection
  const browserSelection = window.getSelection();
  if (browserSelection && browserSelection.rangeCount > 0) {
    const selectedText = browserSelection.toString();
    if (selectedText.trim().length > 0) {
      return selectedText;
    }
  }

  return "";
};

export const replaceSelection = (
  editor: {
    chain: () => {
      focus: () => {
        deleteSelection: () => {
          insertContent: (text: string) => { run: () => void };
        };
      };
    };
  },
  text: string
) => {
  if (!editor) return;
  editor.chain().focus().deleteSelection().insertContent(text).run();
};

export const insertBelowSelection = (
  editor: {
    state: { selection: { to: number } };
    chain: () => {
      focus: () => {
        insertContentAt: (
          position: number,
          text: string
        ) => { run: () => void };
      };
    };
  },
  text: string
) => {
  if (!editor) return;
  const { to } = editor.state.selection;
  editor.chain().focus().insertContentAt(to, `\n\n${text}`).run();
};

export const insertAfterSelection = (
  editor: {
    state: { selection: { to: number } };
    chain: () => {
      focus: () => {
        insertContentAt: (
          position: number,
          text: string
        ) => { run: () => void };
      };
    };
  },
  text: string
) => {
  if (!editor) return;
  const { to } = editor.state.selection;
  editor
    .chain()
    .focus()
    .insertContentAt(to, " " + `${text}`)
    .run();
};
