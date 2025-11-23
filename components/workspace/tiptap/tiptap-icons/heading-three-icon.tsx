import * as React from "react";
import { TextHThreeIcon } from "@phosphor-icons/react";

export const HeadingThreeIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHThreeIcon>) => {
    return (
      <TextHThreeIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

HeadingThreeIcon.displayName = "HeadingThreeIcon";
