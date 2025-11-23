import * as React from "react";
import { CodeIcon } from "@phosphor-icons/react";

export const Code2Icon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof CodeIcon>) => {
    return (
      <CodeIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

Code2Icon.displayName = "Code2Icon";
