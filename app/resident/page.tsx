"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, CreditCard, Wrench, Bell, Phone, Mail } from "lucide-react"
import { currentResident, announcements, maintenanceRequests } from "@/lib/resident-portal-data"

export default function ResidentDashboard() {
  const nextPaymentDays = Math.ceil(
    (new Date(currentResident.paymentInfo.nextDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  const recentAnnouncements = announcements.slice(0, 3)
  const activeMaintenanceRequests = maintenanceRequests.filter((req) => req.status !== "completed")

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                Welcome back, {currentResident.name}!
              </h2>
              <p className="font-body text-muted-foreground">
                Room {currentResident.roomInfo.roomNumber} • {currentResident.roomInfo.hostelName}
              </p>
            </div>
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-heading font-bold">
                {currentResident.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Next Payment</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{nextPaymentDays} days</div>
            <p className="text-xs text-muted-foreground font-body">
              Due: {new Date(currentResident.paymentInfo.nextDueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Active Requests</CardTitle>
            <Wrench className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{activeMaintenanceRequests.length}</div>
            <p className="text-xs text-muted-foreground font-body">Maintenance requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">New Announcements</CardTitle>
            <Bell className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{recentAnnouncements.length}</div>
            <p className="text-xs text-muted-foreground font-body">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Days in Hostel</CardTitle>
            <Home className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">
              {Math.ceil(
                (new Date().getTime() - new Date(currentResident.roomInfo.checkInDate).getTime()) /
                  (1000 * 60 * 60 * 24),
              )}
            </div>
            <p className="text-xs text-muted-foreground font-body">Since check-in</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Room Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Room Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Room Number:</span>
                <span className="font-body font-medium">{currentResident.roomInfo.roomNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Floor:</span>
                <span className="font-body font-medium">{currentResident.roomInfo.floor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Monthly Rent:</span>
                <span className="font-body font-medium">₹{currentResident.roomInfo.monthlyRent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted-foreground">Check-in Date:</span>
                <span className="font-body font-medium">
                  {new Date(currentResident.roomInfo.checkInDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-heading font-semibold mb-2">Guardian Contact</h4>
              <div className="space-y-1">
                <p className="font-body font-medium text-sm">{currentResident.guardianInfo.name}</p>
                <div className="flex items-center text-xs text-muted-foreground font-body">
                  <Phone className="w-3 h-3 mr-1" />
                  {currentResident.guardianInfo.phone}
                </div>
                <div className="flex items-center text-xs text-muted-foreground font-body">
                  <Mail className="w-3 h-3 mr-1" />
                  {currentResident.guardianInfo.email}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Recent Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-body font-medium text-sm">{announcement.title}</h4>
                    {announcement.isImportant && (
                      <Badge variant="destructive" className="text-xs font-body">
                        Important
                      </Badge>
                    )}
                  </div>
                  <p className="font-body text-xs text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {new Date(announcement.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 font-body bg-transparent">
              View All Announcements
            </Button>
          </CardContent>
        </Card>

        {/* Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Maintenance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeMaintenanceRequests.length > 0 ? (
                activeMaintenanceRequests.map((request) => (
                  <div key={request.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-body font-medium text-sm">{request.title}</h4>
                      <Badge
                        variant={request.priority === "high" ? "destructive" : "secondary"}
                        className="text-xs font-body"
                      >
                        {request.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={request.status === "in-progress" ? "default" : "secondary"}
                        className="text-xs font-body"
                      >
                        {request.status}
                      </Badge>
                      <p className="font-body text-xs text-muted-foreground">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-body text-sm text-muted-foreground">No active maintenance requests</p>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4 font-body bg-transparent">
              Submit New Request
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-body text-sm text-muted-foreground">Current Status</p>
              <Badge
                className={`${
                  currentResident.paymentInfo.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : currentResident.paymentInfo.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                } font-body`}
              >
                {currentResident.paymentInfo.status.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="font-body text-sm text-muted-foreground">Last Payment</p>
              <p className="font-body font-medium">
                {new Date(currentResident.paymentInfo.lastPaymentDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-body text-sm text-muted-foreground">Next Due Date</p>
              <p className="font-body font-medium">
                {new Date(currentResident.paymentInfo.nextDueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-muted-foreground">Days until next payment</span>
              <span className="font-body font-medium">{nextPaymentDays} days</span>
            </div>
            <Progress value={Math.max(0, 100 - (nextPaymentDays / 30) * 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
