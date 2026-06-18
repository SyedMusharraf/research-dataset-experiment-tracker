import Link from "next/link"
import { Database, FolderKanban, FlaskConical, Target, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { QuickActions } from "@/components/quick-actions"
import {
  DatasetsByCategoryChart,
  ExperimentsPerProjectChart,
  ModelPerformanceChart,
} from "@/components/dashboard-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetricBadge } from "@/components/metric-badges"
import { getDashboardStats, getRecentActivity } from "@/lib/dashboard"


export default async function DashboardPage() {

  const stats = await getDashboardStats()
  const recentActivity = await getRecentActivity()

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your research datasets, projects and experiments.">
        <QuickActions />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Datasets" value={String(stats.totalDatasets)} icon={Database} change="+12%" hint="vs last month" />
        <StatCard label="Total Projects" value={String(stats.totalProjects)} icon={FolderKanban} change="+1" hint="this month" />
        <StatCard label="Total Experiments" value={String(stats.totalExperiments)} icon={FlaskConical} change="+24%" hint="vs last month" />
        <StatCard
          label="Avg Model Accuracy"
          value={`${(stats.avgAccuracy * 100).toFixed(1)}%`}
          icon={Target}
          change="+2.3%"
          hint="across all runs"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DatasetsByCategoryChart />
        <ExperimentsPerProjectChart />
        <ModelPerformanceChart />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest logged experiments across projects</CardDescription>
          </div>
          <Link href="/experiments">
          <Button variant="ghost" size="sm">
           View all <ArrowRight className="size-4" />
             </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {recentActivity.map((a: any) => (
  <TableRow key={a.id}>
    <TableCell className="font-medium">
      {a.datasets?.name}
    </TableCell>

    <TableCell className="text-muted-foreground">
      {a.projects?.name}
    </TableCell>

    <TableCell>
      <span className="font-mono text-xs">
        {a.model_name}
      </span>
    </TableCell>

    <TableCell className="text-right">
      <MetricBadge value={a.accuracy} />
    </TableCell>

    <TableCell className="text-right text-muted-foreground">
      {new Date(a.created_at).toISOString().split("T")[0]}
    </TableCell>
  </TableRow>
))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
