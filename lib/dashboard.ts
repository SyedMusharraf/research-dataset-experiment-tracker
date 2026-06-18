import { supabase } from "./supabase"

export async function getDashboardStats() {
  const { count: datasetCount } = await supabase
    .from("datasets")
    .select("*", { count: "exact", head: true })

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })

  const { count: experimentCount } = await supabase
    .from("experiment_results")
    .select("*", { count: "exact", head: true })

  const { data: experiments } = await supabase
    .from("experiment_results")
    .select("accuracy")

  const avgAccuracy =
    experiments && experiments.length > 0
      ? experiments.reduce((sum, e) => sum + e.accuracy, 0) /
        experiments.length
      : 0

  return {
    totalDatasets: datasetCount || 0,
    totalProjects: projectCount || 0,
    totalExperiments: experimentCount || 0,
    avgAccuracy,
  }
}

/* ADD THIS BELOW */

export async function getRecentActivity() {
  const { data, error } = await supabase
    .from("experiment_results")
    .select(`
      id,
      model_name,
      accuracy,
      created_at,
      datasets(name),
      projects(name)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  if (error) {
    console.error(error)
    return []
  }

  return data
}