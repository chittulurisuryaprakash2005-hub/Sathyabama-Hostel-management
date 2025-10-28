"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HostelFilters, type FilterState } from "@/components/hostel-filters"
import { HostelCard } from "@/components/hostel-card"
import { hostelsData, type Hostel } from "@/lib/hostel-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Grid, List } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function HostelsPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    availability: [],
    priceRange: [0, 10000],
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam) {
      const typeMapping: { [key: string]: string } = {
        "co-living": "co-living",
        "boys-hostel": "boys",
        "girls-hostel": "girls",
      }
      const filterType = typeMapping[typeParam] || typeParam
      setFilters((prev) => ({
        ...prev,
        type: [filterType],
      }))
    }
  }, [searchParams.get("type")]) // Use specific parameter value instead of entire searchParams object

  const filteredHostels = useMemo(() => {
    return hostelsData.filter((hostel) => {
      const matchesSearch =
        searchTerm === "" ||
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = filters.type.length === 0 || filters.type.includes(hostel.type)

      const matchesAvailability =
        filters.availability.length === 0 || filters.availability.includes(hostel.availability)

      const matchesPrice =
        hostel.pricePerMonth >= filters.priceRange[0] && hostel.pricePerMonth <= filters.priceRange[1]

      return matchesSearch && matchesType && matchesAvailability && matchesPrice
    })
  }, [searchTerm, filters])

  const handleViewDetails = (hostel: Hostel) => {
    console.log("View details for:", hostel.name)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="font-body">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground">Available Hostels</h1>
              <p className="font-body text-muted-foreground mt-1">
                Find your perfect accommodation at Sathyabama College
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <HostelFilters onFilterChange={setFilters} onSearchChange={setSearchTerm} />

        <div className="flex justify-between items-center mb-6">
          <p className="font-body text-muted-foreground">
            Showing {filteredHostels.length} of {hostelsData.length} hostels
          </p>
        </div>

        {filteredHostels.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {filteredHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">No hostels found</h3>
            <p className="font-body text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more results.
            </p>
            <Button
              onClick={() => {
                setFilters({ type: [], availability: [], priceRange: [0, 10000] })
                setSearchTerm("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
