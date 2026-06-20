"use client"

import { supabase } from "@/lib/supabase"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2, ExternalLink } from "lucide-react"
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
import { StatusBadge } from "@/components/metric-badges"
import { DatasetFormDialog } from "@/components/dataset-form-dialog"
import { DatasetDetailSheet } from "@/components/dataset-detail-sheet"
import { datasetCategories, datasetStatuses, type Dataset } from "@/lib/data"


export function DatasetsView({
      datasets,
      }: {
        datasets: Dataset[]
      }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [selected, setSelected] = useState<Dataset | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<Dataset | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const filtered = useMemo(() => {
    return datasets.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === "all" || d.category === category
      const matchesStatus = status === "all" || d.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [query, category, status])

  function openDetail(d: Dataset) {
    setSelected(d)
    setSheetOpen(true)
  }

  function openEdit(d: Dataset) {
    setEditing(d)
    setEditOpen(true)
  }
  async function deleteDataset(id: number, name: string) {
    const { error } = await supabase
      .from("datasets")
      .delete()
      .eq("id", id)
  
    if (error) {
      toast.error(error.message)
      console.error(error)
      return
    }
  
    toast.success(`${name} deleted`)
  
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Datasets" description="Manage and organize your research datasets.">
      <DatasetFormDialog
  trigger={
    <Button>
      <Plus className="size-4" />
      Add Dataset
    </Button>
  }
/>
      </PageHeader>

      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {datasetCategories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {datasetStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
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
                <TableHead>Dataset Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source URL</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id} className="cursor-pointer" onClick={() => openDetail(d)}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-muted-foreground">{d.category}</TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                  <TableCell>
                    <a
                      href={d.source_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex max-w-[200px] items-center gap-1 truncate text-sm text-primary hover:underline"
                    >
                      <span className="truncate">{d.source_url.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
{new Date(d.created_at).toISOString().split("T")[0]}
</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDetail(d)}>
                          <Eye className="size-4" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(d)}>
                          <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
  variant="destructive"
  onClick={() => deleteDataset(d.id, d.name)}
>
  <Trash2 className="size-4" />
  Delete
</DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No datasets match your filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </Card>

      <DatasetDetailSheet dataset={selected} open={sheetOpen} onOpenChange={setSheetOpen} />
      <DatasetFormDialog dataset={editing ?? undefined} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
