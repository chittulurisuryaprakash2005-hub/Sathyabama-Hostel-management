"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  BookOpen,
  Headphones,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

export function EnhancedFeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Round-the-clock security with CCTV monitoring and secure access control",
      highlight: "Premium",
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Unlimited high-speed WiFi with dedicated bandwidth for each room",
      highlight: "Free",
    },
    {
      icon: Utensils,
      title: "Nutritious Meals",
      description: "Healthy, hygienic meals prepared by professional chefs with varied menu",
      highlight: "3 Meals",
    },
    {
      icon: Car,
      title: "Transport Service",
      description: "Regular shuttle service to campus and nearby areas",
      highlight: "Daily",
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Well-equipped gym with modern equipment and fitness programs",
      highlight: "24/7 Access",
    },
    {
      icon: BookOpen,
      title: "Study Rooms",
      description: "Quiet study spaces with comfortable seating and proper lighting",
      highlight: "Silent Zone",
    },
    {
      icon: Headphones,
      title: "Recreation Area",
      description: "Gaming zone, TV lounge, and entertainment facilities for relaxation",
      highlight: "Fun Zone",
    },
    {
      icon: Users,
      title: "Community Events",
      description: "Regular cultural events, workshops, and networking opportunities",
      highlight: "Monthly",
    },
  ]

  const services = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for any issues or emergencies",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Strategic location near campus with easy access to amenities",
    },
    {
      icon: Phone,
      title: "Emergency Response",
      description: "Quick response team for medical and other emergencies",
    },
    {
      icon: Mail,
      title: "Mail Service",
      description: "Secure mail and package handling service",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Premium Amenities & Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the best student living with our comprehensive range of facilities designed for your comfort,
            safety, and academic success.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                    {feature.highlight}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <div className="bg-blue-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
            <p className="text-blue-100 mb-6">
              Our team is available 24/7 to answer your questions and help you find the perfect accommodation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>hostel@sathyabama.ac.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
