"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "2024-01-01", attacks: 400 },
  { date: "2024-01-02", attacks: 300 },
  { date: "2024-01-03", attacks: 500 },
  { date: "2024-01-04", attacks: 280 },
  { date: "2024-01-05", attacks: 320 },
  { date: "2024-01-06", attacks: 600 },
  { date: "2024-01-07", attacks: 450 },
]

export function AttackTrends({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Attack Trends</CardTitle>
        <CardDescription>Daily attack patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="attacks" stroke="#ff0000" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
