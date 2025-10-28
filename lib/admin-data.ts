export interface AdminUser {
  id: string
  name: string
  email: string
  role: "super-admin" | "hostel-admin" | "warden"
  permissions: string[]
  hostelAccess?: string[] // hostel IDs they can manage
}

export interface Booking {
  id: string
  roomId: string
  hostelId: string
  studentInfo: {
    name: string
    email: string
    phone: string
    studentId: string
    course: string
    year: string
    guardianName: string
    guardianPhone: string
  }
  bookingDetails: {
    checkInDate: string
    duration: string
    specialRequests: string
  }
  paymentInfo: {
    method: string
    amount: number
    status: "pending" | "paid" | "failed"
  }
  status: "pending" | "approved" | "rejected" | "checked-in" | "checked-out"
  createdAt: string
  updatedAt: string
}

export interface Resident {
  id: string
  name: string
  email: string
  phone: string
  studentId: string
  course: string
  year: string
  roomId: string
  hostelId: string
  checkInDate: string
  checkOutDate?: string
  guardianInfo: {
    name: string
    phone: string
  }
  status: "active" | "inactive" | "graduated"
  monthlyRent: number
  securityDeposit: number
  paymentStatus: "paid" | "pending" | "overdue"
}

// Mock data for demonstration
export const adminUsers: AdminUser[] = [
  {
    id: "admin-1",
    name: "Dr. Rajesh Kumar",
    email: "admin@sathyabama.ac.in",
    role: "super-admin",
    permissions: ["manage-hostels", "manage-rooms", "manage-bookings", "manage-residents", "view-reports"],
  },
  {
    id: "warden-1",
    name: "Mrs. Lakshmi Devi",
    email: "lakshmi.devi@sathyabama.ac.in",
    role: "warden",
    permissions: ["manage-rooms", "manage-residents", "view-bookings"],
    hostelAccess: ["sathyabama-girls-1"],
  },
]

export const bookingsData: Booking[] = [
  {
    id: "booking-1",
    roomId: "room-cl1-101",
    hostelId: "sathyabama-co-living-1",
    studentInfo: {
      name: "Arjun Sharma",
      email: "arjun.sharma@student.sathyabama.ac.in",
      phone: "+91 9876543210",
      studentId: "SAT2024001",
      course: "Computer Science Engineering",
      year: "2nd-year",
      guardianName: "Mr. Rajesh Sharma",
      guardianPhone: "+91 9876543211",
    },
    bookingDetails: {
      checkInDate: "2024-08-15",
      duration: "1-semester",
      specialRequests: "Ground floor room preferred",
    },
    paymentInfo: {
      method: "online",
      amount: 52000,
      status: "paid",
    },
    status: "approved",
    createdAt: "2024-08-01T10:30:00Z",
    updatedAt: "2024-08-02T14:20:00Z",
  },
  {
    id: "booking-2",
    roomId: "room-girls1-301",
    hostelId: "sathyabama-girls-1",
    studentInfo: {
      name: "Priya Nair",
      email: "priya.nair@student.sathyabama.ac.in",
      phone: "+91 9876543212",
      studentId: "SAT2024002",
      course: "Information Technology",
      year: "1st-year",
      guardianName: "Mr. Suresh Nair",
      guardianPhone: "+91 9876543213",
    },
    bookingDetails: {
      checkInDate: "2024-08-20",
      duration: "1-year",
      specialRequests: "Vegetarian mess preference",
    },
    paymentInfo: {
      method: "bank-transfer",
      amount: 87500,
      status: "pending",
    },
    status: "pending",
    createdAt: "2024-08-05T09:15:00Z",
    updatedAt: "2024-08-05T09:15:00Z",
  },
]

export const residentsData: Resident[] = [
  {
    id: "resident-1",
    name: "Vikram Kumar",
    email: "vikram.kumar@student.sathyabama.ac.in",
    phone: "+91 9876543214",
    studentId: "SAT2023001",
    course: "Mechanical Engineering",
    year: "3rd-year",
    roomId: "room-boys1-201",
    hostelId: "sathyabama-boys-1",
    checkInDate: "2023-08-15",
    guardianInfo: {
      name: "Mr. Ravi Kumar",
      phone: "+91 9876543215",
    },
    status: "active",
    monthlyRent: 6500,
    securityDeposit: 3250,
    paymentStatus: "paid",
  },
  {
    id: "resident-2",
    name: "Anita Reddy",
    email: "anita.reddy@student.sathyabama.ac.in",
    phone: "+91 9876543216",
    studentId: "SAT2023002",
    course: "Electronics Engineering",
    year: "2nd-year",
    roomId: "room-girls1-302",
    hostelId: "sathyabama-girls-1",
    checkInDate: "2023-08-20",
    guardianInfo: {
      name: "Mrs. Sunitha Reddy",
      phone: "+91 9876543217",
    },
    status: "active",
    monthlyRent: 8500,
    securityDeposit: 4250,
    paymentStatus: "overdue",
  },
]
