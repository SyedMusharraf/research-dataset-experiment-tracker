import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Database, FlaskConical, Target, Calendar } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge, MetricBadge } from "@/components/metric-badges"
import {
  getProjectById,
  experimentsForProject,
  datasetsForProject,
  getDatasetName,
  projects,
} from "@/lib/data"

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const experiments = experimentsForProject(id)
  const linkedDatasets = datasetsForProject(id)
  const avgAcc = experiments.length
    ? experiments.reduce((s, e) => s + e.accuracy, 0) / experiments.length
    : 0
  const bestAcc = experiments.length ? Math.max(...experiments.map((e) => e.accuracy)) : 0

  return (
    <div className="space-y-6">
<Link href="/projects">
  <Button
    variant="ghost"
    size="sm"
    className="-ml-2 w-fit text-muted-foreground"
  >
    <ArrowLeft className="size-4" />
    Back to Projects
  </Button>
</Link>

      <PageHeader title={project.name} description={project.description}>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="size-4" /> Created {project.created_at}
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Linked Datasets" value={String(linkedDatasets.length)} icon={Database} />
        <StatCard label="Experiments" value={String(experiments.length)} icon={FlaskConical} />
        <StatCard label="Avg Accuracy" value={`${(avgAcc * 100).toFixed(1)}%`} icon={Target} />
        <StatCard label="Best Accuracy" value={`${(bestAcc * 100).toFixed(1)}%`} icon={Target} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Linked Datasets</CardTitle>
          <CardDescription>Datasets used across this project&apos;s experiments</CardDescription>
        </CardHeader>
        <CardContent>
          {linkedDatasets.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {linkedDatasets.map((d) => (
                <Link
                  key={d.id}
                  href="/datasets"
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.category}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No datasets linked yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="py-0">
        <CardHeader className="pt-6">
          <CardTitle>Associated Experiments</CardTitle>
          <CardDescription>All experiment runs logged under this project</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Model</TableHead>
                  <TableHead>Dataset</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">F1 Score</TableHead>
                  <TableHead className="pr-6 text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiments.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="pl-6 font-mono text-xs">{e.model_name}</TableCell>
                    <TableCell className="text-muted-foreground">{getDatasetName(e.dataset_id)}</TableCell>
                    <TableCell className="text-right">
                      <MetricBadge value={e.accuracy} />
                    </TableCell>
                    <TableCell className="text-right">
                      <MetricBadge value={e.f1_score} />
                    </TableCell>
                    <TableCell className="pr-6 text-right text-muted-foreground">{e.created_at}</TableCell>
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
