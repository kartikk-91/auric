"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const description = "Sentiment distribution pie chart"


const sentimentData = [
    { sentiment: "Positive", count: 120, fill: "rgba(0, 255, 200, 0.8)" }, 
    { sentiment: "Neutral", count: 50, fill: "rgba(255, 200, 50, 0.7)" },   
    { sentiment: "Negative", count: 30, fill: "rgba(255, 75, 75, 0.8)" },   
  ]
  
  const chartConfig = {
    Positive: { label: "Positive", color: "rgba(0, 255, 200, 0.8)" },
    Neutral: { label: "Neutral", color: "rgba(255, 200, 50, 0.7)" },
    Negative: { label: "Negative", color: "rgba(255, 75, 75, 0.8)" },
  } satisfies ChartConfig
  

export function SentimentDistribution() {
    const id = "pie-sentiment"
    const [activeSentiment, setActiveSentiment] = React.useState(
        sentimentData[0].sentiment
    )

    const activeIndex = React.useMemo(
        () => sentimentData.findIndex((item) => item.sentiment === activeSentiment),
        [activeSentiment]
    )
    const sentiments = React.useMemo(
        () => sentimentData.map((item) => item.sentiment),
        []
    )

    return (
        <Card data-chart={id} className="flex flex-col border-none shadow-none">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Sentiment Distribution</CardTitle>
                    <CardDescription>Feedback sentiment breakdown</CardDescription>
                </div>
                <Select value={activeSentiment} onValueChange={setActiveSentiment}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Select sentiment"
                    >
                        <SelectValue placeholder="Select sentiment" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {sentiments.map((key) => {
                            const config = chartConfig[key as keyof typeof chartConfig]
                            if (!config) return null
                            return (
                                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{ backgroundColor: config.color }}
                                        />
                                        {config.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={sentimentData}
                            dataKey="count"
                            nameKey="sentiment"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={(props: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={(props.outerRadius || 0) + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={(props.outerRadius || 0) + 25}
                                        innerRadius={(props.outerRadius || 0) + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {sentimentData[activeIndex].count}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {sentimentData[activeIndex].sentiment}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
