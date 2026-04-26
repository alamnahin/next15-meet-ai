"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { DashboardTrial } from "./dashboard-trial";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Secretaries",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-foreground">
        <Link href="/" className="flex items-center gap-3 rounded-[20px] border border-border bg-white/80 px-3 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm">
          <img src="logo.png" height={52} width={181} alt="Mysoft Haven" className="h-6 w-auto shrink-0 object-contain" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-lg font-semibold text-foreground">MeetMind</span>
            {/* <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Mysoft Haven</span> */}
          </div>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="bg-border/70" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-full border border-transparent hover:border-border hover:bg-gradient-to-r hover:from-primary/10 hover:via-accent/10 hover:to-transparent",
                      pathname === item.href && "border-border bg-gradient-to-r from-primary/10 via-accent/10 to-transparent"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <Separator className="bg-border/70" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-full border border-transparent hover:border-border hover:bg-gradient-to-r hover:from-primary/10 hover:via-accent/10 hover:to-transparent",
                      pathname === item.href && "border-border bg-gradient-to-r from-primary/10 via-accent/10 to-transparent"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-foreground">
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
};