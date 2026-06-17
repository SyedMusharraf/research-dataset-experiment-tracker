"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MetricBadge, MetricBar } from "@/components/metric-badges"
import { ExperimentFormDialog } from "@/components/experiment-form-dialog"
import { experiments, projects, modelNames, getDatasetName, getProjectName, type Experiment } from "@/lib/data"

export function ExperimentsView() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [project, setProject] = useState("all")
  const [model, setModel] = useState("all")
  const [editing, setEditing] = useState<Experiment | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const filtered = useMemo(() => {
    return experiments.filter((e) => {
      const matchesQuery =
        e.model_name.toLowerCase().includes(query.toLowerCase()) ||
        getDatasetName(e.dataset_id).toLowerCase().includes(query.toLowerCase())
      const matchesProject = project === "all" || e.project_id === project
      const matchesModel = model === "all" || e.model_name === model
      return matchesQuery && matchesProject && matchesModel
    })
  }, [query, project, model])

  return (
    <div className="space-y-6">
      <PageHeader title="Experiments" description="Track and compare machine learning experiment results.">
        <ExperimentFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Log Experiment
            </Button>
          }
        />
      </PageHeader>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by model or dataset..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger className="sm:w-52">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {modelNames.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="py-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Dataset</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead>Precision</TableHead>
                <TableHead>Recall</TableHead>
                <TableHead className="text-right">F1</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow
                  key={e.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/experiments/${e.id}`)}
                >
                  <TableCell className="font-mono text-xs font-medium">{e.model_name}</TableCell>
                  <TableCell className="text-muted-foreground">{getDatasetName(e.dataset_id)}</TableCell>
                  <TableCell className="text-muted-foreground">{getProjectName(e.project_id)}</TableCell>
                  <TableCell className="text-right">
                    <MetricBadge value={e.accuracy} />
                  </TableCell>
                  <TableCell>
                    <MetricBar value={e.precision_score} />
                  </TableCell>
                  <TableCell>
                    <MetricBar value={e.recall_score} />
                  </TableCell>
                  <TableCell className="text-right">
                    <MetricBadge value={e.f1_score} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{e.created_at}</TableCell>
                  <TableCell className="text-right" onClick={(ev) => ev.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/experiments/${e.id}`}>
                            <Eye className="size-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditing(e)
                            setEditOpen(true)
                          }}
                        >
                          <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => toast.success("Experiment deleted", { description: "The run has been removed." })}
                        >
                          <Trash2 className="size-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    No experiments match your filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ExperimentFormDialog experiment={editing ?? undefined} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
