import * as React from "react";
import { TrashIcon as PhosphorTrashIcon } from "@phosphor-icons/react";

export const TrashIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof PhosphorTrashIcon>) => {
    return (
      <PhosphorTrashIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

TrashIcon.displayName = "TrashIcon";
