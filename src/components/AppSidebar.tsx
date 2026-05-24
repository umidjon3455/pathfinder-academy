import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Code2, GraduationCap, School, MapPin, Trophy, User, Library } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, SidebarHeader,
} from "@/components/ui/sidebar";

const learning = [
  { title: "Bosh sahifa", url: "/dashboard", icon: LayoutDashboard },
  { title: "Ingliz tili", url: "/english", icon: BookOpen },
  { title: "Dasturlash", url: "/programming", icon: Code2 },
  { title: "Kutubxona", url: "/library", icon: Library },
];
const explore = [
  { title: "Universitetlar", url: "/universities", icon: GraduationCap },
  { title: "Maktablar", url: "/schools", icon: School },
  { title: "Shaharlar", url: "/cities", icon: MapPin },
];
const personal = [
  { title: "Reyting", url: "/leaderboard", icon: Trophy },
  { title: "Profil", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (p: string) => pathname === p;

  const renderItems = (items: typeof learning) =>
    items.map((item) => (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild isActive={isActive(item.url)}>
          <NavLink to={item.url} className="flex items-center gap-3">
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="font-semibold">{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
            <span className="text-lg">🚀</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-none">EduQuest</span>
              <span className="text-[10px] text-muted-foreground">O'rganing • O'sing</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>O'rganish</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(learning)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Kashf qilish</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(explore)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Shaxsiy</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{renderItems(personal)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}