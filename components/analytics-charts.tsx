"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"
import { experiments, getDatasetName } from "@/lib/data"

const accuracyData = experiments
  .slice()
  .sort((a, b) => b.accuracy - a.accuracy)
  .map((e) => ({ model: `${e.model_name}`, accuracy: Math.round(e.accuracy * 1000) / 10 }))

const prData = experiments.map((e) => ({
  precision: Math.round(e.precision_score * 1000) / 10,
  recall: Math.round(e.recall_score * 1000) / 10,
  model: e.model_name,
}))

const f1Trend = experiments
  .slice()
  .sort((a, b) => a.created_at.localeCompare(b.created_at))
  .map((e) => ({ date: e.created_at.slice(5), f1: Math.round(e.f1_score * 1000) / 10 }))

const byDatasetMap = experiments.reduce<Record<string, number>>((acc, e) => {
  const name = getDatasetName(e.dataset_id)
  acc[name] = (acc[name] ?? 0) + 1
  return acc
}, {})
const byDataset = Object.entries(byDatasetMap).map(([dataset, count]) => ({ dataset, count }))

const accConfig = { accuracy: { label: "Accuracy %", color: "var(--chart-1)" } } satisfies ChartConfig
const prConfig = {
  recall: { label: "Recall %", color: "var(--chart-2)" },
} satisfies ChartConfig
const f1Config = { f1: { label: "F1 %", color: "var(--chart-3)" } } satisfies ChartConfig
const dsConfig = { count: { label: "Experiments", color: "var(--chart-4)" } } satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Accuracy Comparison</CardTitle>
          <CardDescription>Model accuracy across all logged experiments</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={accConfig} className="h-[280px] w-full">
            <BarChart accessibilityLayer data={accuracyData} margin={{ left: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="model" tickLine={false} axisLine={false} tickMargin={8} hide />
              <YAxis tickLine={false} axisLine={false} domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Precision vs Recall</CardTitle>
          <CardDescription>Trade-off scatter across experiments</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={prConfig} className="h-[280px] w-full">
            <ScatterChart accessibilityLayer margin={{ left: -10 }}>
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey="precision"
                name="Precision"
                tickLine={false}
                axisLine={false}
                domain={[60, 100]}
                unit="%"
              />
              <YAxis
                type="number"
                dataKey="recall"
                name="Recall"
                tickLine={false}
                axisLine={false}
                domain={[60, 100]}
                unit="%"
              />
              <ZAxis range={[120, 120]} />
              <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
              <Scatter data={prData} fill="var(--chart-2)" />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>F1 Score Trends</CardTitle>
          <CardDescription>F1 score over time as experiments were logged</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={f1Config} className="h-[280px] w-full">
            <LineChart accessibilityLayer data={f1Trend} margin={{ left: -10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="f1"
                type="monotone"
                stroke="var(--color-f1)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experiments by Dataset</CardTitle>
          <CardDescription>How many experiments ran on each dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dsConfig} className="h-[280px] w-full">
            <BarChart accessibilityLayer data={byDataset} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="dataset"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
