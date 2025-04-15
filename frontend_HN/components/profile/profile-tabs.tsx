"use client"

import { useState } from "react"
import { Bell, CreditCard, Key, Loader2, Lock, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export function ProfileTabs() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="personal" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Personal Info</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Security</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="api" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          <span>API Keys</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Personal Information</CardTitle>
            <CardDescription>Update your personal information and profile settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Alex" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Johnson" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" defaultValue="Security Administrator" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue="security">
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security Operations</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                defaultValue="Cybersecurity professional with 5+ years of experience in network security and threat analysis."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="est">
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
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
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
            <CardDescription>Manage your account security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
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
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="text-base">
                    Enable 2FA
                  </Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Login Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">Windows 11 • Chrome • New York, USA</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">Previous Session</p>
                    <p className="text-sm text-muted-foreground">macOS • Safari • New York, USA</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
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
            <CardTitle className="neon-text">Notification Preferences</CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-security" className="text-base">
                      Security Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about security incidents</p>
                  </div>
                  <Switch id="email-security" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-system" className="text-base">
                      System Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about system updates</p>
                  </div>
                  <Switch id="email-system" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-news" className="text-base">
                      Newsletter
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive our monthly newsletter</p>
                  </div>
                  <Switch id="email-news" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Push Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-critical" className="text-base">
                      Critical Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications for critical alerts</p>
                  </div>
                  <Switch id="push-critical" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-warnings" className="text-base">
                      Warnings
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications for warnings</p>
                  </div>
                  <Switch id="push-warnings" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-info" className="text-base">
                      Informational
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications for informational updates
                    </p>
                  </div>
                  <Switch id="push-info" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
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

      <TabsContent value="api" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">API Keys</CardTitle>
            <CardDescription>Manage your API keys for programmatic access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Your API Keys</h3>
                  <p className="text-sm text-muted-foreground">These keys allow programmatic access to your account</p>
                </div>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Key className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Primary API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Jan 15, 2023</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md font-mono text-sm">
                    <span className="truncate">sk_live_51NxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                    <Button variant="ghost" size="sm">
                      <CreditCard className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Secondary API Key</p>
                      <p className="text-sm text-muted-foreground">Created on Mar 22, 2023</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md font-mono text-sm">
                    <span className="truncate">sk_live_51NyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY</span>
                    <Button variant="ghost" size="sm">
                      <CreditCard className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">API Access Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-read" className="text-base">
                      Read Access
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow API keys to read data</p>
                  </div>
                  <Switch id="api-read" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-write" className="text-base">
                      Write Access
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow API keys to write data</p>
                  </div>
                  <Switch id="api-write" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-delete" className="text-base">
                      Delete Access
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow API keys to delete data</p>
                  </div>
                  <Switch id="api-delete" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600 text-black">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
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
