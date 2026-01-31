import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { HeroHeader } from "./header";
import { ChevronRight, CirclePlay } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      {/* <HeroHeader /> */}
      <main className="overflow-hidden">
        <section className="bg-linear-to-b to-muted from-background">
          <div className="relative py-36">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
              <div className="md:w-3/5">
                <div>
                  <h1 className="max-w-xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
                    <span className="text-primary">Recommendation letters</span>
                    {" "}
                    that read like you wrote them.
                  </h1>
                  <p className="text-muted-foreground my-8 max-w-xl text-balance text-xl">
                    Upload a resume, add quick evidence notes, and RecommendWell
                    drafts a credible letter you can trust and tailor in minutes.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button asChild size="lg" className="pr-4.5">
                      <Link href="/signup">
                        <span className="text-nowrap">Start free</span>
                        <ChevronRight className="opacity-50" />
                      </Link>
                    </Button>
                    <Button
                      key={2}
                      asChild
                      size="lg"
                      variant="outline"
                      className="pl-5"
                    >
                      <Link href="/all-templates">
                        <CirclePlay className="fill-primary/25 stroke-primary" />
                        <span className="text-nowrap">View templates</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                    Built for recommenders
                  </p>
                  <div className="mt-4 grid max-w-lg gap-3 text-sm">
                    {[
                      "Free to start, no card required",
                      "AI integrations for fast evidence prompts",
                      "Download to PDF or DOCX",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-10 md:bottom-16 md:left-140 md:top-40 md:mt-0 md:translate-x-0">
              <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
                <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                    <Image
                      src="/mist/recommendwell-hero.svg"
                      alt="Recommendation letter workspace"
                      width="1600"
                      height="1000"
                      className="object-top-left size-full object-cover"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
