"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SecurityForm() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">Manage your password and security preferences</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
      </div>

      <Button>Update Password</Button>
    </div>
  );
}