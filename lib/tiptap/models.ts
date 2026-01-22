import type { Id } from "@/convex/_generated/dataModel";
import type { JSONContent } from "@tiptap/react";

export interface TemplateEditorModel {
  _id: Id<"templates">;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  content: JSONContent;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  previewImageUrl: string | null;
  isPro: boolean;
}

export interface ExampleEditorModel {
  _id: Id<"examples">;
  slug: string;
  description: string;
  tags: string[];
  category: string;
  content: JSONContent;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  previewImageUrl: string | null;
  isPro: boolean;
}

export type MutationFailure = { ok: false; type: string };

export type CreateTemplateArgs = {
  name: string;
  slug: string;
  description: string;
  content: string;
  templateInfo: string;
  tags: string[];
  category: string;
  isPro: boolean;
};

export type CreateTemplateResult =
  | { ok: true; templateId: Id<"templates"> }
  | MutationFailure;

export type UpdateTemplateArgs = {
  _id: Id<"templates">;
  name?: string;
  slug?: string;
  description?: string;
  content?: string;
  templateInfo?: string;
  tags?: string[];
  category?: string;
  isPro?: boolean;
};

export type UpdateTemplateResult = { ok: true } | MutationFailure;

export type CreateTemplateFn = (args: CreateTemplateArgs) => Promise<CreateTemplateResult>;
export type UpdateTemplateFn = (args: UpdateTemplateArgs) => Promise<UpdateTemplateResult>;

export type CreateExampleArgs = {
  name: string;
  slug: string;
  description: string;
  content: string;
  exampleInfo: string;
  tags: string[];
  category: string;
  isPro: boolean;
};

export type CreateExampleResult =
  | { ok: true; exampleId: Id<"examples"> }
  | MutationFailure;

export type UpdateExampleArgs = {
  _id: Id<"examples">;
  name?: string;
  slug?: string;
  description?: string;
  content?: string;
  exampleInfo?: string;
  tags?: string[];
  category?: string;
  isPro?: boolean;
};

export type UpdateExampleResult = { ok: true } | MutationFailure;

export type CreateExampleFn = (args: CreateExampleArgs) => Promise<CreateExampleResult>;
export type UpdateExampleFn = (args: UpdateExampleArgs) => Promise<UpdateExampleResult>;
