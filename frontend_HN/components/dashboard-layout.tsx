"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { isAuthenticated } from "@/lib/auth"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AuthHeader } from "@/components/auth/auth-header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const authStatus = isAuthenticated()
    setAuthenticated(authStatus)
    setLoading(false)

    // If not authenticated and not on an auth page, redirect to login
    if (!authStatus && !pathname.startsWith("/auth") && pathname !== "/") {
      router.push("/auth/login")
    }
  }, [pathname, router])

  // Don't show sidebar on auth pages or when not authenticated
  const isAuthPage = pathname.startsWith("/auth")
  const isLandingPage = pathname === "/"
  const showSidebar = authenticated && !isAuthPage && !isLandingPage

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="relative flex min-h-screen cyber-bg">
      {showSidebar && <DashboardSidebar />}
      <div className="flex-1">
        {isAuthPage ? <AuthHeader /> : <DashboardHeader showSidebarTrigger={showSidebar} />}
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-2 relative z-10">{children}</main>
      </div>
    </div>
  )
}
