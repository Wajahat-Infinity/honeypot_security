"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { time: "00:00", traffic: 2400, attacks: 400 },
  { time: "03:00", traffic: 1398, attacks: 300 },
  { time: "06:00", traffic: 9800, attacks: 500 },
  { time: "09:00", traffic: 3908, attacks: 280 },
  { time: "12:00", traffic: 4800, attacks: 320 },
  { time: "15:00", traffic: 3800, attacks: 600 },
  { time: "18:00", traffic: 4300, attacks: 450 },
  { time: "21:00", traffic: 4300, attacks: 450 },
]

export function NetworkActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Activity</CardTitle>
        <CardDescription>24-hour network traffic and attack patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="traffic" stroke="#adfa1d" strokeWidth={2} name="Traffic" />
            <Line type="monotone" dataKey="attacks" stroke="#ff0000" strokeWidth={2} name="Attacks" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
