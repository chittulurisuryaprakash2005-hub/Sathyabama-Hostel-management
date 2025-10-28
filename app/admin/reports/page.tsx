"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { reportsData } from "@/lib/reports-data"
import { TrendingUp, TrendingDown, Download, Users, DollarSign, Wrench, Star } from "lucide-react"

export default function ReportsPage() {
  const { occupancyRate, revenue, maintenanceRequests, studentSatisfaction } = reportsData

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into hostel operations</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate.current}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {occupancyRate.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              Target: {occupancyRate.target}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(revenue.current / 100000).toFixed(1)}L</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {revenue.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              +{(((revenue.current - revenue.previous) / revenue.previous) * 100).toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceRequests.pending}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              Pending requests
              {maintenanceRequests.urgent > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {maintenanceRequests.urgent} urgent
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentSatisfaction.overall}/5</div>
            <div className="text-xs text-muted-foreground">Overall student rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
            <CardDescription>Monthly occupancy rates across all hostels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {occupancyRate.monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${data.rate}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{data.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Requests</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRequests.categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(category.count / maintenanceRequests.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Student Satisfaction</CardTitle>
            <CardDescription>Ratings by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentSatisfaction.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= category.score ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{category.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest student reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentSatisfaction.feedback.map((feedback, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{feedback.comment}</p>
                  <p className="text-xs text-gray-500">{feedback.hostel}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
