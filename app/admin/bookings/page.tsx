"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Check, X, Search, Filter } from "lucide-react"
import { bookingsData, type Booking } from "@/lib/admin-data"
import { hostelsData } from "@/lib/hostel-data"

export default function AdminBookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = bookingsData.filter((booking) => {
    const matchesSearch =
      booking.studentInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.studentInfo.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "checked-in":
        return "bg-blue-100 text-blue-800"
      case "checked-out":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApproveBooking = (bookingId: string) => {
    // In a real app, this would update the booking status via API
    console.log("Approving booking:", bookingId)
  }

  const handleRejectBooking = (bookingId: string) => {
    // In a real app, this would update the booking status via API
    console.log("Rejecting booking:", bookingId)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title="Booking Management" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-bold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or student ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 font-body"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="checked-out">Checked Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-bold">Bookings ({filteredBookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-heading font-semibold">Student</TableHead>
                        <TableHead className="font-heading font-semibold">Hostel</TableHead>
                        <TableHead className="font-heading font-semibold">Room</TableHead>
                        <TableHead className="font-heading font-semibold">Check-in</TableHead>
                        <TableHead className="font-heading font-semibold">Amount</TableHead>
                        <TableHead className="font-heading font-semibold">Payment</TableHead>
                        <TableHead className="font-heading font-semibold">Status</TableHead>
                        <TableHead className="font-heading font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        const hostel = hostelsData.find((h) => h.id === booking.hostelId)
                        return (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div>
                                <p className="font-body font-medium">{booking.studentInfo.name}</p>
                                <p className="font-body text-sm text-muted-foreground">
                                  {booking.studentInfo.studentId}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-body text-sm">{hostel?.name}</p>
                            </TableCell>
                            <TableCell>
                              <p className="font-body text-sm">{booking.roomId}</p>
                            </TableCell>
                            <TableCell>
                              <p className="font-body text-sm">
                                {new Date(booking.bookingDetails.checkInDate).toLocaleDateString()}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p className="font-body font-medium">₹{booking.paymentInfo.amount.toLocaleString()}</p>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getPaymentStatusColor(booking.paymentInfo.status)} font-body text-xs`}
                              >
                                {booking.paymentInfo.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(booking.status)} font-body text-xs`}>
                                {booking.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" onClick={() => setSelectedBooking(booking)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {booking.status === "pending" && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleApproveBooking(booking.id)}
                                      className="text-green-600 hover:text-green-700"
                                    >
                                      <Check className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRejectBooking(booking.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
