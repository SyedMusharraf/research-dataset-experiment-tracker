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
import { summary, recentActivity } from "@/lib/data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview of your research datasets, projects and experiments.">
        <QuickActions />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Datasets" value={String(summary.totalDatasets)} icon={Database} change="+12%" hint="vs last month" />
        <StatCard label="Total Projects" value={String(summary.totalProjects)} icon={FolderKanban} change="+1" hint="this month" />
        <StatCard label="Total Experiments" value={String(summary.totalExperiments)} icon={FlaskConical} change="+24%" hint="vs last month" />
        <StatCard
          label="Avg Model Accuracy"
          value={`${(summary.avgAccuracy * 100).toFixed(1)}%`}
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
                {recentActivity.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.dataset}</TableCell>
                    <TableCell className="text-muted-foreground">{a.project}</TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">{a.model}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <MetricBadge value={a.accuracy} />
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{a.date}</TableCell>
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
