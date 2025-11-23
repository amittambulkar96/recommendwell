import * as React from "react";
import { TextAlignCenterIcon } from "@phosphor-icons/react";

export const AlignCenterIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof TextAlignCenterIcon>) => {
    return (
      <TextAlignCenterIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

AlignCenterIcon.displayName = "AlignCenterIcon";
