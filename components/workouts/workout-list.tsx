"use client";

import { Routine } from "@/lib/api/routines";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Calendar, CheckCircle2, Clock, Dumbbell, MoreVertical, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";

interface WorkoutListProps {
  routines: Routine[];
}

export function WorkoutList({ routines }: WorkoutListProps) {
  if (!routines.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No routines scheduled for this day
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {routines.map((routine) => (
        <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">{routine.name}</CardTitle>
            {routine.description && (
              <CardDescription className="text-sm text-muted-foreground">
                {routine.description}
              </CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(routine.id)}>
                Edit routine
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onToggleComplete?.(routine.id)}
              >
                Mark as {routine.completed ? 'incomplete' : 'complete'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete?.(routine.id)}
              >
                Delete routine
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <span>{routine.exercises.length} exercises</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-2">
          <Badge 
            variant={routine.completed ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            {routine.completed ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Pending
              </>
            )}
          </Badge>
          <Button variant="outline" onClick={() => onEdit?.(routine.id)}>
            View Details
          </Button>
        </CardFooter>
      </Card>
      ))}
    </div>
  );
}