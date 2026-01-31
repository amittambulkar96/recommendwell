import Link from "next/link";

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

type TemplateCardProps = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  isPro: boolean;
};

export default function TemplateCard({
  slug,
  name,
  description,
  tags,
  isPro,
}: TemplateCardProps) {
  return (
    <Card className="h-full flex flex-col border-border/60 bg-white/80 transition-colors hover:border-border/90 hover:bg-muted/20">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-base leading-snug line-clamp-2">
            {name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </div>
        <Badge variant={isPro ? "pro" : "secondary"}>
          {isPro ? "Pro" : "Free"}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {tags?.slice(0, 3).map((tag) => (
          <Badge key={`${slug}-${tag}`} variant="outline">
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild size="sm" variant="outline">
          <Link href={`/template/${slug}`}>Open template</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
