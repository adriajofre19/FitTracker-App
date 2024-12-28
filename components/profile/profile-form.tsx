"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

interface User {
  name: string | null
  email: string
  age: number | null
  weight: number | null
  height: number | null
  avatar: string | null
}

export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getAuthUser = async () => {
    try {
      const response = await fetch(`/api/users/getuserauth`)
      return response.json()
    } catch (error) {
      return null
    }
  }

  const updateUser = async (formData: FormData) => {
    try {
      const data = {
        name: formData.get("name"),
        email: user?.email,
        age: formData.get("age") ? Number(formData.get("age")) : null,
        weight: formData.get("weight") ? Number(formData.get("weight")) : null,
        height: formData.get("height") ? Number(formData.get("height")) : null,
      }

      const response = await fetch(`/api/profile/update-profile-information`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json()
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    getAuthUser().then((data) => {
      setUser(data)
    })
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <p className="text-muted-foreground">
          Update your personal information and physical details
        </p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setIsSubmitting(true)
          try {
            const formData = new FormData(e.currentTarget)
            await updateUser(formData)
          } finally {
            setIsSubmitting(false)
          }
        }}
        className="space-y-6"
      >
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.avatar || undefined} alt={user?.name || undefined} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline">Change Avatar</Button>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              defaultValue={user?.name || ''} 
              placeholder="Enter your name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              readOnly 
              defaultValue={user?.email || ''} 
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                type="number" 
                min="0"
                max="120"
                defaultValue={user?.age || ''} 
                placeholder="Enter your age"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                name="weight" 
                type="number" 
                step="0.1"
                min="0"
                defaultValue={user?.weight || ''} 
                placeholder="Enter your weight"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                name="height" 
                type="number" 
                step="0.1"
                min="0"
                defaultValue={user?.height || ''} 
                placeholder="Enter your height"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}

