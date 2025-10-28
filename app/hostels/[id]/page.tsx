"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { RoomCard } from "@/components/room-card"
import { BookingForm, type BookingData } from "@/components/booking-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Star, Phone, Mail, Users, Building } from "lucide-react"
import { hostelsData } from "@/lib/hostel-data"
import { getRoomsByHostelId, type Room } from "@/lib/room-data"
import Link from "next/link"
import Image from "next/image"

export default function HostelDetailsPage() {
  const params = useParams()
  const hostelId = params.id as string

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const hostel = hostelsData.find((h) => h.id === hostelId)
  const rooms = getRoomsByHostelId(hostelId)

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Hostel Not Found</h1>
          <p className="text-muted-foreground mb-6">The hostel you're looking for doesn't exist.</p>
          <Link href="/hostels">
            <Button>Back to Hostels</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room)
    setShowBookingForm(true)
  }

  const handleViewRoomDetails = (room: Room) => {
    setSelectedRoom(room)
    // Could open a modal or navigate to room details page
  }

  const handleBookingSubmit = (bookingData: BookingData) => {
    // In a real app, this would submit to an API
    console.log("Booking submitted:", bookingData)
    setBookingSuccess(true)
    setShowBookingForm(false)
  }

  const availableRooms = rooms.filter((room) => room.availability === "available")
  const occupiedRooms = rooms.filter((room) => room.availability === "occupied")

  if (showBookingForm && selectedRoom) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="py-8">
          <BookingForm
            room={selectedRoom}
            hostel={hostel}
            onSubmit={handleBookingSubmit}
            onCancel={() => {
              setShowBookingForm(false)
              setSelectedRoom(null)
            }}
          />
        </div>
      </div>
    )
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your room booking has been submitted successfully. You will receive a confirmation email shortly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/hostels">
                <Button variant="outline">Browse More Hostels</Button>
              </Link>
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/hostels">
            <Button variant="ghost" size="sm" className="font-body">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hostels
            </Button>
          </Link>
        </div>

        {/* Hostel Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="relative mb-6">
              <Image
                src={hostel.image || "/placeholder.svg"}
                alt={hostel.name}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground font-body font-medium">
                  {hostel.type === "co-living" ? "Co-Living" : hostel.type === "boys" ? "Boys" : "Girls"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-2">{hostel.name}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-body">{hostel.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="font-body">
                      {hostel.rating} ({hostel.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-body text-muted-foreground text-lg">{hostel.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-heading font-semibold">{hostel.capacity}</div>
                  <div className="font-body text-sm text-muted-foreground">Total Capacity</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Building className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="font-heading font-semibold">{rooms.length}</div>
                  <div className="font-body text-sm text-muted-foreground">Total Rooms</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-heading font-semibold">{availableRooms.length}</div>
                  <div className="font-body text-sm text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <div className="font-heading font-semibold">{occupiedRooms.length}</div>
                  <div className="font-body text-sm text-muted-foreground">Occupied</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hostel Info Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="font-heading font-bold">Hostel Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-heading font-semibold mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {hostel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs font-body">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {hostel.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-body">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-heading font-semibold mb-2">Warden Contact</h4>
                  <div className="space-y-2">
                    <p className="font-body font-medium">{hostel.warden.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground font-body">
                      <Phone className="w-4 h-4 mr-2" />
                      {hostel.warden.phone}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground font-body">
                      <Mail className="w-4 h-4 mr-2" />
                      {hostel.warden.email}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-center">
                    <div className="font-heading font-black text-2xl text-primary mb-1">
                      ₹{hostel.pricePerMonth.toLocaleString()}
                    </div>
                    <div className="font-body text-sm text-muted-foreground">Starting from /month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="mb-12">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
            Available Rooms ({availableRooms.length})
          </h2>
          {availableRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRooms.map((room) => (
                <RoomCard key={room.id} room={room} onBookRoom={handleBookRoom} onViewDetails={handleViewRoomDetails} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/30 rounded-lg">
              <p className="font-body text-muted-foreground">No rooms currently available in this hostel.</p>
            </div>
          )}
        </div>

        {/* Occupied Rooms */}
        {occupiedRooms.length > 0 && (
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-6">
              Occupied Rooms ({occupiedRooms.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {occupiedRooms.map((room) => (
                <RoomCard key={room.id} room={room} onBookRoom={handleBookRoom} onViewDetails={handleViewRoomDetails} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
