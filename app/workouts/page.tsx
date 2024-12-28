"use client";

import { useState } from "react";
import { WorkoutsNav } from "@/components/workouts/workouts-nav";
import { WorkoutsCalendar } from "@/components/workouts/workouts-calendar";
import { ComingSoon } from "@/components/workouts/coming-soon";
import { ExercisesList } from "@/components/workouts/exercises/exercises-list";
import {CreateRoutineForm} from "@/components/routines/routines-list";

type TabType = "calendar" | "notifications" | "exercises" | "progress";

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("calendar");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <WorkoutsNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 max-w-4xl">
          {activeTab === "calendar" && <WorkoutsCalendar />}
          {activeTab === "notifications" && <CreateRoutineForm />}
          {activeTab === "exercises" && <ExercisesList />}
          {activeTab === "progress" && <ComingSoon title="Progress Tracking" />}
        </div>
      </div>
    </div>
  );
}