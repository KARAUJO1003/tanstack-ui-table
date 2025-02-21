import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right" //TODO:
    type?: "text" | "number" | "date"
  }

  interface FilterFns {
    Dialog: FilterFn<any>
  }
}
