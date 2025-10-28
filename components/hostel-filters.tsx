"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface HostelFiltersProps {
  onFilterChange: (filters: FilterState) => void
  onSearchChange: (search: string) => void
}

export interface FilterState {
  type: string[]
  availability: string[]
  priceRange: [number, number]
}

export function HostelFilters({ onFilterChange, onSearchChange }: HostelFiltersProps) {
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    availability: [],
    priceRange: [0, 10000],
  })

  const hostelTypes = [
    { value: "co-living", label: "Co-Living", color: "bg-blue-100 text-blue-800" },
    { value: "boys", label: "Boys Hostel", color: "bg-green-100 text-green-800" },
    { value: "girls", label: "Girls Hostel", color: "bg-pink-100 text-pink-800" },
  ]

  const availabilityOptions = [
    { value: "available", label: "Available", color: "bg-green-100 text-green-800" },
    { value: "limited", label: "Limited", color: "bg-yellow-100 text-yellow-800" },
    { value: "full", label: "Full", color: "bg-red-100 text-red-800" },
  ]

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onSearchChange(value)
  }

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const newFilters = { ...filters }
    if (category === "type" || category === "availability") {
      const currentValues = newFilters[category] as string[]
      if (currentValues.includes(value)) {
        newFilters[category] = currentValues.filter((v) => v !== value)
      } else {
        newFilters[category] = [...currentValues, value]
      }
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      type: [],
      availability: [],
      priceRange: [0, 10000] as [number, number],
    }
    setFilters(clearedFilters)
    setSearch("")
    onFilterChange(clearedFilters)
    onSearchChange("")
  }

  const hasActiveFilters = filters.type.length > 0 || filters.availability.length > 0 || search.length > 0

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-bold text-lg text-card-foreground">Filter Hostels</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search hostels by name or location..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 font-body"
        />
      </div>

      {/* Hostel Type Filters */}
      <div className="mb-6">
        <h4 className="font-heading font-semibold text-card-foreground mb-3">Hostel Type</h4>
        <div className="flex flex-wrap gap-2">
          {hostelTypes.map((type) => (
            <Badge
              key={type.value}
              variant={filters.type.includes(type.value) ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 font-body ${
                filters.type.includes(type.value) ? "bg-primary text-primary-foreground" : type.color
              }`}
              onClick={() => toggleFilter("type", type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Availability Filters */}
      <div>
        <h4 className="font-heading font-semibold text-card-foreground mb-3">Availability</h4>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((option) => (
            <Badge
              key={option.value}
              variant={filters.availability.includes(option.value) ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 font-body ${
                filters.availability.includes(option.value) ? "bg-primary text-primary-foreground" : option.color
              }`}
              onClick={() => toggleFilter("availability", option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
