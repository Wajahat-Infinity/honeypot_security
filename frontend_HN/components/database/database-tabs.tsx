"use client"

import { useState } from "react"
import { AlertTriangle, BarChart3, Database, Play, Save, Table, X, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function DatabaseTabs() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM security_events LIMIT 10;")

  const handleExecuteQuery = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Query executed",
        description: "Your query has been executed successfully.",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="query" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="query" className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          <span>Query Tool</span>
        </TabsTrigger>
        <TabsTrigger value="tables" className="flex items-center gap-2">
          <Table className="h-4 w-4" />
          <span>Tables</span>
        </TabsTrigger>
        <TabsTrigger value="backups" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span>Backups</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Statistics</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="query" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">SQL Query Tool</CardTitle>
            <CardDescription>Execute SQL queries against the security database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={sqlQuery} onChange={(e) => setSqlQuery(e.target.value)} className="font-mono h-32" />
            <div className="bg-black p-4 rounded-md font-mono text-sm text-green-400 h-64 overflow-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Query Results</span>
                <span className="text-xs text-muted-foreground">10 rows returned in 0.023s</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-muted">
                    <th className="text-left p-2">id</th>
                    <th className="text-left p-2">timestamp</th>
                    <th className="text-left p-2">event_type</th>
                    <th className="text-left p-2">source_ip</th>
                    <th className="text-left p-2">severity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">1</td>
                    <td className="p-2">2023-01-01 12:00:00</td>
                    <td className="p-2">login_attempt</td>
                    <td className="p-2">192.168.1.100</td>
                    <td className="p-2">medium</td>
                  </tr>
                  <tr>
                    <td className="p-2">2</td>
                    <td className="p-2">2023-01-01 12:05:30</td>
                    <td className="p-2">port_scan</td>
                    <td className="p-2">10.0.0.50</td>
                    <td className="p-2">high</td>
                  </tr>
                  <tr>
                    <td className="p-2">3</td>
                    <td className="p-2">2023-01-01 12:10:15</td>
                    <td className="p-2">sql_injection</td>
                    <td className="p-2">172.16.0.25</td>
                    <td className="p-2">critical</td>
                  </tr>
                  <tr>
                    <td className="p-2">4</td>
                    <td className="p-2">2023-01-01 12:15:45</td>
                    <td className="p-2">login_attempt</td>
                    <td className="p-2">192.168.1.150</td>
                    <td className="p-2">low</td>
                  </tr>
                  <tr>
                    <td className="p-2">5</td>
                    <td className="p-2">2023-01-01 12:20:10</td>
                    <td className="p-2">malware_detected</td>
                    <td className="p-2">192.168.1.75</td>
                    <td className="p-2">critical</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Query
            </Button>
            <Button
              onClick={handleExecuteQuery}
              disabled={isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-black"
            >
              {isLoading ? (
                <>Executing...</>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Execute Query
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="tables" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Database Tables</CardTitle>
            <CardDescription>View and manage database tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">security_events</h3>
                    <Badge>1,245,678 rows</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stores all security events and alerts</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Query
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">honeypots</h3>
                    <Badge>24 rows</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Honeypot configuration and status</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Query
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">attackers</h3>
                    <Badge>5,432 rows</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Known attacker information</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Query
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">users</h3>
                    <Badge>15 rows</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">System users and permissions</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Query
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="backups" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Database Backups</CardTitle>
            <CardDescription>Manage database backups and restoration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Daily Backup - 2023-01-07</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">2.3 GB</Badge>
                  <Button variant="outline" size="sm">
                    Restore
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Daily Backup - 2023-01-06</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">2.2 GB</Badge>
                  <Button variant="outline" size="sm">
                    Restore
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Daily Backup - 2023-01-05</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">2.1 GB</Badge>
                  <Button variant="outline" size="sm">
                    Restore
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="font-medium">Weekly Backup - 2023-01-01</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">10.5 GB</Badge>
                  <Button variant="outline" size="sm">
                    Restore
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Database Statistics</CardTitle>
            <CardDescription>View database performance and usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Database Size</span>
                  <span className="text-sm">45.7 GB / 100 GB</span>
                </div>
                <Progress value={45.7} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Query Performance</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} className="bg-muted" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Connection Pool</span>
                  <span className="text-sm">12 / 50 active</span>
                </div>
                <Progress value={24} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Recent Errors</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span>Connection timeout at 2023-01-07 14:23:15</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span>Query execution error at 2023-01-06 09:12:45</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Top Queries</h3>
                  <div className="space-y-2 text-sm">
                    <div>SELECT * FROM security_events (45%)</div>
                    <div>INSERT INTO security_events (30%)</div>
                    <div>SELECT * FROM attackers (15%)</div>
                    <div>Other queries (10%)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
