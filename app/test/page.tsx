import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Feather,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
} from "lucide-react";

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-[#1c1917] tracking-tight text-center",
        className
      )}
    >
      {children}
    </h2>
  );
}

function SectionSubheading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-lg text-[#78716c] text-center max-w-2xl mx-auto mt-4",
        className
      )}
    >
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#fde68a] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fdba74] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fed7aa] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff7ed] border border-[#fed7aa] mb-8">
            <Sparkles className="w-4 h-4 text-[#c2410c]" />
            <span className="text-sm font-medium text-[#9a3412]">
              AI-powered recommendation letters
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-[#1c1917] leading-tight tracking-tight">
            Letters that sound like
            <span className="block mt-2 text-[#c2410c]">you wrote them.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-xl text-[#57534e] max-w-2xl mx-auto leading-relaxed">
            Transform raw notes and CVs into compelling, evidence-based
            recommendation letters in minutes—not hours.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-xl bg-[#c2410c] text-[#fff7ed] hover:bg-[#9a3412] transition-all hover:scale-105 shadow-lg shadow-[#c2410c]/25"
            >
              Start writing free
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-xl bg-white text-[#1c1917] border-2 border-[#e7e5e4] hover:border-[#d6d3d1] hover:bg-[#fafaf9] transition-all"
            >
              See how it works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-[#78716c]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#c2410c]" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c2410c]" />
              <span className="text-sm">Secure data storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#c2410c]" />
              <span className="text-sm">Export to PDF & DOCX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Feather,
      title: "Evidence-first approach",
      description:
        "Start with your raw notes and highlights. Our AI organizes evidence into a compelling narrative arc before drafting.",
      color: "bg-[#fef3c7] text-[#b45309]",
    },
    {
      icon: Heart,
      title: "Tone intelligence",
      description:
        "Choose from academic, professional, or warm tones. The AI adapts vocabulary and phrasing to match your voice.",
      color: "bg-[#fce7f3] text-[#be185d]",
    },
    {
      icon: Shield,
      title: "Bias-aware phrasing",
      description:
        "Built-in checks flag unconscious bias patterns and suggest inclusive alternatives for stronger, fairer letters.",
      color: "bg-[#dbeafe] text-[#1d4ed8]",
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#f5f5f4]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Why it feels so human</SectionHeading>
        <SectionSubheading>
          Every feature is designed to amplify your voice, not replace it.
        </SectionSubheading>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white border border-[#e7e5e4] hover:border-[#fed7aa] transition-colors shadow-sm"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                  feature.color
                )}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1c1917]">
                {feature.title}
              </h3>
              <p className="mt-3 text-[#78716c] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Capture evidence",
      description:
        "Upload your notes, student's work samples, or paste highlights from a CV. Our AI extracts meaningful accomplishments and qualities.",
      color: "bg-[#fef3c7] text-[#b45309]",
    },
    {
      number: "02",
      title: "Shape the narrative",
      description:
        "Review and organize the extracted evidence. Choose a focus area and tone. The AI creates an outline that tells a cohesive story.",
      color: "bg-[#fce7f3] text-[#be185d]",
    },
    {
      number: "03",
      title: "Polish in minutes",
      description:
        "Generate a complete draft with one click. Edit freely, export to PDF or DOCX, and send with confidence.",
      color: "bg-[#dbeafe] text-[#1d4ed8]",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>From chaos to polished letter in three steps</SectionHeading>
        <SectionSubheading>
          Focus on what matters—your endorsement—while we handle the heavy lifting.
        </SectionSubheading>

        <div className="mt-20 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-[#fed7aa] via-[#fbcfe8] to-[#bfdbfe]" />

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="relative z-10">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 font-serif text-2xl font-medium",
                      step.color
                    )}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#1c1917]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[#78716c] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Templates() {
  const templates = [
    {
      icon: GraduationCap,
      title: "Graduate admissions",
      description: "MS, PhD, and fellowship applications",
      color: "bg-[#fef3c7] text-[#b45309]",
    },
    {
      icon: Briefcase,
      title: "Hiring & promotions",
      description: "Job recommendations and internal promotions",
      color: "bg-[#dbeafe] text-[#1d4ed8]",
    },
    {
      icon: Award,
      title: "Scholarships & grants",
      description: "Award and fellowship nomination letters",
      color: "bg-[#fce7f3] text-[#be185d]",
    },
    {
      icon: FileText,
      title: "Tenure & academic",
      description: "Faculty reviews and tenure dossiers",
      color: "bg-[#dcfce7] text-[#15803d]",
    },
  ];

  return (
    <section id="templates" className="py-24 bg-[#f5f5f4]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading>Every use case covered</SectionHeading>
        <SectionSubheading>
          Pre-optimized templates for every letter type.
        </SectionSubheading>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-white border border-[#e7e5e4] hover:border-[#fed7aa] transition-all hover:shadow-md cursor-pointer"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  template.color
                )}
              >
                <template.icon className="w-6 h-6" />
              </div>
              <h3 className="font-medium text-[#1c1917]">{template.title}</h3>
              <p className="mt-1 text-sm text-[#78716c]">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "6 min", label: "First draft" },
    { value: "3x", label: "Cleaner evidence flow" },
    { value: "A+", label: "Tone score" },
    { value: "10K+", label: "Letters written" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1c1917] rounded-3xl p-12 lg:p-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c2410c] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fde68a] rounded-full blur-3xl opacity-10" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-5xl lg:text-6xl font-medium text-[#fff7ed]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[#a8a29e]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-[#fff7ed] border border-[#fed7aa] rounded-3xl p-12 lg:p-20 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23fdba74%22 fill-opacity=%220.15%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 rounded-3xl" />

          <div className="relative">
            <h2 className="font-serif text-4xl lg:text-5xl font-medium text-[#1c1917]">
              Ready to write better letters?
            </h2>
            <p className="mt-4 text-lg text-[#78716c] max-w-xl mx-auto">
              Join thousands of recommenders who save time and write stronger
              letters with RecommendWell.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-xl bg-[#c2410c] text-[#fff7ed] hover:bg-[#9a3412] transition-all hover:scale-105 shadow-lg shadow-[#c2410c]/25"
              >
                Start writing free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#a8a29e]">
              No credit card required. Free tier includes 3 letters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TestPage() {
  return (
    <div className="bg-[#fafaf9]">
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Templates />
      <CTA />
    </div>
  );
}
