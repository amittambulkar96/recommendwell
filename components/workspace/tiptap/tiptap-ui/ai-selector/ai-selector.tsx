"use client";

import * as React from "react";
import { useCompletion } from "@ai-sdk/react";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/tiptap-ui-primitive/input";
import { Card } from "@/components/workspace/tiptap/tiptap-ui-primitive/card";
import { Separator } from "@/components/ui/separator";
import {
  SparkleIcon,
  WrenchIcon,
  MinusIcon,
  PlusIcon,
  ArrowRightIcon,
  XIcon,
  CheckIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowCounterClockwiseIcon,
  CircleNotchIcon,
  MagicWandIcon,
} from "@phosphor-icons/react";
import { getSelectedText } from "@/components/workspace/tiptap/tiptap-node/ai-highlight-node/ai-highlight-node-extension";
import {
  replaceSelectionWithFormatting,
  insertBelowSelectionWithFormatting,
  insertAfterSelectionWithFormatting,
} from "@/lib/TipTapAIUtils";
import { Input } from "@/components/ui/input";

interface AISelectorProps {
  onClose?: () => void;
}

const AI_COMMANDS = [
  {
    key: "improve",
    label: "Improve",
    icon: SparkleIcon,
  },
  {
    key: "fix",
    label: "Fix grammar",
    icon: WrenchIcon,
  },
  {
    key: "shorter",
    label: "Shorter",
    icon: MinusIcon,
  },
  {
    key: "longer",
    label: "Longer",
    icon: PlusIcon,
  },
  {
    key: "continue",
    label: "Continue",
    icon: ArrowRightIcon,
  },
];

