"use client"

import { useEffect, useState } from "react"

import { RoutineCard } from "./routine-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

export function RoutinesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [routines, setRoutines] = useState([])
  const routinesPerPage = 6

  const getRoutinesFromUser = async () => {
    const response = await fetch('/api/workouts/getworkoutsfromuser');
    const data = await response.json();
    setRoutines(data);
  }

  useEffect(() => {
    getRoutinesFromUser();
  }, [])

  const deleteRoutine = async (id: string) => {
    console.log(id);
    await fetch('/api/workouts/delete/delete-workout', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    getRoutinesFromUser();
  }

  const totalPages = Math.ceil(routines.length / routinesPerPage);
  const currentRoutines = routines.slice((currentPage - 1) * routinesPerPage, currentPage * routinesPerPage);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Routines</h1>
          <p className="text-muted-foreground">
            Manage and track your workout routines
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentRoutines.map((routine) => (
          <RoutineCard
            key={routine}
            routine={routine}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => deleteRoutine(id)}
            onToggleComplete={(id) => console.log("Toggle", id)}
          />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((p) => Math.max(1, p - 1))
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(i + 1)
                }}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

