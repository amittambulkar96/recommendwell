import AppHeader from "@/components/marketing/AppHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-shell flex flex-col w-full max-w-7xl mx-auto min-h-screen h-full overflow-y-auto">
      <AppHeader />
      <main className="grow border-x border-border overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
