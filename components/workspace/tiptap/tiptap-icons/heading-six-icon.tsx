import * as React from "react";
import { TextHSixIcon } from "@phosphor-icons/react";

export const HeadingSixIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHSixIcon>) => {
    return (
      <TextHSixIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingSixIcon.displayName = "HeadingSixIcon";
