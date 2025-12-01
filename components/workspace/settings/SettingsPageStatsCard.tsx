import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accentClasses: string;
  locked?: boolean;
  isPro: boolean;
}

export default function SettingsPageStatsCard({
  label,
  value,
  icon,
  accentClasses,
  locked,
  isPro,
}: StatCardProps) {
  return (
    <div className="group relative">
      <div className="rounded-none border bg-card p-4 sm:p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-none ${accentClasses} shrink-0`}
          >
            {icon}
          </div>
          <Badge
            variant={isPro ? "pro" : "outline"}
            className="text-xs shrink-0"
          >
            {isPro ? "Pro" : "Free"}
          </Badge>
        </div>
        <div className="mt-3 sm:mt-4 text-sm text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-xl sm:text-2xl md:text-3xl font-semibold">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="mt-3 sm:mt-4 flex justify-start sm:justify-end">
          <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            <ArrowUpRightIcon className="h-3 w-3 text-emerald-600" />
            Total
          </span>
        </div>
      </div>

      {locked && (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-none bg-background/60 backdrop-blur-[1px] transition" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
            <Button size="sm" className="pointer-events-auto">
              Need Pro access
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
