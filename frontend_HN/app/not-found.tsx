import Link from "next/link"
import { Shield, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-8 text-cyan-500">
        <Shield className="h-24 w-24 mx-auto" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight neon-text mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-black">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Link>
      </Button>
    </div>
  )
}
