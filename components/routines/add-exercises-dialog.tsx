"use client"

import { useState } from "react"
import { Loader2, Plus, Search, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Exercise {
  id: string
  name: string
  type: string
  muscle: string
  equipment: string
  gifUrl: string
}

export function AddExercisesDialog({
  open,
  onOpenChange,
  onAddExercise,
  selectedExercises,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddExercise: (exercise: Exercise) => void
  selectedExercises: Exercise[]
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Exercise[]>([])
  const [activeTab, setActiveTab] = useState("search")

  const searchExercises = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/name/' + query.toLowerCase(), {
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      })
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching exercises:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const isExerciseSelected = (exerciseId: string) => {
    return selectedExercises.some(ex => ex.id === exerciseId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Exercises</DialogTitle>
          <DialogDescription>
            Search and add exercises to your routine
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="flex items-center space-x-4 py-4">
            <TabsList>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="selected">Selected ({selectedExercises.length})</TabsTrigger>
            </TabsList>
            {activeTab === "search" && (
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Search exercises..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    searchExercises(e.target.value)
                  }}
                />
                <Button variant="secondary" disabled={isSearching}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1">
            <TabsContent value="search" className="mt-0 flex-1">
              {isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <ScrollArea className="h-[calc(80vh-200px)]">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {searchResults.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="flex flex-col border rounded-lg overflow-hidden bg-card"
                      >
                        <div className="relative aspect-video bg-muted">
                          <img
                            src={exercise.gifUrl}
                            alt={exercise.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold capitalize">{exercise.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            <p>Muscle: {exercise.muscle}</p>
                            <p>Equipment: {exercise.equipment}</p>
                          </div>
                          <Button
                            onClick={() => onAddExercise(exercise)}
                            disabled={isExerciseSelected(exercise.id)}
                            className="w-full"
                          >
                            {isExerciseSelected(exercise.id) ? (
                              'Added'
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Exercise
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="selected" className="mt-0">
              <ScrollArea className="h-[calc(80vh-200px)]">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {selectedExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex flex-col border rounded-lg overflow-hidden bg-card"
                    >
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={exercise.gifUrl}
                          alt={exercise.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold capitalize">{exercise.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>Muscle: {exercise.muscle}</p>
                          <p>Equipment: {exercise.equipment}</p>
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const updatedExercises = selectedExercises.filter(
                              (ex) => ex.id !== exercise.id
                            )
                            onAddExercise(exercise) // This will remove the exercise
                          }}
                          className="w-full"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

