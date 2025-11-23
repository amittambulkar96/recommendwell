import * as React from "react";
import { TextAlignJustifyIcon } from "@phosphor-icons/react";

export const AlignJustifyIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof TextAlignJustifyIcon>) => {
    return (
      <TextAlignJustifyIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

AlignJustifyIcon.displayName = "AlignJustifyIcon";
