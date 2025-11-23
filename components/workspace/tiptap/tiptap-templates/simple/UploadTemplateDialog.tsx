import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BookIcon } from "@phosphor-icons/react";
import { Editor, JSONContent } from "@tiptap/react";

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

interface UploadTemplateDialogProps {
  activeUserSession: boolean;
  existingTemplate?: Template | null;
  templateFormData: TemplateFormData;
  handleCreateSlug: (
    field: keyof TemplateFormData,
    value: string | boolean,
    type: "template"
  ) => void;
  handleGenerateTemplateInfo: () => void;
  isGeneratingTemplateInfo: boolean;
  templateInfoSuccess: string;
  handleTemplateSubmit: (params: {
    e: React.FormEvent;
    editor: Editor | null;
    templateFormData: TemplateFormData;
    setIsSavingTemplate: (isSaving: boolean) => void;
    existingTemplate?: Template | null;
    setTemplateInfoSuccess: (message: string) => void;
    templateInfoData?: TemplateInfo;
    object?: any;
    setTemplateFormData: React.Dispatch<React.SetStateAction<TemplateFormData>>;
  }) => void;
  editor: Editor | null;
  setIsSavingTemplate: (isSaving: boolean) => void;
  isSavingTemplate: boolean;
  setTemplateInfoSuccess: (message: string) => void;
  templateInfoData?: TemplateInfo;
  object?: any;
  setTemplateFormData: React.Dispatch<React.SetStateAction<TemplateFormData>>;
}

export default function UploadTemplateDialog({
  activeUserSession,
  existingTemplate,
  templateFormData,
  handleCreateSlug,
  handleGenerateTemplateInfo,
  isGeneratingTemplateInfo,
  templateInfoSuccess,
  handleTemplateSubmit,
  editor,
  setIsSavingTemplate,
  isSavingTemplate,
  setTemplateInfoSuccess,
  templateInfoData,
  object,
  setTemplateFormData,
}: UploadTemplateDialogProps) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button disabled={!activeUserSession} size="xs" variant="default">
              <BookIcon weight="duotone" className="size-4" />
              <span className="ml-1">
                {existingTemplate ? "Update Template" : "Save as Template"}
              </span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save as template</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {existingTemplate ? "Update template" : "Save as template"}
          </DialogTitle>
          <DialogDescription>
            {existingTemplate
              ? "Update your template with your latest changes."
              : "Save your current document as a reusable template for others to use."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              type="text"
              placeholder="Enter template name"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={templateFormData.templateName}
              onChange={(e) =>
                handleCreateSlug("templateName", e.target.value, "template")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              type="text"
              disabled={true}
              placeholder="e.g., grateful-teacher-resignation"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={templateFormData.slug}
              onChange={(e) =>
                handleCreateSlug("slug", e.target.value, "template")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={templateFormData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleCreateSlug("description", e.target.value, "template")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              placeholder="e.g., teacher, resignation, professional"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={templateFormData.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCreateSlug("tags", e.target.value, "template")
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., healthcare, 2 weeks notice, notice"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={templateFormData.category}
              onChange={(e) =>
                handleCreateSlug("category", e.target.value, "template")
              }
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isProTemplate"
              checked={templateFormData.isProTemplate}
              onCheckedChange={(checked: boolean) =>
                handleCreateSlug("isProTemplate", checked, "template")
              }
            />
            <Label htmlFor="isProTemplate">Is this a Pro template?</Label>
          </div>

          <div className="space-y-2 flex items-center gap-2">
            <Button
              type="button"
              onClick={handleGenerateTemplateInfo}
              disabled={isGeneratingTemplateInfo}
              data-style="outline"
            >
              <span className="mr-2">✨</span>
              {isGeneratingTemplateInfo
                ? "Generating..."
                : "Generate Template Info"}
            </Button>
            <p className="text-xs text-emerald-600">{templateInfoSuccess}</p>
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
              handleTemplateSubmit({
                e,
                editor,
                templateFormData,
                setIsSavingTemplate,
                existingTemplate,
                setTemplateInfoSuccess,
                templateInfoData,
                object,
                setTemplateFormData,
              })
            }
            disabled={isSavingTemplate}
          >
            {isSavingTemplate
              ? "Saving..."
              : existingTemplate
                ? "Update Template"
                : "Save Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
