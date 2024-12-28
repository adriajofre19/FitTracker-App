"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Goal {
  id: string;
  description: string;
  completed: boolean;
}

interface DailyGoalsProps {
  goals: Goal[];
  date: Date;
}

export function DailyGoals({ goals, date }: DailyGoalsProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Daily Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Goal</TableHead>
              <TableHead className="w-24">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.length > 0 ? (
              goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.description}</TableCell>
                  <TableCell>{goal.completed ? "✅" : "⏳"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground">
                  No goals set for today
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}