"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    visitTime: "",
    hostelType: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    console.log("Visit scheduled:", formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Visit Scheduled!</h1>
            <p className="text-muted-foreground mb-6">
              Your hostel visit has been scheduled successfully. We'll contact you shortly to confirm the details.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="mr-4">
              Schedule Another Visit
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4">
            Schedule Your
            <span className="text-primary block">Hostel Visit</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit our hostels in person and experience the facilities, meet the wardens, and get all your questions
            answered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-bold text-2xl">Schedule Visit</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hostelType">Hostel Type *</Label>
                      <Select
                        value={formData.hostelType}
                        onValueChange={(value) => handleInputChange("hostelType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hostel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="co-living">Co-Living Spaces</SelectItem>
                          <SelectItem value="boys">Boys Hostel</SelectItem>
                          <SelectItem value="girls">Girls Hostel</SelectItem>
                          <SelectItem value="all">All Hostels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="visitDate">Preferred Date *</Label>
                      <Input
                        id="visitDate"
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => handleInputChange("visitDate", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="visitTime">Preferred Time *</Label>
                      <Select
                        value={formData.visitTime}
                        onValueChange={(value) => handleInputChange("visitTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00-10:00">9:00 AM - 10:00 AM</SelectItem>
                          <SelectItem value="10:00-11:00">10:00 AM - 11:00 AM</SelectItem>
                          <SelectItem value="11:00-12:00">11:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="14:00-15:00">2:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="15:00-16:00">3:00 PM - 4:00 PM</SelectItem>
                          <SelectItem value="16:00-17:00">4:00 PM - 5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific questions or requirements..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full font-body font-semibold">
                    Schedule Visit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="font-heading font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        Sathyabama Institute of Science and Technology
                        <br />
                        Jeppiaar Nagar, Rajiv Gandhi Salai
                        <br />
                        Chennai - 600119, Tamil Nadu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold">Phone</h4>
                      <p className="text-sm text-muted-foreground">+91 44 2450 3000</p>
                      <p className="text-sm text-muted-foreground">+91 44 2450 3001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold">Email</h4>
                      <p className="text-sm text-muted-foreground">hostel@sathyabama.ac.in</p>
                      <p className="text-sm text-muted-foreground">admissions@sathyabama.ac.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold">Visit Hours</h4>
                      <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-sm text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-heading font-semibold mb-2">What to Expect</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tour of hostel facilities</li>
                    <li>• Meet with hostel wardens</li>
                    <li>• View available rooms</li>
                    <li>• Q&A session</li>
                    <li>• Application guidance</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
