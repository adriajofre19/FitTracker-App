"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, Plus, X } from 'lucide-react'
import { format } from "date-fns"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { AddExercisesDialog } from "../add-exercises-dialog"

interface Exercise {
  id: string
  name: string
  type: string
  muscle: string
  equipment: string
  gifUrl: string
}

interface User {
  name: string | null
  email: string
  age: number | null
  weight: number | null
  height: number | null
  avatar: string | null
}

export function CreateRoutinePage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isAddingExercises, setIsAddingExercises] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemoveExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const routineData = {
      name: formData.get("name"),
      description: formData.get("description"),
      date,
      exercises: exercises.map(ex => ex.id)
    }

    console.log("Submitting routine:", routineData)

  }

  const getAuthUser = async () => {
    try {
      const response = await fetch(`/api/users/getuserauth`)
      return response.json()
    } catch (error) {
      return null
    }
  }

  const createRoutine = async (formData: FormData) => {
    try {
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
        exercises: exercises.map(ex => ex.id),
        email: user?.email,

      }

      const response = await fetch(`/api/workouts/create/create-routine`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json()
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    getAuthUser().then((data) => {
      setUser(data)
      console.log(data)
    })
  }, [])


  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Routine</h1>
        <p className="text-muted-foreground">
          Design your perfect workout routine. Add exercises and schedule your workout.
        </p>
      </div>

      <form onSubmit={async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
          const formData = new FormData(e.currentTarget)
          await createRoutine(formData)
        } finally {
          setIsSubmitting(false)

        }
      }} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Routine Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter routine name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your routine"
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label>Exercises</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingExercises(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Exercises
            </Button>
            <div className="space-y-2">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between rounded-md border p-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={exercise.gifUrl}
                      alt={exercise.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium capitalize">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.muscle} - {exercise.equipment}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveExercise(exercise.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/routines')}
          >
            Cancel
          </Button>
          <Button type="submit">Create Routine</Button>
        </div>
      </form>

      <AddExercisesDialog
        open={isAddingExercises}
        onOpenChange={setIsAddingExercises}
        onAddExercise={(exercise) => {
          if (exercises.some(ex => ex.id === exercise.id)) {
            setExercises(exercises.filter(ex => ex.id !== exercise.id))
          } else {
            setExercises([...exercises, exercise])
          }
        }}
        selectedExercises={exercises}
      />
    </div>
  )
}

