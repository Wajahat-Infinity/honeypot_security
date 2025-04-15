"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  Download,
  FileBarChart,
  FileCheck,
  FileText,
  FilePieChart,
  MoreHorizontal,
  Share2,
  Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const reports = [
  {
    id: "rep-1",
    name: "Monthly Security Summary - January 2023",
    type: "Executive Summary",
    date: "Jan 31, 2023",
    format: "PDF",
    size: "2.4 MB",
    icon: FileText,
  },
  {
    id: "rep-2",
    name: "Threat Intelligence Report - Q1 2023",
    type: "Threat Intelligence",
    date: "Mar 15, 2023",
    format: "PDF",
    size: "4.7 MB",
    icon: FileBarChart,
  },
  {
    id: "rep-3",
    name: "Compliance Status Report - ISO 27001",
    type: "Compliance",
    date: "Apr 10, 2023",
    format: "PDF",
    size: "3.2 MB",
    icon: FileCheck,
  },
  {
    id: "rep-4",
    name: "Security Metrics Dashboard - Q2 2023",
    type: "Metrics",
    date: "Jun 30, 2023",
    format: "HTML",
    size: "1.8 MB",
    icon: FilePieChart,
  },
  {
    id: "rep-5",
    name: "Incident Response Summary - July 2023",
    type: "Incident Response",
    date: "Jul 31, 2023",
    format: "PDF",
    size: "5.1 MB",
    icon: FileText,
  },
]

export function ReportsList() {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedReports = [...reports]
    .filter(
      (report) =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortBy) return 0
      const aValue = a[sortBy as keyof typeof a]
      const bValue = b[sortBy as keyof typeof b]
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <Card className="cyber-card">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>View and download your security reports</CardDescription>
          </div>
          <div className="w-full md:w-64">
            <Input placeholder="Search reports..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("type")}>
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("date")}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReports.map((report) => {
              const Icon = report.icon
              return (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                        <Icon className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div className="font-medium">{report.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
