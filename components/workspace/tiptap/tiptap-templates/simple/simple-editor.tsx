"use client";

// import { useSessionProvider } from "@/utils/providers/session-provider";
// import { getCurrentUserProStatus } from "@/lib/user-pro-status";
import {
  EditorContent,
  EditorContext,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { renderToHTMLString } from "@tiptap/static-renderer";
import { toPng } from "html-to-image";
import * as React from "react";

// --- Tiptap Core Extensions ---
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { LineHeight, TextStyle } from "@tiptap/extension-text-style";
import { Typography } from "@tiptap/extension-typography";
import { Placeholder, Selection } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";

// --- UI Primitives ---
import { Toolbar } from "@/components/workspace/tiptap/tiptap-ui-primitive/toolbar";

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
import { EditorContextMenu } from "@/components/workspace/tiptap/tiptap-ui/editor-context-menu";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/workspace/tiptap/tiptap-icons/arrow-left-icon";

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/TipTapUtils";

// --- Styles ---
import "@/components/workspace/tiptap/tiptap-templates/simple/simple-editor.scss";

import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";
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
  // CameraIcon,
  CaretCircleDownIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import { genUploader } from "uploadthing/client";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
// export const { uploadFiles } = genUploader<OurFileRouter>();

import { cn } from "@/lib/utils";
// import { ButtonProUpgrade } from "@/components/common/ButtonProUpgrade";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MainToolbarContent } from "./MainToolbarContent";
import { MobileToolbarContent } from "./MobileToolbarContent";

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
  _id: string;
  _creationTime: number;
  description: string;
  name: string;
  content: JSONContent;
  slug: string;
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

export function SimpleEditor({
  initialContent,
  showStaticPreview,
  enableStaticRenderer,
  existingDocument,
  template,
  existingDocumentData,
}: {
  initialContent?: JSONContent;
  showStaticPreview?: boolean;
  enableStaticRenderer?: boolean;
  existingDocument?: {
    _id: string;
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
  const result = useQuery(api.users.getUserProfile);
  const userProfile = result?.ok ? result.data : null;

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
    const isBlank = pathname === "/template/blank";

    if (isBlank) {
      try {
        const saved = localStorage.getItem("resignwell");
        if (saved) {
          const parsed = JSON.parse(saved) as JSONContent;
          return parsed;
        }
      } catch (error) {
        console.error("Failed to parse localStorage draft:", error);
      }
      // If no localStorage draft on blank template, return undefined to start fresh
      return undefined;
    }

    // For other routes, use initialContent if provided
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

  // Update editor content when initialContent changes (but not on /template/blank to preserve localStorage draft)
  React.useEffect(() => {
    if (!editor || !initialContent) return;

    // Don't override localStorage draft on /template/blank
    const isBlank = pathname === "/template/blank";
    if (isBlank) return;

    // Only update if the content is actually different
    const currentContent = editor.getJSON();
    if (JSON.stringify(currentContent) !== JSON.stringify(initialContent)) {
      editor.commands.setContent(initialContent as JSONContent);
    }
  }, [editor, initialContent, pathname]);

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
          console.log("Draft saved to localStorage");
        } catch (error) {
          console.error("Failed to save draft to localStorage:", error);
        }
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
    if (!existingDocument?._id) return;

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
  }, [existingDocument?._id, router]);

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
                  {new Date(
                    existingDocumentData._creationTime
                  ).toLocaleDateString()}
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
