import * as React from "react";
import { TextHFiveIcon } from "@phosphor-icons/react";

export const HeadingFiveIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHFiveIcon>) => {
    return (
      <TextHFiveIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingFiveIcon.displayName = "HeadingFiveIcon";
