export type CreateTemplateInternalInput = {
  name: string;
  description: string;
  slug: string;
  content: string;
  templateInfo: string;
  tags: string[];
  category: string;
  isPro: boolean;
};

export type CreateExampleInternalInput = {
  name: string;
  description: string;
  slug: string;
  content: string;
  exampleInfo: string;
  tags: string[];
  category: string;
  isPro: boolean;
};

export async function createTemplateInternal(
  _input: CreateTemplateInternalInput
): Promise<void> {
  throw new Error(
    "Not implemented: wire createTemplateInternal to a Convex internal mutation."
  );
}

export async function createExampleInternal(
  _input: CreateExampleInternalInput
): Promise<void> {
  throw new Error(
    "Not implemented: wire createExampleInternal to a Convex internal mutation."
  );
}
