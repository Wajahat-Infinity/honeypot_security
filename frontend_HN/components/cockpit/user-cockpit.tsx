import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreatMap } from "@/components/threat-map"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, RefreshCw, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserCockpit() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight neon-text"
          style={{ textShadow: "0 0 5px hsl(286, 100%, 50%), 0 0 10px hsl(286, 100%, 50%)" }}
        >
          Security Cockpit
        </h1>
        <p className="text-muted-foreground">Real-time security monitoring interface</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cyber-card col-span-2 row-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Live Threat Map</span>
              <Button size="sm" variant="outline" className="h-7">
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThreatMap />
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Firewall</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">IDS/IPS</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10">
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Security Status</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10">
                  Protected
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-orange-500/10 rounded-md border border-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <div className="text-xs">
                  <p className="font-medium">Suspicious Activity</p>
                  <p className="text-muted-foreground">15m ago</p>
                </div>
              </div>

              <div className="flex items-center p-2 bg-blue-500/10 rounded-md border border-blue-500/20">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <div className="text-xs">
                  <p className="font-medium">System Update</p>
                  <p className="text-muted-foreground">1h ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="cyber-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20">
              <Shield className="h-4 w-4 text-cyan-500 mr-2" />
              <div className="text-xs">
                <p className="font-medium">Update your password</p>
                <p className="text-muted-foreground">It's been 3 months since your last password change</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Update
              </Button>
            </div>

            <div className="flex items-center p-2 bg-cyan-500/10 rounded-md border border-cyan-500/20">
              <Shield className="h-4 w-4 text-cyan-500 mr-2" />
              <div className="text-xs">
                <p className="font-medium">Enable two-factor authentication</p>
                <p className="text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Enable
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
