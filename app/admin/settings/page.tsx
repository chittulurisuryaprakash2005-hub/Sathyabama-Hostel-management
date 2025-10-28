"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Save, Bell, Shield, Database } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600">Configure system settings and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="system-name">System Name</Label>
              <Input id="system-name" defaultValue="Sathyabama Hostel Management" />
            </div>
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@sathyabama.ac.in" />
            </div>
            <div>
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input id="contact-phone" defaultValue="+91 44 2450 3000" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai - 600119" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Settings
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
              <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
              <Switch id="maintenance-alerts" defaultChecked />
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
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="session-timeout">Auto Logout (30 min)</Label>
              <Switch id="session-timeout" defaultChecked />
            </div>
            <div>
              <Label htmlFor="password-policy">Password Policy</Label>
              <Input id="password-policy" defaultValue="Minimum 8 characters, 1 uppercase, 1 number" />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading font-bold flex items-center">
              <Database className="w-5 h-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch id="maintenance-mode" />
            </div>
            <div>
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Input id="backup-frequency" defaultValue="Daily at 2:00 AM" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="font-body">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
