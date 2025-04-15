import type { Metadata } from "next"

import { HoneypotsList } from "@/components/honeypots/honeypots-list"
import { HoneypotsHeader } from "@/components/honeypots/honeypots-header"

export const metadata: Metadata = {
  title: "Honeypots - Cybersecurity Dashboard",
  description: "Manage and monitor your honeypot deployments",
}

export default function HoneypotsPage() {
  return (
    <div className="flex flex-col gap-4">
      <HoneypotsHeader />
      <HoneypotsList />
    </div>
  )
}
