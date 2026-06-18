import { supabase } from "@/lib/supabase"

export default async function DatasetPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: dataset } = await supabase
    .from("datasets")
    .select("*")
    .eq("id", id)
    .single()

  if (!dataset) {
    return <div>Dataset not found</div>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        {dataset.name}
      </h1>

      <p>
        <strong>Category:</strong> {dataset.category}
      </p>

      <p>
        <strong>Status:</strong> {dataset.status}
      </p>

      <p>
        <strong>Description:</strong> {dataset.description}
      </p>

      <p>
        <strong>Notes:</strong> {dataset.notes}
      </p>

      <a
        href={dataset.source_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        Open Source URL
      </a>
    </div>
  )
}