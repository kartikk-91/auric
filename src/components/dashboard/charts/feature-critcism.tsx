"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from "@/components/ui/chart"

export const description = "Radar chart showing top criticized features"

const featureCriticism = [
  { feature: "Support", score: 95 },       // most problematic
  { feature: "Performance", score: 80 },
  { feature: "UI", score: 70 },
  { feature: "Pricing", score: 60 },
  { feature: "Reliability", score: 55 },
  { feature: "Features", score: 50 },
]

const chartConfig = {
  score: {
    label: "Critical Mentions",
    color: "#ff4b4b",
  },
} satisfies ChartConfig

export function FeatureCriticismRadar() {
  const id = "radar-criticism"

  return (
    <Card className="rounded-xl shadow-none border-none bg-white">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="items-center -mt-1">
        <CardDescription>Top features causing issues or negative feedback</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-[350px]"
        >
          <RadarChart data={featureCriticism}>
            <defs>
              <linearGradient id="grad-criticism" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff4b4b" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#ff1a1a" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" tick={{ fontSize: 12, fill: "#374151" }} />
            <Radar
              dataKey="score"
              fill="url(#grad-criticism)"
              fillOpacity={0.7}
              dot={{ r: 5, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
