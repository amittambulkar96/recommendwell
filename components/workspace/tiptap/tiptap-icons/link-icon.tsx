import * as React from "react";
import { LinkIcon as PhosphorLinkIcon } from "@phosphor-icons/react";

export const LinkIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof PhosphorLinkIcon>) => {
    return (
      <PhosphorLinkIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

LinkIcon.displayName = "LinkIcon";
