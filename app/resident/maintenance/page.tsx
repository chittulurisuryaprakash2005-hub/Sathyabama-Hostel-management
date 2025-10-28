"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { maintenanceRequests } from "@/lib/resident-portal-data"

export default function ResidentMaintenancePage() {
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-4 h-4" />
      case "in-progress":
        return <Wrench className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmitRequest = () => {
    // In a real app, this would submit to an API
    console.log("Submitting maintenance request:", newRequest)
    setShowNewRequestDialog(false)
    setNewRequest({ title: "", description: "", category: "", priority: "" })
  }

  return (
    <div className="space-y-6">
      {/* Header with New Request Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">Maintenance Requests</h2>
          <p className="font-body text-muted-foreground">Submit and track your maintenance requests</p>
        </div>
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button className="font-body font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading font-bold">Submit Maintenance Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newRequest.category}
                  onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Detailed description of the issue"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewRequestDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest}>Submit Request</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Maintenance Requests List */}
      <div className="grid gap-4">
        {maintenanceRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="font-heading font-bold text-lg">{request.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="font-body text-xs capitalize">
                      {request.category}
                    </Badge>
                    <Badge className={`${getPriorityColor(request.priority)} font-body text-xs capitalize`}>
                      {request.priority}
                    </Badge>
                  </div>
                </div>
                <Badge className={`${getStatusColor(request.status)} font-body text-xs flex items-center`}>
                  {getStatusIcon(request.status)}
                  <span className="ml-1 capitalize">{request.status.replace("-", " ")}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-body text-muted-foreground">{request.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Submitted</p>
                    <p className="font-body">{new Date(request.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Last Updated</p>
                    <p className="font-body">{new Date(request.updatedAt).toLocaleDateString()}</p>
                  </div>
                  {request.assignedTo && (
                    <div>
                      <p className="font-body font-medium text-muted-foreground">Assigned To</p>
                      <p className="font-body">{request.assignedTo}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-body font-medium text-muted-foreground">Request ID</p>
                    <p className="font-body font-mono text-xs">{request.id}</p>
                  </div>
                </div>

                {request.status === "completed" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="font-body text-sm text-green-800">
                      ✓ This maintenance request has been completed. If you're still experiencing issues, please submit
                      a new request.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {maintenanceRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Wrench className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">No Maintenance Requests</h3>
            <p className="font-body text-muted-foreground mb-4">You haven't submitted any maintenance requests yet.</p>
            <Button onClick={() => setShowNewRequestDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Submit Your First Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
