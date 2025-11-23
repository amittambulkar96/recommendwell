"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileTextIcon, PencilIcon, CalendarIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { JSONContent } from "@tiptap/react";
import { TinyContentPreview } from "./TinyContentPreview";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function MyLettersGrid() {
  const letters = useQuery(api.letters.getUserLetters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      {letters?.map((letter: any) => (
        <Card
          key={letter._id}
          className="group relative overflow-hidden border-border pt-2 pb-6 min-h-[400px] bg-muted/20"
        >
          <CardContent className="p-0">
            <div className="relative aspect-3/4 md:aspect-4/5 w-full">
              {letter.content && typeof letter.content === "string" ? (
                <div className="absolute inset-0 p-2 bg-linear-to-br from-muted/10 to-background">
                  <div className="h-full overflow-hidden relative">
                    <TinyContentPreview
                      content={JSON.parse(letter.content) as JSONContent}
                    />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-linear-to-br from-muted/40 via-muted/20 to-background" />
                  <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />
                  <FileTextIcon
                    weight="duotone"
                    className="pointer-events-none absolute inset-0 m-auto h-32 w-32 opacity-10"
                  />
                </div>
              )}
            </div>
            <div
              className={
                "pointer-events-none absolute bottom-0 left-0 w-full h-[40%] backdrop-blur-md bg-[linear-gradient(to_top,rgba(59,130,246,0.18)_0%,hsl(var(--background)/0.92)_28%,hsl(var(--background)/0.72)_58%,transparent_100%)] mask-[linear-gradient(to_top,black_0%,black_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_65%,transparent_100%)]"
              }
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
              <div className="pointer-events-none relative mt-auto">
                <div className="pointer-events-auto relative z-10 flex flex-col gap-2 px-3 py-3">
                  <Link href={`/editor/${letter._id}`} className="shrink-0">
                    <Button size="sm" className="h-8 px-3">
                      <PencilIcon weight="duotone" className="mr-0 h-3 w-3" />
                      Edit letter
                    </Button>
                  </Link>
                  <div className="min-w-0">
                    <h3 className="truncate text-xs md:text-sm font-medium">
                      {letter.name}
                    </h3>
                    {letter.description && (
                      <p className="truncate text-xs text-muted-foreground mt-1">
                        {letter.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <CalendarIcon weight="duotone" className="mr-1 h-4 w-4" />
                      {new Intl.DateTimeFormat("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(letter._creationTime))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
