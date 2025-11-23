import { Editor } from "@tiptap/react";
import { toast } from "sonner";

interface DownloadLetterTextProps {
  editor: Editor | null;
  setIsDownloadingTxt: (isDownloading: boolean) => void;
  documentFormData: {
    documentTitle: string;
  };
  templateFormData: {
    templateName: string;
  };
}

export const handleDownloadTxt = async ({
  editor,
  setIsDownloadingTxt,
  documentFormData,
  templateFormData,
}: DownloadLetterTextProps) => {
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
