"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, User } from "lucide-react"

interface ResidentHeaderProps {
  onMenuToggle: () => void
  title: string
}

export function ResidentHeader({ onMenuToggle, title }: ResidentHeaderProps) {
  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-heading font-bold text-2xl text-foreground">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
