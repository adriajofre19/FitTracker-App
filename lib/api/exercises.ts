export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
}

const API_KEY = '4e8e0c5b0amsh3c5e5c3f2c1c3d4p1c5e4djsn6b4c7c3b0b0a';
const API_HOST = 'exercisedb.p.rapidapi.com';

export async function fetchExercises(params: {
  limit?: number;
  offset?: number;
  search?: string;
  bodyPart?: string;
  equipment?: string;
}) {
  const { search, bodyPart, equipment } = params;
  
  // Use the search endpoint if a search term is provided
  const baseUrl = search 
    ? `https://exercisedb.p.rapidapi.com/exercises/name/${search}`
    : `https://exercisedb.p.rapidapi.com/exercises`;

  const response = await fetch(baseUrl, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }

  let exercises = await response.json() as Exercise[];

  // Apply filters if provided
  if (bodyPart) {
    exercises = exercises.filter(ex => ex.bodyPart.toLowerCase() === bodyPart.toLowerCase());
  }
  if (equipment) {
    exercises = exercises.filter(ex => ex.equipment.toLowerCase() === equipment.toLowerCase());
  }

  // Apply limit if provided
  if (params.limit) {
    exercises = exercises.slice(0, params.limit);
  }

  return exercises;
}