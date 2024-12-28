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
  
  const [currentPage, setCurrentPage] = useState(1)
  const [routines, setRoutines] = useState([])
  const routinesPerPage = 6

  const getRoutinesFromUser = async () => {
    const response = await fetch("/api/workouts/getworkoutsfromuser");
    const data = await response.json();
    setRoutines(data);
  };

  useEffect(() => {
    getRoutinesFromUser();
  }, []);

  const totalPages = Math.ceil(routines.length / routinesPerPage);
  const currentRoutines = routines.slice((currentPage - 1) * routinesPerPage, currentPage * routinesPerPage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OPA</DialogTitle>
        </DialogHeader>

        
        {currentRoutines.map((routine) => (
          <RoutineCard
            key={routine}
            routine={routine}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
            onToggleComplete={(id) => console.log("Toggle", id)}
          />
        ))}
      

        <div className="grid gap-4 py-4">
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button >Add Routine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}