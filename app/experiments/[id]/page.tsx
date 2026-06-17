import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Database, FolderKanban, Calendar, Cpu } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { experiments, getDatasetById, getProjectById } from "@/lib/data"

export function generateStaticParams() {
  return experiments.map((e) => ({ id: e.id }))
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-mono text-lg font-semibold tabular-nums">{(value * 100).toFixed(1)}%</span>
      </div>
      <Progress value={value * 100} />
    </div>
  )
}

export default async function ExperimentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experiment = experiments.find((e) => e.id === id)
  if (!experiment) notFound()

  const dataset = getDatasetById(experiment.dataset_id)
  const project = getProjectById(experiment.project_id)

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit text-muted-foreground">
        <Link href="/experiments">
          <ArrowLeft className="size-4" /> Back to Experiments
        </Link>
      </Button>

      <PageHeader title={experiment.model_name} description={`Experiment run logged on ${experiment.created_at}`}>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-medium text-primary">
          <Cpu className="size-4" /> {(experiment.accuracy * 100).toFixed(1)}% accuracy
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Evaluation scores for this experiment run</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Metric label="Accuracy" value={experiment.accuracy} />
              <Metric label="Precision" value={experiment.precision_score} />
              <Metric label="Recall" value={experiment.recall_score} />
              <Metric label="F1 Score" value={experiment.f1_score} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{experiment.notes}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Cpu className="size-4" /> Model
              </span>
              <span className="font-mono font-medium">{experiment.model_name}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Database className="size-4" /> Dataset
              </span>
              <Link href="/datasets" className="font-medium text-primary hover:underline">
                {dataset?.name}
              </Link>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <FolderKanban className="size-4" /> Project
              </span>
              <Link href={`/projects/${project?.id}`} className="font-medium text-primary hover:underline">
                {project?.name}
              </Link>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <Calendar className="size-4" /> Date
              </span>
              <span className="font-medium">{experiment.created_at}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
