import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Only apply middleware to API routes
export function middleware(request: NextRequest) {
  // Skip middleware for non-API routes
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Handle OPTIONS request for CORS preflight
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 200 })

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role")
    response.headers.set("Access-Control-Max-Age", "86400") // 24 hours

    return response
  }

  // Get response for non-OPTIONS requests
  const response = NextResponse.next()

  // Add CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role")
  response.headers.set("Access-Control-Allow-Credentials", "true")

  return response
}

export const config = {
  matcher: ["/api/:path*"],
}
