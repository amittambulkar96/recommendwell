import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Feather,
  Gauge,
  Sparkles,
  Stars,
} from "lucide-react";

export default function Home() {
  const palette = {
    "--ink": "#0f2a2e",
    "--sea": "#0b3a3f",
    "--sun": "#f6e2b7",
    "--coral": "#ff6b4a",
    "--sky": "#a5d7e4",
    "--paper": "#fff7ea",
    "--mint": "#cfe9e4",
  } as CSSProperties;

  return (
    <main
      style={palette}
      className="flex min-h-screen flex-col text-[color:var(--ink)]"
    >
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_10%_0%,#f6e2b7_0%,transparent_60%),radial-gradient(800px_circle_at_90%_10%,#a5d7e4_0%,transparent_55%),linear-gradient(180deg,#fff7ea_0%,#ffffff_45%)]" />
        <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[color:var(--coral)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-24 h-72 w-72 rounded-full bg-[color:var(--sky)]/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(transparent,rgba(15,42,46,0.05))]" />

        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)]/10 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[color:var(--ink)]/70">
                EASY
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--coral)]" />
                FAST
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--coral)]" />
                GOOD
              </div>

              <div className="space-y-5">
                <h1
                  className={`font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]`}
                >
                  Letters that sound like
                  <span className="text-[color:var(--coral)]">
                    You wrote them.
                  </span>
                </h1>
                <p className="max-w-xl text-base sm:text-lg text-[color:var(--ink)]/70">
                  RecommendWell turns raw notes, CVs, and student highlights
                  into letters with credible evidence, warm tone control, and
                  institutional-ready formatting.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[color:var(--ink)] px-7 text-sm uppercase tracking-[0.2em] text-[color:var(--paper)] shadow-[0_20px_50px_-25px_rgba(15,42,46,0.9)] hover:bg-[color:var(--sea)]"
                  asChild
                >
                  <Link href="/signup">
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-[color:var(--ink)]/30 bg-white/70 px-7 text-sm uppercase tracking-[0.2em] hover:bg-white/90 hover:text-[color:var(--ink)]"
                  asChild
                >
                  <Link href="/all-templates">Browse templates</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { value: "6 min", label: "Average first draft" },
                  { value: "3×", label: "Cleaner evidence flow" },
                  { value: "A+", label: "Professional tone score" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/70 px-4 py-3"
                  >
                    <div className="text-lg font-semibold">{item.value}</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-4xl border border-[color:var(--ink)]/10 bg-white/60 shadow-[0_40px_120px_-60px_rgba(15,42,46,0.8)]" />
              <div className="relative grid gap-4 rounded-[28px] border border-[color:var(--ink)]/10 bg-white/90 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
                      Draft studio
                    </p>
                    <p className="text-sm font-semibold">
                      Fellowship Recommendation
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--mint)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--sea)]">
                    <Sparkles className="h-3 w-3" />
                    Polished
                  </span>
                </div>

                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-[color:var(--paper)] px-4 py-3 text-sm leading-relaxed text-[color:var(--ink)]/80">
                  <span className="font-semibold text-[color:var(--ink)]">
                    I recommend Aisha without hesitation
                  </span>
                  , because her research initiative turned a stalled project
                  into a funded collaboration. Her memo paired rigorous data
                  with accessible storytelling, a rare combination that made
                  decision-makers trust her immediately.
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white px-4 py-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                      Tone dial
                      <Gauge className="h-4 w-4 text-[color:var(--coral)]" />
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[color:var(--ink)]/10">
                      <div className="h-2 w-3/4 rounded-full bg-[color:var(--coral)]" />
                    </div>
                    <div className="mt-2 text-xs text-[color:var(--ink)]/60">
                      Warm, confident, specific
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white px-4 py-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                      Evidence board
                      <Feather className="h-4 w-4 text-[color:var(--sea)]" />
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-[color:var(--ink)]/70">
                      <p>• Led 12-person lab handoff</p>
                      <p>• Raised $120K grant support</p>
                      <p>• Peer feedback: “clarity + grit”</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white px-4 py-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                    Quick checks
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--sea)]" />
                  </div>
                  <div className="mt-3 grid gap-2 text-xs text-[color:var(--ink)]/70">
                    <div className="flex items-center justify-between">
                      <span>Institutional tone</span>
                      <span className="font-semibold">Pass</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Evidence density</span>
                      <span className="font-semibold">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bias scan</span>
                      <span className="font-semibold">Clear</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--ink)] py-20 text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_10%_0%,#1f4d50_0%,transparent_60%),radial-gradient(700px_circle_at_90%_10%,#304d43_0%,transparent_55%)]" />
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Why it feels human
              </p>
              <h2 className={`font-serif text-3xl sm:text-4xl`}>
                A letter engine built around credibility, not speed.
              </h2>
              <p className="text-sm sm:text-base text-white/70">
                We structure every paragraph around an evidence hook, a
                narrative arc, and a proof line so your recommendation reads
                like a real mentor wrote it.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white"
            >
              See the engine
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Evidence-first outlines",
                body: "Drop in notes and we frame them as defensible proof, not fluffy praise.",
                icon: <Stars className="h-5 w-5 text-[color:var(--sun)]" />,
              },
              {
                title: "Tone intelligence",
                body: "Adjust warmth, assertiveness, and specificity without re-writing from scratch.",
                icon: <Gauge className="h-5 w-5 text-[color:var(--sun)]" />,
              },
              {
                title: "Bias-aware phrasing",
                body: "Language checks remove unintentional bias and keep your letter equitable.",
                icon: (
                  <CheckCircle2 className="h-5 w-5 text-[color:var(--sun)]" />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/60">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    {card.icon}
                  </span>
                  Module
                </div>
                <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,42,46,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(15,42,46,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
                How it works
              </p>
              <h2 className={`font-serif text-3xl sm:text-4xl`}>
                From rough notes to a letter that gets remembered.
              </h2>
              <p className="text-sm sm:text-base text-[color:var(--ink)]/70">
                Import a resume, drop bullet points, or paste a performance
                review. RecommendWell organizes the proof and gives you a draft
                you can sign with confidence.
              </p>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                {[
                  "Lab rotations",
                  "MBA admissions",
                  "Hiring panels",
                  "Fellowships",
                  "Scholarships",
                  "Promotion cases",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--ink)]/15 bg-white/70 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ol className="space-y-6 border-l border-[color:var(--ink)]/10 pl-6">
              {[
                {
                  title: "Capture the evidence",
                  body: "Upload CVs, drafts, or a quick voice note. We extract the strongest proof points.",
                },
                {
                  title: "Shape the narrative",
                  body: "Pick the tone, audience, and length. The engine maps achievements to a clear arc.",
                },
                {
                  title: "Polish in minutes",
                  body: "Refine phrasing, add specifics, and export to PDF or your letterhead.",
                },
              ].map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-3xl border border-[color:var(--ink)]/10 bg-white/80 p-6 shadow-[0_20px_40px_-30px_rgba(15,42,46,0.4)]"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--coral)] text-[color:var(--paper)]">
                      {index + 1}
                    </span>
                    Step
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-[color:var(--ink)]/70">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_circle_at_50%_0%,rgba(255,107,74,0.12),transparent_60%)]" />
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
                The library
              </p>
              <h2 className={`font-serif text-3xl sm:text-4xl`}>
                Designed for real recommendation moments.
              </h2>
              <p className="text-sm sm:text-base text-[color:var(--ink)]/70">
                Start from a discipline-ready structure and personalize it with
                your voice. Every template keeps the letter tight, credible, and
                decision-ready.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Graduate admissions",
                  "Scholarship panels",
                  "Engineering hiring",
                  "Medical residency",
                  "Design leadership",
                  "Research grants",
                  "International exchange",
                  "Leadership awards",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 px-4 py-3 text-sm"
                  >
                    <span>{item}</span>
                    <ArrowRight className="h-4 w-4 text-[color:var(--coral)]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-[color:var(--ink)]/10 bg-white/90 p-6 shadow-[0_30px_80px_-50px_rgba(15,42,46,0.6)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ink)]/60">
                  From mentors like you
                </p>
                <span className="rounded-full border border-[color:var(--ink)]/20 px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                  Real voices
                </span>
              </div>
              <div className="mt-6 space-y-6">
                {[
                  {
                    quote:
                      "“It reads like I spent a full afternoon on it — and it still sounds like me.”",
                    name: "A. Rivera · Dept. Chair",
                  },
                  {
                    quote:
                      "“The evidence prompts stopped me from vague praise. Every line did work.”",
                    name: "J. Chen · Engineering Manager",
                  },
                  {
                    quote:
                      "“We cleared a backlog of 14 letters in a single week without compromising quality.”",
                    name: "S. Patel · Fellowship Advisor",
                  },
                ].map((testimonial) => (
                  <div key={testimonial.name} className="space-y-2">
                    <p className="text-sm text-[color:var(--ink)]/80">
                      {testimonial.quote}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
                      {testimonial.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,#0f2a2e_0%,#0b3a3f_55%,#11474c_100%)]" />
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-10 text-white shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Ready to write
                </p>
                <h2 className={`font-serif text-3xl sm:text-4xl`}>
                  Give every candidate a letter that feels personal, fast.
                </h2>
                <p className="text-sm sm:text-base text-white/70">
                  Start with three free letters, then keep your templates, tone
                  presets, and institution settings ready to go.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-[color:var(--coral)] px-7 text-sm uppercase tracking-[0.2em] text-[color:var(--paper)] hover:bg-[#ff7c60]"
                  asChild
                >
                  <Link href="/signup">
                    Start free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/40 bg-white/10 px-7 text-sm uppercase tracking-[0.2em] text-white hover:bg-white/20 hover:text-white"
                  asChild
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {[
                "No credit card required",
                "Secure document storage",
                "Export to PDF or DOCX",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--sun)]" />
                  <span className="uppercase tracking-[0.25em] text-white/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
