import * as React from "react";
import { HighlighterIcon as PhosphorHighlighterIcon } from "@phosphor-icons/react";

export const HighlighterIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof PhosphorHighlighterIcon>) => {
    return (
      <PhosphorHighlighterIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HighlighterIcon.displayName = "HighlighterIcon";
