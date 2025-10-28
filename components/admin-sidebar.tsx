"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Building, Bed, Calendar, Users, BarChart3, Settings, LogOut, X } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      href: "/admin/hostels",
      label: "Hostels",
      icon: Building,
      badge: null,
    },
    {
      href: "/admin/rooms",
      label: "Rooms",
      icon: Bed,
      badge: null,
    },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: Calendar,
      badge: "3",
    },
    {
      href: "/admin/residents",
      label: "Residents",
      icon: Users,
      badge: null,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: BarChart3,
      badge: null,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
  ]

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-black text-lg text-card-foreground">Admin Panel</span>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={onToggle}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    className="w-full justify-start font-body"
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="font-body font-medium text-sm text-card-foreground">Dr. Rajesh Kumar</p>
              <p className="font-body text-xs text-muted-foreground">Super Admin</p>
            </div>
            <Button variant="ghost" className="w-full justify-start font-body text-destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
