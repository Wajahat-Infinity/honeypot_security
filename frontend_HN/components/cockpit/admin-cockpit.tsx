import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreatMap } from "@/components/threat-map"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield, Activity, Power, Lock, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AdminCockpit() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight neon-text"
          style={{ textShadow: "0 0 5px hsl(286, 100%, 50%), 0 0 10px hsl(286, 100%, 50%)" }}
        >
          Security Cockpit
        </h1>
        <p className="text-muted-foreground">Administrative control center with advanced security controls</p>
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
                  <span className="text-sm">Honeypots</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10">
                  15 Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">SIEM</span>
                </div>
                <Badge variant="outline" className="bg-yellow-500/10">
                  Warning
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Critical Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-red-500/10 rounded-md border border-red-500/20">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <div className="text-xs">
                  <p className="font-medium">Brute Force Attack</p>
                  <p className="text-muted-foreground">192.168.1.100 • 2m ago</p>
                </div>
              </div>

              <div className="flex items-center p-2 bg-orange-500/10 rounded-md border border-orange-500/20">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <div className="text-xs">
                  <p className="font-medium">Port Scanning</p>
                  <p className="text-muted-foreground">10.0.0.50 • 15m ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Lock className="mr-2 h-4 w-4" />
                Lockdown
              </Button>

              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Shield className="mr-2 h-4 w-4" />
                Isolate Network
              </Button>

              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                <Activity className="mr-2 h-4 w-4" />
                Trace Attack
              </Button>

              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Power className="mr-2 h-4 w-4" />
                Reset Systems
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Honeypot Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                  <span className="text-sm">Web Server Honeypot</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">156 attacks</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                  <span className="text-sm">FTP Server Trap</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">89 attacks</span>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                    Warning
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                  <span className="text-sm">SSH Decoy</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">234 attacks</span>
                  <Badge variant="outline" className="bg-gray-500/10">
                    Inactive
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
