"use client"

import { useState } from "react"
import { ArrowUpDown, Edit, MoreHorizontal, Shield, Trash, User, UserCheck, UserCog, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 mins ago",
    avatar: "/avatars/01.png",
  },
  {
    id: "user-2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Security Analyst",
    status: "Active",
    lastActive: "15 mins ago",
    avatar: "/avatars/02.png",
  },
  {
    id: "user-3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Network Engineer",
    status: "Inactive",
    lastActive: "3 days ago",
    avatar: "/avatars/03.png",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Security Analyst",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "/avatars/04.png",
  },
  {
    id: "user-5",
    name: "David Wilson",
    email: "david@example.com",
    role: "Viewer",
    status: "Suspended",
    lastActive: "2 weeks ago",
    avatar: "/avatars/05.png",
  },
]

export function UsersList() {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const sortedUsers = [...users].sort((a, b) => {
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
    <div className="rounded-md border cyber-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("role")}>
                Role
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.role === "Admin" ? "default" : user.role === "Security Analyst" ? "secondary" : "outline"
                  }
                  className="flex w-fit items-center gap-1"
                >
                  {user.role === "Admin" ? (
                    <UserCog className="h-3 w-3" />
                  ) : user.role === "Security Analyst" ? (
                    <Shield className="h-3 w-3" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "Active" ? "success" : user.status === "Inactive" ? "secondary" : "destructive"
                  }
                  className="flex w-fit items-center gap-1"
                >
                  {user.status === "Active" ? (
                    <UserCheck className="h-3 w-3" />
                  ) : user.status === "Inactive" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <UserX className="h-3 w-3" />
                  )}
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.lastActive}</TableCell>
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
                      <Edit className="mr-2 h-4 w-4" />
                      Edit user
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="mr-2 h-4 w-4" />
                      Change permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete user
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
