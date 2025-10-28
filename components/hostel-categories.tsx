import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Home } from "lucide-react"
import Link from "next/link"

export function HostelCategories() {
  const categories = [
    {
      id: "co-living",
      title: "Co-Living Spaces",
      icon: Home,
      description: "Modern shared living spaces with private rooms and common areas for collaborative living.",
      features: ["Private Rooms", "Shared Kitchen", "Study Areas", "Recreation Zone"],
      capacity: "200+ Students",
      price: "₹8,000/month",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      badgeColor: "bg-green-100 text-green-800",
      image: "/premium-coliving-space.png",
    },
    {
      id: "boys-hostel",
      title: "Boys Hostel",
      icon: UserCheck,
      description: "Dedicated accommodation for male students with all essential facilities and 24/7 security.",
      features: ["AC Rooms", "Mess Facility", "Gym Access", "Laundry Service"],
      capacity: "500+ Students",
      price: "₹6,500/month",
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600",
      badgeColor: "bg-emerald-100 text-emerald-800",
      image: "/boys-hostel-room-modern.png",
    },
    {
      id: "girls-hostel",
      title: "Girls Hostel",
      icon: Users,
      description: "Safe and secure accommodation for female students with enhanced security measures.",
      features: ["AC Rooms", "Mess Facility", "Beauty Salon", "Medical Room"],
      capacity: "400+ Students",
      price: "₹7,000/month",
      color: "bg-lime-50 border-lime-200",
      iconColor: "text-lime-600",
      badgeColor: "bg-lime-100 text-lime-800",
      image: "/girls-hostel-room-elegant.png",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-3xl md:text-5xl text-foreground mb-4">
            Choose Your Perfect
            <span className="text-primary block">Living Space</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover accommodation options tailored to your preferences and lifestyle at Sathyabama College.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`${category.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={`${category.badgeColor} font-body font-medium`}>{category.capacity}</Badge>
                </div>
              </div>

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 ${category.iconColor} bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}
                >
                  <category.icon className="w-8 h-8" />
                </div>
                <CardTitle className="font-heading font-bold text-2xl text-card-foreground">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="font-body text-muted-foreground text-center">{category.description}</p>

                <div className="space-y-2">
                  <h4 className="font-heading font-semibold text-card-foreground">Features:</h4>
                  <ul className="grid grid-cols-2 gap-1 text-sm font-body text-muted-foreground">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center pt-4 border-t border-border">
                  <div className="mb-4">
                    <span className="font-heading font-black text-2xl text-primary">{category.price}</span>
                  </div>
                  <Link href={`/hostels?type=${category.id}`}>
                    <Button className="w-full font-body font-semibold">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
