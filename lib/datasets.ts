import { supabase } from "./supabase"

export async function getDatasets() {
    const { data, error } = await supabase
      .from("datasets")
      .select("*")
      .order("id")
  
    if (error) {
      console.error(error)
      return []
    }
  
    return data
  }