import { Table } from "@/components/ui/table"
import { TableBody } from "./body"
import { TableFilters } from "./filters"
import { TableHeader } from "./header"
import { TablePagination } from "./pagination"
import { TableRoot } from "./root"
import { TableToolbar } from "./toolbar"

export const EnhancedTable = {
  Root: TableRoot,
  Toolbar: TableToolbar,
  Filters: TableFilters,
  Header: TableHeader,
  Body: TableBody,
  Pagination: TablePagination,
  Table: Table,
}
