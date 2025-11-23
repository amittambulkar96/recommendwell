import * as React from "react";
import { TextAlignRightIcon } from "@phosphor-icons/react";

export const AlignRightIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof TextAlignRightIcon>) => {
    return (
      <TextAlignRightIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

AlignRightIcon.displayName = "AlignRightIcon";
