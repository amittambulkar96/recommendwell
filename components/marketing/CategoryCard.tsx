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
    <Card className="relative h-full border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {label}
        </CardTitle>
        <CardDescription>
          {templateCount} templates | {exampleCount} examples
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant="outline">{templateCount} Templates</Badge>
        <Badge variant="outline">{exampleCount} Examples</Badge>
      </CardContent>
      <CardFooter>
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
