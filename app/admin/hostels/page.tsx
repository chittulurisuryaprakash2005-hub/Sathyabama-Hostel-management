"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Eye, Users } from "lucide-react"
import { hostelsData } from "@/lib/hostel-data"

export default function AdminHostelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredHostels = hostelsData.filter((hostel) => hostel.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Management</h1>
          <p className="text-gray-600">Manage all hostels and their configurations</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="font-body">
              <Plus className="w-4 h-4 mr-2" />
              Add Hostel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading font-bold">Add New Hostel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Hostel Name *</Label>
                <Input id="name" placeholder="Enter hostel name" />
              </div>
              <div>
                <Label htmlFor="type">Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="co-living">Co-Living</SelectItem>
                    <SelectItem value="boys">Boys</SelectItem>
                    <SelectItem value="girls">Girls</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="capacity">Total Capacity *</Label>
                <Input id="capacity" type="number" placeholder="Enter capacity" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button>Add Hostel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search hostels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hostels Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold">Hostels ({filteredHostels.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHostels.map((hostel) => (
                <TableRow key={hostel.id}>
                  <TableCell className="font-medium">{hostel.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {hostel.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{hostel.capacity || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{hostel.capacity ? Math.round((hostel.occupancy / hostel.capacity) * 100) : 0}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${hostel.capacity ? Math.round((hostel.occupancy / hostel.capacity) * 100) : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        hostel.availability === "available"
                          ? "bg-green-100 text-green-800"
                          : hostel.availability === "limited"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {hostel.availability === "available"
                        ? "Active"
                        : hostel.availability === "limited"
                          ? "Limited"
                          : "Full"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Users className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
