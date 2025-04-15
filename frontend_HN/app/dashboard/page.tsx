"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { hasRole, isAuthenticated } from "@/lib/auth"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { AuthDebug } from "@/components/auth-debug"
import { getCurrentUser } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/auth/login?interface=dashboard")
      return
    }

    // Check if user has access to dashboard
    if (!hasRole("dashboard")) {
      router.push("/auth/unauthorized")
      return
    }

    // Get the user's role
    const currentUser = getCurrentUser()
    setUserRole(currentUser?.role || null)

    setAuthorized(true)
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading dashboard...</div>
  }

  if (!authorized) {
    return null
  }

  // Show the appropriate dashboard based on user role
  return (
    <>
      <AuthDebug />
      {userRole === "cockpit" ? <AdminDashboard /> : <UserDashboard />}
    </>
  )
}
