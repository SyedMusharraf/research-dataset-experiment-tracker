"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Pencil, Trash2, ExternalLink } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/metric-badges"
import { DatasetFormDialog } from "@/components/dataset-form-dialog"
import { experimentsForDataset, type Dataset } from "@/lib/data"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export function DatasetDetailSheet({
  dataset,
  open,
  onOpenChange,
}: {
  dataset: Dataset | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [editOpen, setEditOpen] = useState(false)

  if (!dataset) return null
  const runs = experimentsForDataset(dataset.id)

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
          <SheetHeader>
            <div className="flex items-center gap-2">
              <StatusBadge status={dataset.status} />
              <span className="text-xs text-muted-foreground">{dataset.category}</span>
            </div>
            <SheetTitle className="text-pretty text-xl">{dataset.name}</SheetTitle>
            <SheetDescription className="text-pretty">{dataset.description}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-4">
            <Separator />
            <Field label="Source URL">
              <a
                href={dataset.source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 break-all text-primary hover:underline"
              >
                {dataset.source_url}
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">{dataset.category}</Field>
              <Field label="Created">{dataset.created_at}</Field>
            </div>
            <Field label="Notes">
              <p className="text-pretty text-muted-foreground">{dataset.notes}</p>
            </Field>
            <Separator />
            <Field label={`Linked Experiments (${runs.length})`}>
              {runs.length ? (
                <ul className="space-y-1.5">
                  {runs.map((r) => (
                    <li key={r.id} className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                      <span className="font-mono text-xs">{r.model_name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {(r.accuracy * 100).toFixed(1)}% acc
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No experiments yet.</p>
              )}
            </Field>
          </div>

          <SheetFooter className="flex-row gap-2">
            <Button className="flex-1" onClick={() => setEditOpen(true)}>
              <Pencil className="size-4" /> Edit Dataset
            </Button>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                onOpenChange(false)
                toast.success("Dataset deleted", { description: `${dataset.name} has been removed.` })
              }}
            >
              <Trash2 className="size-4" /> Delete
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <DatasetFormDialog dataset={dataset} open={editOpen} onOpenChange={setEditOpen} />
    </>
  )
}
