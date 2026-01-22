import type { Editor } from "@tiptap/react";
import { toast } from "sonner";
import type {
  CreateExampleFn,
  ExampleEditorModel,
  UpdateExampleFn,
} from "@/lib/tiptap/models";

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

interface UploadExampleProps {
  e: React.FormEvent;
  editor: Editor | null;
  exampleFormData: ExampleFormData;
  setIsSavingExample: (isSaving: boolean) => void;
  existingExample?: ExampleEditorModel | null;
  setExampleInfoSuccess: (message: string) => void;
  exampleInfoData?: ExampleInfo;
  object?: { exampleInfo?: unknown };
  setExampleFormData: React.Dispatch<React.SetStateAction<ExampleFormData>>;
  createExample: CreateExampleFn;
  updateExample?: UpdateExampleFn;
}

export const handleExampleSubmit = async ({
  e,
  editor,
  exampleFormData,
  setIsSavingExample,
  existingExample,
  setExampleInfoSuccess,
  exampleInfoData,
  object,
  setExampleFormData,
  createExample,
  updateExample,
}: UploadExampleProps) => {
  e.preventDefault();

  // Basic validation
  if (!exampleFormData.exampleName.trim()) {
    toast.error("Example name is required");
    return;
  }

  if (!exampleFormData.slug.trim()) {
    toast.error("Slug is required");
    return;
  }

  if (!exampleFormData.description.trim()) {
    toast.error("Description is required");
    return;
  }

  if (!exampleFormData.category.trim()) {
    toast.error("Category is required");
    return;
  }

  const json = editor?.getJSON();
  const content = JSON.stringify(json);
  const tags = exampleFormData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  try {
    setIsSavingExample(true);

    if (existingExample && updateExample) {
      // Update existing example using Convex mutation
      const result = await updateExample({
        _id: existingExample._id,
        name: exampleFormData.exampleName,
        description: exampleFormData.description,
        slug: exampleFormData.slug,
        content: content,
        tags,
        category: exampleFormData.category.toLowerCase(),
        isPro: exampleFormData.isProExample,
        exampleInfo: JSON.stringify(exampleInfoData || object?.exampleInfo || {}),
      });

      if (result.ok) {
        toast.success("Example updated successfully");
      } else {
        throw new Error(`Failed to update example: ${result.type}`);
      }

      // Reset example info success message after save
      setExampleInfoSuccess("");
    } else if (createExample) {
      // Create new example using Convex mutation
      const result = await createExample({
        name: exampleFormData.exampleName,
        description: exampleFormData.description,
        slug: exampleFormData.slug,
        content: content,
        tags,
        category: exampleFormData.category.toLowerCase(),
        isPro: exampleFormData.isProExample,
        exampleInfo: JSON.stringify(exampleInfoData || object?.exampleInfo || {}),
      });

      if (result.ok) {
        toast.success("Example created successfully");
        // Reset form only for new examples and clear example info success message
        setExampleInfoSuccess("");
        setExampleFormData({
          exampleName: "",
          slug: "",
          description: "",
          tags: "",
          category: "",
          isProExample: false,
        });
      } else {
        if (result.type === "SLUG_EXISTS") {
          throw new Error("An example with this slug already exists");
        }
        throw new Error(`Failed to create example: ${result.type}`);
      }
    } else {
      throw new Error("No mutation function provided");
    }
  } catch (error) {
    toast.error(
      existingExample
        ? "Failed to update example"
        : "Failed to create example",
      {
        description: error instanceof Error ? error.message : "Unknown error",
      }
    );
  } finally {
    setIsSavingExample(false);
  }
};
