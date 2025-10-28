"use client"

import { AdminStatsCards } from "@/components/admin-stats-cards"
import { AdminRecentActivity } from "@/components/admin-recent-activity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building, Users, AlertTriangle, CheckCircle } from "lucide-react"

export default function AdminDashboard() {
  const occupancyData = [
    { name: "Co-Living Hub", occupancy: 90, total: 200, available: 20 },
    { name: "Boys Hostel Block 1", occupancy: 96, total: 500, available: 20 },
    { name: "Boys Hostel Block 2", occupancy: 98, total: 300, available: 5 },
    { name: "Girls Hostel Block 1", occupancy: 96, total: 400, available: 15 },
    { name: "Girls Hostel Block 2", occupancy: 99, total: 250, available: 2 },
    { name: "Innovation Co-Living", occupancy: 97, total: 150, available: 5 },
  ]

  const urgentTasks = [
    { id: 1, task: "Review 3 pending booking requests", priority: "high" },
    { id: 2, task: "Process overdue payments (5 residents)", priority: "high" },
    { id: 3, task: "Schedule maintenance for Block A", priority: "medium" },
    { id: 4, task: "Update room availability status", priority: "low" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <AdminStatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Occupancy Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Hostel Occupancy Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {occupancyData.map((hostel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-body font-medium text-sm">{hostel.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={hostel.available < 10 ? "destructive" : "secondary"}
                        className="font-body text-xs"
                      >
                        {hostel.available} available
                      </Badge>
                      <span className="font-body text-sm text-muted-foreground">{hostel.occupancy}%</span>
                    </div>
                  </div>
                  <Progress value={hostel.occupancy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <AdminRecentActivity />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Urgent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Urgent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urgentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium">{task.task}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                    className="font-body text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 font-body">View All Tasks</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center font-body bg-transparent"
              >
                <Building className="w-6 h-6 mb-2" />
                Add Hostel
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center font-body bg-transparent"
              >
                <Users className="w-6 h-6 mb-2" />
                Add Resident
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center font-body bg-transparent"
              >
                <AlertTriangle className="w-6 h-6 mb-2" />
                Report Issue
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center font-body bg-transparent"
              >
                <CheckCircle className="w-6 h-6 mb-2" />
                Approve Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
