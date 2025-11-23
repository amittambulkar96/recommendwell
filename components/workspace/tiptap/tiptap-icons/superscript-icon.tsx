import * as React from "react";
import { TextSuperscriptIcon } from "@phosphor-icons/react";

export const SuperscriptIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof TextSuperscriptIcon>) => {
    return (
      <TextSuperscriptIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

SuperscriptIcon.displayName = "SuperscriptIcon";
