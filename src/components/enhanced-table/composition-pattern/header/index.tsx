import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader as UiTableHeader } from "@/components/ui/table"
import { flexRender } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useTableContext } from "../../table-context"
import { HeaderDropdown } from "./dropdown"

interface TableHeaderProps {
  variant?: "dropdown" | "default"
}

export function TableHeader({ variant = "default" }: TableHeaderProps) {
  const { table } = useTableContext()

  return (
    <UiTableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} style={{ width: header.getSize() }}>
              {header.isPlaceholder ? null : (
                <div className="flex items-center">
                  {header.column.getCanSort() ? (
                    variant === "dropdown" ? (
                      <HeaderDropdown column={header.column} title={header.column.columnDef.header as string} />
                    ) : (
                      <Button variant="ghost" onClick={() => header.column.toggleSorting()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    )
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}

                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                  />
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </UiTableHeader>
  )
}
