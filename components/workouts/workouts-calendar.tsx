"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkoutList } from "./workout-list";
import { Button } from "@/components/ui/button";
import { DailyGoals } from "./daily-goals";
import { AddRoutineDialog } from "./add-routine-dialog";
import { Plus } from "lucide-react";



export function WorkoutsCalendar() {

  const [date, setDate] = useState<Date>(new Date());
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddRoutineOpen, setIsAddRoutineOpen] = useState(false);
  
  const getRoutines = async (date: Date) => {
    const response = await fetch("/api/workouts/getallworkouts", {
      method: "GET",
    }
    );
    return response.json();
  }

  useEffect(() => {
    setLoading(true);
    getRoutines(date).then((data) => {
      const filteredRoutines = data.filter((routine: any) => {
        const routineDate = new Date(routine.date);
        return (
          routineDate.getDate() === date.getDate() &&
          routineDate.getMonth() === date.getMonth() &&
          routineDate.getFullYear() === date.getFullYear()
        );
      });
      setRoutines(filteredRoutines);
      setLoading(false);
    });
  }, [date]);

  const handleAddRoutine = (newRoutine: any) => {
    setRoutines((prev: any) => [...prev, newRoutine]);
  };
  
  // Mock goals data - replace with actual API call
  const goals = [
    { id: "1", description: "Complete morning workout", completed: false },
    { id: "2", description: "Hit protein target", completed: true },
    { id: "3", description: "30 minutes cardio", completed: false },
  ];

  

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md"
              />
            </CardContent>
            <div className="flex justify-center w-full p-3 mt-6">
              <Button onClick={() => setIsAddRoutineOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Routine
              </Button>
            </div>
          </Card>
          <DailyGoals goals={goals} date={date} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Routines for {date.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <WorkoutList routines={routines} />
            )}
          </CardContent>
        </Card>
      </div>

      <AddRoutineDialog
        open={isAddRoutineOpen}
        onOpenChange={setIsAddRoutineOpen}
        selectedDate={date}
        onAddRoutine={handleAddRoutine}
      />
    </div>
  );
}