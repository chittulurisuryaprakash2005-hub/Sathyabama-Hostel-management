"use client"
import type React from "react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { ResidentSidebar } from "@/components/resident-sidebar"
import { ResidentHeader } from "@/components/resident-header"

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute allowedRoles={["resident"]}>
      <div className="flex h-screen bg-background">
        <ResidentSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ResidentHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title="Resident Portal" />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
