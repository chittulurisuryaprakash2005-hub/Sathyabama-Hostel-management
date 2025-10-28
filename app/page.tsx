import { Navigation } from "@/components/navigation"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { HostelCategories } from "@/components/hostel-categories"
import { EnhancedFeaturesSection } from "@/components/enhanced-features-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <EnhancedHeroSection />
        <HostelCategories />
        <EnhancedFeaturesSection />
      </main>
    </div>
  )
}
