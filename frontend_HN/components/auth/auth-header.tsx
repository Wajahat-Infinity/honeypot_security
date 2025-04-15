"use client"

import { Shield } from "lucide-react"
import Link from "next/link"

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-500" />
            <span className="font-bold neon-text">HoneyNet Security</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">{/* Theme toggle removed */}</div>
      </div>
    </header>
  )
}
