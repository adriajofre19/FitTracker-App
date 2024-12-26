"use client";

import { useState } from "react";
import { UserNav } from "./user-nav";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";
import { MeasurementsForm } from "./measurements-form";

type TabType = "profile" | "security" | "measurements";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <UserNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 max-w-3xl">
          {activeTab === "profile" && <ProfileForm />}
          {activeTab === "security" && <SecurityForm />}
          {activeTab === "measurements" && <MeasurementsForm />}
        </div>
      </div>
    </div>
  );
}