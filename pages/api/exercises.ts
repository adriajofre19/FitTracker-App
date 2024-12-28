export interface Exercise {
    id: string;
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    target: string;
  }
  
    const API_KEY = process.env.API_KEY || ''; // This should come from environment variables
  const API_HOST = 'exercisedb.p.rapidapi.com';
  
  export async function fetchExercises(params: {
    limit?: number;
    offset?: number;
    search?: string;
    bodyPart?: string;
    equipment?: string;
  }) {
    const searchParams = new URLSearchParams({
      limit: (params.limit || 10).toString(),
      offset: (params.offset || 0).toString(),
    });
  
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises?${searchParams}`,
      {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
  
    return response.json() as Promise<Exercise[]>;
  }