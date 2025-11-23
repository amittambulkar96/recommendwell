import * as React from "react";
import { TextUnderlineIcon } from "@phosphor-icons/react";

export const UnderlineIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextUnderlineIcon>) => {
    return (
      <TextUnderlineIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

UnderlineIcon.displayName = "UnderlineIcon";
