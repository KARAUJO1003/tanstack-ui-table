"use client"

import type { Table } from "@tanstack/react-table"
import * as React from "react"
import type { ColumnFilter, FilterType } from "../types"

interface UseDialogsProps<TData> {
  table: Table<TData>
}

export function useDialogs<TData>({ table }: UseDialogsProps<TData>) {
  const [filters, setFilters] = React.useState<ColumnFilter[]>([])

  const applyFilters = React.useCallback(() => {
    for (const filter of filters) {
      const column = table.getColumn(filter.id)
      if (column) {
        column.setFilterValue({ value: filter.value, type: filter.type })
      }
    }
  }, [filters, table])

  const resetFilters = React.useCallback(() => {
    table.resetColumnFilters()
    setFilters([])
  }, [table])

  const updateFilterValue = React.useCallback((columnId: string, value: any) => {
    setFilters((prev) => prev.map((f) => (f.id === columnId ? { ...f, value } : f)))
  }, [])

  const updateFilterType = React.useCallback((columnId: string, type: FilterType) => {
    setFilters((prev) => {
      const existingFilter = prev.find((f) => f.id === columnId)
      if (existingFilter) {
        return prev.map((f) => (f.id === columnId ? { ...f, type, value: "" } : f))
      }

      return [...prev, { id: columnId, type, value: "" }]
    })
  }, [])

  const getCurrentFilter = React.useCallback(
    (columnId: string, defaultType: FilterType) => {
      const foundFilter = filters.find((f) => f.id === columnId)
      if (foundFilter) return foundFilter
      return { id: columnId, value: "", type: defaultType }
    },
    [filters],
  )

  return {
    filters,
    setFilters,
    applyFilters,
    resetFilters,
    updateFilterValue,
    updateFilterType,
    getCurrentFilter,
  }
}
