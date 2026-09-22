import { BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router";
import { currentUser } from "../lib/mock-data";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="w-52 border-r border-sidebar-border bg-sidebar">
      {/* ส่วนหัว Sidebar */}
      <SidebarHeader className="mx-2 border-b border-sidebar-border px-1 py-3">
        <div className="text-xs font-bold tracking-tight text-sidebar-foreground">
          CPE & ISNE
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-2 py-2">
          <SidebarGroupLabel className="px-2 text-[10px] text-muted-foreground">
            เมนูหลัก
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                    className="h-8 px-2.5 text-xs text-sidebar-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  >
                    <item.icon className="size-3.5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ส่วนแสดงข้อมูลผู้ใช้ด้านล่าง Sidebar */}
      <div className="mx-2 mt-auto border-t border-sidebar-border p-2.5">
        <div className="flex items-center gap-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="size-7 rounded-full object-cover shrink-0"
          />

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">
              {currentUser.nickname}
            </p>

            <span className="inline-block rounded border border-sidebar-border px-1.5 py-0.2 text-[9px] text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
