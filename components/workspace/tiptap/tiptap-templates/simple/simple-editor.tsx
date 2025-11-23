"use client";

// import { useSessionProvider } from "@/utils/providers/session-provider";
// import { getCurrentUserProStatus } from "@/lib/user-pro-status";
import {
  Editor,
  EditorContent,
  EditorContext,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { renderToHTMLString } from "@tiptap/static-renderer";
import * as React from "react";
import { toPng } from "html-to-image";
import { experimental_useObject as useObject } from "@ai-sdk/react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";
import { TextStyle, LineHeight } from "@tiptap/extension-text-style";

// --- UI Primitives ---
import { Spacer } from "@/components/workspace/tiptap/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/workspace/tiptap/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/workspace/tiptap/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/workspace/tiptap/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/workspace/tiptap/tiptap-node/heading-node/heading-node.scss";
import { HorizontalRule } from "@/components/workspace/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/workspace/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/workspace/tiptap/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from "@/components/workspace/tiptap/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/workspace/tiptap/tiptap-node/list-node/list-node.scss";
import "@/components/workspace/tiptap/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { AIBubbleMenu } from "@/components/workspace/tiptap/tiptap-ui/ai-bubble-menu";
import { AIToolbarButton } from "@/components/workspace/tiptap/tiptap-ui/ai-toolbar-button";
import { EditorContextMenu } from "@/components/workspace/tiptap/tiptap-ui/editor-context-menu";
import { BlockquoteButton } from "@/components/workspace/tiptap/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/workspace/tiptap/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from "@/components/workspace/tiptap/tiptap-ui/color-highlight-popover";
import { HeadingDropdownMenu } from "@/components/workspace/tiptap/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/workspace/tiptap/tiptap-ui/image-upload-button";
import {
  LinkButton,
  LinkContent,
  LinkPopover,
} from "@/components/workspace/tiptap/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/workspace/tiptap/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/workspace/tiptap/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/workspace/tiptap/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/workspace/tiptap/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/workspace/tiptap/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/workspace/tiptap/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/workspace/tiptap/tiptap-icons/link-icon";

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/TipTapUtils";

// --- Styles ---
import "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor.scss";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
// import {
//   createDocument,
//   updateDocument,
//   deleteDocument,
// } from "@/utils/actions/document/action";
// import {
//   createTemplate,
//   updateTemplate,
// } from "@/utils/actions/template/action";
import {
  ArrowsVerticalIcon,
  BookIcon,
  // CameraIcon,
  CaretCircleDownIcon,
  CloudArrowDownIcon,
  EraserIcon,
  FileDocIcon,
  FilePdfIcon,
  FileTxtIcon,
  MonitorArrowUpIcon,
  TrashIcon,
  TextAlignLeftIcon,
  TextSuperscriptIcon,
} from "@phosphor-icons/react";
import html2canvas from "html2canvas-pro";
import { usePathname, useRouter } from "next/navigation";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
// import { genUploader } from "uploadthing/client";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
// export const { uploadFiles } = genUploader<OurFileRouter>();

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TemplateInfoSchema } from "@/lib/TemplateInfoSchema";
import { cn } from "@/lib/utils";
// import { ButtonProUpgrade } from "@/components/common/ButtonProUpgrade";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Template {
  slug: string;
  description: string;
  tags: string[];
  category: string;
  id: string;
  content: JSONContent;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  previewImageUrl: string | null;
  isPro: boolean;
}
interface Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  name: string;
  content: JSONContent;
  slug: string;
  previewImageUrl: string | null;
}

interface TemplateInfo {
  coreComponents: Array<{
    title: string;
    content: string;
  }>;
  customizationTips: Array<{
    title: string;
    content: string;
  }>;
}

interface ContentNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: ContentNode[];
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
}

interface EditorContent {
  type: string;
  content: ContentNode[];
}

interface TemplateFormData {
  templateName: string;
  slug: string;
  description: string;
  tags: string;
  category: string;
  isProTemplate: boolean;
  templateInfo?: {
    coreComponents: Array<{
      title: string;
      content: string;
    }>;
    customizationTips: Array<{
      title: string;
      content: string;
    }>;
  };
}

