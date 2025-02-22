Enhanced Table
A flexible, composable, and easy-to-use table component built using shadcn/ui and TanStack Table. The goal of this project is to simplify common table tasks—filtering, sorting, pagination, expansion, selection, reordering—while preserving clean and modular code.

If you find this project helpful or interesting, please consider starring it on GitHub! (Replace # with your GitHub repo link.)

Table of Contents
Features
Preview
Installation
Usage
Composition Pattern
Folder Structure
Contributing
License
Features
Column Sorting – Sort columns in ascending or descending order.
Column and Row Reordering – Easily drag and drop to reorder columns and rows.
Row Selection – Single or multi-select, plus “select all” toggles.
Expandable Rows – Show or hide nested data or details.
Filtering – Simple integration for text-based and custom filtering.
Pagination – Built-in pagination with configurable page sizes.
Modular and Composable – Swap in or out what you need (e.g., toolbar, filters, pagination).
Editing Capabilities – Optionally allow inline row editing.
Next.js Compatible – Supports client-side rendering with dynamic imports.
Preview
Feel free to add screenshots or GIFs of your Enhanced Table in action. For instance, you might have two images side by side:

Basic Table Example	Filters/Toolbar Example
Basic Table Screenshot	Filters & Toolbar Screenshot
(Replace the text above with actual image references, such as ![Basic Table](./assets/table-basic.png) and ![Toolbar](./assets/table-filters.png).)

Installation
Set up a Next.js (or other React) project if you haven’t already.

Install dependencies:

bash
Copy
Edit
# If you haven't set up shadcn/ui and Tailwind:
npx create-next-app my-project --typescript
npx shadcn-ui@latest init
# Follow the shadcn/ui setup instructions

# Now install TanStack Table (V8):
npm install @tanstack/react-table
# or
yarn add @tanstack/react-table
Configure styling:

Ensure Tailwind is correctly configured.
If you’re using shadcn/ui, follow their setup steps for PostCSS plugins, config, etc.
Clone or copy the Enhanced Table code into your project (e.g., into components/enhanced-table).

Usage
Here is a simple usage example in a Next.js page (using App Router):

tsx
Copy
Edit
// File: app/customers/page.tsx (example path)

import { EnhancedTable } from "@/components/enhanced-table"
import { columns, data, filterOptions } from "@/lib/tableConfig" // Example external configs

export default function CustomersPage() {
  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Customers</h1>

      <EnhancedTable.Root data={data} columns={columns}>
        <EnhancedTable.Toolbar title="Customer Management" />
        <EnhancedTable.Filters filterOptions={filterOptions} />
        <EnhancedTable.Header />
        <EnhancedTable.Body />
        <EnhancedTable.Pagination />
      </EnhancedTable.Root>
    </section>
  )
}
Notes:

data is an array of objects (your table rows).
columns is an array of column definitions compatible with TanStack Table.
filterOptions is optional—depending on how you want to configure filters.
Everything is modular. If you don’t need filters or a toolbar, you can simply remove them.
Advanced Features
In your EnhancedTable.Root component, you can enable or disable specific features:

tsx
Copy
Edit
<EnhancedTable.Root
  data={data}
  columns={columns}
  enableExpansion
  enableSelection
  enableEditing
  enableColumnReorder
  enableRowReorder
  rowReorderKey="id"
>
  {/* sub-components... */}
</EnhancedTable.Root>
enableExpansion: Adds expand/collapse buttons for rows that have nested data.
enableSelection: Adds checkboxes for multi-row selection.
enableEditing: Hook into cell editing logic.
enableColumnReorder: Allows dragging columns horizontally to reorder.
enableRowReorder: Allows dragging rows vertically to reorder.
rowReorderKey: A unique key (property in your data) to identify each row during reorder.
Composition Pattern
The table is highly composable. Each piece (toolbar, filters, header, body, pagination, etc.) is a separate component. You can reorder or omit them as you please.

<EnhancedTable.Toolbar /> – Optional heading or control bar.
<EnhancedTable.Filters /> – A place for filter controls.
<EnhancedTable.Header /> – Generates column headers.
<EnhancedTable.Body /> – Renders rows, cells, and expansions.
<EnhancedTable.Pagination /> – Next/previous page controls, page size, etc.
Example
tsx
Copy
Edit
<EnhancedTable.Root data={myData} columns={myColumns}>
  {/* You can remove or rearrange these as needed */}
  <EnhancedTable.Toolbar title="My Table" />
  <EnhancedTable.Filters filterOptions={myFilterOptions} />
  <EnhancedTable.Header />
  <EnhancedTable.Body />
  <EnhancedTable.Pagination />
</EnhancedTable.Root>
Folder Structure
Below is an example layout for integrating Enhanced Table into your project:

arduino
Copy
Edit
my-app
│
├─ app/
│   ├─ layout.tsx
│   └─ page.tsx
│
├─ components/
│   ├─ enhanced-table/
│   │   ├─ index.ts            // Re-exports your table sub-components
│   │   ├─ root.tsx            // The main <EnhancedTable.Root> component
│   │   ├─ header.tsx
│   │   ├─ body.tsx
│   │   ├─ toolbar.tsx
│   │   ├─ filters.tsx
│   │   ├─ pagination.tsx
│   │   ├─ types.ts            // Shared TypeScript types
│   │   └─ ... (any other pieces or utilities)
│   └─ ui/                     // shadcn/ui components
│
├─ lib/
│   └─ tableConfig.ts          // columns, data, filterOptions, etc.
│
├─ public/
│   └─ assets/                 // images, icons, etc.
│
├─ tailwind.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
index.ts re-exports the core sub-components under a unified EnhancedTable namespace.
root.tsx is the main provider that configures TanStack Table features.
header.tsx, body.tsx, filters.tsx, etc., are modular pieces for composition.
Contributing
Contributions are very welcome! Here are a few ways you can help:

Report Bugs: Open an issue if you find something broken or unexpected.
Request Features: If there is a feature you’d love to see, let us know.
Submit Pull Requests: Fork the project, make your changes, and create a PR.
Improve Documentation: Feel free to add clarity or examples to this README or the codebase.
When contributing, consider using conventional commits for clarity in the revision history (e.g., feat:, fix:, docs:).

License
This project is licensed under the MIT License. You can freely use, modify, and distribute it.

Thank You!
If you enjoy using Enhanced Table, please consider starring the repository on GitHub and sharing it with others—it really helps the project grow and shows your support!

For any questions or feedback, feel free to open an issue or reach out. Happy coding!