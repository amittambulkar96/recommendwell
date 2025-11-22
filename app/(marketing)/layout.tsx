export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto min-h-screen h-full overflow-y-auto">
      <main className="grow border-x border-border overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
