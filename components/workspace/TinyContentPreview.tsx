"use client";

import { JSONContent } from "@tiptap/react";
import "./tiny-content-preview.css";
import { useGeneratedHtml } from "@/lib/TipTapHTMLGenerator";

interface TinyContentPreviewProps {
  content: JSONContent;
}

export function TinyContentPreview({ content }: TinyContentPreviewProps) {
  const html = useGeneratedHtml(content);

  if (!html) {
    return (
      <div className="w-full h-full bg-linear-to-br from-muted/10 to-background" />
    );
  }

  return (
    <div
      className="tiny-content-preview prose prose-sm w-full h-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
