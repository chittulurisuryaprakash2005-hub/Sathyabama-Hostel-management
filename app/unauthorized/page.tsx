import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        <div className="mt-6">
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
