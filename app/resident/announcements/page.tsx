"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Search, Filter, AlertTriangle, Calendar, Users, Wrench } from "lucide-react"
import { announcements } from "@/lib/resident-portal-data"

export default function ResidentAnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || announcement.type === typeFilter
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "general":
        return <Bell className="w-4 h-4" />
      case "maintenance":
        return <Wrench className="w-4 h-4" />
      case "event":
        return <Calendar className="w-4 h-4" />
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "general":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "event":
        return "bg-green-100 text-green-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="text-gray-600">Stay updated with hostel news and important information</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={announcement.isImportant ? "border-red-200 bg-red-50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="font-heading font-bold text-lg flex items-center">
                      {getTypeIcon(announcement.type)}
                      <span className="ml-2">{announcement.title}</span>
                    </CardTitle>
                    {announcement.isImportant && (
                      <Badge variant="destructive" className="text-xs">
                        Important
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(announcement.type)} variant="outline">
                      {announcement.type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      <Users className="w-3 h-3 mr-1" />
                      {announcement.targetAudience}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{new Date(announcement.publishedAt).toLocaleDateString()}</p>
                  {announcement.expiresAt && (
                    <p className="text-xs">Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">No Announcements Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || typeFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "There are no announcements at this time."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
