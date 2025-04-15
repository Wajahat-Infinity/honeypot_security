import { CreditCard } from "lucide-react"

export function BillingHeader() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-cyan-500" />
        <h1 className="text-2xl font-bold tracking-tight neon-text">Billing & Subscription</h1>
      </div>
      <p className="text-muted-foreground mt-1">Manage your subscription, payment methods, and billing history</p>
    </div>
  )
}
