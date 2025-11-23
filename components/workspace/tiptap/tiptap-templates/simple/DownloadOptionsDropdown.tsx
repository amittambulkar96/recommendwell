import {
  CloudArrowDownIcon,
  FilePdfIcon,
  FileTxtIcon,
  FileDocIcon,
} from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { handleDownloadPdf } from "@/lib/tiptap/DownloadLetterPDF";
import { handleDownloadTxt } from "@/lib/tiptap/DownloadLetterText";
import { handleDownloadDoc } from "@/lib/tiptap/DownloadLetterDoc";
import { Editor } from "@tiptap/react";

interface DownloadOptionsDropdownProps {
  editor: Editor | null;
  isDownloadingPdf: boolean;
  setIsDownloadingPdf: (isDownloading: boolean) => void;
  isDownloadingTxt: boolean;
  setIsDownloadingTxt: (isDownloading: boolean) => void;
  isDownloadingDoc: boolean;
  setIsDownloadingDoc: (isDownloading: boolean) => void;
  documentFormData: {
    documentTitle: string;
  };
  templateFormData: {
    templateName: string;
  };
}

export default function DownloadOptionsDropdown({
  editor,
  isDownloadingPdf,
  setIsDownloadingPdf,
  isDownloadingTxt,
  setIsDownloadingTxt,
  isDownloadingDoc,
  setIsDownloadingDoc,
  documentFormData,
  templateFormData,
}: DownloadOptionsDropdownProps) {
  return (
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
            handleDownloadPdf({
              editor,
              setIsDownloadingPdf,
              documentFormData,
              templateFormData,
            });
          }}
          disabled={isDownloadingPdf}
        >
          <FilePdfIcon weight="duotone" className="size-4" />
          {isDownloadingPdf ? "Downloading..." : "PDF"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleDownloadTxt({
              editor,
              setIsDownloadingTxt,
              documentFormData,
              templateFormData,
            });
          }}
          disabled={isDownloadingTxt}
        >
          <FileTxtIcon weight="duotone" className="size-4" />
          {isDownloadingTxt ? "Downloading..." : "TXT"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleDownloadDoc({
              editor,
              setIsDownloadingDoc,
              documentFormData,
              templateFormData,
            });
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
  );
}
