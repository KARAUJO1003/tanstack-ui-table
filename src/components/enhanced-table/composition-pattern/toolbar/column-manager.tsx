"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DragDropContext, Draggable, type DropResult, Droppable } from "@hello-pangea/dnd"
import { GripVertical } from "lucide-react"
import React from "react"
import { useTableContext } from "../../table-context"

export function ColumnManager() {
  const { table } = useTableContext()

  const [columns, setColumns] = React.useState(table.getAllLeafColumns())

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newColumns = Array.from(columns)
    const [reorderedColumn] = newColumns.splice(result.source.index, 1)
    newColumns.splice(result.destination.index, 0, reorderedColumn)

    setColumns(newColumns)
    table.setColumnOrder(newColumns.map((col) => col.id))
  }

  const toggleColumnVisibility = (columnId: string) => {
    const column = table.getColumn(columnId)
    if (column) {
      column.toggleVisibility()
      setColumns(table.getAllLeafColumns()) // Update local state
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Columns</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Columns</DialogTitle>
        </DialogHeader>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((column, index) => {
                  if (column.id === "select") return null

                  return (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 mb-2 bg-secondary rounded-md"
                        >
                          <GripVertical />
                          <span>{column.id}</span>
                          <Checkbox
                            checked={column.getIsVisible()}
                            onCheckedChange={() => toggleColumnVisibility(column.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  )
}
