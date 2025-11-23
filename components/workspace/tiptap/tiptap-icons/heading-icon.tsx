import * as React from "react";
import { TextHIcon } from "@phosphor-icons/react";

export const HeadingIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextHIcon>) => {
    return (
      <TextHIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

HeadingIcon.displayName = "HeadingIcon";
