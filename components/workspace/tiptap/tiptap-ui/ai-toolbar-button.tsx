"use client";

import * as React from "react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SiriOrb from "@/components/workspace/common/SiriOrb";
import { Button } from "@/components/ui/button";

interface AIToolbarButtonProps {
  editor?: Editor | null;
}

export function AIToolbarButton({
  editor: providedEditor,
}: AIToolbarButtonProps) {
  const { editor: contextEditor } = useTiptapEditor(providedEditor);
  const editor = providedEditor || contextEditor;

  const handleAIClick = React.useCallback(() => {
    if (!editor) return;

    // Check if there's a selection
    const { selection } = editor.state;
    if (selection.empty) {
      // If no selection, select the current word or paragraph
      const { $anchor } = selection;
      const paragraph = $anchor.parent;

      if (paragraph && paragraph.textContent.length > 0) {
        // Select the entire paragraph if cursor is in one
        const startPos = $anchor.start($anchor.depth);
        const endPos = $anchor.end($anchor.depth);
        editor
          .chain()
          .focus()
          .setTextSelection({ from: startPos, to: endPos })
          .run();
      } else {
        // If no content, show a message or do nothing
        return;
      }
    }

    // The existing AIBubbleMenu will automatically show when there's a selection
    // We just need to ensure there's a selection for it to appear
  }, [editor]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="sm" variant="ghost" onClick={handleAIClick}>
          <SiriOrb
            size={"16px"}
            animationDuration={15}
            colors={{
              bg: "#3B82F6", // blue-500
              c1: "#10B981", // emerald-500
              c2: "#3B82F6", // blue-500
              c3: "#A855F7", // purple-500
            }}
            className="drop-shadow-2xl mr-1"
          />
          <span className="text-xs font-medium">Ask AI</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Ask AI to help with your text</p>
      </TooltipContent>
    </Tooltip>
  );
}
