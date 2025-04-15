"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export function CockpitNav() {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await api.auth.logout()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/cockpit"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/cockpit" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/cockpit/users"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/cockpit/users" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Users
      </Link>
      <Button variant="ghost" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  )
} 