"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Exercise, fetchExercises } from "@/lib/api/exercises";
import { Button } from "@/components/ui/button";

interface ExerciseSearchProps {
  onSearch: (exercises: Exercise[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function ExerciseSearch({ onSearch, onLoadingChange }: ExerciseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");

  const handleSearch = useCallback(async () => {
    if (!searchTerm && !bodyPart && !equipment) return;
    
    onLoadingChange(true);
    try {
      const exercises = await fetchExercises({
        search: searchTerm,
        bodyPart: bodyPart,
        equipment: equipment,
      });
      onSearch(exercises);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      onSearch([]);
    } finally {
      onLoadingChange(false);
    }
  }, [searchTerm, bodyPart, equipment, onSearch, onLoadingChange]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        
        <Select value={bodyPart} onValueChange={setBodyPart}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Body Part" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="chest">Chest</SelectItem>
            <SelectItem value="shoulders">Shoulders</SelectItem>
            <SelectItem value="legs">Legs</SelectItem>
            <SelectItem value="arms">Arms</SelectItem>
            <SelectItem value="core">Core</SelectItem>
          </SelectContent>
        </Select>

        <Select value={equipment} onValueChange={setEquipment}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="barbell">Barbell</SelectItem>
            <SelectItem value="dumbbell">Dumbbell</SelectItem>
            <SelectItem value="machine">Machine</SelectItem>
            <SelectItem value="bodyweight">Bodyweight</SelectItem>
            <SelectItem value="cable">Cable</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}