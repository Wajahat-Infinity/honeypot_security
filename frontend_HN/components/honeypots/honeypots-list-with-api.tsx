"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, MoreHorizontal, Shield, ShieldAlert, ShieldCheck, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

// This would be the type returned from your Django API
interface Honeypot {
  id: string
  name: string
  type: string
  status: string
  attacks: number
  lastAttack: string
  ip: string
}

export function HoneypotsListWithAPI() {
  const [honeypots, setHoneypots] = useState<Honeypot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const { toast } = useToast()

  useEffect(() => {
    const fetchHoneypots = async () => {
      try {
        setIsLoading(true)
        const data = await api.honeypots.getAll()
        setHoneypots(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch honeypots:", err)
        setError("Failed to load honeypots. Please try again later.")

        // For demo purposes, load mock data if API fails
        setHoneypots([
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
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchHoneypots()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await api.honeypots.delete(id)
      setHoneypots(honeypots.filter((honeypot) => honeypot.id !== id))
      toast({
        title: "Honeypot deleted",
        description: "The honeypot has been successfully deleted.",
      })
    } catch (err) {
      console.error("Failed to delete honeypot:", err)
      toast({
        title: "Error",
        description: "Failed to delete honeypot. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const sortedHoneypots = [...honeypots].sort((a, b) => {
    if (!sortBy) return 0
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })

  if (isLoading) {
    return <div className="p-8 text-center">Loading honeypots...</div>
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
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
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(honeypot.id)}>
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
