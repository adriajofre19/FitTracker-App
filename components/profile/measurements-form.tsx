"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function MeasurementsForm() {
  interface User {
    email: string;
    age: number;
    height: number;
    weight: number;
  }

  const [user, setUser] = useState<User | null>(null);

  const getAuthUser = async () => {
    try {
      const response = await fetch(`/api/users/getuserauth`);
      return response.json();
    } catch (error) {
      return null;
    }
  };

  const updateUser = async (email: string, age: number, weight: number, height: number) => {
    try {
      const response = await fetch(`/api/profile/update-mesurements-form`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, age, weight, height }),
      });
      return response.json();
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getAuthUser().then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);

  return (
    <form 
    onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = user?.email as string;
      const age = parseInt(formData.get('age') as string, 10);
      const weight = parseFloat(formData.get('weight') as string);
      const height = parseFloat(formData.get('height') as string);
      await updateUser(email, age, weight, height);
    }}
    className="space-y-4"
    >
      <div>
        <h2 className="text-2xl font-bold">Physical Measurements</h2>
        <p className="text-muted-foreground">Update your physical information</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" defaultValue={user?.age} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input id="height" name="height" defaultValue={user?.height} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input id="weight" name="weight" defaultValue={user?.weight} />
        </div>
      </div>

      <Button type="submit">Save Measurements</Button>
    </form>
  );
}
