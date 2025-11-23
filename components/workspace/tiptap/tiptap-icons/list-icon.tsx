import * as React from "react";
import { ListBulletsIcon } from "@phosphor-icons/react";

export const ListIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof ListBulletsIcon>) => {
    return (
      <ListBulletsIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ListIcon.displayName = "ListIcon";
