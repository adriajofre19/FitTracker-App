"use client";

import { MainNav } from "./main-nav";
import { UserMenu } from "./user-menu";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full h-16 flex">
        <div className="bg-background supports-[backdrop-filter]:bg-background w-5/6 flex items-center justify-center gap-4">
            <MainNav />
        </div>
        <div className="bg-background supports-[backdrop-filter]:bg-background w-1/6 flex items-center justify-center gap-4">
        <ThemeToggle />
        <UserMenu />
        </div>
      </div>
    </header>
  );
}