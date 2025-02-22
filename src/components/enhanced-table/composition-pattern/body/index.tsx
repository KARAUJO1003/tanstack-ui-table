import { Button } from "@/components/ui/button"
import { TableCell, TableRow, TableBody as UiTableBody } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type Row, flexRender } from "@tanstack/react-table"
import { Edit2 } from "lucide-react"
import React, { useState } from "react"
import { useTableContext } from "../../table-context"
import { TableRowEditor } from "./row-editor"

interface TableBodyProps<TData> {
  customRowStyles?: (row: Row<TData>) => string
}

export function TableBody<TData>({ customRowStyles }: TableBodyProps<TData>) {
  const [editingRowId, setEditingRowId] = useState<string | null>(null)

  const { table, updateData, enableEditing } = useTableContext()

  const handleEdit = (row: Row<TData>) => {
    setEditingRowId(row.id)
  }

  const handleSave = (rowIndex: number, updatedData: TData) => {
    updateData(rowIndex, updatedData)
    setEditingRowId(null)
  }

  const handleCancel = () => {
    setEditingRowId(null)
  }

  const renderRow = (row: Row<TData>) => {
    const rowStyle = customRowStyles ? customRowStyles(row) : ""
    const depth = row.depth || 0

    if (editingRowId === row.id) {
      return (
        <TableRow key={row.id}>
          <TableRowEditor row={row} onSave={handleSave} onCancel={handleCancel} />
        </TableRow>
      )
    }

    return (
      <React.Fragment key={row.id}>
        <TableRow data-state={row.getIsSelected() && "selected"} className={cn(rowStyle)}>
          {row.getVisibleCells().map((cell, cellIndex) => {
            return (
              <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                {cellIndex === 0 ? (
                  <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 2}rem` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}

                    {enableEditing && (
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                )}
              </TableCell>
            )
          })}
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
