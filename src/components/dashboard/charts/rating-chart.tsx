"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Rating distribution bar chart"


const chartData = [
    { rating: "1 ⭐", count: 12 },
    { rating: "2 ⭐", count: 24 },
    { rating: "3 ⭐", count: 38 },
    { rating: "4 ⭐", count: 101 },
    { rating: "5 ⭐", count: 60 },
]

const chartConfig = {
    count: {
        label: "Number of Feedbacks",
        color: "#f57e2f",
    },
} satisfies ChartConfig

export function RatingChart() {
    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Feedback ratings breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="rating"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill={chartConfig.count.color} radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Most feedback is 5 ⭐ <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing distribution of ratings for all feedbacks
                </div>
            </CardFooter>
        </Card>
    )
}
