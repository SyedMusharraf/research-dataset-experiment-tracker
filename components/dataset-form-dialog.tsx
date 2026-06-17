"use client"

import { useState, type ReactNode } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { datasetCategories, datasetStatuses, type Dataset } from "@/lib/data"

export function DatasetFormDialog({
  trigger,
  dataset,
  open,
  onOpenChange,
}: {
  trigger?: ReactNode
  dataset?: Dataset
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChange! : setInternalOpen
  const editing = Boolean(dataset)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Dataset updated" : "Dataset added", {
      description: editing ? `${dataset?.name} has been updated.` : "Your dataset has been saved.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
         {trigger ? <DialogTrigger>{trigger}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Dataset" : "Add Dataset"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update the details of this dataset." : "Register a new dataset in your workspace."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ds-name">Name</Label>
              <Input id="ds-name" defaultValue={dataset?.name} placeholder="e.g. Telecom Customer Records" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ds-url">Source URL</Label>
              <Input
                id="ds-url"
                type="url"
                defaultValue={dataset?.source_url}
                placeholder="https://data.example.com/dataset.csv"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ds-category">Category</Label>
                <Select defaultValue={dataset?.category ?? datasetCategories[0]}>
                  <SelectTrigger id="ds-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {datasetCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ds-status">Status</Label>
                <Select defaultValue={dataset?.status ?? datasetStatuses[0]}>
                  <SelectTrigger id="ds-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {datasetStatuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ds-desc">Description</Label>
              <Textarea
                id="ds-desc"
                defaultValue={dataset?.description}
                placeholder="What does this dataset contain?"
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ds-notes">Notes</Label>
              <Textarea
                id="ds-notes"
                defaultValue={dataset?.notes}
                placeholder="Preprocessing notes, caveats, target columns..."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save Changes" : "Add Dataset"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
