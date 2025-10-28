import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, User, Building, CreditCard } from "lucide-react"

interface ActivityItem {
  id: string
  type: "booking" | "payment" | "check-in" | "check-out"
  user: string
  description: string
  time: string
  status?: "success" | "pending" | "failed"
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "booking",
    user: "Priya Nair",
    description: "New booking request for Girls Hostel Block 1",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    type: "payment",
    user: "Arjun Sharma",
    description: "Payment received for Co-Living Hub",
    time: "4 hours ago",
    status: "success",
  },
  {
    id: "3",
    type: "check-in",
    user: "Vikram Kumar",
    description: "Checked into Boys Hostel Block 1, Room B1-201",
    time: "1 day ago",
    status: "success",
  },
  {
    id: "4",
    type: "booking",
    user: "Anita Reddy",
    description: "Booking approved for Girls Hostel Block 2",
    time: "2 days ago",
    status: "success",
  },
  {
    id: "5",
    type: "payment",
    user: "Rahul Patel",
    description: "Payment failed for Boys Hostel Block 2",
    time: "3 days ago",
    status: "failed",
  },
]

function getActivityIcon(type: string) {
  switch (type) {
    case "booking":
      return Calendar
    case "payment":
      return CreditCard
    case "check-in":
    case "check-out":
      return Building
    default:
      return User
  }
}

function getStatusColor(status?: string) {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function AdminRecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-muted">
                    <Icon className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-body font-medium text-sm text-card-foreground">{activity.user}</p>
                    {activity.status && (
                      <Badge className={`${getStatusColor(activity.status)} text-xs font-body`}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{activity.description}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
