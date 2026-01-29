import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CategoryCardProps = {
  slug: string;
  label: string;
  templateCount: number;
  exampleCount: number;
};

export default function CategoryCard({
  slug,
  label,
  templateCount,
  exampleCount,
}: CategoryCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/70 bg-white/80 shadow-[0_12px_30px_-26px_rgba(15,42,46,0.5)] transition hover:-translate-y-0.5 hover:border-border/90 hover:shadow-[0_22px_50px_-32px_rgba(15,42,46,0.7)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#ffedd5_0%,transparent_55%)]" />
      <CardHeader className="relative">
        <CardTitle className="text-lg font-semibold text-foreground">
          {label}
        </CardTitle>
        <CardDescription>
          {templateCount} templates | {exampleCount} examples
        </CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-wrap gap-2">
        <Badge variant="outline">{templateCount} Templates</Badge>
        <Badge variant="outline">{exampleCount} Examples</Badge>
      </CardContent>
      <CardFooter className="relative">
        <Button asChild size="sm">
          <Link href={`/categories/${slug}`}>
            Explore category
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
