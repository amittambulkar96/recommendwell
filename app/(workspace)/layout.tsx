import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/workspace/common/AppSidebar";
import WorkspaceHeader from "@/components/workspace/common/WorkspaceHeader";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="h-full min-h-0">
          <WorkspaceHeader />
          <div className="flex-1 min-h-0 overflow-auto pt-16">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
