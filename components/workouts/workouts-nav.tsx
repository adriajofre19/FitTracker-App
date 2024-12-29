"use client";

import { Calendar, Dumbbell, List, LineChart, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "calendar" | "routines" | "addroutines" | "progress";

interface WorkoutsNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function WorkoutsNav({ activeTab, setActiveTab }: WorkoutsNavProps) {
  const navItems = [
    {
      id: "calendar" as TabType,
      label: "Calendar",
      icon: Calendar,
    },
    {
      id: "routines" as TabType,
      label: "Routines",
      icon: List,
    },
    {
      id: "addroutines" as TabType,
      label: "Create routine",
      icon: PlusIcon,
    },
    {
      id: "progress" as TabType,
      label: "Progress",
      icon: LineChart,
    },
  ];

  return (
    <nav className="w-full md:w-64 space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
            activeTab === item.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}