import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const attackers = [
  {
    ip: "192.168.1.100",
    attacks: 156,
    country: "United States",
    lastSeen: "2 mins ago",
  },
  {
    ip: "10.0.0.50",
    attacks: 89,
    country: "China",
    lastSeen: "15 mins ago",
  },
  {
    ip: "172.16.0.25",
    attacks: 234,
    country: "Russia",
    lastSeen: "1 hour ago",
  },
  {
    ip: "192.168.1.103",
    attacks: 67,
    country: "Brazil",
    lastSeen: "30 mins ago",
  },
  {
    ip: "192.168.1.104",
    attacks: 123,
    country: "India",
    lastSeen: "5 mins ago",
  },
]

export function TopAttackers({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Attackers</CardTitle>
        <CardDescription>Most active malicious IPs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {attackers.map((attacker) => (
            <div key={attacker.ip} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{attacker.ip}</p>
                <p className="text-sm text-muted-foreground">{attacker.country}</p>
              </div>
              <div className="ml-auto text-sm font-medium">{attacker.attacks} attacks</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
