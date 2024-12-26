"use client";

import { User, Shield, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

type TabType = "profile" | "security" | "measurements";

interface UserNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function UserNav({ activeTab, setActiveTab }: UserNavProps) {
  const navItems = [
    {
      id: "profile" as TabType,
      label: "Profile Information",
      icon: User,
    },
    {
      id: "security" as TabType,
      label: "Security",
      icon: Shield,
    },
    {
      id: "measurements" as TabType,
      label: "Measurements",
      icon: Ruler,
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