"use client"

import {
  AlertCircle,
  BarChart3,
  Bug,
  CreditCard,
  Database,
  FileText,
  Network,
  Settings,
  Shield,
  User,
  Users,
  Activity,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { getCurrentUser, hasRole, logout } from "@/lib/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const currentUser = getCurrentUser()
  const userRole = currentUser?.role || "dashboard"

  // Check if we're in the cockpit view
  const isCockpit = pathname.startsWith("/cockpit") || userRole === "cockpit"

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            {isCockpit ? (
              <>
                <Activity className="h-6 w-6 text-purple-500" />
                <span
                  className="neon-text"
                  style={{ textShadow: "0 0 5px hsl(286, 100%, 50%), 0 0 10px hsl(286, 100%, 50%)" }}
                >
                  Cockpit
                </span>
              </>
            ) : (
              <>
                <Shield className="h-6 w-6 text-cyan-500" />
                <span className="neon-text">Dashboard</span>
              </>
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard View - Available to all users */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard" || pathname.startsWith("/dashboard/")}>
                  <Link href="/dashboard">
                    <Shield className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Cockpit View - Only for cockpit users */}
              {hasRole("cockpit") && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/cockpit" || pathname.startsWith("/cockpit/")}>
                    <Link href="/cockpit">
                      <Activity className="h-4 w-4" />
                      <span>Cockpit</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* Common features for all users */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/monitoring"}>
                  <Link href="/monitoring">
                    <Network className="h-4 w-4" />
                    <span>Monitoring</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/alerts"}>
                  <Link href="/alerts">
                    <AlertCircle className="h-4 w-4" />
                    <span>Alerts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Features only for cockpit users */}
              {hasRole("cockpit") && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/honeypots"}>
                      <Link href="/honeypots">
                        <Bug className="h-4 w-4" />
                        <span>Honeypots</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/analytics"}>
                      <Link href="/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/reports"}>
                      <Link href="/reports">
                        <FileText className="h-4 w-4" />
                        <span>Reports</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section - Available to all users */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCockpit ? "text-purple-500" : "text-cyan-500"}>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section - Only for cockpit users */}
        {hasRole("cockpit") && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-purple-500">Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/users"}>
                    <Link href="/users">
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/database"}>
                    <Link href="/database">
                      <Database className="h-4 w-4" />
                      <span>Database</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/billing"}>
                    <Link href="/billing">
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
