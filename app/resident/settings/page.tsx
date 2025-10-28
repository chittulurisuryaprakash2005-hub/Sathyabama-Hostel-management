"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Bell, Shield, Eye, Smartphone } from "lucide-react"

export default function ResidentSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-reminders">Payment Reminders</Label>
              <Switch id="payment-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-updates">Maintenance Updates</Label>
              <Switch id="maintenance-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="announcement-alerts">Announcement Alerts</Label>
              <Switch id="announcement-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Switch id="profile-visibility" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="contact-sharing">Share Contact Info</Label>
              <Switch id="contact-sharing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="room-info-sharing">Share Room Info</Label>
              <Switch id="room-info-sharing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="activity-tracking">Activity Tracking</Label>
              <Switch id="activity-tracking" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-refresh">Auto Refresh</Label>
              <Switch id="auto-refresh" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="offline-mode">Offline Mode</Label>
              <Switch id="offline-mode" />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" disabled />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
