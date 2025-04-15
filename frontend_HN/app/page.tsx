import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Activity } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight neon-text mb-2">Welcome to HoneyNet Security</h1>
        <p className="text-muted-foreground">Select your preferred interface to continue</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/auth/login?interface=dashboard" className="block">
          <Card className="cyber-card border-cyan-500/30 hover:border-cyan-500/70 transition-all h-full cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-500" />
                <span className="neon-text">Dashboard View</span>
              </CardTitle>
              <CardDescription>Comprehensive security monitoring with detailed analytics and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/40 rounded-md cyber-grid flex items-center justify-center p-4">
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto text-cyan-500 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Full-featured dashboard with detailed security metrics and controls
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/auth/login?interface=cockpit" className="block">
          <Card className="cyber-card border-purple-500/30 hover:border-purple-500/70 transition-all h-full cursor-pointer hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-purple-500" />
                <span
                  className="neon-text"
                  style={{ textShadow: "0 0 5px hsl(286, 100%, 50%), 0 0 10px hsl(286, 100%, 50%)" }}
                >
                  Cockpit View
                </span>
              </CardTitle>
              <CardDescription>Streamlined operational interface for quick monitoring and response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/40 rounded-md cyber-grid flex items-center justify-center p-4">
                <div className="text-center">
                  <Activity className="h-16 w-16 mx-auto text-purple-500 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Focused view with real-time alerts and quick-action controls
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
