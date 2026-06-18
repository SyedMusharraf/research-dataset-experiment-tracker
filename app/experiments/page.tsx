import { ExperimentsView } from "@/components/experiments-view"
import { getExperiments } from "@/lib/experiments"

export default async function ExperimentsPage() {
  const experiments = await getExperiments()

  return <ExperimentsView experiments={experiments} />
}