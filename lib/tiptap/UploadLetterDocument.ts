import { api } from "@/convex/_generated/api";
import { Editor, JSONContent } from "@tiptap/react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface DocumentFormData {
  documentTitle: string;
  slug: string;
  description: string;
}

interface UploadLetterDocumentProps {
  e: React.FormEvent;
  editor: Editor | null;
  documentFormData: DocumentFormData;
  setIsSavingDocument: (isSaving: boolean) => void;
  existingDocument?: {
    _id: string;
    name: string;
    slug: string;
    description: string;
  };
  setDocumentFormData: (data: {
    documentTitle: string;
    slug: string;
    description: string;
  }) => void;
  addUserLetter: any;
  updateUserLetter: any;
  setOpen: (open: boolean) => void;
}

export const handleDocumentSubmit = async ({
  e,
  addUserLetter,
  updateUserLetter,
  editor,
  documentFormData,
  setIsSavingDocument,
  existingDocument,
  setDocumentFormData,
  setOpen,
}: UploadLetterDocumentProps) => {
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

  const json = editor?.getJSON();

  try {
    if (existingDocument) {
      const response = await updateUserLetter({
        _id: existingDocument._id,
        name: documentFormData.documentTitle,
        description: documentFormData.description,
        slug: documentFormData.slug,
        content: JSON.stringify(json),
      });

      if (response.ok) {
        toast.success("Document updated successfully");
        setDocumentFormData({
          documentTitle: "",
          slug: "",
          description: "",
        });
        setOpen(false);
      } else {
        switch (response.type) {
          case "USER_NOT_FOUND":
            toast.error("User not found");
            break;
          case "PRO_REQUIRED":
            toast.error("Pro subscription required");
            break;
          case "NOT_AUTHENTICATED":
            toast.error("Not authenticated");
            break;
          default:
            toast.error("Unknown error");
            break;
        }
        setOpen(false);
      }
    } else {
      const response = await addUserLetter({
        name: documentFormData.documentTitle,
        description: documentFormData.description,
        slug: documentFormData.slug,
        content: JSON.stringify(json),
      });

      if (response.ok && response.letter) {
        toast.success("Document created successfully");
        setDocumentFormData({
          documentTitle: "",
          slug: "",
          description: "",
        });
        setOpen(false);
      } else {
        switch (response.type) {
          case "USER_NOT_FOUND":
            toast.error("User not found");
            break;
          case "PRO_REQUIRED":
            toast.error("Pro subscription required");
            break;
          case "NOT_AUTHENTICATED":
            toast.error("Not authenticated");
            break;
          default:
            toast.error("Unknown error");
            break;
        }
        setOpen(false);
      }
    }
    setIsSavingDocument(false);
  } catch (error) {
    toast.error(
      existingDocument ? "Failed to save changes" : "Failed to create document",
      {
        description: error instanceof Error ? error.message : "Unknown error",
      }
    );
    setIsSavingDocument(false);
    setOpen(false);
  } finally {
    setIsSavingDocument(false);
    setOpen(false);
  }
};
