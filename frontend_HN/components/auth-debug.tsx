"use client"

import { useEffect, useState } from "react"
import { getCurrentUser, isAuthenticated } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AuthDebug() {
  const [user, setUser] = useState<any>(null)
  const [authStatus, setAuthStatus] = useState<boolean>(false)

  useEffect(() => {
    // Update state with current auth info
    setUser(getCurrentUser())
    setAuthStatus(isAuthenticated())
  }, [])

  const refreshStatus = () => {
    setUser(getCurrentUser())
    setAuthStatus(isAuthenticated())
  }

  return (
    <Card className="mb-4 border-red-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Auth Debug (Remove in production)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>Authentication Status: {authStatus ? "Authenticated" : "Not Authenticated"}</p>
          <p>User: {user ? JSON.stringify(user) : "No user"}</p>
          <Button size="sm" onClick={refreshStatus}>
            Refresh Status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
