"use client";

import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Editor } from "@tiptap/react";
import {
  ScissorsIcon,
  CopyIcon,
  ClipboardTextIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
// import SiriOrb from "../smoothui/ui/SiriOrb";

interface EditorContextMenuProps {
  editor?: Editor | null;
  children: React.ReactNode;
}

export function EditorContextMenu({
  editor: providedEditor,
  children,
}: EditorContextMenuProps) {
  const { editor: contextEditor } = useTiptapEditor(providedEditor);
  const editor = providedEditor || contextEditor;

  // const handleAIAssist = React.useCallback(() => {
  //   if (!editor) return;

  //   // Check if there's a selection
  //   const { selection } = editor.state;
  //   if (selection.empty) {
  //     // If no selection, select the current word or paragraph
  //     const { $anchor } = selection;
  //     const paragraph = $anchor.parent;

  //     if (paragraph && paragraph.textContent.length > 0) {
  //       // Select the entire paragraph if cursor is in one
  //       const startPos = $anchor.start($anchor.depth);
  //       const endPos = $anchor.end($anchor.depth);
  //       editor
  //         .chain()
  //         .focus()
  //         .setTextSelection({ from: startPos, to: endPos })
  //         .run();
  //     }
  //   }
  // }, [editor]);

  const handleCut = React.useCallback(() => {
    if (!editor || !navigator?.clipboard?.writeText) return;
    const { from, to, empty } = editor.state.selection;
    if (empty) return;
    const text = editor.state.doc.textBetween(from, to, "\n");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        editor.chain().focus().deleteRange({ from, to }).run();
      })
      .catch(() => {});
  }, [editor]);

  const handleCopy = React.useCallback(() => {
    if (!editor || !navigator?.clipboard?.writeText) return;
    const { from, to, empty } = editor.state.selection;
    if (empty) return;
    const text = editor.state.doc.textBetween(from, to, "\n");
    navigator.clipboard.writeText(text).catch(() => {});
  }, [editor]);

  const handlePaste = React.useCallback(() => {
    if (!editor || !navigator?.clipboard?.readText) return;
    navigator.clipboard
      .readText()
      .then((text) => {
        if (!text) return;
        editor.chain().focus().insertContent(text).run();
      })
      .catch(() => {});
  }, [editor]);

  const handleBold = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const handleItalic = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleUnderline = React.useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  // const hasSelection = React.useMemo(() => {
  //   if (!editor) return false;
  //   const { selection } = editor.state;
  //   return !selection.empty;
  // }, [editor]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {/* <ContextMenuItem
          onClick={handleAIAssist}
          className="flex items-center gap-2"
        >
          <SiriOrb
            size={"16px"}
            animationDuration={15}
            colors={{
              bg: "#C084FC",
              c1: "#60A5FA",
              c2: "#C084FC",
              c3: "#60A5FA",
            }}
            className="drop-shadow-2xl mr-1"
          />
          <span className="text-xs font-medium">Ask AI</span>
        </ContextMenuItem> */}

        {/* <ContextMenuSeparator /> */}

        <ContextMenuItem
          onClick={handleCut}
          className="flex items-center gap-2"
        >
          <ScissorsIcon weight="duotone" className="h-4 w-4" />
          <span>Cut</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+X</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <CopyIcon weight="duotone" className="h-4 w-4" />
          <span>Copy</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+C</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handlePaste}
          className="flex items-center gap-2"
        >
          <ClipboardTextIcon weight="duotone" className="h-4 w-4" />
          <span>Paste</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+V</span>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={handleBold}
          className="flex items-center gap-2"
        >
          <TextBIcon weight="duotone" className="h-4 w-4" />
          <span>Bold</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+B</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handleItalic}
          className="flex items-center gap-2"
        >
          <TextItalicIcon weight="duotone" className="h-4 w-4" />
          <span>Italic</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+I</span>
        </ContextMenuItem>

        <ContextMenuItem
          onClick={handleUnderline}
          className="flex items-center gap-2"
        >
          <TextUnderlineIcon weight="duotone" className="h-4 w-4" />
          <span>Underline</span>
          <span className="ml-auto text-xs text-muted-foreground">Ctrl+U</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
