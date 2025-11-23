import * as React from "react";
import { ListNumbersIcon } from "@phosphor-icons/react";

export const ListOrderedIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof ListNumbersIcon>) => {
    return (
      <ListNumbersIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ListOrderedIcon.displayName = "ListOrderedIcon";
