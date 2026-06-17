import { cn } from "@/lib/utils"
import type { DatasetStatus } from "@/lib/data"

const statusStyles: Record<DatasetStatus, string> = {
  Raw: "bg-muted text-muted-foreground border-border",
  Cleaned: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  Processed: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  Ready: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
}

export function StatusBadge({ status, className }: { status: DatasetStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function metricColor(value: number) {
  if (value >= 0.9) return "text-emerald-600 dark:text-emerald-400"
  if (value >= 0.8) return "text-blue-600 dark:text-blue-400"
  if (value >= 0.7) return "text-amber-600 dark:text-amber-400"
  return "text-muted-foreground"
}

export function MetricBadge({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("font-mono text-sm font-medium tabular-nums", metricColor(value), className)}>
      {(value * 100).toFixed(1)}%
    </span>
  )
}

export function MetricBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value * 100}%` }} />
      </div>
      <span className="font-mono text-xs tabular-nums text-muted-foreground">{(value * 100).toFixed(1)}%</span>
    </div>
  )
}
