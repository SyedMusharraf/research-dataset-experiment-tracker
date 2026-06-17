import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  icon: Icon,
  change,
  trend = "up",
  hint,
}: {
  label: string
  value: string
  icon: LucideIcon
  change?: string
  trend?: "up" | "down"
  hint?: string
}) {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4.5" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
          <div className="flex items-center gap-1.5 text-xs">
            {change ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
                )}
              >
                {trend === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {change}
              </span>
            ) : null}
            {hint ? <span className="text-muted-foreground">{hint}</span> : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
