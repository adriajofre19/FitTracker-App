"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { RoutineCard } from "../routines/routine-card";

interface AddRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onAddRoutine: (routine: any) => void;
}

export function AddRoutineDialog({
  open,
  onOpenChange,
  selectedDate,
  onAddRoutine
}: AddRoutineDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const routinesPerPage = 6;

  const getRoutinesFromUser = async () => {
    const response = await fetch("/api/workouts/getworkoutsfromuser");
    const data = await response.json();
    setRoutines(data);
  };

  useEffect(() => {
    getRoutinesFromUser();
  }, []);

  const totalPages = Math.ceil(routines.length / routinesPerPage);
  const currentRoutines = routines
    .filter((routine) =>
      routine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      routine.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * routinesPerPage, currentPage * routinesPerPage);

  const handleScheduleExisting = async () => {
    if (!selectedRoutine) return;

    const scheduleData = {
      routineId: selectedRoutine.id,
      userId: selectedRoutine.userId,
      date: selectedDate.toISOString(),
    };

    try {
      const response = await fetch("/api/workouts/schedule", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        const scheduledRoutine = await response.json();
        onAddRoutine(scheduledRoutine);
        onOpenChange(false);
        setSelectedRoutine(null);
      }
    } catch (error) {
      console.error("Failed to schedule routine:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Routine for {format(selectedDate, "PPP")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="search">Search Routines</Label>
            <Input
              id="search"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4 mt-4">
            {currentRoutines.map((routine) => (
              <div
                key={routine.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedRoutine?.id === routine.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                  }`}
                onClick={() => setSelectedRoutine(routine)}
              >
                <h3 className="font-semibold">{routine.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {routine.description}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleScheduleExisting}
            disabled={!selectedRoutine}
          >
            Schedule Routine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

