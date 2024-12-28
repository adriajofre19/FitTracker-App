"use client"

import { CalendarIcon, Loader2, Plus, X } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CreateRoutineForm() {
  const [exercises, setExercises] = useState<string[]>([])
  const [exerciseInput, setExerciseInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddExercise = () => {
    if (exerciseInput.trim()) {
      setExercises([...exercises, exerciseInput.trim()])
      setExerciseInput("")
    }
  }

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Routine</CardTitle>
        <CardDescription>
          Design your perfect workout routine. Add exercises and schedule your workout.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Routine Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Enter routine name"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Give your routine a memorable name.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Describe your routine"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Scheduled Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Pick a date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date()}
                      onSelect={() => {}}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Exercises</Label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add exercise"
                      value={exerciseInput}
                      onChange={(e) => setExerciseInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddExercise()
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={handleAddExercise}
                      variant="secondary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        <span className="flex-1">{exercise}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveExercise(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add all the exercises that will be part of this routine.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Routine
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

