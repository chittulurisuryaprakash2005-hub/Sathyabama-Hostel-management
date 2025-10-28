import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Shield, Wifi } from "lucide-react"

export function HeroSection() {
  const features = [
    {
      icon: Building2,
      title: "Modern Facilities",
      description: "Well-equipped rooms with all essential amenities",
    },
    {
      icon: Users,
      title: "Community Living",
      description: "Connect with fellow students in a vibrant environment",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "24/7 security with CCTV monitoring and access control",
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "Reliable WiFi connectivity for all your academic needs",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Welcome to Your
            <span className="text-primary block">Home Away From Home</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience comfortable, secure, and modern living at Sathyabama College. Choose from our co-living spaces,
            boys' hostels, or girls' hostels designed for your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-body font-semibold text-lg px-8 py-3">
              Explore Hostels
            </Button>
            <Button variant="outline" size="lg" className="font-body font-semibold text-lg px-8 py-3 bg-transparent">
              Virtual Tour
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">{feature.title}</h3>
                <p className="font-body text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
