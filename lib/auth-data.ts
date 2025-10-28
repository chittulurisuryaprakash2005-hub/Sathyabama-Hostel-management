export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "resident" | "warden"
  hostelId?: string
  roomNumber?: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Static user data for demo
export const users: User[] = [
  {
    id: "1",
    email: "admin@sathyabama.ac.in",
    name: "Admin User",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    email: "warden@sathyabama.ac.in",
    name: "Hostel Warden",
    role: "warden",
    hostelId: "1",
    avatar: "/fantasy-warden.png",
  },
  {
    id: "3",
    email: "student@sathyabama.ac.in",
    name: "Priya Sharma",
    role: "resident",
    hostelId: "1",
    roomNumber: "A-101",
    avatar: "/student-avatar.png",
  },
]

export const validateLogin = (email: string, password: string): User | null => {
  // Simple validation for demo - in real app, this would be server-side
  const user = users.find((u) => u.email === email)
  if (user && password === "password123") {
    return user
  }
  return null
}
