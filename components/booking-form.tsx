"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, CreditCard } from "lucide-react"
import type { Room } from "@/lib/room-data"
import type { Hostel } from "@/lib/hostel-data"

interface BookingFormProps {
  room: Room
  hostel: Hostel
  onSubmit: (bookingData: BookingData) => void
  onCancel: () => void
}

export interface BookingData {
  studentInfo: {
    name: string
    email: string
    phone: string
    studentId: string
    course: string
    year: string
    guardianName: string
    guardianPhone: string
  }
  bookingDetails: {
    checkInDate: string
    duration: string
    specialRequests: string
  }
  paymentInfo: {
    method: string
    amount: number
  }
}

export function BookingForm({ room, hostel, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    studentInfo: {
      name: "",
      email: "",
      phone: "",
      studentId: "",
      course: "",
      year: "",
      guardianName: "",
      guardianPhone: "",
    },
    bookingDetails: {
      checkInDate: "",
      duration: "1-semester",
      specialRequests: "",
    },
    paymentInfo: {
      method: "online",
      amount: room.pricePerMonth,
    },
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (section: keyof BookingData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData)
    }
  }

  const calculateTotal = () => {
    const duration = formData.bookingDetails.duration
    const monthlyRate = room.pricePerMonth
    const securityDeposit = monthlyRate * 0.5

    let months = 1
    switch (duration) {
      case "1-semester":
        months = 6
        break
      case "1-year":
        months = 12
        break
      case "2-years":
        months = 24
        break
    }

    return {
      monthlyRate,
      months,
      subtotal: monthlyRate * months,
      securityDeposit,
      total: monthlyRate * months + securityDeposit,
    }
  }

  const pricing = calculateTotal()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading font-bold text-2xl">Book Room {room.roomNumber}</CardTitle>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && <div className="w-8 h-0.5 bg-muted mx-2"></div>}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Student Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-lg flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Student Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.studentInfo.name}
                          onChange={(e) => handleInputChange("studentInfo", "name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentId">Student ID *</Label>
                        <Input
                          id="studentId"
                          value={formData.studentInfo.studentId}
                          onChange={(e) => handleInputChange("studentInfo", "studentId", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.studentInfo.email}
                          onChange={(e) => handleInputChange("studentInfo", "email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.studentInfo.phone}
                          onChange={(e) => handleInputChange("studentInfo", "phone", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="course">Course *</Label>
                        <Input
                          id="course"
                          value={formData.studentInfo.course}
                          onChange={(e) => handleInputChange("studentInfo", "course", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year of Study *</Label>
                        <Select
                          value={formData.studentInfo.year}
                          onValueChange={(value) => handleInputChange("studentInfo", "year", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st-year">1st Year</SelectItem>
                            <SelectItem value="2nd-year">2nd Year</SelectItem>
                            <SelectItem value="3rd-year">3rd Year</SelectItem>
                            <SelectItem value="4th-year">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="guardianName">Guardian Name *</Label>
                        <Input
                          id="guardianName"
                          value={formData.studentInfo.guardianName}
                          onChange={(e) => handleInputChange("studentInfo", "guardianName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="guardianPhone">Guardian Phone *</Label>
                        <Input
                          id="guardianPhone"
                          value={formData.studentInfo.guardianPhone}
                          onChange={(e) => handleInputChange("studentInfo", "guardianPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Booking Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-lg flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Booking Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkInDate">Check-in Date *</Label>
                        <Input
                          id="checkInDate"
                          type="date"
                          value={formData.bookingDetails.checkInDate}
                          onChange={(e) => handleInputChange("bookingDetails", "checkInDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration *</Label>
                        <Select
                          value={formData.bookingDetails.duration}
                          onValueChange={(value) => handleInputChange("bookingDetails", "duration", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-semester">1 Semester (6 months)</SelectItem>
                            <SelectItem value="1-year">1 Year (12 months)</SelectItem>
                            <SelectItem value="2-years">2 Years (24 months)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Any special requirements or requests..."
                        value={formData.bookingDetails.specialRequests}
                        onChange={(e) => handleInputChange("bookingDetails", "specialRequests", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-heading font-semibold text-lg flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h3>

                    <div>
                      <Label htmlFor="paymentMethod">Payment Method *</Label>
                      <Select
                        value={formData.paymentInfo.method}
                        onValueChange={(value) => handleInputChange("paymentInfo", "method", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online Payment</SelectItem>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                          <SelectItem value="demand-draft">Demand Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-heading font-semibold mb-2">Payment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Rate:</span>
                          <span>₹{pricing.monthlyRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{pricing.months} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{pricing.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security Deposit:</span>
                          <span>₹{pricing.securityDeposit.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>₹{pricing.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <div>
                    {currentStep > 1 && (
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                        Previous
                      </Button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button type="button" variant="ghost" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">{currentStep < totalSteps ? "Next" : "Confirm Booking"}</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="font-heading font-bold">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-heading font-semibold">{hostel.name}</h4>
                <p className="text-sm text-muted-foreground">{hostel.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Room:</span>
                  <Badge variant="secondary">{room.roomNumber}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{room.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Floor:</span>
                  <span>{room.floor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Area:</span>
                  <span>{room.dimensions.area} sq ft</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-heading font-semibold mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Monthly Rate:</span>
                  <span className="text-primary">₹{room.pricePerMonth.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
