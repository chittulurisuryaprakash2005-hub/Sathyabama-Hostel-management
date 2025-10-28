"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Square, MapPin } from "lucide-react"
import type { Room } from "@/lib/room-data"
import Image from "next/image"

interface RoomCardProps {
  room: Room
  onBookRoom: (room: Room) => void
  onViewDetails: (room: Room) => void
}

export function RoomCard({ room, onBookRoom, onViewDetails }: RoomCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case "single":
        return "bg-blue-100 text-blue-800"
      case "double":
        return "bg-green-100 text-green-800"
      case "triple":
        return "bg-purple-100 text-purple-800"
      case "shared":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const occupancyPercentage = (room.occupancy / room.capacity) * 100
  const availableSpots = room.capacity - room.occupancy

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border">
      <div className="relative">
        <Image
          src={room.images[0] || "/placeholder.svg"}
          alt={`Room ${room.roomNumber}`}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${getRoomTypeColor(room.type)} font-body font-medium`}>
            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
          </Badge>
          <Badge className={`${getAvailabilityColor(room.availability)} font-body font-medium`}>
            {room.availability.charAt(0).toUpperCase() + room.availability.slice(1)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-heading font-bold text-lg text-card-foreground">Room {room.roomNumber}</h3>
            <div className="flex items-center text-muted-foreground text-sm font-body mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              Floor {room.floor}
            </div>
          </div>
          <div className="text-right">
            <span className="font-heading font-black text-xl text-primary">₹{room.pricePerMonth.toLocaleString()}</span>
            <div className="font-body text-xs text-muted-foreground">/month</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Room Info */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <Users className="w-4 h-4 mx-auto text-muted-foreground" />
            <div className="font-body text-xs text-muted-foreground">Capacity</div>
            <div className="font-heading font-semibold text-sm">{room.capacity}</div>
          </div>
          <div className="space-y-1">
            <Square className="w-4 h-4 mx-auto text-muted-foreground" />
            <div className="font-body text-xs text-muted-foreground">Area</div>
            <div className="font-heading font-semibold text-sm">{room.dimensions.area} sq ft</div>
          </div>
          <div className="space-y-1">
            <Users className="w-4 h-4 mx-auto text-muted-foreground" />
            <div className="font-body text-xs text-muted-foreground">Available</div>
            <div className="font-heading font-semibold text-sm">{availableSpots}</div>
          </div>
        </div>

        {/* Occupancy */}
        {room.capacity > 1 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-body">
              <span className="text-muted-foreground">Occupancy</span>
              <span className="font-medium">
                {room.occupancy}/{room.capacity}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Current Residents */}
        {room.residents && room.residents.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-3">
            <h4 className="font-heading font-semibold text-sm text-card-foreground mb-2">Current Residents</h4>
            <div className="space-y-1">
              {room.residents.map((resident, index) => (
                <div key={index} className="font-body text-xs text-muted-foreground">
                  {resident.name} - {resident.year}, {resident.course}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div>
          <h4 className="font-heading font-semibold text-sm text-card-foreground mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-body">
                {amenity}
              </Badge>
            ))}
            {room.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs font-body">
                +{room.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              alert(
                `Room ${room.roomNumber} Details:\n\nType: ${room.type}\nFloor: ${room.floor}\nArea: ${room.dimensions.area} sq ft\nDimensions: ${room.dimensions.length}' x ${room.dimensions.width}'\nPrice: ₹${room.pricePerMonth}/month\n\nAmenities: ${room.amenities.join(", ")}\n\nAvailability: ${room.availability}`,
              )
            }}
            className="flex-1 font-body font-medium"
          >
            View Details
          </Button>
          {room.availability === "available" && availableSpots > 0 && (
            <Button onClick={() => onBookRoom(room)} className="flex-1 font-body font-semibold">
              Book Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
