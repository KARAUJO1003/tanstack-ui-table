import type { Column, FilterFn, Row } from "@tanstack/react-table"
import type { FilterType } from "./types"

export function getColumnFilterTypes(column: Column<any, unknown>): FilterType[] {
  const columnType = column.columnDef.meta?.type

  switch (columnType) {
    case "number":
      return ["equals", "greaterThan", "lessThan", "greaterThanOrEqual", "lessThanOrEqual", "between"]
    case "date":
      return ["dateEquals", "dateBefore", "dateAfter", "dateBetween"]
    default:
      return ["contains", "equals", "startsWith", "endsWith"]
  }
}

export const Dialogs: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: { value: any; type: FilterType },
): boolean => {
  const cellValue = row.getValue(columnId)

  switch (filterValue.type) {
    case "contains":
      return cellValue?.toString().toLowerCase().includes(filterValue.value?.toString().toLowerCase()) ?? true
    case "equals":
      return cellValue?.toString() === filterValue.value?.toString()
    case "startsWith":
      return cellValue?.toString().toLowerCase().startsWith(filterValue.value?.toString().toLowerCase()) ?? false
    case "endsWith":
      return cellValue?.toString().toLowerCase().endsWith(filterValue.value?.toString().toLowerCase()) ?? false
    case "greaterThan":
      return Number(cellValue) > Number(filterValue.value)
    case "lessThan":
      return Number(cellValue) < Number(filterValue.value)
    case "greaterThanOrEqual":
      return Number(cellValue) >= Number(filterValue.value)
    case "lessThanOrEqual":
      return Number(cellValue) <= Number(filterValue.value)
    case "between": {
      const [min, max] = filterValue.value || []
      return Number(cellValue) >= Number(min) && Number(cellValue) <= Number(max)
    }
    case "dateEquals":
      return new Date(cellValue as Date).getTime() === new Date(filterValue.value).getTime()
    case "dateBefore":
      return new Date(cellValue as Date).getTime() < new Date(filterValue.value).getTime()
    case "dateAfter":
      return new Date(cellValue as Date).getTime() > new Date(filterValue.value).getTime()
    case "dateBetween": {
      const [start, end] = filterValue.value || []
      const cellTime = new Date(cellValue as Date).getTime()
      return cellTime >= new Date(start).getTime() && cellTime <= new Date(end).getTime()
    }
    default:
      return true
  }
}

export type DetectedValueType = "number" | "date" | "string"

export function detectValueType(value: unknown): DetectedValueType {
  if (value == null) return "string"

  if (typeof value === "number") {
    return "number"
  }

  if (typeof value === "string") {
    if (!Number.isNaN(Number(value)) && value.trim() !== "") {
      return "number"
    }

    if (value.includes("-") || value.includes("/")) {
      const parsed = new Date(value)
      if (!Number.isNaN(parsed.getTime())) {
        return "date"
      }
    }
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return "date"
  }

  return "string"
}

export function getColumnFilterTypesByValue(value: unknown): FilterType[] {
  const type = detectValueType(value)
  switch (type) {
    case "number":
      return ["equals", "greaterThan", "lessThan", "greaterThanOrEqual", "lessThanOrEqual", "between"]
    case "date":
      return ["dateEquals", "dateBefore", "dateAfter", "dateBetween"]
    default:
      return ["contains", "equals", "startsWith", "endsWith"]
  }
}
