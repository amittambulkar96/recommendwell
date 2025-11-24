import ButtonLogout from "@/components/workspace/settings/ButtonLogout";
import DialogDeleteAccount from "@/components/workspace/settings/DialogDeleteAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardProfileDangerZone() {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl">Danger zone</CardTitle>
        <CardDescription className="text-sm">
          Sign out from this device.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4">
          <div className="min-w-0">
            <div className="text-sm font-medium">Logout</div>
            <div className="text-xs text-muted-foreground mt-1">
              You will be redirected to the homepage.
            </div>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <ButtonLogout />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4">
          <div className="min-w-0">
            <div className="text-sm font-medium">Delete account</div>
            <div className="text-xs text-muted-foreground mt-1">
              Your account will be deleted permanently.
            </div>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <DialogDeleteAccount />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
