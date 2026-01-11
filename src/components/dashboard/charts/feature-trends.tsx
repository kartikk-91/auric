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

export const description = "Radar chart showing top 6 trending topics"

const trendingTopics = [
  { feature: "UI", score: 85 },
  { feature: "Support", score: 70 },
  { feature: "Pricing", score: 55 },
  { feature: "Performance", score: 95 },
  { feature: "Features", score: 65 },
  { feature: "Reliability", score: 60 },
]

const chartConfig = {
  score: {
    label: "Mentions / Likes",
    color: "#00ffc8",
  },
} satisfies ChartConfig

export function TrendingTopicsRadar() {
  const id = "radar-trending"

  return (
    <Card className="rounded-xl shadow-none border-none bg-white">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="items-center -mt-1">
        <CardDescription>Top 6 feedback topics with popularity</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-[350px]"
        >
          <RadarChart data={trendingTopics}>
            <defs>
              <linearGradient id="grad-radar" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00ffc8" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22d9a5" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" tick={{ fontSize: 12, fill: "#374151" }} />
            <Radar
              dataKey="score"
              fill="url(#grad-radar)"
              fillOpacity={0.7}
              dot={{ r: 5, fillOpacity: 1 }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
