"use client"

import { useRouter } from "next/navigation"
import { Database, FolderPlus, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatasetFormDialog } from "@/components/dataset-form-dialog"
import { ProjectFormDialog } from "@/components/project-form-dialog"
import { ExperimentFormDialog } from "@/components/experiment-form-dialog"

export function QuickActions() {
  const router = useRouter()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DatasetFormDialog
        trigger={
          <Button>
            <Database className="size-4" /> Add Dataset
          </Button>
        }
      />
      <ProjectFormDialog
        trigger={
          <Button variant="outline">
            <FolderPlus className="size-4" /> Create Project
          </Button>
        }
      />
      <ExperimentFormDialog
        trigger={
          <Button variant="outline">
            <FlaskConical className="size-4" /> Log Experiment
          </Button>
        }
      />
    </div>
  )
}
