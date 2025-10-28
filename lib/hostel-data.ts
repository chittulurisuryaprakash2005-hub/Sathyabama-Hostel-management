export interface Hostel {
  id: string
  name: string
  type: "co-living" | "boys" | "girls"
  description: string
  image: string
  capacity: number
  occupancy: number
  pricePerMonth: number
  amenities: string[]
  features: string[]
  location: string
  rating: number
  reviews: number
  availability: "available" | "limited" | "full"
  warden: {
    name: string
    phone: string
    email: string
  }
}

export const hostelsData: Hostel[] = [
  {
    id: "sathyabama-co-living-1",
    name: "Sathyabama Co-Living Hub",
    type: "co-living",
    description:
      "Modern co-living space with private rooms and shared common areas. Perfect for collaborative learning and networking.",
    image: "/modern-coliving-study.png",
    capacity: 200,
    occupancy: 180,
    pricePerMonth: 8000,
    amenities: ["WiFi", "AC", "Laundry", "Kitchen", "Study Room", "Recreation Area"],
    features: ["Private Rooms", "Shared Kitchen", "Study Areas", "Recreation Zone", "24/7 Security"],
    location: "Block A, Sathyabama Campus",
    rating: 4.5,
    reviews: 89,
    availability: "available",
    warden: {
      name: "Dr. Priya Sharma",
      phone: "+91 9876543210",
      email: "priya.sharma@sathyabama.ac.in",
    },
  },
  {
    id: "sathyabama-co-living-2",
    name: "Innovation Co-Living",
    type: "co-living",
    description: "Tech-focused co-living space with maker labs and innovation centers for engineering students.",
    image: "/placeholder-84ynz.png",
    capacity: 150,
    occupancy: 145,
    pricePerMonth: 9000,
    amenities: ["WiFi", "AC", "Maker Lab", "Kitchen", "Conference Room", "Gym"],
    features: ["Private Rooms", "Maker Lab", "Conference Rooms", "Innovation Hub", "Mentorship Program"],
    location: "Block B, Sathyabama Campus",
    rating: 4.7,
    reviews: 67,
    availability: "limited",
    warden: {
      name: "Prof. Rajesh Kumar",
      phone: "+91 9876543211",
      email: "rajesh.kumar@sathyabama.ac.in",
    },
  },
  {
    id: "sathyabama-boys-1",
    name: "Sathyabama Boys Hostel - Block 1",
    type: "boys",
    description: "Traditional boys hostel with modern amenities. Spacious rooms and excellent mess facilities.",
    image: "/modern-boys-hostel.png",
    capacity: 500,
    occupancy: 480,
    pricePerMonth: 6500,
    amenities: ["WiFi", "AC", "Mess", "Laundry", "Gym", "Sports Complex"],
    features: ["AC Rooms", "Mess Facility", "Gym Access", "Laundry Service", "Sports Complex"],
    location: "Block C, Sathyabama Campus",
    rating: 4.3,
    reviews: 156,
    availability: "available",
    warden: {
      name: "Mr. Suresh Babu",
      phone: "+91 9876543212",
      email: "suresh.babu@sathyabama.ac.in",
    },
  },
  {
    id: "sathyabama-boys-2",
    name: "Sathyabama Boys Hostel - Block 2",
    type: "boys",
    description: "Premium boys hostel with enhanced facilities and single occupancy rooms available.",
    image: "/premium-boys-hostel-single-rooms.png",
    capacity: 300,
    occupancy: 295,
    pricePerMonth: 7500,
    amenities: ["WiFi", "AC", "Mess", "Laundry", "Library", "Medical Room"],
    features: ["Single/Double Rooms", "Premium Mess", "Library Access", "Medical Facility", "Study Halls"],
    location: "Block D, Sathyabama Campus",
    rating: 4.6,
    reviews: 98,
    availability: "limited",
    warden: {
      name: "Dr. Arun Prakash",
      phone: "+91 9876543213",
      email: "arun.prakash@sathyabama.ac.in",
    },
  },
  {
    id: "sathyabama-girls-1",
    name: "Sathyabama Girls Hostel - Block 1",
    type: "girls",
    description: "Safe and secure girls hostel with enhanced security measures and comfortable living spaces.",
    image: "/secure-girls-hostel.png",
    capacity: 400,
    occupancy: 385,
    pricePerMonth: 7000,
    amenities: ["WiFi", "AC", "Mess", "Laundry", "Beauty Salon", "Medical Room"],
    features: ["AC Rooms", "Mess Facility", "Beauty Salon", "Medical Room", "Enhanced Security"],
    location: "Block E, Sathyabama Campus",
    rating: 4.4,
    reviews: 134,
    availability: "available",
    warden: {
      name: "Mrs. Lakshmi Devi",
      phone: "+91 9876543214",
      email: "lakshmi.devi@sathyabama.ac.in",
    },
  },
  {
    id: "sathyabama-girls-2",
    name: "Sathyabama Girls Hostel - Block 2",
    type: "girls",
    description: "Premium girls hostel with luxury amenities and single occupancy options for senior students.",
    image: "/luxury-girls-hostel.png",
    capacity: 250,
    occupancy: 248,
    pricePerMonth: 8500,
    amenities: ["WiFi", "AC", "Premium Mess", "Spa", "Fitness Center", "Study Lounge"],
    features: ["Single Rooms", "Premium Mess", "Spa Access", "Fitness Center", "Study Lounges"],
    location: "Block F, Sathyabama Campus",
    rating: 4.8,
    reviews: 76,
    availability: "full",
    warden: {
      name: "Dr. Meera Nair",
      phone: "+91 9876543215",
      email: "meera.nair@sathyabama.ac.in",
    },
  },
]
