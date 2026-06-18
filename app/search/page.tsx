import { supabase } from "@/lib/supabase"
import Link from "next/link"
export default async function SearchPage({
    searchParams,
  }: {
    searchParams: Promise<{ q?: string }>
  }) {
    const params = await searchParams
    const query = params.q || ""
    const { data: datasets, error } = await supabase
  .from("datasets")
  .select("*")
  .ilike("name", `%${query}%`)
  
    return (
<div className="space-y-4">
  <h1 className="text-2xl font-bold">
    Search Results
  </h1>

  <p>
    Searching for: <strong>{query}</strong>
  </p>

  <h2 className="text-xl font-semibold">
    Datasets
  </h2>

  {datasets?.length === 0 ? (
    <p>No datasets found.</p>
  ) : (
    <ul className="space-y-2">
      {datasets?.map((dataset) => (
        <Link
        href={`/datasets/${dataset.id}`}
        key={dataset.id}
      >
        <li className="rounded border p-3 hover:bg-muted cursor-pointer">
          {dataset.name}
        </li>
      </Link>
      ))}
    </ul>
  )}
</div>
    )
  }