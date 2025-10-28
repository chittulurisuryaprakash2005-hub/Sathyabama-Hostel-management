"use client"
import type React from "react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex h-screen bg-background">
        <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title="Admin Dashboard" />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
