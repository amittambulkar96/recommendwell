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
import { FileTextIcon } from "@phosphor-icons/react";
import type { Editor } from "@tiptap/react";
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

interface UploadExampleDialogProps {
  activeUserSession: boolean;
  existingExample?: ExampleEditorModel | null;
  exampleFormData: ExampleFormData;
  handleCreateSlug: (
    field: keyof ExampleFormData,
    value: string | boolean,
    type: "example"
  ) => void;
  handleGenerateExampleInfo: () => void;
  isGeneratingExampleInfo: boolean;
  exampleInfoSuccess: string;
  handleExampleSubmit: (params: {
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
  }) => void;
  editor: Editor | null;
  setIsSavingExample: (isSaving: boolean) => void;
  isSavingExample: boolean;
  setExampleInfoSuccess: (message: string) => void;
  exampleInfoData?: ExampleInfo;
  object?: { exampleInfo?: unknown };
  setExampleFormData: React.Dispatch<React.SetStateAction<ExampleFormData>>;
  createExample: CreateExampleFn;
  updateExample?: UpdateExampleFn;
}

export default function UploadExampleDialog({
  activeUserSession,
  existingExample,
  exampleFormData,
  handleCreateSlug,
  handleGenerateExampleInfo,
  isGeneratingExampleInfo,
  exampleInfoSuccess,
  handleExampleSubmit,
  editor,
  setIsSavingExample,
  isSavingExample,
  setExampleInfoSuccess,
  exampleInfoData,
  object,
  setExampleFormData,
  createExample,
  updateExample,
}: UploadExampleDialogProps) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button disabled={!activeUserSession} size="xs" variant="default">
              <FileTextIcon weight="duotone" className="size-4" />
              <span className="ml-1">
                {existingExample ? "Update Example" : "Save as Example"}
              </span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save as example</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {existingExample ? "Update example" : "Save as example"}
          </DialogTitle>
          <DialogDescription>
            {existingExample
              ? "Update your example with your latest changes."
              : "Save your current document as a reusable example for others to use."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exampleName">Example Name</Label>
            <Input
              id="exampleName"
              type="text"
              placeholder="Enter example name"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={exampleFormData.exampleName}
              onChange={(e) =>
                handleCreateSlug("exampleName", e.target.value, "example")
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
              placeholder="e.g., professional-resignation-example"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={exampleFormData.slug}
              onChange={(e) =>
                handleCreateSlug("slug", e.target.value, "example")
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
              value={exampleFormData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleCreateSlug("description", e.target.value, "example")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              placeholder="e.g., resignation, professional, example"
              className="placeholder:text-accent-foreground/60 placeholder:text-xs"
              value={exampleFormData.tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCreateSlug("tags", e.target.value, "example")
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
              value={exampleFormData.category}
              onChange={(e) =>
                handleCreateSlug("category", e.target.value, "example")
              }
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isProExample"
              checked={exampleFormData.isProExample}
              onCheckedChange={(checked: boolean) =>
                handleCreateSlug("isProExample", checked, "example")
              }
            />
            <Label htmlFor="isProExample">Is this a Pro example?</Label>
          </div>

          <div className="space-y-2 flex items-center gap-2">
            <Button
              type="button"
              onClick={handleGenerateExampleInfo}
              disabled={isGeneratingExampleInfo}
              data-style="outline"
            >
              <span className="mr-2">✨</span>
              {isGeneratingExampleInfo
                ? "Generating..."
                : "Generate Example Info"}
            </Button>
            <p className="text-xs text-emerald-600">{exampleInfoSuccess}</p>
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
              handleExampleSubmit({
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
              })
            }
            disabled={isSavingExample}
          >
            {isSavingExample
              ? "Saving..."
              : existingExample
                ? "Update Example"
                : "Save Example"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
