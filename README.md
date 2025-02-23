## Overview

This project showcases an enhanced table component built with React, `Shadcn UI`, and `@tanstack/react-table`. It offers a variety of interactive features, including column sorting, row reordering, data fetching, and filtering. The component is designed to be modular and highly customizable for modern web applications.

## Features

- **Export Options**: PDF, CSV
- **Filters**: Advanced and simple filter components (Dialog, Sheet)
- **Reordering**: Column and row reordering (one at a time)
- **Editing**
- **Selection**
- **Subrows**
- **Hide Columns**
- **Sorting**

## Preview (gif)

*Insert preview GIF here*

### Full Featured Table
- Expandable rows
- Row selection
- Column reordering
- Editable cells

### Sortable Columns Table
- Columns can be sorted
- No row reordering

### Reorderable Rows Table
- Rows can be reordered
- No column sorting

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/enhanced-table.git
   cd enhanced-table
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage

Ensure that the API endpoint for fetching fake data (`http://localhost:3000/api/fake-data`) is available. Interact with the table using the provided UI controls:

- **Set Data Count**: Adjust the input field to modify the number of records retrieved.
- **Refresh Data**: Click the "Refresh Data" button to fetch new records.
- **Switch Between Tabs**: Select different table modes using the tabbed interface.

## Use Example

```tsx
<EnhancedTable.Root
  data={data}
  columns={columns}
  enableExpansion
  enableSelection
  enableEditing
  enableColumnReorder
>
  <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-4">
    <div className="flex flex-wrap gap-2">
      <EnhancedTable.Toolbar.ViewOptions />
      <EnhancedTable.Toolbar.ExpandCollapse />
    </div>
    <div className="flex space-x-2">
      <EnhancedTable.Toolbar.ExportTable />
      <EnhancedTable.Filters.Dialog />
      <EnhancedTable.Filters.Sheet />
      <EnhancedTable.Filters.Clear />
    </div>
  </div>
  <div className="rounded-md border">
    <EnhancedTable.Table>
      <EnhancedTable.Header variant={headerVariant} />
      <EnhancedTable.Body customRowStyles={customRowStyles} />
    </EnhancedTable.Table>
  </div>
  <EnhancedTable.Pagination />
</EnhancedTable.Root>
```

## Custom Row Styles Example

Rows are styled based on their status:

- **Active**: Green background
- **Inactive**: Red background
- **Pending**: Yellow background

Example:
```tsx
const customRowStyles = (row: Row<Person>) => {
  const baseStyles = "transition-colors hover:bg-opacity-20";
  const statusStyles = {
    active: "hover:bg-green-100 dark:hover:bg-green-900/50",
    inactive: "hover:bg-red-100 dark:hover:bg-red-900/50",
    pending: "hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
  };
  return `${baseStyles} ${statusStyles[row.original.status]}`;
};
```

## Code Structure

- `src/app/(home)/_components/examples.tsx`: Contains the main table component with all functionalities.
- `src/app/(home)/_components/columns.tsx`: Defines the table columns and associated configurations.
- `@/components/enhanced-table`: Includes the core enhanced table component.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, reach out via [GitHub](https://github.com/drefahl).
