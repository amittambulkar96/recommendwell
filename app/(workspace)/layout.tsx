export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
