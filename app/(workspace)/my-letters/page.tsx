"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth, useQuery } from "convex/react";

export default function Page() {
  const userProfile = useQuery(api.users.getUserProfile);
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Workspace</h1>
      <div>
        <p>{userProfile?.name}</p>
        <p>{userProfile?.email}</p>
      </div>
      <div>
        {isAuthenticated && (
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        )}
      </div>
    </div>
  );
}
