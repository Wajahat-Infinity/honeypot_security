"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Check, CreditCard, Download, FileText, Loader2, Save, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function BillingTabs() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment information updated",
        description: "Your payment information has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="subscription" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Subscription</span>
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Payment Methods</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Billing History</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="subscription" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Current Subscription</CardTitle>
            <CardDescription>Manage your subscription plan and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-gradient-to-r from-cyan-950 to-purple-950">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-medium text-cyan-400">Enterprise Plan</h3>
                </div>
                <Badge className="bg-cyan-500 text-black">Active</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your subscription renews on <span className="text-cyan-400">January 15, 2024</span>
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">$499.99</p>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">Unlimited honeypots</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">24/7 monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">Advanced analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">Unlimited users</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Usage Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Active Honeypots</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">of Unlimited</p>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">of Unlimited</p>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">45.7 GB</p>
                    <p className="text-sm text-muted-foreground">of 100 GB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Basic</h4>
                    <Badge variant="outline">$99/mo</Badge>
                  </div>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>5 honeypots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>3 users</span>
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" className="w-full">
                    Downgrade
                  </Button>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Professional</h4>
                    <Badge variant="outline">$299/mo</Badge>
                  </div>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>20 honeypots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3" />
                      <span>10 users</span>
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" className="w-full">
                    Downgrade
                  </Button>
                </div>
                <div className="p-4 border rounded-md bg-gradient-to-r from-cyan-950 to-purple-950 border-cyan-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium">Enterprise</h4>
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    </div>
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                      $499/mo
                    </Badge>
                  </div>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-cyan-400" />
                      <span>Unlimited honeypots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-cyan-400" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-cyan-400" />
                      <span>Unlimited users</span>
                    </li>
                  </ul>
                  <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
                    Current Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel Subscription</Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
              <ArrowRight className="mr-2 h-4 w-4" />
              Manage Plan
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payment" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Saved Payment Methods</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-cyan-500" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Mastercard ending in 5555</p>
                        <p className="text-sm text-muted-foreground">Expires 08/2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                    <Button variant="outline" size="sm">
                      Make Default
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Add New Payment Method</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="4242 4242 4242 4242" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-month">Expiry Month</Label>
                    <Input id="expiry-month" placeholder="MM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry-year">Expiry Year</Label>
                    <Input id="expiry-year" placeholder="YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Billing Address</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-line2">Address Line 2</Label>
                    <Input id="address-line2" placeholder="Apt 4B" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
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
                  Save Payment Method
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="neon-text">Billing History</CardTitle>
            <CardDescription>View and download your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Invoice</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Amount</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">INV-001</td>
                      <td className="p-3">Jan 1, 2023</td>
                      <td className="p-3">$499.99</td>
                      <td className="p-3">
                        <Badge variant="success">Paid</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">INV-002</td>
                      <td className="p-3">Feb 1, 2023</td>
                      <td className="p-3">$499.99</td>
                      <td className="p-3">
                        <Badge variant="success">Paid</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">INV-003</td>
                      <td className="p-3">Mar 1, 2023</td>
                      <td className="p-3">$499.99</td>
                      <td className="p-3">
                        <Badge variant="success">Paid</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">INV-004</td>
                      <td className="p-3">Apr 1, 2023</td>
                      <td className="p-3">$499.99</td>
                      <td className="p-3">
                        <Badge variant="success">Paid</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">INV-005</td>
                      <td className="p-3">May 1, 2023</td>
                      <td className="p-3">$499.99</td>
                      <td className="p-3">
                        <Badge variant="success">Paid</Badge>
                      </td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Invoices are generated on the 1st of each month</span>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
