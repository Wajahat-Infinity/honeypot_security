// Authentication utility with proper role-based access control
export type UserRole = "dashboard" | "cockpit"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Store the current user in localStorage for persistence
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem("currentUser")
  if (!userJson) return null

  try {
    return JSON.parse(userJson) as User
  } catch (e) {
    console.error("Error parsing user from localStorage:", e)
    return null
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  } else {
    localStorage.removeItem("currentUser")
  }
}

// Check if user has required role
export function hasRole(requiredRole: UserRole): boolean {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  // Direct role match
  if (currentUser.role === requiredRole) return true

  // Special case: cockpit users can access dashboard features
  if (requiredRole === "dashboard" && currentUser.role === "cockpit") return true

  return false
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

// Logout function
export function logout(): void {
  setCurrentUser(null)
  // Clear localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("auth_token")
  }
}
