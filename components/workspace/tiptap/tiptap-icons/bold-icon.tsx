import * as React from "react";
import { TextBIcon } from "@phosphor-icons/react";

export const BoldIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextBIcon>) => {
    return (
      <TextBIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

BoldIcon.displayName = "BoldIcon";
