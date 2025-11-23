"use client";

import * as React from "react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { Button } from "@/components/workspace/tiptap/tiptap-ui-primitive/button";
import { AISelector } from "@/components/workspace/tiptap/tiptap-ui/ai-selector";
import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import SiriOrb from "@/components/workspace/common/SiriOrb";

interface AIBubbleMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor?: any;
}

export function AIBubbleMenu({ editor: providedEditor }: AIBubbleMenuProps) {
  const { editor: contextEditor } = useTiptapEditor(providedEditor);
  const [isAIOpen, setIsAIOpen] = React.useState(false);
  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    flipVertical: false,
  });
  const [hasSelection, setHasSelection] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const selectorRef = React.useRef<HTMLDivElement>(null);
  const editor = providedEditor || contextEditor;
  const [isAIHover, setIsAIHover] = React.useState(false);
  const [isBoldHover, setIsBoldHover] = React.useState(false);
  const [isItalicHover, setIsItalicHover] = React.useState(false);
  const [isUnderlineHover, setIsUnderlineHover] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const calculatePosition = React.useCallback(() => {
    if (!editor) return { top: 0, left: 0, flipVertical: false };

    const { selection } = editor.state;
    const { from, to } = selection;

    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    // Menu dimensions (approximate)
    const menuHeight = 50;
    const selectorHeight = 400;
    const menuWidth = 200;

    // For large selections (like Cmd+A), position near viewport center
    const selectionLength = to - from;
    const isLargeSelection = selectionLength > 1000; // Threshold for large selection

    if (isLargeSelection) {
      // Position in upper portion of visible area
      const finalTop = scrollTop + viewportHeight * 0.2;
      const finalLeft = scrollLeft + viewportWidth / 2;

      return {
        top: finalTop,
        left: finalLeft,
        flipVertical: false,
      };
    }

    try {
      // Get the DOM range for the selection
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);

      // Calculate center position of selection
      const centerX = (start.left + end.right) / 2;
      const topY = start.top;
      const bottomY = end.bottom;

      // Check if coordinates are valid (not NaN or extremely large)
      if (
        !isFinite(centerX) ||
        !isFinite(topY) ||
        !isFinite(bottomY) ||
        Math.abs(centerX) > viewportWidth * 5 ||
        Math.abs(topY) > viewportHeight * 10
      ) {
        // Fall back to viewport center for invalid coordinates
        return {
          top: scrollTop + viewportHeight * 0.2,
          left: scrollLeft + viewportWidth / 2,
          flipVertical: false,
        };
      }

      // Calculate initial positions
      let finalTop = topY + scrollTop - 60;
      let finalLeft = centerX + scrollLeft - 50;
      let flipVertical = false;

      // Check if there's enough space above and below
      const spaceAbove = topY - scrollTop;
      const spaceBelow = viewportHeight - (bottomY - scrollTop);
      const totalSpaceNeeded = menuHeight + selectorHeight + 20;

      if (spaceBelow >= totalSpaceNeeded) {
        finalTop = topY + scrollTop - 60;
        flipVertical = false;
      } else if (spaceAbove >= totalSpaceNeeded) {
        finalTop = bottomY + scrollTop + 10;
        flipVertical = true;
      } else if (spaceBelow > spaceAbove) {
        finalTop = topY + scrollTop - 60;
        flipVertical = false;
      } else {
        finalTop = bottomY + scrollTop + 10;
        flipVertical = true;
      }

      // Check horizontal boundaries
      if (finalLeft + menuWidth > viewportWidth + scrollLeft) {
        finalLeft = viewportWidth + scrollLeft - menuWidth - 10;
      }
      if (finalLeft < scrollLeft) {
        finalLeft = scrollLeft + 10;
      }

      return {
        top: finalTop,
        left: finalLeft,
        flipVertical,
      };
    } catch (error) {
      return {
        top: scrollTop + viewportHeight * 0.2,
        left: scrollLeft + viewportWidth / 2,
        flipVertical: false,
      };
    }
  }, [editor]);

  // Monitor selection changes
  React.useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { selection } = editor.state;
      let hasText = !selection.empty;

      // If TipTap doesn't detect a selection, check browser's native selection
      if (!hasText) {
        const browserSelection = window.getSelection();
        if (browserSelection && browserSelection.rangeCount > 0) {
          const selectedText = browserSelection.toString();
          hasText = selectedText.trim().length > 0;
        }
      }

      setHasSelection(hasText);

      if (hasText) {
        const newPosition = calculatePosition();
        setPosition(newPosition);
      } else {
        // Close AI selector if no selection
        setIsAIOpen(false);
      }
    };

    // Check initial selection
    updateSelection();

    // Listen for selection changes
    editor.on("selectionUpdate", updateSelection);
    editor.on("update", updateSelection);

    // Also listen for native selection changes which catch Cmd+A and scroll selections
    const handleSelectionChange = () => {
      // Small delay to ensure selection is fully updated
      setTimeout(updateSelection, 10);
    };

    // Listen for various selection events
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("keyup", handleSelectionChange);

    // Listen for scroll to update position
    const handleScroll = () => {
      if (hasSelection) {
        const newPosition = calculatePosition();
        setPosition(newPosition);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("update", updateSelection);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("keyup", handleSelectionChange);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [editor, hasSelection, calculatePosition]);

  const handleAIClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsAIOpen(!isAIOpen);
    },
    [isAIOpen]
  );

  const handleAIClose = React.useCallback(() => {
    setIsAIOpen(false);
  }, []);

  // Handle click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isAIOpen &&
        triggerRef.current &&
        selectorRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsAIOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAIOpen]);

  // Don't render if no editor or no selection
  if (!editor || !hasSelection) {
    return null;
  }

  return (
    <>
      {/* Bubble Menu Container */}
      <div
        className="flex items-center gap-1 fixed z-45 py-1 px-1 rounded-xl"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translateX(-50%)",
          backgroundColor: isDarkMode ? "#111" : "white",
          color: isDarkMode ? "white" : "black",
          border: isDarkMode ? "1px solid #134031" : "1px solid #f0f0f0",
          boxShadow: isDarkMode
            ? "0 2px 8px 0 rgba(0, 0, 0, 0.3)"
            : "0 2px 8px 0 rgba(0, 0, 0, 0.06)",
          // padding: "0.5rem",
        }}
      >
        {/* AI Trigger Button */}
        <Button
          ref={triggerRef}
          data-size="sm"
          onClick={handleAIClick}
          onMouseEnter={() => setIsAIHover(true)}
          onMouseLeave={() => setIsAIHover(false)}
          className="flex items-center gap-1.5 rounded p-1.5 text-gray-600 hover:text-gray-900"
          style={{
            cursor: "pointer",
            height: "2rem",
            backgroundColor: isAIHover
              ? isDarkMode
                ? "#212121"
                : "#f8f8f8"
              : "transparent",
          }}
        >
          <SiriOrb
            size={"16px"}
            animationDuration={20}
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

        {/* Separator */}
        <div
          className="w-px h-6 mx-1"
          style={{
            backgroundColor: isDarkMode ? "#374151" : "#d1d5db",
          }}
        />

        {/* Formatting Buttons */}
        <Button
          data-size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`flex items-center justify-center rounded-md p-1.5 ${
            editor.isActive("bold")
              ? " text-blue-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onMouseEnter={() => setIsBoldHover(true)}
          onMouseLeave={() => setIsBoldHover(false)}
          style={{
            cursor: "pointer",
            height: "2rem",
            width: "2rem",
            backgroundColor: isBoldHover
              ? isDarkMode
                ? "#212121"
                : "#f8f8f8"
              : "transparent",
          }}
        >
          <TextBIcon weight="duotone" className="w-3.5 h-3.5" />
        </Button>

        <Button
          data-size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`flex items-center justify-center rounded-md p-1.5 ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onMouseEnter={() => setIsItalicHover(true)}
          onMouseLeave={() => setIsItalicHover(false)}
          style={{
            cursor: "pointer",
            height: "2rem",
            width: "2rem",
            backgroundColor: isItalicHover
              ? isDarkMode
                ? "#212121"
                : "#f8f8f8"
              : "transparent",
          }}
        >
          <TextItalicIcon weight="duotone" className="w-3.5 h-3.5" />
        </Button>

        <Button
          data-size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`flex items-center justify-center rounded-md p-1.5 ${
            editor.isActive("underline")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onMouseEnter={() => setIsUnderlineHover(true)}
          onMouseLeave={() => setIsUnderlineHover(false)}
          style={{
            cursor: "pointer",
            height: "2rem",
            width: "2rem",
            backgroundColor: isUnderlineHover
              ? isDarkMode
                ? "#212121"
                : "#f8f8f8"
              : "transparent",
          }}
        >
          <TextUnderlineIcon weight="duotone" className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* AI Selector */}
      {isAIOpen && (
        <div
          ref={selectorRef}
          className="fixed z-40"
          style={{
            top: (() => {
              const selectorHeight = 230; // Approximate AI selector height
              const bubbleMenuHeight = 50;
              const viewportHeight = window.innerHeight;
              const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

              if (position.flipVertical) {
                // When flipped, position above the bubble menu
                let topPos = position.top - selectorHeight - 10;

                // Ensure it doesn't go above viewport
                const minTop = scrollTop + 10;
                if (topPos < minTop) {
                  topPos = minTop;
                }

                return `${topPos}px`;
              } else {
                // Normal positioning below the bubble menu
                let topPos = position.top + bubbleMenuHeight + 10;

                // Ensure it doesn't go below viewport
                const maxTop = scrollTop + viewportHeight - selectorHeight - 10;
                if (topPos > maxTop) {
                  topPos = maxTop;
                }

                return `${topPos}px`;
              }
            })(),
            left: (() => {
              const selectorWidth = 512; // 32rem = 512px
              const viewportWidth = window.innerWidth;
              const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;

              let leftPos = position.left;

              // Check if selector would go off the right edge
              if (leftPos + selectorWidth / 2 > viewportWidth + scrollLeft) {
                leftPos = viewportWidth + scrollLeft - selectorWidth / 2 - 10;
              }

              // Check if selector would go off the left edge
              if (leftPos - selectorWidth / 2 < scrollLeft) {
                leftPos = scrollLeft + selectorWidth / 2 + 10;
              }

              return `${leftPos}px`;
            })(),
            transform: "translateX(-50%)",
          }}
        >
          <AISelector onClose={handleAIClose} />
        </div>
      )}
    </>
  );
}
