// API service for communicating with Django REST Framework backend
import { getCurrentUser } from "@/lib/auth"

// Update to use localhost:8000 for the Django backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Flag to enable mock API responses when the real API is not available
const USE_MOCK_API = true // Set to true to use mock data

// Helper function to handle API responses
async function handleResponse(response: Response) {
  // For non-JSON responses (like 204 No Content)
  if (response.status === 204) {
    return null
  }

  // Check content type to avoid parsing HTML as JSON
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    // If not JSON, handle as text
    const text = await response.text()
    console.error("Non-JSON response:", text.substring(0, 100) + "...")
    throw new Error("Server returned non-JSON response. API may not be available.")
  }

  // Handle JSON response
  try {
    const data = await response.json()
    if (!response.ok) {
      // If the server responds with an error
      const errorMessage = (data && (data.message || data.detail || JSON.stringify(data))) || response.statusText
      throw new Error(errorMessage)
    }
    return data
  } catch (error) {
    console.error("Error processing response:", error)
    throw error
  }
}

// Generic fetch function with authentication
async function fetchAPI(endpoint: string, options: RequestInit = {}, additionalParams: any = {}) {
  // Get the authentication token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  const currentUser = getCurrentUser()

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    // Include user role in headers for backend authorization
    ...(currentUser && { "X-User-Role": currentUser.role }),
    ...options.headers,
  }

  try {
    // If using mock API and in development mode, return mock data
    if (USE_MOCK_API && process.env.NODE_ENV !== "production") {
      return getMockResponse(endpoint, options, additionalParams)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      // Include credentials for cookies if your Django uses session auth
      credentials: "include",
    })

    return handleResponse(response)
  } catch (error) {
    console.error("API request failed:", error)

    // If API request fails and mock API is enabled, return mock data
    if (USE_MOCK_API && process.env.NODE_ENV !== "production") {
      console.log("Falling back to mock API response")
      return getMockResponse(endpoint, options, additionalParams)
    }

    throw error
  }
}

// Mock API responses for development
function getMockResponse(endpoint: string, options: RequestInit = {}, additionalParams: any = {}) {
  console.log(`[MOCK API] ${options.method || "GET"} ${endpoint}`)

  // Mock dashboard stats
  if (endpoint === "/dashboard/stats/") {
    return {
      totalThreats: 156,
      activeVulnerabilities: 42,
      honeypotCount: 8,
      alertCount: 23,
      threatTrend: 12,
      vulnerabilityTrend: -5
    }
  }

  // Mock threats
  if (endpoint === "/threats/") {
    return [
      {
        id: "th-1",
        type: "DDoS Attack",
        severity: "high",
        description: "DDoS Attack detected in New York",
        timestamp: new Date().toISOString(),
        location: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      },
      {
        id: "th-2",
        type: "SQL Injection",
        severity: "medium",
        description: "SQL Injection attempt in London",
        timestamp: new Date().toISOString(),
        location: {
          latitude: 51.5074,
          longitude: -0.1278
        }
      },
      {
        id: "th-3",
        type: "Brute Force",
        severity: "low",
        description: "Brute Force attempt in Tokyo",
        timestamp: new Date().toISOString(),
        location: {
          latitude: 35.6762,
          longitude: 139.6503
        }
      }
    ]
  }

  // Mock vulnerabilities
  if (endpoint === "/vulnerabilities/") {
    return [
      {
        id: "vul-1",
        type: "Outdated Software",
        severity: "high",
        description: "Outdated Apache server in Singapore",
        timestamp: new Date().toISOString(),
        location: {
          latitude: 1.3521,
          longitude: 103.8198
        }
      },
      {
        id: "vul-2",
        type: "Weak Encryption",
        severity: "medium",
        description: "Weak SSL configuration in Sydney",
        timestamp: new Date().toISOString(),
        location: {
          latitude: -33.8688,
          longitude: 151.2093
        }
      }
    ]
  }

  // Mock honeypots
  if (endpoint === "/honeypots/") {
    return [
      {
        id: "hp-1",
        name: "Web Server Honeypot",
        type: "http",
        status: "active",
        metrics: {
          attacksDetected: 156,
          uniqueAttackers: 42,
          lastAttack: new Date().toISOString()
        }
      },
      {
        id: "hp-2",
        name: "FTP Server Trap",
        type: "ftp",
        status: "active",
        metrics: {
          attacksDetected: 89,
          uniqueAttackers: 23,
          lastAttack: new Date().toISOString()
        }
      }
    ]
  }

  // Mock alerts
  if (endpoint === "/alerts/") {
    return [
      {
        id: "al-1",
        threatId: "th-1",
        severity: "high",
        description: "DDoS Attack detected from 192.168.1.100",
        timestamp: new Date().toISOString(),
        status: "new"
      },
      {
        id: "al-2",
        threatId: "th-2",
        severity: "medium",
        description: "SQL Injection attempt from 192.168.1.101",
        timestamp: new Date().toISOString(),
        status: "investigating"
      },
      {
        id: "al-3",
        threatId: "th-3",
        severity: "low",
        description: "Brute Force attempt from 192.168.1.102",
        timestamp: new Date().toISOString(),
        status: "resolved"
      }
    ]
  }

  // Mock login response
  if (endpoint === "/auth/login/" && options.method === "POST") {
    const body = options.body ? JSON.parse(options.body.toString()) : {}

    // Use the interfaceType from additionalParams to determine the role
    const role = additionalParams.interfaceType === "cockpit" ? "cockpit" : "dashboard"

    return {
      token: "mock-auth-token-12345",
      user: {
        id: "mock-user-1",
        name: body.email ? body.email.split("@")[0] : "User",
        email: body.email || "user@example.com",
        role: role, // Use the role based on interfaceType
      },
    }
  }

  // Mock register response
  if (endpoint === "/auth/register/" && options.method === "POST") {
    return {
      success: true,
      message: "User registered successfully",
    }
  }

  // Mock users response
  if (endpoint === "/users/") {
    return [
      {
        id: "mock-user-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "cockpit",
      },
      {
        id: "mock-user-2",
        name: "Regular User",
        email: "user@example.com",
        role: "dashboard",
      },
    ]
  }

  // Default mock response
  return {
    success: true,
    message: "Mock API response",
    data: [],
  }
}

