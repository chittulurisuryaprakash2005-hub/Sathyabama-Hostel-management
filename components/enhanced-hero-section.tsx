"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Shield, Wifi, Car, Utensils, Star, Users, MapPin } from "lucide-react"

export function EnhancedHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/geometric-overlay.png')] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">🏆 Rated #1 Hostel in Chennai</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight font-heading">
                Welcome Home!
                <span className="block text-lime-400">Your Adventure Awaits</span>
              </h1>
              <p className="text-xl text-green-100 leading-relaxed max-w-lg font-body">
                Experience premium student living at Sathyabama with modern amenities, 24/7 security, and a vibrant
                community of scholars ready to explore the city like locals.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-lime-400" />
                <span className="text-sm font-body">24/7 Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-lime-400" />
                <span className="text-sm font-body">High-Speed WiFi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-lime-400" />
                <span className="text-sm font-body">Nutritious Meals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-lime-400" />
                <span className="text-sm font-body">Transport Service</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400 font-heading">500+</div>
                <div className="text-sm text-green-200 font-body">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400 font-heading">4.8</div>
                <div className="text-sm text-green-200 flex items-center font-body">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400 font-heading">6</div>
                <div className="text-sm text-green-200 font-body">Hostel Buildings</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hostels">
                <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-green-900 font-semibold font-body">
                  Explore Hostels
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent font-body"
                >
                  Schedule Visit
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-hostel-modern.png"
                alt="Sathyabama Hostel Building"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-heading">Premium Co-Living</h3>
                    <p className="text-sm text-gray-600 flex items-center font-body">
                      <MapPin className="h-4 w-4 mr-1" />
                      Sathyabama Campus, Chennai
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 font-heading">₹8,500</div>
                    <div className="text-xs text-gray-500 font-body">per month</div>
                  </div>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-xs text-gray-600 font-body">
                    <Users className="h-3 w-3 mr-1" />
                    87% Occupied
                  </div>
                  <div className="flex items-center text-xs text-gray-600 font-body">
                    <Star className="h-3 w-3 mr-1 fill-current text-lime-500" />
                    4.9 Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
