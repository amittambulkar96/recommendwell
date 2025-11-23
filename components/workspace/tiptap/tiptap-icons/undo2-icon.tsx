import * as React from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

export const Undo2Icon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof ArrowCounterClockwiseIcon>) => {
    return (
      <ArrowCounterClockwiseIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

Undo2Icon.displayName = "Undo2Icon";
