import { Editor } from "@tiptap/react";
import html2canvas from "html2canvas-pro";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";

interface DownloadLetterPDFProps {
  editor: Editor | null;
  setIsDownloadingPdf: (isDownloading: boolean) => void;
  documentFormData: {
    documentTitle: string;
  };
  templateFormData: {
    templateName: string;
  };
}

export const handleDownloadPdf = async ({
  editor,
  setIsDownloadingPdf,
  documentFormData,
  templateFormData,
}: DownloadLetterPDFProps) => {
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
