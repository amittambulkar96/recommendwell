import { Editor, JSONContent } from "@tiptap/react";
import { toast } from "sonner";

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

interface UploadTemplateProps {
  e: React.FormEvent;
  editor: Editor | null;
  templateFormData: TemplateFormData;
  setIsSavingTemplate: (isSaving: boolean) => void;
  existingTemplate?: Template | null;
  setTemplateInfoSuccess: (message: string) => void;
  templateInfoData?: TemplateInfo;
  object?: any;
  setTemplateFormData: React.Dispatch<React.SetStateAction<TemplateFormData>>;
  createTemplate: any;
  updateTemplate?: any;
}

export const handleTemplateSubmit = async ({
  e,
  editor,
  templateFormData,
  setIsSavingTemplate,
  existingTemplate,
  setTemplateInfoSuccess,
  templateInfoData,
  object,
  setTemplateFormData,
  createTemplate,
  updateTemplate,
}: UploadTemplateProps) => {
  e.preventDefault();

  // Basic validation
  if (!templateFormData.templateName.trim()) {
    toast.error("Template name is required");
    return;
  }

  if (!templateFormData.slug.trim()) {
    toast.error("Slug is required");
    return;
  }

  if (!templateFormData.description.trim()) {
    toast.error("Description is required");
    return;
  }

  if (!templateFormData.category.trim()) {
    toast.error("Category is required");
    return;
  }

  const json = editor?.getJSON();
  const content = JSON.stringify(json);

  try {
    setIsSavingTemplate(true);

    if (existingTemplate && updateTemplate) {
      // Update existing template using Convex mutation
      const result = await updateTemplate({
        _id: existingTemplate.id,
        name: templateFormData.templateName,
        description: templateFormData.description,
        slug: templateFormData.slug,
        content: content,
        tags: templateFormData.tags.split(",").map((tag) => tag.trim()),
        category: templateFormData.category.toLowerCase(),
        isPro: templateFormData.isProTemplate,
        templateInfo: JSON.stringify(templateInfoData || object?.templateInfo || {}),
      });

      if (result.ok) {
        toast.success("Template updated successfully");
      } else {
        throw new Error(`Failed to update template: ${result.type}`);
      }

      // Reset template info success message after save
      setTemplateInfoSuccess("");
    } else if (createTemplate) {
      // Create new template using Convex mutation
      const result = await createTemplate({
        name: templateFormData.templateName,
        description: templateFormData.description,
        slug: templateFormData.slug,
        content: content,
        tags: templateFormData.tags.split(",").map((tag) => tag.trim()),
        category: templateFormData.category.toLowerCase(),
        isPro: templateFormData.isProTemplate,
        templateInfo: JSON.stringify(templateInfoData || object?.templateInfo || {}),
      });

      if (result.ok) {
        toast.success("Template created successfully");
        // Reset form only for new templates and clear template info success message
        setTemplateInfoSuccess("");
        setTemplateFormData({
          templateName: "",
          slug: "",
          description: "",
          tags: "",
          category: "",
          isProTemplate: false,
        });
      } else {
        if (result.type === "SLUG_EXISTS") {
          throw new Error("A template with this slug already exists");
        }
        throw new Error(`Failed to create template: ${result.type}`);
      }
    } else {
      throw new Error("No mutation function provided");
    }
  } catch (error) {
    toast.error(
      existingTemplate
        ? "Failed to update template"
        : "Failed to create template",
      {
        description: error instanceof Error ? error.message : "Unknown error",
      }
    );
  } finally {
    setIsSavingTemplate(false);
  }
};
