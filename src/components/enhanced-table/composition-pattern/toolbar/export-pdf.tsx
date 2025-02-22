import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { ChevronDown, Download, File, FileText } from "lucide-react"
import { useTableContext } from "../../table-context"

export function ExportTable() {
  const { table } = useTableContext()

  const exportData = (format: "pdf" | "csv", dataType: "visible" | "all") => {
    const columns = table.getAllColumns().filter((column) => !["select", "expand", "select-expand"].includes(column.id))

    const headers = columns.map((column) => {
      const headerContent = column.columnDef.header

      if (typeof headerContent === "function") {
        return String(headerContent({ column, header: column.columnDef.header as any, table }))
      }

      return String(headerContent || column.id)
    })

    const rows = (dataType === "visible" ? table.getRowModel().rows : table.getCoreRowModel().rows).map((row) => {
      return columns.map((column) => {
        const value = row.getValue(column.id)
        return typeof value === "object" ? JSON.stringify(value) : String(value)
      })
    })

    if (format === "pdf") {
      exportToPDF(headers, rows)
    } else {
      exportToCSV(headers, rows)
    }
  }

  const exportToPDF = (headers: string[], rows: string[][]) => {
    try {
      const doc = new jsPDF()

      autoTable(doc, {
        head: [headers],
        body: rows,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] },
        margin: { top: 20 },
      })

      doc.save("table_data.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const exportToCSV = (headers: string[], rows: string[][]) => {
    try {
      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
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
    } catch (error) {
      console.error("Error generating CSV:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => exportData("pdf", "visible")}>
          <File className="mr-2 h-4 w-4" />
          Export Visible to PDF
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => exportData("pdf", "all")}>
          <FileText className="mr-2 h-4 w-4" />
          Export All to PDF
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => exportData("csv", "visible")}>
          <File className="mr-2 h-4 w-4" />
          Export Visible to CSV
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => exportData("csv", "all")}>
          <FileText className="mr-2 h-4 w-4" />
          Export All to CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
