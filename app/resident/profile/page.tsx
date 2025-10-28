"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Edit, Save, Camera, MapPin } from "lucide-react"
import { currentResident } from "@/lib/resident-portal-data"

export default function ResidentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(currentResident)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-heading font-bold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-heading font-bold text-lg">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.studentId}</p>
              <Badge className="mt-2">{profile.course}</Badge>
            </div>
            {isEditing && (
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading font-bold">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="student-id">Student ID</Label>
                <Input id="student-id" value={profile.studentId} disabled />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Input id="course" value={profile.course} disabled />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" value={profile.year} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Room Number:</span>
              <span className="font-medium">{profile.roomInfo.roomNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hostel:</span>
              <span className="font-medium">{profile.roomInfo.hostelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Floor:</span>
              <span className="font-medium">{profile.roomInfo.floor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in:</span>
              <span className="font-medium">{new Date(profile.roomInfo.checkInDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Rent:</span>
              <span className="font-medium">₹{profile.roomInfo.monthlyRent}</span>
            </div>
          </CardContent>
        </Card>

        {/* Guardian Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading font-bold">Guardian Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="guardian-name">Guardian Name</Label>
                <Input
                  id="guardian-name"
                  value={profile.guardianInfo.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      guardianInfo: { ...profile.guardianInfo, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="guardian-phone">Guardian Phone</Label>
                <Input
                  id="guardian-phone"
                  value={profile.guardianInfo.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      guardianInfo: { ...profile.guardianInfo, phone: e.target.value },
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="guardian-email">Guardian Email</Label>
                <Input
                  id="guardian-email"
                  type="email"
                  value={profile.guardianInfo.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      guardianInfo: { ...profile.guardianInfo, email: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
