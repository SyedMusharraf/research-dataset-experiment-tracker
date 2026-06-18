import { supabase } from "./supabase"

export async function getExperiments() {
  const { data: experiments, error } = await supabase
    .from("experiment_results")
    .select("*")
    .order("id")

  if (error) {
    console.error(error)
    return []
  }

  const { data: datasets } = await supabase
    .from("datasets")
    .select("id,name")

  const { data: projects } = await supabase
    .from("projects")
    .select("id,name")

  const datasetMap = Object.fromEntries(
    (datasets || []).map((d) => [d.id, d.name])
  )

  const projectMap = Object.fromEntries(
    (projects || []).map((p) => [p.id, p.name])
  )

  return experiments.map((e) => ({
    ...e,
    dataset_name: datasetMap[e.dataset_id] || "Unknown",
    project_name: projectMap[e.project_id] || "Unknown",
  }))
}