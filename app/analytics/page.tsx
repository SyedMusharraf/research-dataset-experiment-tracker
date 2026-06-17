import { Trophy, Target, Crosshair, Activity, Award } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricBadge } from "@/components/metric-badges"
import { cn } from "@/lib/utils"
import { experiments, getDatasetName, getProjectName } from "@/lib/data"

function best(metric: "accuracy" | "precision_score" | "recall_score" | "f1_score") {
  return experiments.reduce((b, e) => (e[metric] > b[metric] ? e : b), experiments[0])
}

const leaderboard = experiments
  .slice()
  .sort((a, b) => b.f1_score - a.f1_score)
  .slice(0, 5)

export default function AnalyticsPage() {
  const bestAcc = best("accuracy")
  const bestPrec = best("precision_score")
  const bestRecall = best("recall_score")
  const bestF1 = best("f1_score")

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Compare model performance and surface your top experiments." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Best Accuracy"
          value={`${(bestAcc.accuracy * 100).toFixed(1)}%`}
          icon={Trophy}
          hint={bestAcc.model_name}
        />
        <StatCard
          label="Best Precision"
          value={`${(bestPrec.precision_score * 100).toFixed(1)}%`}
          icon={Target}
          hint={bestPrec.model_name}
        />
        <StatCard
          label="Best Recall"
          value={`${(bestRecall.recall_score * 100).toFixed(1)}%`}
          icon={Crosshair}
          hint={bestRecall.model_name}
        />
        <StatCard
          label="Best F1 Score"
          value={`${(bestF1.f1_score * 100).toFixed(1)}%`}
          icon={Activity}
          hint={bestF1.model_name}
        />
      </div>

      <AnalyticsCharts />

      <Card className="gap-0 py-0">
        <CardHeader className="border-b p-5">
          <CardTitle className="flex items-center gap-2">
            <Award className="size-4.5 text-primary" />
            Top Performing Models
          </CardTitle>
          <CardDescription>Ranked by F1 score across all experiments</CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {leaderboard.map((e, i) => (
            <div key={e.id} className="flex items-center gap-4 p-4">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
                  i === 0
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : i === 1
                      ? "bg-muted text-foreground"
                      : i === 2
                        ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                        : "bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{e.model_name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {getDatasetName(e.dataset_id)} · {getProjectName(e.project_id)}
                </p>
              </div>
              <div className="hidden gap-6 sm:flex">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <MetricBadge value={e.accuracy} />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">F1</p>
                  <MetricBadge value={e.f1_score} />
                </div>
              </div>
              <div className="text-right sm:hidden">
                <p className="text-xs text-muted-foreground">F1</p>
                <MetricBadge value={e.f1_score} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
