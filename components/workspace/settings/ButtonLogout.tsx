"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { SignOutIcon } from "@phosphor-icons/react/dist/csr/SignOut";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ButtonLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  return (
    <Button
      variant="outline"
      disabled={isLoggingOut}
      onClick={async () => {
        try {
          setIsLoggingOut(true);
          await authClient.signOut();
          setIsLoggingOut(false);
          router.push("/");
        } catch (error) {
          console.error(error);
          setIsLoggingOut(false);
        }
      }}
    >
      <SignOutIcon size={16} weight="duotone" aria-hidden="true" />
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
