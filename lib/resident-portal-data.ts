export interface ResidentProfile {
  id: string
  name: string
  email: string
  phone: string
  studentId: string
  course: string
  year: string
  roomInfo: {
    roomNumber: string
    hostelName: string
    floor: number
    checkInDate: string
    monthlyRent: number
  }
  guardianInfo: {
    name: string
    phone: string
    email: string
  }
  paymentInfo: {
    securityDeposit: number
    lastPaymentDate: string
    nextDueDate: string
    status: "paid" | "pending" | "overdue"
  }
}

export interface MaintenanceRequest {
  id: string
  residentId: string
  title: string
  description: string
  category: "electrical" | "plumbing" | "furniture" | "cleaning" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  status: "submitted" | "in-progress" | "completed" | "cancelled"
  submittedAt: string
  updatedAt: string
  assignedTo?: string
  images?: string[]
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: "general" | "maintenance" | "event" | "emergency"
  targetAudience: "all" | "boys" | "girls" | "co-living"
  publishedAt: string
  expiresAt?: string
  isImportant: boolean
}

export interface PaymentHistory {
  id: string
  residentId: string
  amount: number
  type: "monthly-rent" | "security-deposit" | "fine" | "refund"
  status: "paid" | "pending" | "failed"
  paymentDate: string
  dueDate: string
  method: "online" | "cash" | "bank-transfer"
  receiptNumber: string
}

// Mock data for demonstration
export const currentResident: ResidentProfile = {
  id: "resident-1",
  name: "Arjun Sharma",
  email: "arjun.sharma@student.sathyabama.ac.in",
  phone: "+91 9876543210",
  studentId: "SAT2024001",
  course: "Computer Science Engineering",
  year: "2nd Year",
  roomInfo: {
    roomNumber: "CL-101",
    hostelName: "Sathyabama Co-Living Hub",
    floor: 1,
    checkInDate: "2024-08-15",
    monthlyRent: 8000,
  },
  guardianInfo: {
    name: "Mr. Rajesh Sharma",
    phone: "+91 9876543211",
    email: "rajesh.sharma@gmail.com",
  },
  paymentInfo: {
    securityDeposit: 4000,
    lastPaymentDate: "2024-08-01",
    nextDueDate: "2024-09-01",
    status: "paid",
  },
}

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "maint-1",
    residentId: "resident-1",
    title: "AC not cooling properly",
    description:
      "The air conditioner in my room is not cooling effectively. It's been running but the temperature doesn't drop.",
    category: "electrical",
    priority: "medium",
    status: "in-progress",
    submittedAt: "2024-08-10T10:30:00Z",
    updatedAt: "2024-08-11T14:20:00Z",
    assignedTo: "Maintenance Team A",
  },
  {
    id: "maint-2",
    residentId: "resident-1",
    title: "Bathroom tap leaking",
    description: "The bathroom tap has been leaking for the past two days. Water is dripping continuously.",
    category: "plumbing",
    priority: "high",
    status: "completed",
    submittedAt: "2024-08-05T09:15:00Z",
    updatedAt: "2024-08-07T16:45:00Z",
    assignedTo: "Plumbing Team",
  },
]

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "Hostel Mess Menu Update",
    content:
      "New vegetarian and non-vegetarian options have been added to the mess menu starting from next week. Please check the notice board for detailed menu.",
    type: "general",
    targetAudience: "all",
    publishedAt: "2024-08-12T08:00:00Z",
    isImportant: false,
  },
  {
    id: "ann-2",
    title: "Water Supply Maintenance",
    content:
      "Water supply will be temporarily disrupted on August 15th from 10 AM to 2 PM for maintenance work. Please store water in advance.",
    type: "maintenance",
    targetAudience: "all",
    publishedAt: "2024-08-13T18:00:00Z",
    expiresAt: "2024-08-15T14:00:00Z",
    isImportant: true,
  },
  {
    id: "ann-3",
    title: "Cultural Night Event",
    content:
      "Join us for the annual cultural night on August 20th at 7 PM in the main auditorium. Registration is open until August 18th.",
    type: "event",
    targetAudience: "all",
    publishedAt: "2024-08-10T12:00:00Z",
    expiresAt: "2024-08-20T19:00:00Z",
    isImportant: false,
  },
]

export const paymentHistory: PaymentHistory[] = [
  {
    id: "pay-1",
    residentId: "resident-1",
    amount: 8000,
    type: "monthly-rent",
    status: "paid",
    paymentDate: "2024-08-01T10:30:00Z",
    dueDate: "2024-08-01T00:00:00Z",
    method: "online",
    receiptNumber: "RCP2024080001",
  },
  {
    id: "pay-2",
    residentId: "resident-1",
    amount: 4000,
    type: "security-deposit",
    status: "paid",
    paymentDate: "2024-07-15T14:20:00Z",
    dueDate: "2024-07-15T00:00:00Z",
    method: "online",
    receiptNumber: "RCP2024071501",
  },
  {
    id: "pay-3",
    residentId: "resident-1",
    amount: 8000,
    type: "monthly-rent",
    status: "paid",
    paymentDate: "2024-07-01T09:15:00Z",
    dueDate: "2024-07-01T00:00:00Z",
    method: "bank-transfer",
    receiptNumber: "RCP2024070001",
  },
]
