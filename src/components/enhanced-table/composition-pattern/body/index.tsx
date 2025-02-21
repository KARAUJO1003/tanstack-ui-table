import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { TableCell, TableRow, TableBody as UiTableBody } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type Row, flexRender } from "@tanstack/react-table"
import { ChevronDown, ChevronRight, Edit2 } from "lucide-react"
import React, { useState } from "react"
import { useTableContext } from "../../table-context"
import { TableRowEditor } from "./row-editor"

interface TableBodyProps<TData> {
  enableEdit?: boolean
  customRowStyles?: (row: Row<TData>) => string
}

export function TableBody<TData>({ enableEdit = false, customRowStyles }: TableBodyProps<TData>) {
  const { table, updateData } = useTableContext()

  const [editingRow, setEditingRow] = useState<number | null>(null)

  const handleEdit = (rowIndex: number) => {
    setEditingRow(rowIndex)
  }

  const handleSave = (rowIndex: number, updatedData: TData) => {
    updateData(rowIndex, updatedData)
    setEditingRow(null)
  }

  const handleCancel = () => {
    setEditingRow(null)
  }

  const renderRow = (row: Row<TData>) => {
    const rowStyle = customRowStyles ? customRowStyles(row) : {}

    const depth = row.depth || 0

    if (editingRow === row.index) {
      return (
        <TableRow key={row.id}>
          <TableRowEditor row={row} onSave={handleSave} onCancel={handleCancel} />
        </TableRow>
      )
    }

    return (
      <React.Fragment key={row.id}>
        <TableRow data-state={row.getIsSelected() && "selected"} className={cn(rowStyle)}>
          {row.getVisibleCells().map((cell, cellIndex) => (
            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
              {cellIndex === 0 ? (
                <div className="flex items-center justify-between" style={{ paddingLeft: `${depth * 2}rem` }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}

                  {enableEdit &&
                    cell.column.id === row.getVisibleCells()[row.getVisibleCells().length - 1].column.id && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(row.index)} className="ml-2">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                </div>
              ) : (
                <>
                  {cell.column.id === "select" ? (
                    <div className="flex items-center">
                      {row.getCanExpand() && (
                        <Button variant="ghost" size="sm" onClick={() => row.toggleExpanded()} className="mr-2">
                          {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                      />
                    </div>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </>
              )}
            </TableCell>
          ))}
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    <UiTableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => renderRow(row))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </UiTableBody>
  )
}