export function AISelector({ onClose }: AISelectorProps) {
  const { editor } = useTiptapEditor();
  const [inputValue, setInputValue] = React.useState("");
  const [selectedText, setSelectedText] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/ai/generate",
  });

  React.useEffect(() => {
    if (editor) {
      const text = getSelectedText(editor);
      setSelectedText(text);
    }
  }, [editor]);

  // Auto-show results when we have completion or are loading
  React.useEffect(() => {
    if (isLoading || completion) {
      setShowResults(true);
    }
  }, [isLoading, completion]);

  const handleAIRequest = React.useCallback(
    (option: string, command?: string) => {
      if (!selectedText || !editor) return;

      setShowResults(true); // Show results immediately

      complete(selectedText, {
        body: {
          option,
          command: command || inputValue,
        },
      });
    },
    [selectedText, editor, complete, inputValue]
  );

  const handleReplaceText = React.useCallback(() => {
    if (!editor || !completion) return;

    replaceSelectionWithFormatting(editor, completion);
    onClose?.();
  }, [editor, completion, onClose]);

  const handleInsertBelow = React.useCallback(() => {
    if (!editor || !completion) return;

    insertBelowSelectionWithFormatting(editor, completion);
    onClose?.();
  }, [editor, completion, onClose]);

  const handleInsertAfter = React.useCallback(() => {
    if (!editor || !completion) return;

    insertAfterSelectionWithFormatting(editor, completion);
    onClose?.();
  }, [editor, completion, onClose]);

  const handleDiscard = React.useCallback(() => {
    setShowResults(false);
    onClose?.();
  }, [onClose]);

  const handleTryAgain = React.useCallback(() => {
    setShowResults(false);
    setInputValue("");
  }, []);

  const handleBack = React.useCallback(() => {
    setShowResults(false);
  }, []);

  if (showResults) {
    return (
      <Card
        className="w-lg max-h-96 overflow-y-auto shadow-lg border"
        style={{
          borderRadius: "0.5rem",
        }}
      >
        <div className="w-full">
          {error && (
            <div className="text-xs text-red-600 p-2 bg-red-50 rounded border border-red-200">
              <strong>Error:</strong> {error.message}
            </div>
          )}

          {/* Completion with better styling */}
          {completion && (
            <>
              <div className="bg-white p-3 rounded text-sm max-h-32 overflow-y-auto">
                <div className="whitespace-pre-wrap text-gray-800">
                  {completion}
                </div>
                {isLoading && (
                  <div className="inline-block w-1 h-4 bg-blue-500 animate-pulse ml-1" />
                )}
              </div>

              {!isLoading && (
                <>
                  <Separator orientation="horizontal" className="" />

                  {/* All actions */}
                  <div className="flex flex-col items-start gap-1 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReplaceText}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-gray-800 hover:bg-accent/40"
                    >
                      <CheckIcon className="h-3 w-3 mr-1 text-purple-500" />
                      Replace
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleInsertAfter}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-gray-800 hover:bg-accent/40"
                    >
                      <ArrowRightIcon className="h-3 w-3 mr-1 text-purple-500" />
                      Insert after
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleInsertBelow}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-gray-800 hover:bg-accent/40"
                    >
                      <ArrowDownIcon className="h-3 w-3 mr-1 text-purple-500" />
                      Insert below
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-gray-800 hover:bg-accent/40"
                    >
                      <ArrowLeftIcon className="h-3 w-3 mr-1 text-purple-500" />
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleTryAgain}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-gray-800 hover:bg-accent/40"
                    >
                      <ArrowCounterClockwiseIcon
                        weight="duotone"
                        className="h-3 w-3 mr-1 text-purple-500"
                      />
                      Retry
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDiscard}
                      className="w-full justify-start h-8 py-1 text-left text-xs text-red-600 hover:text-red-700 hover:bg-accent/40"
                    >
                      <XIcon className="h-3 w-3 mr-1 text-red-500" />
                      Discard
                    </Button>
                  </div>
                </>
              )}
            </>
          )}

          {/* Compact loading state */}
          {!completion && !error && isLoading && (
            <div className="py-4 flex items-center gap-3 text-center text-gray-500 p-2">
              <p className="text-xs pl-2">Thinking</p>
              <CircleNotchIcon
                weight="duotone"
                className="animate-spin h-6 w-6 text-purple-500"
              />
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="w-lg shadow-lg border"
      style={{
        borderRadius: "0.5rem",
      }}
    >
      <div className=" w-full">
        {/* Compact selected text preview */}
        {/* {selectedText && (
          <div className="bg-gray-50 px-2 py-1 rounded text-xs">
            <span className="text-gray-500 font-medium">
              {selectedText.length > 60
                ? `${selectedText.substring(0, 60)}...`
                : selectedText}
            </span>
          </div>
        )} */}

        {/* Custom input - more compact */}
        <div className="space-y-2 flex gap-2 p-1">
          <Input
            placeholder="Tell AI what to do..."
            value={inputValue}
            className="placeholder:text-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 mb-0"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                e.preventDefault();
                handleAIRequest("zap", inputValue);
              }
            }}
          />

          {inputValue.trim() && (
            <Button
              onClick={() => handleAIRequest("zap", inputValue)}
              variant="ghost"
              size="icon"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircleNotchIcon
                  weight="duotone"
                  className="h-3 w-3 animate-spin text-purple-600"
                />
              ) : (
                <MagicWandIcon
                  weight="duotone"
                  className="h-3 w-3 text-purple-600"
                />
              )}
            </Button>
          )}
        </div>

        <Separator orientation="horizontal" className="" />

        {/* Compact command buttons with icons */}
        <div className="space-y-1 flex flex-col gap-1 p-1">
          {AI_COMMANDS.map((command) => {
            const IconComponent = command.icon;
            return (
              <Button
                key={command.key}
                variant="ghost"
                size="sm"
                onClick={() => handleAIRequest(command.key)}
                disabled={isLoading || !selectedText}
                className="w-full h-7 text-left hover:bg-accent/40 disabled:opacity-50 hover:cursor-pointer"
              >
                <div className="flex-1 flex items-center space-x-2">
                  <IconComponent
                    weight="duotone"
                    className="h-3 w-3 text-purple-500"
                  />
                  <span className="text-xs font-normal text-gray-900 dark:text-gray-100">
                    {command.label}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
