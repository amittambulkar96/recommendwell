import * as React from "react";
import { TextAlignLeftIcon } from "@phosphor-icons/react";

export const AlignLeftIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextAlignLeftIcon>) => {
    return (
      <TextAlignLeftIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

AlignLeftIcon.displayName = "AlignLeftIcon";
