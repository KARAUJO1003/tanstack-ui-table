import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import { useTableContext } from "../../table-context"

export function ExportCsv() {
  const { table } = useTableContext()

  const [columns] = useState(table.getAllColumns())

  const exportToCSV = () => {
    const headers = columns.map((column: any) => column.header).join(",")
    const rows = table
      .getRowModel()
      .rows.map((row) => columns.map((column: any) => row.getValue(column.accessorKey)).join(","))
      .join("\n")
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "table_data.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button onClick={exportToCSV}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  )
}
