import * as React from "react";
import { ListChecksIcon } from "@phosphor-icons/react";

export const ListTodoIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof ListChecksIcon>) => {
    return (
      <ListChecksIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ListTodoIcon.displayName = "ListTodoIcon";
