"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkoutList } from "./workout-list";



export function WorkoutsCalendar() {

  const [date, setDate] = useState<Date>(new Date());
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  
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

  

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <Card>
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md"
            />
          </CardContent>
        </Card>

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
    </div>
  );
}