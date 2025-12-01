import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 md:pt-40 lg:pt-48">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[10%] right-[0%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl xl:text-6xl">
                The <span className="text-primary">Faster & Better</span> Way to
                write your Recommendation Letter
              </h1>

              <p className="max-w-[600px] text-base text-muted-foreground md:text-lg leading-relaxed">
                The best platform to craft professional recommendation letters
                in seconds. Save time, ensure quality, and help your students
                succeed with our advanced tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2 text-base h-12 px-8 shadow-lg shadow-primary/20"
                asChild
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base h-12 px-8 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <Link href="/template/blank">Start from Scratch</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Professional Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Instant Generation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual/Mockup */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
            <div className="relative border bg-background/50 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />

              {/* Mock UI Window */}
              <div className="border bg-card shadow-sm overflow-hidden flex flex-col h-[400px]">
                {/* Window Header */}
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 bg-background px-3 py-1 border shadow-sm">
                    <div className="h-2 w-2 bg-primary" />
                    <div className="h-1.5 w-24 bg-muted-foreground/20" />
                  </div>
                </div>

                {/* Editor Toolbar */}
                <div className="border-b bg-background px-4 py-2 flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="h-6 w-16 bg-muted/50" />
                    <div className="h-6 w-8 bg-muted/50" />
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1">
                    <div className="h-6 w-6 hover:bg-muted flex items-center justify-center">
                      <div className="h-3 w-3 text-muted-foreground font-serif font-bold text-[10px]">
                        B
                      </div>
                    </div>
                    <div className="h-6 w-6 hover:bg-muted flex items-center justify-center">
                      <div className="h-3 w-3 text-muted-foreground font-serif italic text-[10px]">
                        I
                      </div>
                    </div>
                    <div className="h-6 w-6 hover:bg-muted flex items-center justify-center">
                      <div className="h-3 w-3 text-muted-foreground font-serif underline text-[10px]">
                        U
                      </div>
                    </div>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1">
                    <div className="h-6 w-6 bg-muted/50" />
                    <div className="h-6 w-6 bg-muted/50" />
                    <div className="h-6 w-6 bg-muted/50" />
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 bg-muted/10 p-6 overflow-hidden relative">
                  {/* Paper */}
                  <div className="bg-background shadow-sm border h-full w-full max-w-[90%] mx-auto p-8">
                    <div className="space-y-2">
                      {/* Letter Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                          <div className="h-1.5 w-24 bg-zinc-800 opacity-80" />
                          <div className="h-1 w-32 bg-zinc-400 opacity-60" />
                          <div className="h-1 w-20 bg-zinc-400 opacity-60" />
                        </div>
                        <div className="h-1 w-16 bg-zinc-400 opacity-60" />
                      </div>

                      {/* Salutation */}
                      <div className="h-1.5 w-24 bg-zinc-800 opacity-80 mb-4" />

                      {/* Body Paragraphs - Tiny Text Simulation */}
                      <div className="space-y-2 text-[6px] leading-relaxed text-zinc-600 font-medium text-justify">
                        <p>
                          I am writing to enthusiastically recommend{" "}
                          <span className="bg-primary/10 text-primary font-bold px-0.5">
                            Sarah Jenkins
                          </span>{" "}
                          for the position of Senior Developer at your esteemed
                          organization. I have had the pleasure of working with
                          Sarah for the past three years at TechFlow Solutions,
                          where she consistently demonstrated exceptional
                          technical prowess and leadership abilities.
                        </p>
                        <p>
                          During her tenure, Sarah spearheaded the migration of
                          our legacy systems to a modern cloud-based
                          architecture, resulting in a{" "}
                          <span className="bg-green-500/10 text-green-600 font-bold px-0.5">
                            40% increase in performance
                          </span>{" "}
                          and significant cost savings. Her ability to tackle
                          complex algorithmic challenges while maintaining
                          clean, maintainable code is truly impressive.
                        </p>
                        <p>
                          Beyond her technical skills, Sarah is a natural
                          mentor. She organized weekly knowledge-sharing
                          sessions and played a pivotal role in onboarding new
                          team members. Her collaborative spirit and positive
                          attitude make her an absolute joy to work with.
                        </p>
                        <p>
                          I have no doubt that Sarah will be an invaluable asset
                          to your team. She possesses the rare combination of
                          technical excellence and emotional intelligence that
                          drives real innovation.
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="mt-6 space-y-1">
                        <div className="h-1.5 w-16 bg-zinc-800 opacity-80" />
                        <div className="h-4 w-24 bg-blue-600/20 my-1 -rotate-2" />{" "}
                        {/* Fake Signature */}
                        <div className="h-1 w-24 bg-zinc-400 opacity-60" />
                        <div className="h-1 w-32 bg-zinc-400 opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* Floating AI Assistant Bubble */}
                  <div className="absolute bottom-4 right-8 bg-background border shadow-lg p-3 w-48 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-semibold text-foreground">
                          AI Suggestion
                        </p>
                        <p className="text-[7px] text-muted-foreground leading-tight">
                          I've highlighted key achievements. Would you like to
                          emphasize leadership skills more?
                        </p>
                        <div className="flex gap-1 mt-1">
                          <div className="h-3 w-10 bg-primary text-[6px] text-primary-foreground flex items-center justify-center">
                            Yes
                          </div>
                          <div className="h-3 w-10 bg-muted text-[6px] text-muted-foreground flex items-center justify-center">
                            Dismiss
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
