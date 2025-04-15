"use client"

import { useState } from "react"
import { Bell, Lock, Network, Save, Server, Shield, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function SettingsTabs() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-6 w-full">
        <TabsTrigger value="general" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">General</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span className="hidden sm:inline">Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="network" className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          <span className="hidden sm:inline">Network</span>
        </TabsTrigger>
        <TabsTrigger value="system" className="flex items-center gap-2">
          <Server className="h-4 w-4" />
          <span className="hidden sm:inline">System</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">General Settings</CardTitle>
            <CardDescription>Configure general system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-name">System Name</Label>
              <Input id="system-name" defaultValue="HoneyNet Security System" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-update">Automatic Updates</Label>
              <Switch id="auto-update" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Security Settings</CardTitle>
            <CardDescription>Configure security settings and policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Select defaultValue="strong">
                <SelectTrigger id="password-policy">
                  <SelectValue placeholder="Select policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                  <SelectItem value="standard">Standard (8+ chars, mixed case, numbers)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                  <SelectItem value="custom">Custom Policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch id="two-factor" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ip-restriction">IP Address Restriction</Label>
              <Switch id="ip-restriction" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logging">Audit Logging</Label>
              <Switch id="audit-logging" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Notification Settings</CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-critical" className="text-sm">
                    Critical Alerts
                  </Label>
                  <Switch id="email-critical" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-warnings" className="text-sm">
                    Warnings
                  </Label>
                  <Switch id="email-warnings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-info" className="text-sm">
                    Informational
                  </Label>
                  <Switch id="email-info" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>SMS Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-critical" className="text-sm">
                    Critical Alerts Only
                  </Label>
                  <Switch id="sms-critical" defaultChecked />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number for SMS</Label>
              <Input id="phone-number" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label>In-App Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-all" className="text-sm">
                    All Alerts
                  </Label>
                  <Switch id="app-all" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="network" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Network Settings</CardTitle>
            <CardDescription>Configure network and connectivity settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ip-range">Monitored IP Range</Label>
              <Input id="ip-range" defaultValue="192.168.1.0/24" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scan-frequency">Network Scan Frequency</Label>
              <Select defaultValue="hourly">
                <SelectTrigger id="scan-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="deep-packet">Deep Packet Inspection</Label>
              <Switch id="deep-packet" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="port-scanning">Port Scanning Detection</Label>
              <Switch id="port-scanning" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="system" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">System Settings</CardTitle>
            <CardDescription>Configure system maintenance and backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-retention">Backup Retention (days)</Label>
              <Input id="backup-retention" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-retention">Log Retention (days)</Label>
              <Input id="log-retention" type="number" defaultValue="90" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-cleanup">Automatic Log Cleanup</Label>
              <Switch id="auto-cleanup" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Account Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" defaultValue="Admin User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
