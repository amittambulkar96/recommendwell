import CardProfileDangerZone from "@/components/workspace/settings/CardProfileDangerZone";
import CardProfilePersonalInfo from "@/components/workspace/settings/CardProfilePersonalInfo";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const token = await getToken();
  const { data: userProfile } = await fetchQuery(
    api.users.getUserProfile,
    {},
    { token }
  );
  if (!userProfile) redirect("/login");

  return (
    <div className="container mx-auto px-4 py-4 max-w-4xl">
      <div className="mb-6 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold mb-1 text-left">
          Profile
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left max-w-2xl">
          Manage your profile and personal details.
        </p>
      </div>

      <div className="space-y-6">
        <CardProfilePersonalInfo userProfile={userProfile} />

        <CardProfileDangerZone />
      </div>
    </div>
  );
}
