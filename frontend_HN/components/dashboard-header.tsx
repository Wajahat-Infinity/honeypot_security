"use client"

import { Bell, Shield, Activity } from "lucide-react"
import { usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardHeaderProps {
  showSidebarTrigger?: boolean
}

export function DashboardHeader({ showSidebarTrigger = false }: DashboardHeaderProps) {
  const pathname = usePathname()
  const currentUser = getCurrentUser()

  // Check if we're in the cockpit view
  const isCockpit = pathname.startsWith("/cockpit") || currentUser?.role === "cockpit"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          {showSidebarTrigger && <SidebarTrigger />}
          <div className="flex items-center gap-2">
            {isCockpit ? (
              <>
                <Activity className="h-5 w-5 text-purple-500" />
                <span
                  className="font-bold"
                  style={{ textShadow: "0 0 5px hsl(286, 100%, 50%), 0 0 10px hsl(286, 100%, 50%)" }}
                >
                  Cockpit View
                </span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 text-cyan-500" />
                <span className="font-bold neon-text">HoneyNet Security</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600" />
          </Button>
          {showSidebarTrigger && <UserNav />}
        </div>
      </div>
    </header>
  )
}
