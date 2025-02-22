import { Button } from "@/components/ui/button"
import { useTableContext } from "../../table-context"
import { useDialogs } from "./hooks/use-advanced-filter"

export function Clear() {
  const { table } = useTableContext()
  const { resetFilters } = useDialogs({ table })

  return (
    <Button variant="outline" onClick={resetFilters}>
      Reset
    </Button>
  )
}
