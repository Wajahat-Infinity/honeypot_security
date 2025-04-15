"use client"

import { Label } from "@/components/ui/label"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { setCurrentUser, isAuthenticated } from "@/lib/auth"
import { api } from "@/lib/api"

interface LoginFormProps {
  interfaceType?: string
}

export function LoginForm({ interfaceType }: LoginFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false)

  // Check if already authenticated and redirect if needed
  useEffect(() => {
    if (isAuthenticated()) {
      const destination = interfaceType === "cockpit" ? "/cockpit" : "/dashboard"
      router.push(destination)
    }

    // Check if we're in development mode
    setIsDevelopmentMode(process.env.NODE_ENV === "development" || window.location.hostname === "localhost")
  }, [interfaceType, router])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Call the API (which will use mock data if real API is unavailable)
      const response = await api.auth.login({
        email,
        password,
        // Pass the interface type to the API
        interfaceType,
      })

      // Extract token from response
      const token = response.token || response.access_token || response.key

      if (token) {
        localStorage.setItem("auth_token", token)
      }

      // IMPORTANT: Always use the interfaceType from the login page to determine the role
      // This ensures users get the correct view based on which login option they selected
      const role = interfaceType === "cockpit" ? "cockpit" : "dashboard"

      // Set the current user with localStorage persistence
      setCurrentUser({
        id: response.user?.id || "1",
        name: response.user?.name || email.split("@")[0],
        email: email,
        role: role, // Use the role based on interfaceType
        avatar: response.user?.avatar || "/avatars/01.png",
      })

      // Show success message
      toast({
        title: "Login successful",
        description: `You have successfully logged in as a ${role} user.`,
      })

      // Redirect based on interfaceType - with a small delay to allow toast to show
      setTimeout(() => {
        if (interfaceType === "cockpit") {
          window.location.href = "/cockpit"
        } else {
          window.location.href = "/dashboard"
        }
      }, 500)
    } catch (err: any) {
      console.error("Login failed:", err)
      setError(err.message || "Invalid email or password. Please try again.")
      toast({
        title: "Error",
        description: err.message || "Login failed. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {isDevelopmentMode && (
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-md p-3 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-500">Development Mode</span>
          </div>
          <p className="text-xs text-amber-400/80">
            API connection issues detected. Using mock data for development.
            <br />
            Enter any email and password to log in.
          </p>
          <p className="text-xs text-amber-400/80 mt-1 font-medium">
            You will be redirected to: {interfaceType === "cockpit" ? "Cockpit View" : "Dashboard View"}
          </p>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {interfaceType === "cockpit" && (
              <p className="text-xs text-muted-foreground">Note: Cockpit access requires admin privileges</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button
            disabled={isLoading}
            className={
              interfaceType === "cockpit"
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-cyan-500 hover:bg-cyan-600 text-black"
            }
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In to {interfaceType === "cockpit" ? "Cockpit" : "Dashboard"}
          </Button>
        </div>
      </form>
    </div>
  )
}
