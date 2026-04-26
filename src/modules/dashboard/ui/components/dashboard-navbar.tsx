"use client";

import { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="sticky top-0 z-20 flex items-center gap-x-3 border-b border-border bg-[rgba(255,255,255,0.92)] px-4 py-3 backdrop-blur-xl">
        <Button className="size-10 rounded-full border-border/80 bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-blue-50" variant="outline" onClick={toggleSidebar}>
          {(state === "collapsed" || isMobile)
            ? <PanelLeftIcon className="size-4" />
            : <PanelLeftCloseIcon className="size-4" />
          }
        </Button>
        <Button
          className="h-10 w-[260px] justify-start rounded-full border-border/80 bg-white/90 font-normal text-muted-foreground shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:bg-blue-50 hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-full border border-border bg-blue-50 px-2 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
