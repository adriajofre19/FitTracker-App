"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Routine {
  id: string;
  name: string;
  description: string | null;
  date: string;
  exercises: string[];
}

interface WorkoutListProps {
  routines: Routine[];
}

export function WorkoutList({ routines }: WorkoutListProps) {
  const router = useRouter();

  if (!routines?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No routines scheduled for this day
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <div
          key={routine.id}
          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => router.push(`/workouts/routine/${routine.id}`)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{routine.name}</h3>
            <span className="text-sm text-muted-foreground">
              {routine.date && format(new Date(routine.date), "h:mm a")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {routine.description}
          </p>
          <div className="text-sm text-muted-foreground">
            {routine.exercises?.length || 0} exercises
          </div>
        </div>
      ))}
    </div>
  );
}