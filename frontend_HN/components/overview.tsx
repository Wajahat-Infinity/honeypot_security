"use client"

import type React from "react"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    attack: 400,
    date: "Jan 1",
  },
  {
    attack: 300,
    date: "Jan 2",
  },
  {
    attack: 500,
    date: "Jan 3",
  },
  {
    attack: 280,
    date: "Jan 4",
  },
  {
    attack: 320,
    date: "Jan 5",
  },
  {
    attack: 600,
    date: "Jan 6",
  },
  {
    attack: 450,
    date: "Jan 7",
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm cyber-card">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attacks</span>
                      <span className="font-bold text-cyan-500">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="attack"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--cyber-glow))" },
          }}
          style={
            {
              stroke: "hsl(var(--cyber-glow))",
            } as React.CSSProperties
          }
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
