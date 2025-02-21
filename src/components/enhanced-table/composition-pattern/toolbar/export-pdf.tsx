import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import { Download } from "lucide-react"
import { useState } from "react"
import { useTableContext } from "../../table-context"

export function ExportPdf() {
  const { table } = useTableContext()

  const [columns] = useState(table.getAllColumns())

  const exportToPDF = () => {
    const doc = new jsPDF()
    const rows = table.getRowModel().rows
    let yPos = 10

    for (const [index, col] of columns.entries()) {
      doc.text(`${col.header}`, 10 + index * 40, yPos)
    }
    yPos += 10

    for (const row of rows) {
      for (const [index, col] of columns.entries()) {
        const value = row.getValue(col.id)
        doc.text(`${value}`, 10 + index * 40, yPos)
      }
      yPos += 10
    }

    doc.save("table_data.pdf")
  }

  return (
    <Button onClick={exportToPDF}>
      <Download className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  )
}
