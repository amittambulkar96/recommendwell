import * as React from "react";
import { ArrowLeftIcon as PhosphorArrowLeftIcon } from "@phosphor-icons/react";

export const ArrowLeftIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof PhosphorArrowLeftIcon>) => {
    return (
      <PhosphorArrowLeftIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ArrowLeftIcon.displayName = "ArrowLeftIcon";
