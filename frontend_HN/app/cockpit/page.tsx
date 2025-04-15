"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { hasRole, isAuthenticated } from "@/lib/auth"
import { AdminCockpit } from "@/components/cockpit/admin-cockpit"

export default function CockpitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/auth/login?interface=cockpit")
      return
    }

    // Check if user has access to cockpit
    if (!hasRole("cockpit")) {
      router.push("/auth/unauthorized")
      return
    }

    setAuthorized(true)
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading cockpit...</div>
  }

  if (!authorized) {
    return null
  }

  return <AdminCockpit />
}
