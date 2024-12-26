"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function ProfileForm() {

  interface User {
    name: string;
    email: string;
    avatar: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const getAuthUser = async () => {
    try {
      const response = await fetch(`/api/users/getuserauth`);
      return response.json();
    } catch (error) {
      return null;
    }
  }

  const updateUser = async (name: string, email: string) => {
    try {
      const response = await fetch(`/api/profile/update-profile-information`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      return response.json();
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    getAuthUser().then((data) => {
        setUser(data);
        console.log(data);
    });
}, []);



  return (
    <div className="space-y-8">
      <div>
      <h2 className="text-2xl font-bold">Profile Information</h2>
      <p className="text-muted-foreground">Update your personal information</p>
      </div>

      <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = user?.email as string;
        await updateUser(name, email);
      }}
      className="space-y-4"
      >
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
        <AvatarImage src={user?.avatar} alt={user?.name} />
        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button variant="outline">Change Avatar</Button>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" defaultValue={user?.name} />
        </div>

        <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" readOnly defaultValue={user?.email} />
        </div>
      </div>

      <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}