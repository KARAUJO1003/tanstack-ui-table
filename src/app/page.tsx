"use client"

import { EnhancedTable } from "@/components/enhanced-table/composition-pattern"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ColumnDef, Row } from "@tanstack/react-table"
import { useState } from "react"

interface Person {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
  department: string
}

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "visits",
    header: "Visits",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
]

const generateData = (count: number): Person[] => {
  const statuses = ["active", "inactive", "pending"]
  const departments = ["engineering", "marketing", "sales", "design"]

  const generateSubRows = (count: number, parentId: number, level: number): Person[] => {
    if (level > 2) return []
    return Array.from({ length: count }, (_, j) => {
      const newId = parentId * 100 + j + 1
      return {
        id: newId,
        firstName: `SubFirstName ${newId}`,
        lastName: `SubLastName ${newId}`,
        age: Math.floor(Math.random() * 50) + 20,
        visits: Math.floor(Math.random() * 100),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        progress: Math.floor(Math.random() * 100),
        department: departments[Math.floor(Math.random() * departments.length)],
        subRows: generateSubRows(2, newId, level + 1),
      }
    })
  }

  return Array.from({ length: count }, (_, i) => {
    const id = i + 1
    return {
      id,
      firstName: `FirstName ${id}`,
      lastName: `LastName ${id}`,
      age: Math.floor(Math.random() * 50) + 20,
      visits: Math.floor(Math.random() * 100),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      progress: Math.floor(Math.random() * 100),
      department: departments[Math.floor(Math.random() * departments.length)],
      subRows: generateSubRows(2, id, 1),
    }
  })
}

const data: Person[] = generateData(100)

const customRowStyles = (row: Row<Person>) => {
  if (row.original.status === "active") {
    return "bg-green-50"
  }
  return ""
}

export default function EnhancedTableExamples() {
  const [editingEnabled, setEditingEnabled] = useState(false)

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">EnhancedTable Examples</h1>
      <p className="text-lg text-muted-foreground">
        Explore the various configurations and features of the EnhancedTable component.
      </p>

      <Tabs defaultValue="full-featured">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="full-featured">Full Featured</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="custom-header">Custom Header</TabsTrigger>
          <TabsTrigger value="grouped">Grouped</TabsTrigger>
        </TabsList>

        <TabsContent value="full-featured">
          <Card>
            <CardHeader>
              <CardTitle>Full Featured Table</CardTitle>
              <CardDescription>
                This example showcases all available features of the EnhancedTable component.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <EnhancedTable.Root data={data} columns={columns}>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <EnhancedTable.Toolbar.ColumnManager />
                    <EnhancedTable.Toolbar.ExpandCollapse />
                  </div>

                  <div className="flex space-x-2">
                    <EnhancedTable.Toolbar.ExportCsv />
                    <EnhancedTable.Toolbar.ExportPdf />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <EnhancedTable.Filters.Dialog />
                  <EnhancedTable.Filters.Sheet />
                  <EnhancedTable.Filters.Simple />
                </div>

                <Button onClick={() => setEditingEnabled(!editingEnabled)}>
                  {editingEnabled ? "Disable Editing" : "Enable Editing"}
                </Button>

                <div className="rounded-md border">
                  <EnhancedTable.Table>
                    <EnhancedTable.Header />
                    <EnhancedTable.Body enableEdit={editingEnabled} customRowStyles={customRowStyles} />
                  </EnhancedTable.Table>
                </div>
                <EnhancedTable.Pagination />
              </EnhancedTable.Root>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="minimal">
          <Card>
            <CardHeader>
              <CardTitle>Minimal Table</CardTitle>
              <CardDescription>A simple table with minimal features.</CardDescription>
            </CardHeader>

            <CardContent>
              <EnhancedTable.Root data={data} columns={columns}>
                <div className="rounded-md border">
                  <EnhancedTable.Table>
                    <EnhancedTable.Header />
                    <EnhancedTable.Body />
                  </EnhancedTable.Table>
                </div>

                <EnhancedTable.Pagination />
              </EnhancedTable.Root>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-header">
          <Card>
            <CardHeader>
              <CardTitle>Custom Header Table</CardTitle>
              <CardDescription>Table with a custom header style.</CardDescription>
            </CardHeader>

            <CardContent>
              <EnhancedTable.Root data={data} columns={columns}>
                <div className="rounded-md border">
                  <EnhancedTable.Table>
                    <EnhancedTable.Header variant="dropdown" />
                    <EnhancedTable.Body />
                  </EnhancedTable.Table>
                </div>

                <EnhancedTable.Pagination />
              </EnhancedTable.Root>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grouped">
          <Card>
            <CardHeader>
              <CardTitle>Grouped Table</CardTitle>
              <CardDescription>Table with grouped rows by department.</CardDescription>
            </CardHeader>

            <CardContent>
              <EnhancedTable.Root data={data} columns={columns}>
                <EnhancedTable.Toolbar.ExpandCollapse />

                <div className="rounded-md border">
                  <EnhancedTable.Table>
                    <EnhancedTable.Header />
                    <EnhancedTable.Body customRowStyles={customRowStyles} />
                  </EnhancedTable.Table>
                </div>

                <EnhancedTable.Pagination />
              </EnhancedTable.Root>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
