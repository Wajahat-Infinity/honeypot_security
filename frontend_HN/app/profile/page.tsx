import type { Metadata } from "next"

import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"

export const metadata: Metadata = {
  title: "Profile - Cybersecurity Dashboard",
  description: "Manage your user profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  )
}