// API functions for different resources
export const api = {
  // Authentication
  auth: {
    login: async (credentials: { email: string; password: string; interfaceType?: string }) => {
      const { interfaceType, ...loginCredentials } = credentials
      return fetchAPI("/auth/login/", {
        method: "POST",
        body: JSON.stringify(loginCredentials),
      })
    },
    logout: async () => {
      return fetchAPI("/auth/logout/", {
        method: "POST",
      })
    },
    register: async (userData: any) => {
      return fetchAPI("/auth/register/", {
        method: "POST",
        body: JSON.stringify(userData),
      })
    },
    refreshToken: async () => {
      return fetchAPI("/auth/refresh/", {
        method: "POST",
      })
    },
    getProfile: async () => {
      return fetchAPI("/auth/user/")
    },
    changePassword: async (passwordData: any) => {
      return fetchAPI("/auth/change-password/", {
        method: "POST",
        body: JSON.stringify(passwordData),
      })
    },
  },

  // Users
  users: {
    getAll: async () => {
      return fetchAPI("/users/")
    },
    getById: async (id: string) => {
      return fetchAPI(`/users/${id}/`)
    },
    create: async (userData: any) => {
      return fetchAPI("/users/", {
        method: "POST",
        body: JSON.stringify(userData),
      })
    },
    update: async (id: string, userData: any) => {
      return fetchAPI(`/users/${id}/`, {
        method: "PUT",
        body: JSON.stringify(userData),
      })
    },
    delete: async (id: string) => {
      return fetchAPI(`/users/${id}/`, {
        method: "DELETE",
      })
    },
  },

  // Honeypots
  honeypots: {
    getAll: async () => {
      return fetchAPI("/honeypots/")
    },
    getById: async (id: string) => {
      return fetchAPI(`/honeypots/${id}/`)
    },
    create: async (honeypotData: any) => {
      return fetchAPI("/honeypots/", {
        method: "POST",
        body: JSON.stringify(honeypotData),
      })
    },
    update: async (id: string, honeypotData: any) => {
      return fetchAPI(`/honeypots/${id}/`, {
        method: "PUT",
        body: JSON.stringify(honeypotData),
      })
    },
    delete: async (id: string) => {
      return fetchAPI(`/honeypots/${id}/`, {
        method: "DELETE",
      })
    },
  },

  // Events
  events: {
    getAll: async () => {
      return fetchAPI("/events/")
    },
  },

  // Alerts
  alerts: {
    getAll: async () => {
      return fetchAPI("/alerts/")
    },
    getById: async (id: string) => {
      return fetchAPI(`/alerts/${id}/`)
    },
    update: async (id: string, alertData: any) => {
      return fetchAPI(`/alerts/${id}/`, {
        method: "PUT",
        body: JSON.stringify(alertData),
      })
    },
  },

  // Reports
  reports: {
    getAll: async () => {
      return fetchAPI("/reports/")
    },
    getById: async (id: string) => {
      return fetchAPI(`/reports/${id}/`)
    },
    generate: async (reportData: any) => {
      return fetchAPI("/reports/generate/", {
        method: "POST",
        body: JSON.stringify(reportData),
      })
    },
  },

  // Dashboard
  dashboard: {
    getData: async () => {
      return fetchAPI("/dashboard/")
    },
  },

  // Analytics
  analytics: {
    getData: async () => {
      return fetchAPI("/analytics/")
    },
  },
}
