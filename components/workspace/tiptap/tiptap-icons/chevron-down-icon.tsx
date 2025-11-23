import * as React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

export const ChevronDownIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof CaretDownIcon>) => {
    return (
      <CaretDownIcon
        weight="duotone"
        size={24}
        className={className}
        {...props}
      />
    );
  }
);

ChevronDownIcon.displayName = "ChevronDownIcon";
