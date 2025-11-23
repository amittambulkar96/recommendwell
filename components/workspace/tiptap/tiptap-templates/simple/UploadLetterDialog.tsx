import { MonitorArrowUpIcon } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { handleDocumentSubmit } from "@/lib/tiptap/UploadLetterDocument";
import { Editor } from "@tiptap/react";

interface UploadLetterDialogProps {
  activeUserSession: boolean;
  existingDocument?: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  documentFormData: {
    documentTitle: string;
    slug: string;
    description: string;
  };
  handleCreateSlug: (
    field: "documentTitle" | "slug" | "description",
    value: string,
    type: "document"
  ) => void;
  editor: Editor | null;
  setIsSavingDocument: (isSaving: boolean) => void;
  isSavingDocument: boolean;
}

export default function UploadLetterDialog({
  activeUserSession,
  existingDocument,
  documentFormData,
  handleCreateSlug,
  editor,
  setIsSavingDocument,
  isSavingDocument,
}: UploadLetterDialogProps) {
  return (
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
                handleCreateSlug("documentTitle", e.target.value, "document")
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
            onClick={(e) =>
              handleDocumentSubmit({
                e,
                editor,
                documentFormData,
                setIsSavingDocument,
                existingDocument,
              })
            }
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
  );
}
