


import { DatasetsView } from "@/components/datasets-view"
import { getDatasets } from "@/lib/datasets"


export default async function DatasetsPage() {
  const datasets = await getDatasets()
  

  return <DatasetsView datasets={datasets} />
}