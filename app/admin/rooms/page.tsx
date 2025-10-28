"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bed, Search, Filter, Plus, Edit } from "lucide-react"
import { roomsData } from "@/lib/room-data"
import { hostelsData } from "@/lib/hostel-data"

export default function AdminRoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hostelFilter, setHostelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRooms = roomsData.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHostel = hostelFilter === "all" || room.hostelId === hostelFilter
    const matchesStatus = statusFilter === "all" || room.availability === statusFilter
    return matchesSearch && matchesHostel && matchesStatus
  })

  const getStatusColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "reserved":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600">Manage room availability and assignments</p>
        </div>
        <Button className="font-body">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter Rooms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by room number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={hostelFilter} onValueChange={setHostelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hostels</SelectItem>
                {hostelsData.map((hostel) => (
                  <SelectItem key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold">Rooms ({filteredRooms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const hostel = hostelsData.find((h) => h.id === room.hostelId)
                return (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.roomNumber}</TableCell>
                    <TableCell>{hostel?.name}</TableCell>
                    <TableCell className="capitalize">{room.type.replace("-", " ")}</TableCell>
                    <TableCell>
                      {room.occupancy}/{room.capacity}
                    </TableCell>
                    <TableCell>₹{room.pricePerMonth?.toLocaleString() || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(room.availability)}>{room.availability}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bed className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
