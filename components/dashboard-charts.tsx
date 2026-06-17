"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Line, LineChart, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { datasets, datasetCategories, projects, experimentsForProject, experiments } from "@/lib/data"

const categoryData = datasetCategories.map((cat) => ({
  category: cat,
  count: datasets.filter((d) => d.category === cat).length,
}))

const categoryConfig = {
  count: { label: "Datasets", color: "var(--chart-1)" },
} satisfies ChartConfig

const categoryColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]

const projectData = projects.map((p) => ({
  project: p.name.split(" ")[0],
  experiments: experimentsForProject(p.id).length,
}))

const projectConfig = {
  experiments: { label: "Experiments", color: "var(--chart-1)" },
} satisfies ChartConfig

const performanceData = experiments
  .slice()
  .sort((a, b) => a.created_at.localeCompare(b.created_at))
  .map((e, i) => ({
    run: `R${i + 1}`,
    accuracy: Number((e.accuracy * 100).toFixed(1)),
    f1: Number((e.f1_score * 100).toFixed(1)),
  }))

const performanceConfig = {
  accuracy: { label: "Accuracy", color: "var(--chart-1)" },
  f1: { label: "F1 Score", color: "var(--chart-2)" },
} satisfies ChartConfig

export function DatasetsByCategoryChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Datasets by Category</CardTitle>
        <CardDescription>Distribution across data types</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[240px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
            <Pie data={categoryData} dataKey="count" nameKey="category" innerRadius={55} strokeWidth={4}>
              {categoryData.map((entry, i) => (
                <Cell key={entry.category} fill={categoryColors[i % categoryColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
          {categoryData.map((entry, i) => (
            <div key={entry.category} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="size-2.5 rounded-[3px]"
                style={{ backgroundColor: categoryColors[i % categoryColors.length] }}
              />
              {entry.category} ({entry.count})
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ExperimentsPerProjectChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiments per Project</CardTitle>
        <CardDescription>Logged runs by research project</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={projectConfig} className="max-h-[280px] w-full">
          <BarChart data={projectData} margin={{ left: -16, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="project" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="experiments" fill="var(--color-experiments)" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function ModelPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Overview</CardTitle>
        <CardDescription>Accuracy and F1 across experiment runs</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={performanceConfig} className="max-h-[280px] w-full">
          <LineChart data={performanceData} margin={{ left: -16, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="run" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis domain={[70, 100]} tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} dot={false} />
            <Line dataKey="f1" stroke="var(--color-f1)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
