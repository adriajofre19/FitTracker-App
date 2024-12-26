"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/profile",
      label: "Profile",
    },
    {
      href: "/workouts",
      label: "Workouts",
    },
  ];

  return (
    <div className="w-full h-full flex justify-around gap-6">
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="FitTrack" className="h-8 w-8" />
        <span className="font-bold">FitTrack</span>
      </Link>
      <nav className="flex items-center gap-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}