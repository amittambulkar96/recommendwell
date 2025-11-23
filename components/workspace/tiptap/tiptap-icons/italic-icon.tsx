import * as React from "react";
import { TextItalicIcon } from "@phosphor-icons/react";

export const ItalicIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof TextItalicIcon>) => {
    return (
      <TextItalicIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ItalicIcon.displayName = "ItalicIcon";
