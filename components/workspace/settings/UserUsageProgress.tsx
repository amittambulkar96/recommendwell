import { Button } from "@/components/ui/button";
import { ArrowUpRight, Cloud, FileDown, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getToken } from "@/lib/auth-server";
import SettingsPageStatsCard from "./SettingsPageStatsCard";

export default async function UserUsageProgress() {
  const token = await getToken();
  const { data: userProfile } = await fetchQuery(
    api.users.getUserProfile,
    {},
    { token }
  );
  if (!userProfile) redirect("/login");

  const user = userProfile;

  const pdfDownloads = user.pdfDownloadsUsed ?? 0;
  const cloudSaves = user.savedDocumentsUsed ?? 0;
  const docDownloads = user.docDownloadsUsed ?? 0;
  const txtDownloads = user.txtDownloadsUsed ?? 0;

  const isPro = user.isPro ?? false;

  return (
    <Card>
      <CardHeader className="space-y-1 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg md:text-xl">Usage</CardTitle>
              <Badge variant="outline" className="text-xs">
                Lifetime
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </CardDescription>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl md:text-3xl font-semibold tracking-tight">
              {isPro ? "Pro" : "Free"}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Lifetime
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Usage progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SettingsPageStatsCard
            label="PDF downloads"
            value={pdfDownloads}
            icon={<FileDown className="h-5 w-5 sm:h-6 sm:w-6" />}
            accentClasses="bg-emerald-50 text-emerald-700"
            isPro={false}
          />
          <SettingsPageStatsCard
            label="TXT downloads"
            value={txtDownloads}
            icon={<FileText className="h-5 w-5 sm:h-6 sm:w-6" />}
            accentClasses="bg-blue-50 text-blue-700"
            isPro={false}
          />
          <SettingsPageStatsCard
            label="Cloud saves"
            value={cloudSaves}
            icon={<Cloud className="h-5 w-5 sm:h-6 sm:w-6" />}
            accentClasses="bg-purple-50 text-purple-700"
            locked={!isPro}
            isPro={true}
          />
          <SettingsPageStatsCard
            label="DOC downloads"
            value={docDownloads}
            icon={<FileDown className="h-5 w-5 sm:h-6 sm:w-6" />}
            accentClasses="bg-amber-50 text-amber-700"
            locked={!isPro}
            isPro={true}
          />
        </div>
        {/* <div className="mt-6 flex justify-start sm:justify-end">
          <ButtonProUpgrade />
        </div> */}
      </CardContent>
    </Card>
  );
}
