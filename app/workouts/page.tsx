"use client";

import { useState } from "react";
import { WorkoutsNav } from "@/components/workouts/workouts-nav";
import { WorkoutsCalendar } from "@/components/workouts/workouts-calendar";
import { ComingSoon } from "@/components/workouts/coming-soon";
import { ExercisesList } from "@/components/workouts/exercises/exercises-list";
import {RoutinesPage} from "@/components/routines/routines-list";
import { CreateRoutinePage } from "@/components/routines/create/create-routines";

type TabType = "calendar" | "routines" | "addroutines" | "exercises" | "progress";

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("calendar");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <WorkoutsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 max-w-7xl">
          {activeTab === "calendar" && <WorkoutsCalendar />}
          {activeTab === "routines" && <RoutinesPage />}
          {activeTab === "addroutines" && <CreateRoutinePage />}
          {activeTab === "exercises" && <ExercisesList />}
          {activeTab === "progress" && <ComingSoon title="Progress Tracking" />}
        </div>
      </div>
    </div>
  );
}