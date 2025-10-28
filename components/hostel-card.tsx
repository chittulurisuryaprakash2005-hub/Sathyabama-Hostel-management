"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail } from "lucide-react"
import type { Hostel } from "@/lib/hostel-data"
import Image from "next/image"
import Link from "next/link"

interface HostelCardProps {
  hostel: Hostel
  onViewDetails: (hostel: Hostel) => void
}

export function HostelCard({ hostel, onViewDetails }: HostelCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "limited":
        return "bg-yellow-100 text-yellow-800"
      case "full":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "co-living":
        return "bg-blue-100 text-blue-800"
      case "boys":
        return "bg-green-100 text-green-800"
      case "girls":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const occupancyPercentage = (hostel.occupancy / hostel.capacity) * 100

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-border">
      <div className="relative">
        <Image
          src={hostel.image || "/placeholder.svg"}
          alt={hostel.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={`${getTypeColor(hostel.type)} font-body font-medium`}>
            {hostel.type === "co-living" ? "Co-Living" : hostel.type === "boys" ? "Boys" : "Girls"}
          </Badge>
          <Badge className={`${getAvailabilityColor(hostel.availability)} font-body font-medium`}>
            {hostel.availability.charAt(0).toUpperCase() + hostel.availability.slice(1)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="font-heading font-bold text-xl text-card-foreground">{hostel.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-body font-medium text-sm">{hostel.rating}</span>
            <span className="font-body text-xs text-muted-foreground">({hostel.reviews})</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground text-sm font-body">
          <MapPin className="w-4 h-4 mr-1" />
          {hostel.location}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="font-body text-muted-foreground text-sm line-clamp-2">{hostel.description}</p>

        {/* Occupancy */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-body">
            <span className="text-muted-foreground">Occupancy</span>
            <span className="font-medium">
              {hostel.occupancy}/{hostel.capacity}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${occupancyPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-heading font-semibold text-sm text-card-foreground mb-2">Key Amenities</h4>
          <div className="flex flex-wrap gap-1">
            {hostel.amenities.slice(0, 4).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-body">
                {amenity}
              </Badge>
            ))}
            {hostel.amenities.length > 4 && (
              <Badge variant="secondary" className="text-xs font-body">
                +{hostel.amenities.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Warden Contact */}
        <div className="bg-muted/50 rounded-lg p-3 space-y-1">
          <h4 className="font-heading font-semibold text-sm text-card-foreground">Warden Contact</h4>
          <p className="font-body text-sm text-muted-foreground">{hostel.warden.name}</p>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground font-body">
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {hostel.warden.phone}
            </div>
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {hostel.warden.email.split("@")[0]}
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <span className="font-heading font-black text-2xl text-primary">
              ₹{hostel.pricePerMonth.toLocaleString()}
            </span>
            <span className="font-body text-sm text-muted-foreground">/month</span>
          </div>
          <Link href={`/hostels/${hostel.id}`}>
            <Button className="font-body font-semibold">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
