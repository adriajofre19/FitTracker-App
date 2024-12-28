"use client";

import { Exercise } from "@/lib/api/exercises";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{exercise.bodyPart}</Badge>
            <Badge variant="outline">{exercise.equipment}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Target: {exercise.target}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}