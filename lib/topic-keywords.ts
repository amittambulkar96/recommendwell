import templateKeywords from "@/data/template-keywords.json";
import exampleKeywords from "@/data/example-keywords.json";

type KeywordEntry = {
  slug: string;
  tier: "free" | "pro" | "both";
  keyword: string;
};

export type TopicKeywordSource = "template" | "example";

export type TopicFaq = {
  id: string;
  question: string;
  answer: string;
};

export type TopicKeyword = {
  keyword: string;
  slug: string;
  source: TopicKeywordSource;
  pageTitle: string;
  metaDescription: string;
  faq: TopicFaq[];
  targetType: TopicKeywordSource;
  targetSlug: string;
};

const templateEntries = templateKeywords as KeywordEntry[];
const exampleEntries = exampleKeywords as KeywordEntry[];

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .map((word) => {
      const trimmed = word.trim();
      if (!trimmed) return "";
      return trimmed[0].toUpperCase() + trimmed.slice(1);
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildPageTitle(keyword: string): string {
  const base = toTitleCase(keyword);
  if (/recommendation letter/i.test(keyword)) {
    return base;
  }
  return `${base} Recommendation Letter`;
}

function buildMetaDescription(keyword: string, source: TopicKeywordSource): string {
  if (source === "example") {
    return `Review a ${keyword} to understand structure, tone, and the evidence that makes a strong recommendation. Use this example as a reference before writing your own.`;
  }

  return `Create a ${keyword} with a clear structure, credible evidence, and the right tone. Start from a template and customize it in minutes.`;
}

function buildFaq(
  keyword: string,
  slug: string,
  source: TopicKeywordSource
): TopicFaq[] {
  const faqBase = [
    {
      id: `${slug}-include`,
      question: `What should a ${keyword} include?`,
      answer:
        `A strong ${keyword} should cover who is being recommended, how you know them, and 2-3 concrete examples of performance or character. Add a clear endorsement and a short closing that confirms your support.`,
    },
    {
      id: `${slug}-length`,
      question: `How long should a ${keyword} be?`,
      answer:
        `Most ${keyword} documents are 3-5 paragraphs (about 300-500 words). Aim for one page with concise, specific evidence instead of long background stories.`,
    },
  ];

  if (source === "example") {
    return [
      ...faqBase,
      {
        id: `${slug}-use`,
        question: `Can I use this ${keyword} as a template?`,
        answer:
          `Yes, use this ${keyword} as a reference for structure and tone, but replace every detail with the candidate's real achievements and your own voice. Avoid copy-pasting.`,
      },
      {
        id: `${slug}-verify`,
        question: `What details should I verify in a ${keyword}?`,
        answer:
          `Confirm the candidate's role, dates, and the specific program or opportunity. If the ${keyword} is for a school or employer, match any submission requirements before sending.`,
      },
    ];
  }

  return [
    ...faqBase,
    {
      id: `${slug}-customize`,
      question: `How do I customize a ${keyword}?`,
      answer:
        `Update the opening to match the recipient, add concrete evidence that fits the opportunity, and adjust the tone to match the institution. Keep the endorsement direct and specific.`,
    },
    {
      id: `${slug}-who`,
      question: `Who should write a ${keyword}?`,
      answer:
        `The best ${keyword} comes from someone who directly supervised the candidate, such as a professor, manager, or mentor. The closer the relationship, the stronger the evidence will be.`,
    },
  ];
}

function buildTopicEntry(
  entry: KeywordEntry,
  source: TopicKeywordSource
): TopicKeyword {
  return {
    keyword: entry.keyword,
    slug: entry.slug,
    source,
    pageTitle: buildPageTitle(entry.keyword),
    metaDescription: buildMetaDescription(entry.keyword, source),
    faq: buildFaq(entry.keyword, entry.slug, source),
    targetType: source,
    targetSlug: entry.slug,
  };
}

export function getTopicKeywords(): TopicKeyword[] {
  const entries: TopicKeyword[] = [];
  const seen = new Set<string>();

  for (const entry of templateEntries) {
    if (!entry.slug || !entry.keyword) continue;
    const topic = buildTopicEntry(entry, "template");
    entries.push(topic);
    seen.add(entry.slug);
  }

  for (const entry of exampleEntries) {
    if (!entry.slug || !entry.keyword) continue;
    if (seen.has(entry.slug)) {
      continue;
    }
    entries.push(buildTopicEntry(entry, "example"));
  }

  return entries.sort((a, b) => a.keyword.localeCompare(b.keyword));
}

export function getTopicKeywordBySlug(slug: string): TopicKeyword | undefined {
  const topics = getTopicKeywords();
  return topics.find((topic) => topic.slug === slug);
}
