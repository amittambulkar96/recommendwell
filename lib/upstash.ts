import { Redis } from "@upstash/redis";
import * as fs from "fs";
import * as path from "path";

type QueueTier = "free" | "pro" | "both";

type KeywordEntry = {
  slug: string;
  tier: QueueTier;
  keyword?: string;
};

export type QueueJob = {
  slug: string;
  tier: QueueTier;
  keyword?: string;
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const TEMPLATE_QUEUE_KEY = "template-generator:queue";
const TEMPLATE_DONE_KEY = "template-generator:done";
const EXAMPLE_QUEUE_KEY = "example-generator:queue";
const EXAMPLE_DONE_KEY = "example-generator:done";

const KEYWORD_DIR = path.join(process.cwd(), "data");
const TEMPLATE_KEYWORDS_FILE = "template-keywords.json";
const EXAMPLE_KEYWORDS_FILE = "example-keywords.json";

const validTiers: QueueTier[] = ["free", "pro", "both"];

function isValidTier(value: string): value is QueueTier {
  return validTiers.includes(value as QueueTier);
}

function readKeywordEntries(fileName: string): KeywordEntry[] {
  const filePath = path.join(KEYWORD_DIR, fileName);
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(content) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`Keyword file must be an array: ${fileName}`);
  }

  return parsed.filter((entry) => {
    if (!entry || typeof entry !== "object") {
      return false;
    }
    const { slug, tier } = entry as KeywordEntry;
    if (!slug || typeof slug !== "string") {
      return false;
    }
    if (!tier || typeof tier !== "string" || !isValidTier(tier)) {
      return false;
    }
    return true;
  });
}

function toQueuePayload(job: QueueJob): string {
  return JSON.stringify({
    slug: job.slug,
    tier: job.tier,
    ...(job.keyword ? { keyword: job.keyword } : {}),
  });
}

export function parseQueuePayload(value: string): QueueJob | null {
  try {
    const parsed = JSON.parse(value) as QueueJob;
    if (!parsed || typeof parsed.slug !== "string") {
      return null;
    }
    if (!parsed.tier || !isValidTier(parsed.tier)) {
      return null;
    }
    return {
      slug: parsed.slug,
      tier: parsed.tier,
      ...(parsed.keyword ? { keyword: parsed.keyword } : {}),
    };
  } catch {
    return null;
  }
}

function entryToJob(entry: KeywordEntry): QueueJob {
  return { slug: entry.slug, tier: entry.tier, keyword: entry.keyword };
}

// ==================== TEMPLATE QUEUE OPERATIONS ====================

export async function seedTemplateQueueFromKeywords(): Promise<void> {
  const entries = readKeywordEntries(TEMPLATE_KEYWORDS_FILE);
  console.log(
    `Seeding template queue with ${entries.length} entries from ${TEMPLATE_KEYWORDS_FILE}`
  );

  if (entries.length === 0) {
    return;
  }

  const pipeline = redis.pipeline();
  for (const entry of entries) {
    const job = entryToJob(entry);
    pipeline.sadd(TEMPLATE_QUEUE_KEY, toQueuePayload(job));
  }
  await pipeline.exec();
}

export async function claimNextTemplateJob(): Promise<QueueJob | null> {
  const payload = await redis.spop(TEMPLATE_QUEUE_KEY);
  if (!payload) {
    return null;
  }
  const value = Array.isArray(payload) ? payload[0] : payload;
  if (!value) {
    return null;
  }

  return parseQueuePayload(value);
}

export async function markTemplateJobDone(job: QueueJob): Promise<void> {
  await redis.sadd(TEMPLATE_DONE_KEY, toQueuePayload(job));
}

export async function addTemplateJobBackToQueue(job: QueueJob): Promise<void> {
  await redis.sadd(TEMPLATE_QUEUE_KEY, toQueuePayload(job));
}

export async function getTemplateQueueSize(): Promise<number> {
  return await redis.scard(TEMPLATE_QUEUE_KEY);
}

export async function getCompletedTemplateJobs(): Promise<string[]> {
  return await redis.smembers(TEMPLATE_DONE_KEY);
}

// ==================== EXAMPLE QUEUE OPERATIONS ====================

export async function seedExampleQueueFromKeywords(): Promise<void> {
  const entries = readKeywordEntries(EXAMPLE_KEYWORDS_FILE);
  console.log(
    `Seeding example queue with ${entries.length} entries from ${EXAMPLE_KEYWORDS_FILE}`
  );

  if (entries.length === 0) {
    return;
  }

  const pipeline = redis.pipeline();
  for (const entry of entries) {
    const job = entryToJob(entry);
    pipeline.sadd(EXAMPLE_QUEUE_KEY, toQueuePayload(job));
  }
  await pipeline.exec();
}

export async function claimNextExampleJob(): Promise<QueueJob | null> {
  const payload = await redis.spop(EXAMPLE_QUEUE_KEY);
  if (!payload) {
    return null;
  }
  const value = Array.isArray(payload) ? payload[0] : payload;
  if (!value) {
    return null;
  }

  return parseQueuePayload(value);
}

export async function markExampleJobDone(job: QueueJob): Promise<void> {
  await redis.sadd(EXAMPLE_DONE_KEY, toQueuePayload(job));
}

export async function addExampleJobBackToQueue(job: QueueJob): Promise<void> {
  await redis.sadd(EXAMPLE_QUEUE_KEY, toQueuePayload(job));
}

export async function getExampleQueueSize(): Promise<number> {
  return await redis.scard(EXAMPLE_QUEUE_KEY);
}

export async function getCompletedExampleJobs(): Promise<string[]> {
  return await redis.smembers(EXAMPLE_DONE_KEY);
}
