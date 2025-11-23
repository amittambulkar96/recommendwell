import * as React from "react";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";

export const Redo2Icon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof ArrowClockwiseIcon>) => {
    return (
      <ArrowClockwiseIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

Redo2Icon.displayName = "Redo2Icon";
