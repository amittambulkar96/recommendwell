import * as React from "react";
import { TextHTwoIcon } from "@phosphor-icons/react";

export const HeadingTwoIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHTwoIcon>) => {
    return (
      <TextHTwoIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingTwoIcon.displayName = "HeadingTwoIcon";
