import * as React from "react";
import { ArrowElbowDownLeftIcon } from "@phosphor-icons/react";

export const CornerDownLeftIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof ArrowElbowDownLeftIcon>) => {
    return (
      <ArrowElbowDownLeftIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

CornerDownLeftIcon.displayName = "CornerDownLeftIcon";
