"use client"

import type { Table } from "@tanstack/react-table"
import type React from "react"
import { createContext, useContext } from "react"

interface TableContextProps {
  table: Table<any>
  updateData: (rowIndex: number, updatedData: any) => void
}

const TableContext = createContext<TableContextProps | undefined>(undefined)

export const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider")
  }
  return context
}

export const TableProvider: React.FC<{
  table: Table<any>
  updateData: (rowIndex: number, updatedData: any) => void
  children: React.ReactNode
}> = ({ table, updateData, children }) => {
  return <TableContext.Provider value={{ table, updateData }}>{children}</TableContext.Provider>
}
