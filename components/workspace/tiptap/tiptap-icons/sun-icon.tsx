import * as React from "react";
import { SunIcon } from "@phosphor-icons/react";

export const Sun = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof SunIcon>) => {
    return (
      <SunIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

SunIcon.displayName = "SunIcon";
