"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TopicKeyword } from "@/lib/topic-keywords";

type TopicSearchProps = {
  topics: TopicKeyword[];
  basePath: string;
};

export default function TopicSearch({ topics, basePath }: TopicSearchProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: ["keyword"],
        threshold: 0.3,
      }),
    [topics]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-center justify-center px-4 text-center">
        <Input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search recommendation letter topics"
          className="h-12 max-w-xl text-base"
        />
      </div>

      {query.trim().length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 bg-white/70 p-10 text-center sm:col-span-2 lg:col-span-3">
              <p className="text-sm text-muted-foreground">
                No topics match that search. Try a different phrase.
              </p>
            </div>
          ) : (
            results.map((topic) => (
              <Link
                key={`${topic.slug}-${topic.source}`}
                href={`${basePath}/${topic.slug}`}
                className="group"
              >
                <Card className="h-full p-4 transition-colors group-hover:bg-muted/40">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                      {topic.keyword.charAt(0).toUpperCase() +
                        topic.keyword.slice(1)}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase"
                    >
                      {topic.source}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
