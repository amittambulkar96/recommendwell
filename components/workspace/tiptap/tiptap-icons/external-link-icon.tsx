import * as React from "react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

export const ExternalLinkIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof ArrowSquareOutIcon>) => {
    return (
      <ArrowSquareOutIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ExternalLinkIcon.displayName = "ExternalLinkIcon";
