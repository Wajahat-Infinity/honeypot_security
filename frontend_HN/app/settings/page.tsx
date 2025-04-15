import type { Metadata } from "next"

import { SettingsTabs } from "@/components/settings/settings-tabs"

export const metadata: Metadata = {
  title: "Settings - Cybersecurity Dashboard",
  description: "Configure system settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight neon-text">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>
      <SettingsTabs />
    </div>
  )
}
