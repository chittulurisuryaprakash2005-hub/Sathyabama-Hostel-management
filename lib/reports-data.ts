export interface ReportData {
  occupancyRate: {
    current: number
    target: number
    trend: "up" | "down"
    monthlyData: { month: string; rate: number }[]
  }
  revenue: {
    current: number
    previous: number
    trend: "up" | "down"
    monthlyData: { month: string; amount: number }[]
  }
  maintenanceRequests: {
    total: number
    pending: number
    completed: number
    urgent: number
    categoryData: { category: string; count: number }[]
  }
  studentSatisfaction: {
    overall: number
    categories: { category: string; score: number }[]
    feedback: { date: string; rating: number; comment: string; hostel: string }[]
  }
}

export const reportsData: ReportData = {
  occupancyRate: {
    current: 87.5,
    target: 90,
    trend: "up",
    monthlyData: [
      { month: "Jan", rate: 82 },
      { month: "Feb", rate: 85 },
      { month: "Mar", rate: 88 },
      { month: "Apr", rate: 87.5 },
      { month: "May", rate: 89 },
      { month: "Jun", rate: 87.5 },
    ],
  },
  revenue: {
    current: 2850000,
    previous: 2650000,
    trend: "up",
    monthlyData: [
      { month: "Jan", amount: 2400000 },
      { month: "Feb", amount: 2500000 },
      { month: "Mar", amount: 2700000 },
      { month: "Apr", amount: 2850000 },
      { month: "May", amount: 2900000 },
      { month: "Jun", amount: 2850000 },
    ],
  },
  maintenanceRequests: {
    total: 156,
    pending: 23,
    completed: 133,
    urgent: 5,
    categoryData: [
      { category: "Plumbing", count: 45 },
      { category: "Electrical", count: 38 },
      { category: "Furniture", count: 32 },
      { category: "AC/Heating", count: 25 },
      { category: "Others", count: 16 },
    ],
  },
  studentSatisfaction: {
    overall: 4.2,
    categories: [
      { category: "Room Quality", score: 4.3 },
      { category: "Food Service", score: 4.1 },
      { category: "Cleanliness", score: 4.4 },
      { category: "Security", score: 4.5 },
      { category: "Staff Behavior", score: 4.0 },
    ],
    feedback: [
      {
        date: "2024-01-15",
        rating: 5,
        comment: "Excellent facilities and very clean rooms",
        hostel: "Sathyabama Co-Living Hub",
      },
      {
        date: "2024-01-14",
        rating: 4,
        comment: "Good overall experience, food could be better",
        hostel: "Sathyabama Boys Hostel",
      },
      {
        date: "2024-01-13",
        rating: 5,
        comment: "Very safe and secure environment for girls",
        hostel: "Sathyabama Girls Hostel",
      },
    ],
  },
}
