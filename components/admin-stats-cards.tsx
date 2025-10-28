import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Bed, Users, Calendar, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down"
  }
  icon: React.ComponentType<{ className?: string }>
  color?: string
}

function StatsCard({ title, value, change, icon: Icon, color = "text-primary" }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-body text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-heading">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {change.trend === "up" ? (
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
            )}
            <span className={change.trend === "up" ? "text-green-600" : "text-red-600"}>{change.value}</span>
            <span className="ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AdminStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Hostels"
        value={6}
        change={{ value: "+2", trend: "up" }}
        icon={Building}
        color="text-blue-600"
      />
      <StatsCard
        title="Total Rooms"
        value={1850}
        change={{ value: "+50", trend: "up" }}
        icon={Bed}
        color="text-green-600"
      />
      <StatsCard
        title="Active Residents"
        value={1688}
        change={{ value: "+12%", trend: "up" }}
        icon={Users}
        color="text-purple-600"
      />
      <StatsCard
        title="Pending Bookings"
        value={23}
        change={{ value: "-5", trend: "down" }}
        icon={Calendar}
        color="text-orange-600"
      />
    </div>
  )
}
