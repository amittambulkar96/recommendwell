import UserUsageProgress from "@/components/workspace/settings/UserUsageProgress";

export default async function BillingPage() {
  return (
    <div className="container mx-auto px-4 py-4 max-w-6xl">
      <div className="mb-6 mt-4">
        <h1 className="text-lg md:text-2xl font-semibold mb-1 text-left">
          Billing & Usage
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-left max-w-2xl">
          Manage your billing and usage.
        </p>
      </div>

      <div className="space-y-6">
        <UserUsageProgress />
      </div>
    </div>
  );
}
