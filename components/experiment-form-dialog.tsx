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
import { datasets, projects, modelNames, type Experiment } from "@/lib/data"

export function ExperimentFormDialog({
  trigger,
  experiment,
  open,
  onOpenChange,
}: {
  trigger?: ReactNode
  experiment?: Experiment
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChange! : setInternalOpen
  const editing = Boolean(experiment)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Experiment updated" : "Experiment logged", {
      description: editing ? "The experiment has been updated." : "Your experiment results have been recorded.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger>{trigger}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Experiment" : "Log Experiment"}</DialogTitle>
            <DialogDescription>Record model performance metrics for a dataset and project.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ex-dataset">Dataset</Label>
                <Select defaultValue={experiment?.dataset_id ?? datasets[0].id}>
                  <SelectTrigger id="ex-dataset">
                    <SelectValue placeholder="Select dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    {datasets.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ex-project">Project</Label>
                <Select defaultValue={experiment?.project_id ?? projects[0].id}>
                  <SelectTrigger id="ex-project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ex-model">Model Name</Label>
              <Select defaultValue={experiment?.model_name ?? modelNames[0]}>
                <SelectTrigger id="ex-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {modelNames.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ex-acc">Accuracy</Label>
                <Input
                  id="ex-acc"
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue={experiment?.accuracy}
                  placeholder="0.000 - 1.000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ex-prec">Precision Score</Label>
                <Input
                  id="ex-prec"
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue={experiment?.precision_score}
                  placeholder="0.000 - 1.000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ex-rec">Recall Score</Label>
                <Input
                  id="ex-rec"
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue={experiment?.recall_score}
                  placeholder="0.000 - 1.000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ex-f1">F1 Score</Label>
                <Input
                  id="ex-f1"
                  type="number"
                  step="0.001"
                  min="0"
                  max="1"
                  defaultValue={experiment?.f1_score}
                  placeholder="0.000 - 1.000"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ex-notes">Notes</Label>
              <Textarea
                id="ex-notes"
                defaultValue={experiment?.notes}
                placeholder="Hyperparameters, observations, next steps..."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save Changes" : "Log Experiment"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
