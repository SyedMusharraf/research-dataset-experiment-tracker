import { supabase } from "./supabase"

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id")

  if (error) {
    console.error(error)
    return []
  }

  return data
}