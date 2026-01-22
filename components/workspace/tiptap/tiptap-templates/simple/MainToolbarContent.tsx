"use client";

// import { useSessionProvider } from "@/utils/providers/session-provider";
// import { getCurrentUserProStatus } from "@/lib/user-pro-status";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import type { Editor } from "@tiptap/react";
import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { ExampleEditorModel, TemplateEditorModel } from "@/lib/tiptap/models";

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
import { handleExampleSubmit } from "@/lib/tiptap/UploadExample";
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
import { ExampleInfoSchema } from "@/lib/ExampleInfoSchema";
// import { ButtonProUpgrade } from "@/components/common/ButtonProUpgrade";
import { Button } from "@/components/ui/button";
import DownloadOptionsDropdown from "@/components/workspace/tiptap/tiptap-templates/simple/DownloadOptionsDropdown";
import DeleteOptionsDropdown from "@/components/workspace/tiptap/tiptap-templates/simple/DeleteOptionsDropdown";
import UploadLetterDialog from "./UploadLetterDialog";
import UploadTemplateDialog from "./UploadTemplateDialog";
import UploadExampleDialog from "./UploadExampleDialog";

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

interface ExampleInfo {
  coreComponents: Array<{
    title: string;
    content: string;
  }>;
  customizationTips: Array<{
    title: string;
    content: string;
  }>;
}

interface ExampleFormData {
  exampleName: string;
  slug: string;
  description: string;
  tags: string;
  category: string;
  isProExample: boolean;
  exampleInfo?: {
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

export const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  // onPreviewClick,
  isMobile,
  showTemplateButton,
  showExampleButton,
  activeUserSession,
  editor,
  existingDocument,
  existingTemplate,
  existingExample,
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
  showExampleButton?: boolean;
  activeUserSession: boolean;
  editor: Editor | null;
  existingDocument?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
  // createLetterImageUpload: () => Promise<Blob | null>;
  existingTemplate?: TemplateEditorModel | null;
  existingExample?: ExampleEditorModel | null;
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

  const createTemplate = useMutation(api.templates.CreateTemplate);
  const updateTemplate = useMutation(api.templates.UpdateTemplate);

  // Example mutations
  const createExample = useMutation(api.examples.CreateExample);
  const updateExample = useMutation(api.examples.UpdateExample);

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

  // Example AI generation
  const {
    isLoading: isGeneratingExampleInfo,
    object: exampleObject,
    submit: submitExample,
  } = useObject({
    api: "/api/ai/generate-example-info",
    schema: ExampleInfoSchema,
    onFinish() {
      setExampleInfoSuccess(`Example Info generation completed`);
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

  const [exampleFormData, setExampleFormData] =
    React.useState<ExampleFormData>({
      exampleName: "",
      slug: "",
      description: "",
      tags: "",
      category: "",
      isProExample: false,
      exampleInfo: undefined,
    });

  const [documentFormData, setDocumentFormData] =
    React.useState<DocumentFormData>({
      documentTitle: existingDocument?.name ?? "",
      slug: existingDocument?.slug ?? "",
      description: existingDocument?.description ?? "",
    });

  const [isSavingExample, setIsSavingExample] = useState(false);
  const [exampleInfoData, setExampleInfoData] = useState<
    ExampleInfo | undefined
  >(undefined);
  const [exampleInfoSuccess, setExampleInfoSuccess] = useState("");

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

  React.useEffect(() => {
    if (existingExample) {
      setExampleFormData({
        exampleName: existingExample.name,
        slug: existingExample.slug,
        description: existingExample.description,
        tags: existingExample.tags.join(", "),
        category: existingExample.category,
        isProExample: existingExample.isPro,
        exampleInfo: undefined,
      });
    }
  }, [existingExample]);

  React.useEffect(() => {
    if (exampleObject) {
      setExampleInfoData(exampleObject?.exampleInfo as unknown as ExampleInfo);
    }
  }, [exampleObject]);

  const createSlug = (input: string) =>
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  const handleCreateSlug = (
    field: keyof TemplateFormData | keyof DocumentFormData | keyof ExampleFormData,
    value: string | boolean,
    formType: "template" | "document" | "example"
  ) => {
    if (formType === "template") {
      setTemplateFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };

        // Auto-generate slug from template name
        if (field === "templateName" && typeof value === "string") {
          newData.slug = createSlug(value);
        }

        return newData;
      });
    } else if (formType === "example") {
      setExampleFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };

        // Auto-generate slug from example name
        if (field === "exampleName" && typeof value === "string") {
          newData.slug = createSlug(value);
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
          newData.slug = createSlug(value);
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

  // Handle AI example info generation
  const handleGenerateExampleInfo = async () => {
    if (!editor) {
      toast.error("Editor not ready");
      return;
    }

    const exampleContent = editor.getText();
    if (!exampleContent || exampleContent.trim().length === 0) {
      toast.error("Please add some content to generate example info");
      return;
    }

    submitExample(exampleContent);
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
            createTemplate={createTemplate}
            updateTemplate={updateTemplate}
          />
        )}

        {showExampleButton && (
          <UploadExampleDialog
            activeUserSession={activeUserSession}
            existingExample={existingExample}
            exampleFormData={exampleFormData}
            handleCreateSlug={handleCreateSlug}
            handleGenerateExampleInfo={handleGenerateExampleInfo}
            isGeneratingExampleInfo={isGeneratingExampleInfo}
            exampleInfoSuccess={exampleInfoSuccess}
            handleExampleSubmit={handleExampleSubmit}
            editor={editor}
            setIsSavingExample={setIsSavingExample}
            isSavingExample={isSavingExample}
            setExampleInfoSuccess={setExampleInfoSuccess}
            exampleInfoData={exampleInfoData}
            object={exampleObject}
            setExampleFormData={setExampleFormData}
            createExample={createExample}
            updateExample={updateExample}
          />
        )}
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};
