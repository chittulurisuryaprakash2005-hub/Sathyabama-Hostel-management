"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Home, Building, Settings, BarChart3, LogOut, User } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const publicNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/hostels", label: "Hostels", icon: Building },
  ]

  const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: Settings },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-blue-900">Sathyabama Hostel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Navigation */}
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Admin Navigation */}
            {isAuthenticated && user?.role === "admin" && (
              <>
                {adminNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.role === "resident" && (
                    <DropdownMenuItem asChild>
                      <Link href="/resident" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Portal</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {isAuthenticated && user?.role === "admin" && (
                <>
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </>
              )}

              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                  </div>
                  {user?.role === "resident" && (
                    <Link
                      href="/resident"
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Portal</span>
                    </Link>
                  )}
                  <Button variant="ghost" onClick={handleLogout} className="w-full justify-start p-0 h-auto py-2">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
