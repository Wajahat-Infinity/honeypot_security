"use client"

import { useState } from "react"
import { type User, type UserRole, getCurrentUser, setCurrentUser } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function RoleSelector() {
  const { toast } = useToast()
  const currentUser = getCurrentUser()
  const [role, setRole] = useState<UserRole>(currentUser?.role || "user")

  const handleRoleChange = (newRole: UserRole) => {
    if (!currentUser) return

    const updatedUser: User = {
      ...currentUser,
      role: newRole,
    }

    setCurrentUser(updatedUser)
    setRole(newRole)

    toast({
      title: "Role changed",
      description: `You are now viewing as ${newRole}`,
    })

    // Force a refresh to update the UI
    window.location.reload()
  }

  return (
    <Card className="cyber-card border-cyan-500/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Demo Mode: View As</CardTitle>
        <CardDescription>Switch between different user roles to see different views</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            variant={role === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => handleRoleChange("user")}
            className={role === "user" ? "bg-cyan-500 text-black" : ""}
          >
            Normal User
          </Button>
          <Button
            variant={role === "analyst" ? "default" : "outline"}
            size="sm"
            onClick={() => handleRoleChange("analyst")}
            className={role === "analyst" ? "bg-cyan-500 text-black" : ""}
          >
            Security Analyst
          </Button>
          <Button
            variant={role === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => handleRoleChange("admin")}
            className={role === "admin" ? "bg-cyan-500 text-black" : ""}
          >
            Admin
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
