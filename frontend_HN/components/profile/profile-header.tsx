import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <Avatar className="h-20 w-20 border-4 border-cyan-500/20">
        <AvatarImage src="/avatars/01.png" alt="User avatar" />
        <AvatarFallback className="text-xl">
          <User className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold tracking-tight neon-text">User Profile</h1>
        <p className="text-muted-foreground">Manage your profile information and account settings</p>
      </div>
    </div>
  )
}
