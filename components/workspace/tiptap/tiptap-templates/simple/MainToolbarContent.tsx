"use client";

// import { useSessionProvider } from "@/utils/providers/session-provider";
// import { getCurrentUserProStatus } from "@/lib/user-pro-status";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Editor, EditorContent, JSONContent } from "@tiptap/react";
import * as React from "react";

// --- UI Primitives ---
import { Spacer } from "@/components/workspace/tiptap/tiptap-ui-primitive/spacer";
import {
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/workspace/tiptap/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import "@/components/workspace/tiptap/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/workspace/tiptap/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/workspace/tiptap/tiptap-node/heading-node/heading-node.scss";
import "@/components/workspace/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/workspace/tiptap/tiptap-node/image-node/image-node.scss";
import "@/components/workspace/tiptap/tiptap-node/list-node/list-node.scss";
import "@/components/workspace/tiptap/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { AIToolbarButton } from "@/components/workspace/tiptap/tiptap-ui/ai-toolbar-button";
import { BlockquoteButton } from "@/components/workspace/tiptap/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/workspace/tiptap/tiptap-ui/code-block-button";
import { HeadingDropdownMenu } from "@/components/workspace/tiptap/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/workspace/tiptap/tiptap-ui/image-upload-button";
import {
  LinkButton,
  LinkPopover,
} from "@/components/workspace/tiptap/tiptap-ui/link-popover";
import { ListDropdownMenu } from "@/components/workspace/tiptap/tiptap-ui/list-dropdown-menu";
import { MarkButton } from "@/components/workspace/tiptap/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/workspace/tiptap/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/workspace/tiptap/tiptap-ui/undo-redo-button";

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
  CloudArrowDownIcon,
  EraserIcon,
  FileDocIcon,
  FilePdfIcon,
  FileTxtIcon,
  MonitorArrowUpIcon,
  TextAlignLeftIcon,
  TextSuperscriptIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { handleDownloadPdf } from "@/lib/tiptap/DownloadLetterPDF";
import { handleDownloadTxt } from "@/lib/tiptap/DownloadLetterText";
import { handleDownloadDoc } from "@/lib/tiptap/DownloadLetterDoc";
import { handleTemplateSubmit } from "@/lib/tiptap/UploadTemplate";
import { handleDocumentSubmit } from "@/lib/tiptap/UploadLetterDocument";
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
// import { ButtonProUpgrade } from "@/components/common/ButtonProUpgrade";
import { Button } from "@/components/ui/button";
import DownloadOptionsDropdown from "@/components/workspace/tiptap/tiptap-templates/simple/DownloadOptionsDropdown";
import DeleteOptionsDropdown from "@/components/workspace/tiptap/tiptap-templates/simple/DeleteOptionsDropdown";
import UploadLetterDialog from "./UploadLetterDialog";
import UploadTemplateDialog from "./UploadTemplateDialog";

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

export const MainToolbarContent = ({
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
    _id: string;
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

    submit(templateContent);
  };

  React.useEffect(() => {
    if (object) {
      setTemplateInfoData(object?.templateInfo as unknown as TemplateInfo);
    }
  }, [object]);

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

      <ToolbarGroup>
        <DownloadOptionsDropdown
          editor={editor}
          isDownloadingPdf={isDownloadingPdf}
          setIsDownloadingPdf={setIsDownloadingPdf}
          isDownloadingTxt={isDownloadingTxt}
          setIsDownloadingTxt={setIsDownloadingTxt}
          isDownloadingDoc={isDownloadingDoc}
          setIsDownloadingDoc={setIsDownloadingDoc}
          documentFormData={documentFormData}
          templateFormData={templateFormData}
        />

        <DeleteOptionsDropdown
          onDeleteLocalDraft={onDeleteLocalDraft}
          existingDocument={existingDocument}
          onDeleteDocument={onDeleteDocument}
          isDeletingDocument={isDeletingDocument}
        />

        {/* Save on the cloud */}
        <UploadLetterDialog
          activeUserSession={activeUserSession}
          existingDocument={existingDocument}
          documentFormData={documentFormData}
          setDocumentFormData={setDocumentFormData}
          handleCreateSlug={handleCreateSlug}
          editor={editor}
          setIsSavingDocument={setIsSavingDocument}
          isSavingDocument={isSavingDocument}
        />

        {/* Save as template */}
        {showTemplateButton && (
          <UploadTemplateDialog
            activeUserSession={activeUserSession}
            existingTemplate={existingTemplate}
            templateFormData={templateFormData}
            handleCreateSlug={handleCreateSlug}
            handleGenerateTemplateInfo={handleGenerateTemplateInfo}
            isGeneratingTemplateInfo={isGeneratingTemplateInfo}
            templateInfoSuccess={templateInfoSuccess}
            handleTemplateSubmit={handleTemplateSubmit}
            editor={editor}
            setIsSavingTemplate={setIsSavingTemplate}
            isSavingTemplate={isSavingTemplate}
            setTemplateInfoSuccess={setTemplateInfoSuccess}
            templateInfoData={templateInfoData}
            object={object}
            setTemplateFormData={setTemplateFormData}
          />
        )}
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};
