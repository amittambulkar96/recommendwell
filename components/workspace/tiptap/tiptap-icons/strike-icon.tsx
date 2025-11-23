import * as React from "react";
import { TextStrikethroughIcon } from "@phosphor-icons/react";

export const StrikeIcon = React.memo(
  ({
    className,
    ...props
  }: React.ComponentProps<typeof TextStrikethroughIcon>) => {
    return (
      <TextStrikethroughIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

StrikeIcon.displayName = "StrikeIcon";
