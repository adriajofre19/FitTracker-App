"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function UserMenu() {

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
  };

  useEffect(() => {
      getAuthUser().then((data) => {
        setUser(data);
        console.log(data);
      });
    }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile`} className="flex">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => signOut()} className="flex">
            <LogOut className="mr-2 h-4 w-4 text-red-600" />
            <span className="text-red-600">Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
