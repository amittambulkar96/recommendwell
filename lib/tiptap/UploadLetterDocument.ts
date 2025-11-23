import { Editor, JSONContent } from "@tiptap/react";
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
    id: string;
    name: string;
    slug: string;
    description: string;
  };
}

export const handleDocumentSubmit = async ({
  e,
  editor,
  documentFormData,
  setIsSavingDocument,
  existingDocument,
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
      existingDocument ? "Failed to save changes" : "Failed to create document",
      {
        description: error instanceof Error ? error.message : "Unknown error",
      }
    );
    setIsSavingDocument(false);
  } finally {
    setIsSavingDocument(false);
  }
};
