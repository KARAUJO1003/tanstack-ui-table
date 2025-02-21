import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import type { Row } from "@tanstack/react-table"
import { useState } from "react"

interface TableRowEditorProps<TData> {
  row: Row<TData>
  onSave: (rowIndex: number, updatedData: TData) => void
  onCancel: () => void
}

export function TableRowEditor<TData>({ row, onSave, onCancel }: TableRowEditorProps<TData>) {
  const [editedData, setEditedData] = useState<Partial<TData>>({})

  const handleInputChange = (columnId: string, value: any) => {
    setEditedData((prev) => ({ ...prev, [columnId]: value }))
  }

  const handleSave = () => {
    onSave(row.index, { ...row.original, ...editedData } as TData)
  }

  return (
    <>
      {row.getVisibleCells().map((cell) => {
        const column = cell.column
        if (column.id === "select") return <TableCell key={cell.id} />

        return (
          <TableCell key={cell.id}>
            <Input
              value={editedData[column.id as keyof TData] ?? (cell.getValue() as string)}
              onChange={(e) => handleInputChange(column.id, e.target.value)}
            />
          </TableCell>
        )
      })}

      <TableCell>
        <Button onClick={handleSave} variant="outline" size="sm" className="mr-2">
          Save
        </Button>

        <Button onClick={onCancel} variant="outline" size="sm">
          Cancel
        </Button>
      </TableCell>
    </>
  )
}
