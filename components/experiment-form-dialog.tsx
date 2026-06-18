"use client"

import { supabase } from "@/lib/supabase"
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
import { modelNames, type Experiment } from "@/lib/data"
import { useEffect } from "react"

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
  const [datasetId, setDatasetId] = useState(
    experiment?.dataset_id?.toString() ?? ""
  )
  
  const [projectId, setProjectId] = useState(
    experiment?.project_id?.toString() ?? ""
  )
  
  const [modelName, setModelName] = useState(
    experiment?.model_name ?? ""
  )
  
  const [accuracy, setAccuracy] = useState(
    experiment?.accuracy?.toString() ?? ""
  )
  
  const [precisionScore, setPrecisionScore] = useState(
    experiment?.precision_score?.toString() ?? ""
  )
  
  const [recallScore, setRecallScore] = useState(
    experiment?.recall_score?.toString() ?? ""
  )
  
  const [f1Score, setF1Score] = useState(
    experiment?.f1_score?.toString() ?? ""
  )
  
  const [notes, setNotes] = useState(
    experiment?.notes ?? ""
  )

  const [datasets, setDatasets] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  useEffect(() => {
    loadData()
  }, [])
  
  async function loadData() {
    const { data: datasetsData } = await supabase
      .from("datasets")
      .select("*")
      .order("id")
  
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .order("id")
  
    if (datasetsData) setDatasets(datasetsData)
    if (projectsData) setProjects(projectsData)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log({
      datasetId,
      projectId,
      modelName,
    })
    let error

    if (editing) {
      const result = await supabase
        .from("experiment_results")
        .update({
          dataset_id: Number(datasetId),
          project_id: Number(projectId),
          model_name: modelName,
          accuracy: Number(accuracy),
          precision_score: Number(precisionScore),
          recall_score: Number(recallScore),
          f1_score: Number(f1Score),
          notes,
        })
        .eq("id", experiment.id)
    
      error = result.error
    } else {
      const result = await supabase
        .from("experiment_results")
        .insert([
          {
            dataset_id: Number(datasetId),
            project_id: Number(projectId),
            model_name: modelName,
            accuracy: Number(accuracy),
            precision_score: Number(precisionScore),
            recall_score: Number(recallScore),
            f1_score: Number(f1Score),
            notes,
          },
        ])
    
      error = result.error
    }
  
    if (error) {
      console.error("SUPABASE ERROR:", error)
    
      toast.error(error.message)
    
      return
    }
    toast.success(
      editing
        ? "Experiment updated"
        : "Experiment created"
    )
  
    setOpen(false)
  
    window.location.reload()
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
                <Select value={datasetId} onValueChange={setDatasetId}>
                  <SelectTrigger id="ex-dataset">
                    <SelectValue placeholder="Select dataset" />
                  </SelectTrigger>
                  <SelectContent>
                  {datasets.map((d) => (
  <SelectItem
    key={d.id}
    value={String(d.id)}
  >
    {d.name}
  </SelectItem>
))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ex-project">Project</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger id="ex-project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                  {projects.map((p) => (
  <SelectItem
    key={p.id}
    value={String(p.id)}
  >
    {p.name}
  </SelectItem>
))}
                  </SelectContent>
                </Select>
              </div>
            </div>

              <div className="grid gap-2">
  <Label htmlFor="ex-model">Model Name</Label>
  <Input
    id="ex-model"
    value={modelName}
    onChange={(e) => setModelName(e.target.value)}
    placeholder="e.g. XGBoost, LightGBM, Llama 3, BERT, Custom CNN"
  />
</div>
        
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ex-acc">Accuracy</Label>
                <Input
                  id="ex-acc"
                  value={accuracy}
                  onChange={(e) => setAccuracy(e.target.value)}
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
                  value={precisionScore}
                  onChange={(e) => setPrecisionScore(e.target.value)}                  
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
                  value={recallScore}
onChange={(e) => setRecallScore(e.target.value)}
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
                  value={f1Score}
                  onChange={(e) => setF1Score(e.target.value)}                  
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
