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
import type { Project } from "@/lib/data"

export function ProjectFormDialog({
  trigger,
  project,
  open,
  onOpenChange,
}: {
  trigger?: ReactNode
  project?: Project
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChange! : setInternalOpen
  const editing = Boolean(project)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(editing ? "Project updated" : "Project created", {
      description: editing ? `${project?.name} has been updated.` : "Your new project is ready.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "Create Project"}</DialogTitle>
            <DialogDescription>
              {editing ? "Update your project details." : "Group datasets and experiments under a research project."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pr-name">Name</Label>
              <Input id="pr-name" defaultValue={project?.name} placeholder="e.g. Customer Churn Prediction" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pr-desc">Description</Label>
              <Textarea
                id="pr-desc"
                defaultValue={project?.description}
                placeholder="Describe the goal of this project..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save Changes" : "Create Project"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
