import { Outlet } from "react-router";

import { AppSidebar } from "../components/app-sidebar";
import { ModeToggle } from "../components/ui/mode-toggle";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <SidebarInset className="min-w-0 flex-1 bg-background flex flex-col">
        <header className="flex h-12 items-center justify-between gap-2 border-b border-border px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-foreground">ระบบลงทะเบียนเรียน</span>
          </div>
          <ModeToggle />
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 flex flex-col">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        <footer className="w-full border-t border-border py-4 text-center text-[11px] text-muted-foreground mt-auto">
          จัดทำโดย Wiriyaphat Phromphong รหัสนักศึกษา 680610717
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
