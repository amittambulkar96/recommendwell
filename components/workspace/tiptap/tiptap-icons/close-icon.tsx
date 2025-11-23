import * as React from "react";
import { XIcon } from "@phosphor-icons/react";

export const CloseIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof XIcon>) => {
    return (
      <XIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

CloseIcon.displayName = "CloseIcon";
