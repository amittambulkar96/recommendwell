import * as React from "react";
import { ImageIcon } from "@phosphor-icons/react";

export const ImagePlusIcon = React.memo(
  ({ className, ...props }: React.ComponentProps<typeof ImageIcon>) => {
    return (
      <ImageIcon weight="duotone" size={24} className={className} {...props} />
    );
  }
);

ImagePlusIcon.displayName = "ImagePlusIcon";
