import * as React from "react";
import { QuotesIcon } from "@phosphor-icons/react";

export const BlockquoteIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof QuotesIcon>) => {
    return (
      <QuotesIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

BlockquoteIcon.displayName = "BlockquoteIcon";
