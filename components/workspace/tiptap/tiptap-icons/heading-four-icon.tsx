import * as React from "react";
import { TextHFourIcon } from "@phosphor-icons/react";

export const HeadingFourIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHFourIcon>) => {
    return (
      <TextHFourIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingFourIcon.displayName = "HeadingFourIcon";