interface DocumentFormData {
  documentTitle: string;
  slug: string;
  description: string;
}

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  // onPreviewClick,
  isMobile,
  showTemplateButton,
  activeUserSession,
  editor,
  existingDocument,
  existingTemplate,
  onDeleteLocalDraft,
  onDeleteDocument,
  isDeletingDocument,
}: // createLetterImage,
// createLetterImageUpload,
{
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  onPreviewClick?: () => void;
  isMobile: boolean;
  showTemplateButton: boolean;
  activeUserSession: boolean;
  editor: Editor | null;
  existingDocument?: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  // createLetterImageUpload: () => Promise<Blob | null>;
  existingTemplate?: Template | null;
  onDeleteLocalDraft: () => void;
  onDeleteDocument: () => void;
  isDeletingDocument: boolean;
  createLetterImage: () => void;
}) => {
  const [isSavingDocument, setIsSavingDocument] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingTxt, setIsDownloadingTxt] = useState(false);
  const [isDownloadingDoc, setIsDownloadingDoc] = useState(false);
  const [templateInfoData, setTemplateInfoData] = useState<
    TemplateInfo | undefined
  >(undefined);
  const [templateInfoSuccess, setTemplateInfoSuccess] = useState("");

  // Use object hook for AI template info generation
  const {
    isLoading: isGeneratingTemplateInfo,
    object,
    submit,
  } = useObject({
    api: "/api/ai/generate-template-info",
    schema: TemplateInfoSchema,
    onFinish() {
      setTemplateInfoSuccess(`Template Info generation completed`);
    },
  });

  const [templateFormData, setTemplateFormData] =
    React.useState<TemplateFormData>({
      templateName: "",
      slug: "",
      description: "",
      tags: "",
      category: "",
      isProTemplate: false,
      templateInfo: undefined,
    });

  const [documentFormData, setDocumentFormData] =
    React.useState<DocumentFormData>({
      documentTitle: existingDocument?.name ?? "",
      slug: existingDocument?.slug ?? "",
      description: existingDocument?.description ?? "",
    });

  React.useEffect(() => {
    if (existingDocument) {
      setDocumentFormData({
        documentTitle: existingDocument.name,
        slug: existingDocument.slug,
        description: existingDocument.description,
      });
    }
  }, [existingDocument]);

  React.useEffect(() => {
    if (existingTemplate) {
      setTemplateFormData({
        templateName: existingTemplate.name,
        slug: existingTemplate.slug,
        description: existingTemplate.description,
        tags: existingTemplate.tags.join(", "),
        category: existingTemplate.category,
        isProTemplate: existingTemplate.isPro,
        templateInfo: undefined,
      });
    }
  }, [existingTemplate]);

  const handleCreateSlug = (
    field: keyof TemplateFormData | keyof DocumentFormData,
    value: string | boolean,
    formType: "template" | "document"
  ) => {
    if (formType === "template") {
      setTemplateFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };

        // Auto-generate slug from template name
        if (field === "templateName" && typeof value === "string") {
          const slug = value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
            .trim();

          newData.slug = slug;
        }

        return newData;
      });
    } else {
      setDocumentFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };

        // Auto-generate slug from document title
        if (field === "documentTitle" && typeof value === "string") {
          const slug = value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
            .trim();

          newData.slug = slug;
        }

        return newData;
      });
    }
  };

  // Handle AI template info generation
  const handleGenerateTemplateInfo = async () => {
    if (!editor) {
      toast.error("Editor not ready");
      return;
    }

    const templateContent = editor.getText();
    if (!templateContent || templateContent.trim().length === 0) {
      toast.error("Please add some content to generate template info");
      return;
    }

    // Submit the template content to generate structured info

    submit(templateContent);
  };

  React.useEffect(() => {
    if (object) {
      setTemplateInfoData(object?.templateInfo as unknown as TemplateInfo);
    }
  }, [object]);

  const handleDownloadPdf = async () => {
    let styleEl: HTMLStyleElement | null = null;
    let tempRoot: HTMLDivElement | null = null;
    try {
      if (!editor) {
        toast.error("Editor not ready");
        return;
      }

      setIsDownloadingPdf(true);
      const textContent = editor.getText();
      if (!textContent || textContent.trim().length === 0) {
        setIsDownloadingPdf(false);
        toast.error("Nothing to download, Write your letter first.");
        return;
      }

      // Fire-and-forget tracking call if logged-in; does not block download
      try {
        await fetch("/api/downloads/pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
      } catch (e) {
        setIsDownloadingPdf(false);
        console.warn("PDF tracking failed", e);
      }

      // Build an offscreen, print-optimized container using editor HTML
      const html = editor.getHTML();
      tempRoot = document.createElement("div");
      tempRoot.setAttribute("data-export", "pdf-html");
      tempRoot.style.position = "fixed";
      tempRoot.style.left = "-10000px";
      tempRoot.style.top = "0";
      tempRoot.style.width = "800px"; // content width roughly similar to letter/A4 readable width
      tempRoot.style.padding = "48px"; // page margins
      tempRoot.style.background = "#ffffff";
      tempRoot.className = "prose prose-slate max-w-none";
      tempRoot.innerHTML = html;
      document.body.appendChild(tempRoot);

      // Ensure empty paragraphs render as visible blank lines
      try {
        const paras = tempRoot.querySelectorAll("p");
        paras.forEach((p) => {
          const onlyBr =
            p.childElementCount === 1 && p.firstElementChild?.tagName === "BR";
          if (onlyBr || (p.textContent || "").trim() === "") {
            p.innerHTML = "&nbsp;";
          }
        });
      } catch {}

      // Apply temporary export styles to improve readability in PDF
      styleEl = document.createElement("style");
      styleEl.id = "pdf-export-style";
      styleEl.textContent = `
        [data-export='pdf-html'] {
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          font-kerning: normal;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji;
        }
        /* Normal line-height inside paragraphs; separation via margins only */
        [data-export='pdf-html'] p {
          line-height: 1.6 !important;
          margin-top: 0 !important;
          margin-bottom: 1rem !important;
        }
        /* Lists: slightly tighter lines, small vertical spacing between items */
        [data-export='pdf-html'] li {
          line-height: 1.55 !important;
          margin-top: 0.2rem !important;
          margin-bottom: 0.2rem !important;
        }
        [data-export='pdf-html'] ol,
        [data-export='pdf-html'] ul { margin-bottom: 1rem !important; }
        /* Headings with sensible line-heights */
        [data-export='pdf-html'] h1 { line-height: 1.25 !important; margin-bottom: 0.8rem !important; }
        [data-export='pdf-html'] h2 { line-height: 1.3 !important; margin-bottom: 0.7rem !important; }
        [data-export='pdf-html'] h3 { line-height: 1.35 !important; margin-bottom: 0.6rem !important; }
        /* Keep letter-spacing minimal to avoid clumpy feel */
        [data-export='pdf-html'] * { letter-spacing: 0.001em; }
      `;
      document.head.appendChild(styleEl);

      // Render DOM to canvas at high scale for clarity
      const canvas = await html2canvas(tempRoot, {
        scale: Math.min(4, (window.devicePixelRatio || 1) * 2.5),
        useCORS: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
      });

      const pageWidth = 595.28; // A4 width in pt (72 dpi)
      const pageHeight = 841.89; // A4 height in pt
      const margin = 36; // 0.5 inch margins
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const scale = usableWidth / canvas.width;
      const sliceHeightPx = Math.floor(usableHeight / scale);
      const totalSlices = Math.max(1, Math.ceil(canvas.height / sliceHeightPx));

      const pdfDoc = await PDFDocument.create();

      // Helper: convert dataURL to Uint8Array
      const dataUrlToUint8 = (dataUrl: string) => {
        const base64 = dataUrl.split(",")[1] ?? "";
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
      };

      for (let i = 0; i < totalSlices; i++) {
        const sourceY = i * sliceHeightPx;
        const remainingPx = canvas.height - sourceY;
        const currentSlicePx = Math.min(sliceHeightPx, remainingPx);

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = currentSlicePx;
        const ctx = sliceCanvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          currentSlicePx,
          0,
          0,
          canvas.width,
          currentSlicePx
        );

        const dataUrl = sliceCanvas.toDataURL("image/png");
        const bytes = dataUrlToUint8(dataUrl);
        const png = await pdfDoc.embedPng(bytes);

        const drawWidth = usableWidth;
        const drawHeight = (currentSlicePx * usableWidth) / canvas.width; // keep aspect

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(png, {
          x: margin,
          y: pageHeight - margin - drawHeight,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      const filenameBase = (
        documentFormData.documentTitle ||
        templateFormData.templateName ||
        "resignation-letter"
      )
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filenameBase || "resignation-letter"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setIsDownloadingPdf(false);
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error(error);
      setIsDownloadingPdf(false);
      toast.error("Failed to download PDF");
    } finally {
      // Remove temporary styles
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
      if (tempRoot && tempRoot.parentNode) {
        tempRoot.parentNode.removeChild(tempRoot);
      }
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadTxt = async () => {
    try {
      if (!editor) {
        toast.error("Editor not ready");
        return;
      }
      setIsDownloadingTxt(true);

      const textContent = editor.getText();
      if (!textContent || textContent.trim().length === 0) {
        setIsDownloadingTxt(false);
        toast.error("Nothing to download, Write your letter first.");
        return;
      }

      // Fire-and-forget tracking call if logged-in; does not block download
      try {
        await fetch("/api/downloads/txt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
      } catch (e) {
        setIsDownloadingTxt(false);
        console.warn("TXT tracking failed", e);
      }

      const filenameBase = (
        documentFormData.documentTitle ||
        templateFormData.templateName ||
        "resignation-letter"
      )
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const blob = new Blob([textContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filenameBase || "resignation-letter"}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setIsDownloadingTxt(false);
      toast.success("Letter text downloaded successfully");
    } catch (error) {
      console.error(error);
      setIsDownloadingTxt(false);
      toast.error("Failed to download letter text");
    } finally {
      setIsDownloadingTxt(false);
    }
  };

  const handleDownloadDoc = async () => {
    try {
      if (!editor) {
        toast.error("Editor not ready");
        return;
      }

      setIsDownloadingDoc(true);

      const htmlString = editor.getHTML();
      const headerHtml = "<p>Document Header</p>";
      const footerHtml = "<p>Page Footer</p>";

      // Call the API route to convert HTML to DOCX
      const response = await fetch("/api/downloads/docx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          htmlString,
          headerHtml,
          footerHtml,
          options: {
            orientation: "portrait",
            pageSize: {
              width: 11906, // A4 width in twips (210mm)
              height: 16838, // A4 height in twips (297mm)
            },
            margins: {
              top: 1440,
              right: 1800,
              bottom: 1440,
              left: 1800,
            },
            title:
              documentFormData.documentTitle ||
              templateFormData.templateName ||
              "Resignation Letter",
            creator: "ResignWell",
          },
        }),
      });

      if (!response.ok) {
        // Handle different error types with specific messages
        const errorData = await response.json().catch(() => ({}));

        switch (response.status) {
          case 401:
            toast.error(
              errorData.message ||
                "Please sign up to ResignWell Pro to download DOCX files"
            );
            setIsDownloadingDoc(false);
            return;
          case 403:
            toast.error(
              errorData.message ||
                "Please upgrade to ResignWell Pro to download DOCX files"
            );
            setIsDownloadingDoc(false);
            return;
          case 400:
            toast.error(
              errorData.message || "Invalid request - please try again"
            );
            setIsDownloadingDoc(false);
            return;
          default:
            toast.error(errorData.message || "Failed to convert HTML to DOCX");
            setIsDownloadingDoc(false);
            return;
        }
      }

      const docxArrayBuffer = await response.arrayBuffer();
      const blob = new Blob([docxArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);

      const filenameBase = (
        documentFormData.documentTitle ||
        templateFormData.templateName ||
        "resignation-letter"
      )
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const a = document.createElement("a");
      a.href = url;
      a.download = `${filenameBase || "resignation-letter"}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setIsDownloadingDoc(false);
      toast.success("DOCX downloaded successfully");
    } catch (error) {
      console.error(error);
      setIsDownloadingDoc(false);
      toast.error("Failed to download letter as DOCX");
    } finally {
      setIsDownloadingDoc(false);
    }
  };

  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!templateFormData.templateName.trim()) {
      toast.error("Template name is required");
      return;
    }

    if (!templateFormData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    if (!templateFormData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    if (!templateFormData.category.trim()) {
      toast.error("Category is required");
      return;
    }

    const json = editor?.getJSON();

    try {
      setIsSavingTemplate(true);

      if (existingTemplate) {
        // Update existing template
        // const response = await updateTemplate(existingTemplate.id, {
        //   name: templateFormData.templateName,
        //   description: templateFormData.description,
        //   slug: templateFormData.slug,
        //   content: JSON.parse(JSON.stringify(json)) as object,
        //   tags: templateFormData.tags.split(",").map((tag) => tag.trim()),
        //   category: templateFormData.category.toLowerCase(),
        //   isPro: templateFormData.isProTemplate,
        //   previewImageUrl: existingTemplate.previewImageUrl,
        //   templateInfo: templateInfoData || object?.templateInfo || {},
        // });

        // if (!response.success && response.error)
        //   throw new Error(response.message);

        // if (response.success) toast.success("Template updated successfully");
        // Reset template info success message after save
        setTemplateInfoSuccess("");
      } else {
        // Create new template
        // const blob = await createLetterImageUpload();
        // if (!blob) {
        //   throw new Error("Failed to create preview image");
        // }
        // // Convert blob to File and upload to upload thing
        // const file = new File([blob], `${templateFormData.slug}.png`, {
        //   type: "image/png",
        // });
        // const uploadThingResponse = await uploadFiles("imageUploader", {
        //   files: [file],
        // });
        // const response = await createTemplate({
        //   name: templateFormData.templateName,
        //   description: templateFormData.description,
        //   slug: templateFormData.slug,
        //   content: JSON.parse(JSON.stringify(json)) as object,
        //   tags: templateFormData.tags.split(",").map((tag) => tag.trim()),
        //   category: templateFormData.category.toLowerCase(),
        //   isPro: templateFormData.isProTemplate,
        //   previewImageUrl: null,
        //   templateInfo: templateInfoData || undefined,
        // });
        // if (!response.success && response.error)
        //   throw new Error(response.message);
        // if (response.success) toast.success("Template created successfully");
        // // Reset form only for new templates and clear template info success message
        // setTemplateInfoSuccess("");
        // setTemplateFormData({
        //   templateName: "",
        //   slug: "",
        //   description: "",
        //   tags: "",
        //   category: "",
        //   isProTemplate: false,
        // });
      }
    } catch (error) {
      toast.error(
        existingTemplate
          ? "Failed to update template"
          : "Failed to create template",
        {
          description: error instanceof Error ? error.message : "Unknown error",
        }
      );
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingDocument(true);

    // Basic validation only for new documents; existing documents use fixed metadata
    if (!existingDocument) {
      if (!documentFormData.documentTitle.trim()) {
        toast.error("Document title is required");
        setIsSavingDocument(false);
        return;
      }
      if (!documentFormData.slug.trim()) {
        toast.error("Slug is required");
        setIsSavingDocument(false);
        return;
      }
      if (!documentFormData.description.trim()) {
        toast.error("Description is required");
        setIsSavingDocument(false);
        return;
      }
    }

    // Authorization: only logged-in Pro users may save
    try {
      const res = await fetch("/api/upload/authorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (res.status === 401) {
        toast.error("Please login and upgrade to Pro to save your document");
        setIsSavingDocument(false);
        return;
      }
      if (res.status === 403) {
        toast.error("Upgrade to Pro to save documents to the cloud");
        setIsSavingDocument(false);
        return;
      }
      if (!res.ok) {
        toast.error("Unable to authorize save. Please try again.");
        setIsSavingDocument(false);
        return;
      }

      setIsSavingDocument(false);
    } catch (e) {
      console.error(e);
      toast.error("Network error. Please try again.");
      setIsSavingDocument(false);
      return;
    } finally {
      setIsSavingDocument(false);
    }

    const json = editor?.getJSON();

    try {
      if (existingDocument) {
        // const response = await updateDocument(existingDocument.id, {
        //   name: documentFormData.documentTitle,
        //   description: documentFormData.description,
        //   slug: documentFormData.slug,
        //   content: JSON.parse(JSON.stringify(json)) as object,
        // });
        // if (!response.success && response.error)
        //   throw new Error(response.message);
        // if (response.success) {
        //   toast.success("Changes saved");
        // }
      } else {
        //Get blob file from html to image library
        // const blob = await createLetterImageUpload();
        // if (!blob) {
        //   throw new Error("Failed to create preview image");
        // }
        // // Convert blob to File and upload to uploadthing
        // const file = new File([blob], "preview.png", { type: "image/png" });
        // const uploadThingResponse = await uploadFiles("imageUploader", {
        //   files: [file],
        // });
        // const response = await createDocument({
        //   name: documentFormData.documentTitle,
        //   description: documentFormData.description,
        //   slug: documentFormData.slug,
        //   content: JSON.parse(JSON.stringify(json)) as object,
        //   originalTemplateId: "",
        //   previewImageUrl: null,
        // });
        // if (!response.success && response.error)
        //   throw new Error(response.message);
        // if (response.success) toast.success("Document created successfully");
        // setDocumentFormData({
        //   documentTitle: "",
        //   slug: "",
        //   description: "",
        // });
      }
      setIsSavingDocument(false);
    } catch (error) {
      toast.error(
        existingDocument
          ? "Failed to save changes"
          : "Failed to create document",
        {
          description: error instanceof Error ? error.message : "Unknown error",
        }
      );
      setIsSavingDocument(false);
    } finally {
      setIsSavingDocument(false);
    }
  };

  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {/* {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )} */}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <AIToolbarButton editor={editor} />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <TextSuperscriptIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <span className="tiptap-button-text">Text Effects</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0.5">
              <MarkButton type="superscript" />
              Superscript
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0.5">
              <MarkButton type="subscript" />
              Subscript
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <TextAlignLeftIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <span className="tiptap-button-text">Text direction</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0.5">
              <TextAlignButton align="left" />
              Left
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0.5">
              <TextAlignButton align="center" />
              Center
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0.5">
              <TextAlignButton align="right" />
              Right
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0.5">
              <TextAlignButton align="justify" />
              Justify
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button size="xs" variant="ghost">
                  <ArrowsVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Line height</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <span className="tiptap-button-text">Line height</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                editor
                  ?.chain()
                  .focus()
                  .toggleTextStyle({ lineHeight: "1.5" })
                  .run();
              }}
            >
              <span className="tiptap-button-text">1.5</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                editor
                  ?.chain()
                  .focus()
                  .toggleTextStyle({ lineHeight: "2" })
                  .run();
              }}
            >
              <span className="tiptap-button-text">2</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                editor
                  ?.chain()
                  .focus()
                  .toggleTextStyle({ lineHeight: "3" })
                  .run();
              }}
            >
              <span className="tiptap-button-text">3</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarGroup>

      <ToolbarGroup>
        <ImageUploadButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* {onPreviewClick && (
        <>
          <ToolbarGroup>
            <Button
              onClick={onPreviewClick}
              className="flex items-center gap-2 border border-border"
            >
              <EyeIcon className="tiptap-button-icon" />
              <span className="tiptap-button-text">Preview</span>
            </Button>
          </ToolbarGroup>
          <ToolbarSeparator />
        </>
      )} */}

      <ToolbarGroup>
        {/* Download dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button size="xs" variant="outline">
                  <CloudArrowDownIcon weight="duotone" className="size-4" />
                  <span className="ml-1">Download</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download your document</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <CloudArrowDownIcon weight="duotone" className="size-4" />
              <span className="tiptap-button-text">Download as</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleDownloadPdf();
              }}
              disabled={isDownloadingPdf}
            >
              <FilePdfIcon weight="duotone" className="size-4" />
              {isDownloadingPdf ? "Downloading..." : "PDF"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleDownloadTxt();
              }}
              disabled={isDownloadingTxt}
            >
              <FileTxtIcon weight="duotone" className="size-4" />
              {isDownloadingTxt ? "Downloading..." : "TXT"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleDownloadDoc();
              }}
              disabled={isDownloadingDoc}
            >
              <FileDocIcon weight="duotone" className="size-4" />
              {isDownloadingDoc ? "Downloading..." : "DOCX"}
              <Badge variant="default" className="text-[0.6rem] ml-2">
                Pro
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete actions dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button size="xs" variant="destOutline">
                  <TrashIcon weight="duotone" className="size-4" />
                  <span className="ml-1">Delete</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete options</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="start" sideOffset={6}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <TrashIcon weight="duotone" className="size-4" />
              <span className="tiptap-button-text">Delete options</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Delete local draft */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EraserIcon weight="duotone" className="size-4 mr-2" />
                  Delete Local Draft
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete local draft?</DialogTitle>
                  <DialogDescription>
                    This action is not reversible. Your local draft on this
                    device will be permanently removed. We will restore the
                    original content for this page.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive" onClick={onDeleteLocalDraft}>
                      Delete draft
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete saved letter - only shown when existingDocument exists */}
            {existingDocument && (
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <TrashIcon weight="duotone" className="size-4 mr-2" />
                    Delete Saved Letter
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Delete this letter?</DialogTitle>
                    <DialogDescription>
                      This action is not reversible. Your saved letter will be
                      permanently removed from your account.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button data-style="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        data-style="primary"
                        onClick={onDeleteDocument}
                        disabled={isDeletingDocument}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDeletingDocument ? "Deleting..." : "Delete letter"}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Save on the cloud */}
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  onClick={(e) => {
                    if (!activeUserSession) {
                      e.preventDefault();
                      e.stopPropagation();
                      toast.error(
                        "Please login to your pro account to save your document"
                      );
                      return;
                    }
                  }}
                  size="xs"
                  variant="outline"
                >
                  <MonitorArrowUpIcon weight="duotone" className="size-4" />
                  <span className="ml-1">Upload</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your document on the cloud</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {existingDocument ? "Save changes" : "Save your document"}
              </DialogTitle>
              <DialogDescription>
                {existingDocument
                  ? "Update your saved document with your latest changes."
                  : "Save your current document to your account for later editing."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentTitle">Document Title</Label>
                <Input
                  id="documentTitle"
                  type="text"
                  placeholder="Enter document title"
                  className="placeholder:text-accent-foreground/60 placeholder:text-sm"
                  value={documentFormData.documentTitle}
                  onChange={(e) =>
                    handleCreateSlug(
                      "documentTitle",
                      e.target.value,
                      "document"
                    )
                  }
                  required
                  // disabled={!!existingDocument}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentSlug">Slug</Label>
                <Input
                  id="documentSlug"
                  type="text"
                  disabled={true}
                  placeholder="e.g., my-resignation-letter"
                  className="placeholder:text-accent-foreground/60 placeholder:text-sm"
                  value={documentFormData.slug}
                  onChange={(e) =>
                    handleCreateSlug("slug", e.target.value, "document")
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentDescription">Description</Label>
                <Textarea
                  id="documentDescription"
                  placeholder="Enter document description"
                  className="placeholder:text-accent-foreground/60 placeholder:text-sm"
                  value={documentFormData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleCreateSlug("description", e.target.value, "document")
                  }
                  required
                  // disabled={!!existingDocument}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="button"
                variant="default"
                onClick={handleDocumentSubmit}
                disabled={isSavingDocument}
              >
                {isSavingDocument
                  ? "Saving..."
                  : existingDocument
                    ? "Save changes"
                    : "Save Letter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Save as template */}
        {showTemplateButton && (
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    disabled={!activeUserSession}
                    size="xs"
                    variant="default"
                  >
                    <BookIcon weight="duotone" className="size-4" />
                    <span className="ml-1">
                      {existingTemplate
                        ? "Update Template"
                        : "Save as Template"}
                    </span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save as template</p>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {existingTemplate ? "Update template" : "Save as template"}
                </DialogTitle>
                <DialogDescription>
                  {existingTemplate
                    ? "Update your template with your latest changes."
                    : "Save your current document as a reusable template for others to use."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    type="text"
                    placeholder="Enter template name"
                    className="placeholder:text-accent-foreground/60 placeholder:text-xs"
                    value={templateFormData.templateName}
                    onChange={(e) =>
                      handleCreateSlug(
                        "templateName",
                        e.target.value,
                        "template"
                      )
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    type="text"
                    disabled={true}
                    placeholder="e.g., grateful-teacher-resignation"
                    className="placeholder:text-accent-foreground/60 placeholder:text-xs"
                    value={templateFormData.slug}
                    onChange={(e) =>
                      handleCreateSlug("slug", e.target.value, "template")
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    className="placeholder:text-accent-foreground/60 placeholder:text-xs"
                    value={templateFormData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleCreateSlug(
                        "description",
                        e.target.value,
                        "template"
                      )
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    type="text"
                    placeholder="e.g., teacher, resignation, professional"
                    className="placeholder:text-accent-foreground/60 placeholder:text-xs"
                    value={templateFormData.tags}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleCreateSlug("tags", e.target.value, "template")
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    type="text"
                    placeholder="e.g., healthcare, 2 weeks notice, notice"
                    className="placeholder:text-accent-foreground/60 placeholder:text-xs"
                    value={templateFormData.category}
                    onChange={(e) =>
                      handleCreateSlug("category", e.target.value, "template")
                    }
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isProTemplate"
                    checked={templateFormData.isProTemplate}
                    onCheckedChange={(checked: boolean) =>
                      handleCreateSlug("isProTemplate", checked, "template")
                    }
                  />
                  <Label htmlFor="isProTemplate">Is this a Pro template?</Label>
                </div>

                <div className="space-y-2 flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={handleGenerateTemplateInfo}
                    disabled={isGeneratingTemplateInfo}
                    data-style="outline"
                  >
                    <span className="mr-2">✨</span>
                    {isGeneratingTemplateInfo
                      ? "Generating..."
                      : "Generate Template Info"}
                  </Button>
                  <p className="text-xs text-emerald-600">
                    {templateInfoSuccess}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleTemplateSubmit}
                  disabled={isSavingTemplate}
                >
                  {isSavingTemplate
                    ? "Saving..."
                    : existingTemplate
                      ? "Update Template"
                      : "Save Template"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* {showTemplateButton && (
          <Button size="xs" variant="outline" onClick={createLetterImage}>
            <CameraIcon weight="duotone" className="size-4" />
            <span className="ml-1">Capture Preview</span>
          </Button>
        )} */}
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
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

export function SimpleEditor({
  initialContent,
  showStaticPreview,
  enableStaticRenderer,
  existingDocument,
  template,
  existingDocumentData,
}: {
  initialContent?: string | EditorContent;
  showStaticPreview?: boolean;
  enableStaticRenderer?: boolean;
  existingDocument?: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  template: Template | null;
  existingDocumentData: Document | null;
}) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const [isDeletingDocument, setIsDeletingDocument] = useState(false);
  useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link" | "preview"
  >("main");
  const [currentJSON, setCurrentJSON] = React.useState<JSONContent | null>(
    null
  );
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const { state } = useSidebar();

  const pathname = usePathname();
  // Memoize session data to prevent unnecessary re-renders
  // const { session } = useSessionProvider();
  const userProfile = useQuery(api.users.getUserProfile);

  const activeUserSession = React.useMemo(() => userProfile, [userProfile]);

  const showTemplateButton = React.useMemo(
    () => userProfile?.email === process.env.NEXT_PUBLIC_INFO,
    [userProfile?.email]
  );

  // Check pro status and handle template gating
  const [isProUser, setIsProUser] = React.useState(false);
  const [isGated, setIsGated] = React.useState(false);

  React.useEffect(() => {
    const checkProStatus = async () => {
      if (template?.isPro && !isProUser) {
        setIsGated(true);
      } else {
        setIsGated(false);
      }
    };
    checkProStatus();
  }, [template, isProUser]);

  // Get user pro status on mount
  React.useEffect(() => {
    const fetchProStatus = async () => {
      try {
        // const proStatus = await getCurrentUserProStatus();

        setIsProUser(userProfile?.isPro);
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      }
    };
    fetchProStatus();
  }, []);

  // Extensions for static rendering (server-safe) - memoized to prevent re-creation
  const staticExtensions = React.useMemo(
    () => [
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
    ],
    []
  );

  // Resolve initial content: prefer any global local draft only on /template/blank
  const resolvedInitialContent = React.useMemo(() => {
    try {
      const isBlank = pathname === "/template/blank";
      if (isBlank) {
        const saved = localStorage.getItem("resignwell");
        if (saved) return JSON.parse(saved) as JSONContent;
      }
    } catch {}
    return initialContent;
  }, [initialContent, pathname]);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      ...staticExtensions,
      Selection,
      TextStyle,
      LineHeight,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      Placeholder.configure({
        placeholder: "Start typing your letter...",
      }),
    ],
    content: resolvedInitialContent,
    onUpdate: ({ editor }) => {
      if (enableStaticRenderer) {
        setCurrentJSON(editor.getJSON());
      }
    },
  });

  // Debounced autosave to localStorage (1.2s). Always save globally, but restore only on /template/blank
  React.useEffect(() => {
    if (!editor) return;
    let timer: number | null = null;
    const handler = () => {
      const json = editor.getJSON();
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        try {
          localStorage.setItem("resignwell", JSON.stringify(json));
        } catch {}
      }, 1200);
    };
    editor.on("update", handler);
    return () => {
      editor.off("update", handler);
      if (timer) window.clearTimeout(timer);
    };
  }, [editor]);

  // Delete local draft handler
  const handleDeleteLocalDraft = React.useCallback(() => {
    try {
      if (!editor) return;
      localStorage.removeItem("resignwell");
      // Restore original content (template/blank/editor)
      if (initialContent) {
        editor.commands.setContent(initialContent as JSONContent);
      }
      toast.success("Local draft deleted and content restored");
    } catch {}
  }, [editor, initialContent]);

  // Delete document handler
  const handleDeleteDocument = React.useCallback(async () => {
    if (!existingDocument?.id) return;

    try {
      setIsDeletingDocument(true);
      // const response = await deleteDocument(existingDocument.id);

      // if (response.success) {
      //   toast.success("Document deleted successfully");
      //   // Redirect to my-letters page after successful deletion
      //   router.push("/my-letters");
      // } else {
      //   toast.error(response.message || "Failed to delete document");
      // }
      setIsDeletingDocument(false);
    } catch (error) {
      setIsDeletingDocument(false);
      console.error("Error deleting document:", error);
      toast.error("Failed to delete document");
    } finally {
      setIsDeletingDocument(false);
    }
  }, [existingDocument?.id, router]);

  // Static rendering function
  const renderStaticHTML = React.useCallback(
    (jsonContent: JSONContent) => {
      if (!enableStaticRenderer || !jsonContent) return "";

      try {
        return renderToHTMLString({
          extensions: staticExtensions,
          content: jsonContent,
          options: {
            nodeMapping: {
              imageUploadNode: () => "", // Skip upload nodes in static render
            },
            unhandledNode: ({ node }) => {
              console.warn(`Unhandled node type: ${node.type.name}`);
              return "";
            },
          },
        });
      } catch (error) {
        console.error("Static rendering error:", error);
        return "";
      }
    },
    [enableStaticRenderer, staticExtensions]
  );

  useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main" && mobileView !== "preview") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // Initialize currentJSON with initial content
  React.useEffect(() => {
    if (enableStaticRenderer && editor && !currentJSON) {
      setCurrentJSON(editor.getJSON());
    }
  }, [editor, enableStaticRenderer, currentJSON]);

  const createLetterImage = React.useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ref]);

  // Not using for now
  // const createLetterImageUpload =
  //   React.useCallback(async (): Promise<Blob | null> => {
  //     if (ref.current === null) {
  //       return null;
  //     }

  //     try {
  //       const blob = await toBlob(ref.current);
  //       return blob;
  //     } catch (error) {
  //       console.error("Failed to create image blob:", error);
  //       return null;
  //     }
  //   }, [ref]);

  // if (isGated) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "simple-editor-wrapper w-full h-full pb-20 border-b border-border"
      )}
    >
      <EditorContext.Provider value={{ editor }}>
        <div className="absolute top-30 right-4 z-20 hidden md:flex flex-col items-end gap-1">
          {template ? (
            <>
              <div className="text-xs text-muted-foreground/50 max-w-[200px] text-right leading-tight">
                {template.name}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={template.isPro ? "pro" : "outline"}
                  className="text-xs px-2 py-0.5 opacity-50"
                >
                  {template.isPro ? "Pro" : "Free"}
                </Badge>
                <Badge
                  asChild
                  className="border-primary/50 bg-transparent text-primary/50 hover:text-primary hover:border-primary ease-in-out duration-300 delay-100 cursor-pointer "
                >
                  <button
                    onClick={() => {
                      document
                        .getElementById("template-introduction")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                    className="flex w-auto items-center gap-1"
                  >
                    <CaretCircleDownIcon weight="duotone" className="size-4" />
                    More Info
                  </button>
                </Badge>
              </div>
            </>
          ) : existingDocumentData ? (
            <>
              <div className="text-xs text-muted-foreground/50 max-w-[200px] text-right leading-tight">
                {existingDocumentData.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[0.6rem] text-muted-foreground/50 text-right leading-tight">
                  {existingDocumentData.updatedAt.toLocaleDateString() ||
                    existingDocumentData.createdAt.toLocaleDateString()}
                </div>
              </div>
            </>
          ) : (
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 text-muted-foreground/50"
            >
              Draft
            </Badge>
          )}
        </div>
        <Toolbar
          ref={toolbarRef}
          className="w-full"
          style={{
            ...(isMobile
              ? {
                  top: "64px",
                  width: "100%",
                }
              : {
                  top: "64px",
                  width: `${
                    state === "expanded" ? `calc(100% - 16rem)` : `100%`
                  }`,
                }),
            position: "fixed",
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              onPreviewClick={
                enableStaticRenderer
                  ? () => setMobileView("preview")
                  : undefined
              }
              isMobile={isMobile}
              showTemplateButton={showTemplateButton}
              activeUserSession={!!activeUserSession}
              editor={editor}
              existingDocument={existingDocument}
              existingTemplate={template}
              onDeleteLocalDraft={handleDeleteLocalDraft}
              onDeleteDocument={handleDeleteDocument}
              isDeletingDocument={isDeletingDocument}
              createLetterImage={createLetterImage}
              // createLetterImageUpload={createLetterImageUpload}
            />
          ) : mobileView === "preview" ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setMobileView("main")}
                className="flex items-center gap-2 border border-border"
              >
                <ArrowLeftIcon className="size-4" />
                Back to Editor
              </Button>
              <span className="text-sm font-medium">Static Preview</span>
            </div>
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        {mobileView === "preview" && enableStaticRenderer && currentJSON ? (
          <div className="simple-editor-content pt-20">
            <div className="max-w-min(648px, calc(100% - 4rem)) w-full mx-auto lg:p-12 ">
              <h2 className="text-xl font-bold mb-4">Static HTML Preview</h2>
              <div className="border rounded-lg p-6 bg-gray-50">
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: renderStaticHTML(currentJSON),
                  }}
                />
              </div>

              {showStaticPreview && (
                <details className="mt-6">
                  <summary className="cursor-pointer font-medium">
                    View HTML Source
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                    <code>{renderStaticHTML(currentJSON)}</code>
                  </pre>
                </details>
              )}
            </div>
          </div>
        ) : isGated ? (
          <div className="simple-editor-content pt-20">
            <div className="max-w-min(648px, calc(100% - 4rem)) w-full mx-auto lg:p-12">
              <div className="border rounded-lg p-8 bg-linear-to-br from-purple-50 to-blue-50 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Pro Template
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This is a premium template available exclusively for
                    ResignWell Pro members.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Get access to this template and many more premium features:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 max-w-sm mx-auto">
                    <li className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Premium resignation letter templates
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Advanced formatting options
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Priority support
                    </li>
                  </ul>

                  <div className="pt-4">{/* <ButtonProUpgrade /> */}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EditorContextMenu editor={editor}>
            <div className="relative ">
              <EditorContent
                editor={editor}
                role="presentation"
                className="simple-editor-content pt-20 "
              />
            </div>
          </EditorContextMenu>
        )}

        <AIBubbleMenu editor={editor} />
      </EditorContext.Provider>
    </div>
  );
}
