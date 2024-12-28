export type Routine = {
    id: string;
    name: string;
    description: string | null;
    exercises: string[];
    date: Date | null;
    completed: boolean;
    userId: string;
    createdAt: Date;
  };
  
  export async function getRoutinesByDate(date: Date) {
    const response = await fetch(
      `/api/routines?date=${date.toISOString()}`,
      {
        method: 'GET',
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch routines');
    }
  
    return response.json();
  }
  
  export async function getRoutineTemplates() {
    const response = await fetch('/api/routines', {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch routines');
    }
  
    return response.json();
  }