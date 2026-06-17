"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, Database, FlaskConical, Calendar } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectFormDialog } from "@/components/project-form-dialog"
import { useState } from "react"
import { projects, experimentsForProject, datasetsForProject, type Project } from "@/lib/data"

export function ProjectsView() {
  const [editing, setEditing] = useState<Project | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader title="Projects" description="Group datasets and experiments into research projects.">
        <ProjectFormDialog
          trigger={
            <Button>
              <Plus className="size-4" /> Create Project
            </Button>
          }
        />
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const expCount = experimentsForProject(p.id).length
          const dsCount = datasetsForProject(p.id).length
          return (
            <Card key={p.id} className="group flex flex-col transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-pretty text-base leading-snug">
                    <Link href={`/projects/${p.id}`} className="hover:text-primary">
                      {p.name}
                    </Link>
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 shrink-0">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/projects/${p.id}`}>
                          <Eye className="size-4" /> View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditing(p)
                          setEditOpen(true)
                        }}
                      >
                        <Pencil className="size-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => toast.success("Project deleted", { description: `${p.name} has been removed.` })}
                      >
                        <Trash2 className="size-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="text-pretty">{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Database className="size-4" /> {dsCount} datasets
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <FlaskConical className="size-4" /> {expCount} experiments
                  </span>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> {p.created_at}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/projects/${p.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <ProjectFormDialog project={editing ?? undefined} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
