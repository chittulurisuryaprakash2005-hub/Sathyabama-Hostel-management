"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Star, ThumbsUp } from "lucide-react"

interface FeedbackItem {
  id: string
  category: string
  rating: number
  subject: string
  message: string
  status: "submitted" | "reviewed" | "resolved"
  submittedAt: string
}

export default function ResidentFeedbackPage() {
  const [feedback, setFeedback] = useState({
    category: "",
    rating: 0,
    subject: "",
    message: "",
  })

  const [previousFeedback] = useState<FeedbackItem[]>([
    {
      id: "fb-1",
      category: "food-quality",
      rating: 4,
      subject: "Mess food quality improvement",
      message:
        "The food quality has improved significantly over the past month. Really appreciate the variety in vegetarian options.",
      status: "reviewed",
      submittedAt: "2024-08-10T10:30:00Z",
    },
    {
      id: "fb-2",
      category: "cleanliness",
      rating: 3,
      subject: "Common area cleanliness",
      message: "The common areas could be cleaned more frequently, especially during peak hours.",
      status: "resolved",
      submittedAt: "2024-08-05T14:20:00Z",
    },
  ])

  const handleSubmit = () => {
    console.log("Submitting feedback:", feedback)
    setFeedback({ category: "", rating: 0, subject: "", message: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "food-quality":
        return "Food Quality"
      case "cleanliness":
        return "Cleanliness"
      case "maintenance":
        return "Maintenance"
      case "staff-behavior":
        return "Staff Behavior"
      case "facilities":
        return "Facilities"
      case "security":
        return "Security"
      case "other":
        return "Other"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600">Share your thoughts and help us improve</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submit New Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Submit Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={feedback.category}
                onValueChange={(value) => setFeedback({ ...feedback, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food-quality">Food Quality</SelectItem>
                  <SelectItem value="cleanliness">Cleanliness</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Rating *</Label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={feedback.subject}
                onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                placeholder="Brief subject line"
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={feedback.message}
                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                placeholder="Share your detailed feedback..."
                rows={4}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Previous Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <ThumbsUp className="w-5 h-5 mr-2" />
              Your Previous Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousFeedback.map((item) => (
                <div key={item.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{item.subject}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(item.category)}
                        </Badge>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.submittedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
