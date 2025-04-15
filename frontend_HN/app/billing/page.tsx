import type { Metadata } from "next"

import { BillingHeader } from "@/components/billing/billing-header"
import { BillingTabs } from "@/components/billing/billing-tabs"

export const metadata: Metadata = {
  title: "Billing - Cybersecurity Dashboard",
  description: "Manage your subscription and billing information",
}

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-4">
      <BillingHeader />
      <BillingTabs />
    </div>
  )
}
