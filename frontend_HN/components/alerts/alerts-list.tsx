"use client"

import { useState } from "react"
import { AlertTriangle, ArrowUpDown, CheckCircle, Clock, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const alerts = [
  {
    id: "alert-1",
    title: "Brute Force Attack Detected",
    source: "192.168.1.100",
    severity: "Critical",
    status: "Open",
    timestamp: "2 mins ago",
    description: "Multiple failed login attempts detected from IP",
  },
  {
    id: "alert-2",
    title: "Suspicious File Download",
    source: "10.0.0.50",
    severity: "High",
    status: "Investigating",
    timestamp: "15 mins ago",
    description: "Unusual file download pattern detected",
  },
  {
    id: "alert-3",
    title: "Port Scanning Activity",
    source: "172.16.0.25",
    severity: "Medium",
    status: "Resolved",
    timestamp: "1 hour ago",
    description: "Sequential port scanning detected from external IP",
  },
  {
    id: "alert-4",
    title: "Malware Detection",
    source: "192.168.1.150",
    severity: "Critical",
    status: "Open",
    timestamp: "30 mins ago",
    description: "Potential malware activity detected on workstation",
  },
  {
    id: "alert-5",
    title: "Unauthorized Access Attempt",
    source: "192.168.1.75",
    severity: "High",
    status: "Open",
    timestamp: "45 mins ago",
    description: "Failed authentication from unknown source",
  },
]

export function AlertsList() {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortedAlerts = [...alerts].sort((a, b) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Alert</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("severity")}>
                Severity
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAlerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{alert.title}</span>
                  <span className="text-sm text-muted-foreground">{alert.description}</span>
                </div>
              </TableCell>
              <TableCell>{alert.source}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    alert.severity === "Critical" ? "destructive" : alert.severity === "High" ? "orange" : "secondary"
                  }
                >
                  {alert.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    alert.status === "Open" ? "destructive" : alert.status === "Investigating" ? "orange" : "success"
                  }
                  className="flex w-fit items-center gap-1"
                >
                  {alert.status === "Open" ? (
                    <AlertTriangle className="h-3 w-3" />
                  ) : alert.status === "Investigating" ? (
                    <Clock className="h-3 w-3" />
                  ) : (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  {alert.status}
                </Badge>
              </TableCell>
              <TableCell>{alert.timestamp}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                    <DropdownMenuItem>Assign to team</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
