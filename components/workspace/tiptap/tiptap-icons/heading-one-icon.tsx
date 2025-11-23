import * as React from "react";
import { TextHOneIcon } from "@phosphor-icons/react";

export const HeadingOneIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHOneIcon>) => {
    return (
      <TextHOneIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingOneIcon.displayName = "HeadingOneIcon";
