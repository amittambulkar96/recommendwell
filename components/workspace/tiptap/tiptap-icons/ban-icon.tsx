import * as React from "react";
import { ProhibitIcon } from "@phosphor-icons/react";

export const BanIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof ProhibitIcon>) => {
    return (
      <ProhibitIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

BanIcon.displayName = "BanIcon";
