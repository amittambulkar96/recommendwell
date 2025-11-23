"use client";

import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/workspace/tiptap/tiptap-ui-primitive/toolbar";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/workspace/tiptap/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/workspace/tiptap/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/workspace/tiptap/tiptap-icons/link-icon";
import { ColorHighlightPopoverContent } from "../../tiptap-ui/color-highlight-popover";
import { LinkContent } from "../../tiptap-ui/link-popover";

export const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);
