import * as React from "react";
import { TextSubscriptIcon } from "@phosphor-icons/react";

export const SubscriptIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextSubscriptIcon>) => {
    return (
      <TextSubscriptIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

SubscriptIcon.displayName = "SubscriptIcon";
