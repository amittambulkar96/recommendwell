import * as React from "react";
import { CodeBlockIcon as PhosphorCodeBlockIcon } from "@phosphor-icons/react";

export const CodeBlockIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof PhosphorCodeBlockIcon>) => {
    return (
      <PhosphorCodeBlockIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

CodeBlockIcon.displayName = "CodeBlockIcon";
