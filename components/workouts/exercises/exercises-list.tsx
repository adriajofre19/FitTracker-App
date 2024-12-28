"use client";

import { useState } from "react";
import { Exercise } from "@/lib/api/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExerciseSearch } from "./exercise-search";
import { ExerciseCard } from "./exercise-card";
import { Button } from "@/components/ui/button";

export function ExercisesList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Exercise Library</h2>
        <ExerciseSearch onSearch={setExercises} onLoadingChange={setLoading} />
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-[300px] animate-pulse">
              <CardContent className="p-0" />
            </Card>
          ))}
        </div>
      ) : exercises.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No exercises found</p>
        </div>
      )}
    </div>
  );
}