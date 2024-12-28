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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [time, setTime] = useState("12:00");
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
  const currentRoutines = routines.slice(
    (currentPage - 1) * routinesPerPage, 
    currentPage * routinesPerPage
  );

  const handleCreateNew = async () => {
    const routine = {
      name,
      description,
      date: selectedDate,
      exercises: [],
    };

    try {
      const response = await fetch("/api/workouts/create", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routine),
      });

      if (response.ok) {
        const newRoutine = await response.json();
        onAddRoutine(newRoutine);
        onOpenChange(false);
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Failed to create routine:", error);
    }
  };

  const handleScheduleExisting = async () => {
    if (!selectedRoutine) return;

    const [hours, minutes] = time.split(":");
    const scheduleDate = new Date(selectedDate);
    scheduleDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const scheduleData = {
      routineId: selectedRoutine.id,
      userId: selectedRoutine.userId, // This should come from auth context in production
      date: scheduleDate.toISOString(),
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

        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Use Existing</TabsTrigger>
            <TabsTrigger value="new">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              
              <div className="grid gap-4 mt-4">
                {currentRoutines.map((routine) => (
                  <div
                    key={routine.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoutine?.id === routine.id 
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
          </TabsContent>

          <TabsContent value="new">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Routine name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your routine..."
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

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