"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, AuthState } from "@/lib/auth-data"

interface AuthContextType extends AuthState {
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem("sathyabama-user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setAuthState({ user, isAuthenticated: true })
    }
  }, [])

  const login = (user: User) => {
    setAuthState({ user, isAuthenticated: true })
    localStorage.setItem("sathyabama-user", JSON.stringify(user))
  }

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false })
    localStorage.removeItem("sathyabama-user")
  }

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
