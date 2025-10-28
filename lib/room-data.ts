export interface Room {
  id: string
  hostelId: string
  roomNumber: string
  type: "single" | "double" | "triple" | "shared"
  floor: number
  capacity: number
  occupancy: number
  pricePerMonth: number
  amenities: string[]
  features: string[]
  images: string[]
  availability: "available" | "occupied" | "maintenance"
  residents?: {
    name: string
    year: string
    course: string
  }[]
  dimensions: {
    area: number
    length: number
    width: number
  }
}

export const roomsData: Room[] = [
  // Sathyabama Co-Living Hub rooms
  {
    id: "room-cl1-101",
    hostelId: "sathyabama-co-living-1",
    roomNumber: "CL-101",
    type: "single",
    floor: 1,
    capacity: 1,
    occupancy: 0,
    pricePerMonth: 8000,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Attached Bathroom"],
    features: ["Private Room", "Shared Kitchen Access", "Study Area Access", "Recreation Zone"],
    images: ["/single-room-modern.png", "/study-desk-setup.png"],
    availability: "available",
    dimensions: {
      area: 120,
      length: 12,
      width: 10,
    },
  },
  {
    id: "room-cl1-102",
    hostelId: "sathyabama-co-living-1",
    roomNumber: "CL-102",
    type: "single",
    floor: 1,
    capacity: 1,
    occupancy: 1,
    pricePerMonth: 8000,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Attached Bathroom"],
    features: ["Private Room", "Shared Kitchen Access", "Study Area Access", "Recreation Zone"],
    images: ["/single-room-modern.png", "/study-desk-setup.png"],
    availability: "occupied",
    residents: [
      {
        name: "Arjun Sharma",
        year: "3rd Year",
        course: "Computer Science",
      },
    ],
    dimensions: {
      area: 120,
      length: 12,
      width: 10,
    },
  },
  // Boys Hostel Block 1 rooms
  {
    id: "room-boys1-201",
    hostelId: "sathyabama-boys-1",
    roomNumber: "B1-201",
    type: "double",
    floor: 2,
    capacity: 2,
    occupancy: 1,
    pricePerMonth: 6500,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Shared Bathroom"],
    features: ["Double Occupancy", "Mess Access", "Gym Access", "Laundry Service"],
    images: ["/double-room-boys.png", "/boys-hostel-interior.png"],
    availability: "available",
    residents: [
      {
        name: "Vikram Kumar",
        year: "2nd Year",
        course: "Mechanical Engineering",
      },
    ],
    dimensions: {
      area: 150,
      length: 15,
      width: 10,
    },
  },
  {
    id: "room-boys1-202",
    hostelId: "sathyabama-boys-1",
    roomNumber: "B1-202",
    type: "double",
    floor: 2,
    capacity: 2,
    occupancy: 2,
    pricePerMonth: 6500,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Shared Bathroom"],
    features: ["Double Occupancy", "Mess Access", "Gym Access", "Laundry Service"],
    images: ["/double-room-boys.png", "/boys-hostel-interior.png"],
    availability: "occupied",
    residents: [
      {
        name: "Rahul Patel",
        year: "1st Year",
        course: "Electronics Engineering",
      },
      {
        name: "Suresh Reddy",
        year: "1st Year",
        course: "Civil Engineering",
      },
    ],
    dimensions: {
      area: 150,
      length: 15,
      width: 10,
    },
  },
  // Girls Hostel Block 1 rooms
  {
    id: "room-girls1-301",
    hostelId: "sathyabama-girls-1",
    roomNumber: "G1-301",
    type: "double",
    floor: 3,
    capacity: 2,
    occupancy: 0,
    pricePerMonth: 7000,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Attached Bathroom"],
    features: ["Double Occupancy", "Mess Access", "Beauty Salon", "Medical Room"],
    images: ["/double-room-girls.png", "/girls-hostel-interior.png"],
    availability: "available",
    dimensions: {
      area: 140,
      length: 14,
      width: 10,
    },
  },
  {
    id: "room-girls1-302",
    hostelId: "sathyabama-girls-1",
    roomNumber: "G1-302",
    type: "single",
    floor: 3,
    capacity: 1,
    occupancy: 1,
    pricePerMonth: 8500,
    amenities: ["AC", "WiFi", "Study Desk", "Wardrobe", "Attached Bathroom"],
    features: ["Single Occupancy", "Premium Mess", "Spa Access", "Fitness Center"],
    images: ["/single-room-girls.png", "/premium-girls-room.png"],
    availability: "occupied",
    residents: [
      {
        name: "Priya Nair",
        year: "4th Year",
        course: "Information Technology",
      },
    ],
    dimensions: {
      area: 120,
      length: 12,
      width: 10,
    },
  },
]

export function getRoomsByHostelId(hostelId: string): Room[] {
  return roomsData.filter((room) => room.hostelId === hostelId)
}

export function getRoomById(roomId: string): Room | undefined {
  return roomsData.find((room) => room.id === roomId)
}
