"use client"

import { format } from "date-fns"
import { Calendar, CheckCircle2, Clock, Dumbbell, MoreVertical, XCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface RoutineCardProps {
  routine: {
    id: string
    name: string
    description?: string | null
    date?: Date | null
    completed: boolean
    exercises: any[]
    createdAt: Date
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onToggleComplete?: (id: string) => void
}

export function RoutineCard({ routine, onEdit, onDelete, onToggleComplete }: RoutineCardProps) {
  
    return (
    <Card className="w-full">
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
          {routine.date && (
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(routine.date, "PPP")}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Created {format(routine.createdAt, "PP")}</span>
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
  )
}

