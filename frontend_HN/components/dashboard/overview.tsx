"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle, Shield, Users } from "lucide-react"

export function Overview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Quick overview of your security status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <Activity className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Active Honeypots</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Active Threats</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <Shield className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Protected Assets</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <Users className="h-6 w-6 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 