import { Editor } from "@tiptap/react";
import { toast } from "sonner";

interface DownloadLetterDocProps {
  editor: Editor | null;
  setIsDownloadingDoc: (isDownloading: boolean) => void;
  documentFormData: {
    documentTitle: string;
  };
  templateFormData: {
    templateName: string;
  };
}

export const handleDownloadDoc = async ({
  editor,
  setIsDownloadingDoc,
  documentFormData,
  templateFormData,
}: DownloadLetterDocProps) => {
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
