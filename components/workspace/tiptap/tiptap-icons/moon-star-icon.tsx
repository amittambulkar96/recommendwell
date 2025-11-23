import * as React from "react";
import { MoonIcon } from "@phosphor-icons/react";

export const MoonStarIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof MoonIcon>) => {
    return (
      <MoonIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

MoonStarIcon.displayName = "MoonStarIcon";
