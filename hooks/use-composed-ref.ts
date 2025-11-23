"use client";

import * as React from "react";

/**
 * Combines multiple refs into a single ref.
 * Useful when you need to forward a ref while also maintaining a local ref.
 *
 * @param refs - Array of refs to combine
 * @returns A callback ref that applies all the provided refs
 */
export function useComposedRef<T>(
  ...refs: Array<React.Ref<T> | undefined | null>
): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    [refs]
  );
}
