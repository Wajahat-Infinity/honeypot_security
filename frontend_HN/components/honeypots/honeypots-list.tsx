"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Shield, ShieldAlert, ShieldCheck, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const honeypots = [
  {
    id: "hp-1",
    name: "Web Server Honeypot",
    type: "HTTP",
    status: "Active",
    attacks: 156,
    lastAttack: "2 mins ago",
    ip: "192.168.1.100",
  },
  {
    id: "hp-2",
    name: "FTP Server Trap",
    type: "FTP",
    status: "Warning",
    attacks: 89,
    lastAttack: "15 mins ago",
    ip: "192.168.1.101",
  },
  {
    id: "hp-3",
    name: "SSH Decoy",
    type: "SSH",
    status: "Inactive",
    attacks: 234,
    lastAttack: "1 hour ago",
    ip: "192.168.1.102",
  },
  {
    id: "hp-4",
    name: "SMTP Honeypot",
    type: "SMTP",
    status: "Active",
    attacks: 67,
    lastAttack: "30 mins ago",
    ip: "192.168.1.103",
  },
  {
    id: "hp-5",
    name: "Database Trap",
    type: "MySQL",
    status: "Active",
    attacks: 123,
    lastAttack: "5 mins ago",
    ip: "192.168.1.104",
  },
]

export function HoneypotsList() {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortedHoneypots = [...honeypots].sort((a, b) => {
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
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("attacks")}>
                Attacks
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Last Attack</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHoneypots.map((honeypot) => (
            <TableRow key={honeypot.id}>
              <TableCell className="font-medium">{honeypot.name}</TableCell>
              <TableCell>{honeypot.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    honeypot.status === "Active" ? "success" : honeypot.status === "Warning" ? "warning" : "secondary"
                  }
                  className="flex w-fit items-center gap-1"
                >
                  {honeypot.status === "Active" ? (
                    <ShieldCheck className="h-3 w-3" />
                  ) : honeypot.status === "Warning" ? (
                    <ShieldAlert className="h-3 w-3" />
                  ) : (
                    <Shield className="h-3 w-3" />
                  )}
                  {honeypot.status}
                </Badge>
              </TableCell>
              <TableCell>{honeypot.attacks}</TableCell>
              <TableCell>{honeypot.lastAttack}</TableCell>
              <TableCell>{honeypot.ip}</TableCell>
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
                    <DropdownMenuItem>Edit configuration</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
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
