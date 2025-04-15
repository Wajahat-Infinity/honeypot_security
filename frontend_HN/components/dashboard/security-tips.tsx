import { Check, Info, Shield } from "lucide-react"

export function SecurityTips() {
  const tips = [
    {
      id: 1,
      title: "Enable Two-Factor Authentication",
      description: "Add an extra layer of security to your account by enabling 2FA.",
      icon: Shield,
      status: "completed",
    },
    {
      id: 2,
      title: "Update Your Password",
      description: "It's been 3 months since your last password change. Consider updating it.",
      icon: Info,
      status: "pending",
    },
    {
      id: 3,
      title: "Review Recent Login Activity",
      description: "Check your account for any suspicious login attempts.",
      icon: Info,
      status: "pending",
    },
  ]

  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <div key={tip.id} className="flex items-start gap-3 p-3 border rounded-md">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              tip.status === "completed"
                ? "bg-green-100 text-green-600 dark:bg-green-900"
                : "bg-blue-100 text-blue-600 dark:bg-blue-900"
            }`}
          >
            <tip.icon className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">{tip.title}</p>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </div>
          {tip.status === "completed" && (
            <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900">
              <Check className="h-3 w-3" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
