'use client';

import { useEffect, useState } from "react";

export default function Home() {
    const [exercises, setExercises] = useState([]);

    const getExercises = async () => {
        const response = await fetch('/api/exercises');
        return response.json();
    }

    const getExercicesFromJson = async () => {
        const response = await fetch('/exercises.json');
        return response.json();
    }
    
    useEffect(() => {
        getExercises().then((data) => {
            console.log(data);
        });
        getExercicesFromJson().then((data) => {
            setExercises(data.exercises);
        });
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl">Welcome to your workout routine</h1>
            <div className="mt-4">
                {exercises.map((exercise, index) => (
                    <div key={index} className="p-2 border-b">
                        <pre>{JSON.stringify(exercise, null, 2)}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
}