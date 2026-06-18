import { ProjectsView } from "@/components/projects-view"
import { getProjects } from "@/lib/projects"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsView projects={projects} />
}