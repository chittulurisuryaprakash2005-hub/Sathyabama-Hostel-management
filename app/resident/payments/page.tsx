"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Calendar, AlertCircle } from "lucide-react"
import { currentResident, paymentHistory } from "@/lib/resident-portal-data"

export default function ResidentPaymentsPage() {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case "monthly-rent":
        return "Monthly Rent"
      case "security-deposit":
        return "Security Deposit"
      case "fine":
        return "Fine"
      case "refund":
        return "Refund"
      default:
        return type
    }
  }

  const nextPaymentDays = Math.ceil(
    (new Date(currentResident.paymentInfo.nextDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Current Status</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <Badge className={`${getPaymentStatusColor(currentResident.paymentInfo.status)} font-body text-sm`}>
              {currentResident.paymentInfo.status.toUpperCase()}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2 font-body">
              Last payment: {new Date(currentResident.paymentInfo.lastPaymentDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">{nextPaymentDays} days</div>
            <p className="text-xs text-muted-foreground font-body">
              Due: {new Date(currentResident.paymentInfo.nextDueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body text-muted-foreground">Monthly Rent</CardTitle>
            <CreditCard className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-heading">₹{currentResident.roomInfo.monthlyRent}</div>
            <p className="text-xs text-muted-foreground font-body">
              Security deposit: ₹{currentResident.paymentInfo.securityDeposit}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Payment Due */}
      {nextPaymentDays <= 7 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-orange-800">Payment Due Soon</h3>
                <p className="font-body text-sm text-orange-700">
                  Your next payment of ₹{currentResident.roomInfo.monthlyRent} is due in {nextPaymentDays} days.
                </p>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">Pay Now</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading font-bold">Payment History</CardTitle>
            <Button variant="outline" size="sm" className="font-body bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-heading font-semibold">Date</TableHead>
                  <TableHead className="font-heading font-semibold">Type</TableHead>
                  <TableHead className="font-heading font-semibold">Amount</TableHead>
                  <TableHead className="font-heading font-semibold">Method</TableHead>
                  <TableHead className="font-heading font-semibold">Status</TableHead>
                  <TableHead className="font-heading font-semibold">Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-body">{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell className="font-body">{getPaymentTypeLabel(payment.type)}</TableCell>
                    <TableCell className="font-body font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="font-body capitalize">{payment.method.replace("-", " ")}</TableCell>
                    <TableCell>
                      <Badge className={`${getPaymentStatusColor(payment.status)} font-body text-xs`}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="font-body text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        {payment.receiptNumber}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading font-bold">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-heading font-semibold mb-2">Online Payment</h4>
              <p className="font-body text-sm text-muted-foreground mb-3">
                Pay securely using UPI, Net Banking, or Cards
              </p>
              <Button className="w-full font-body">Pay Online</Button>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-heading font-semibold mb-2">Bank Transfer</h4>
              <p className="font-body text-sm text-muted-foreground mb-3">Transfer directly to hostel account</p>
              <Button variant="outline" className="w-full font-body bg-transparent">
                Get Details
              </Button>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-heading font-semibold mb-2">Demand Draft</h4>
              <p className="font-body text-sm text-muted-foreground mb-3">Submit DD at the hostel office</p>
              <Button variant="outline" className="w-full font-body bg-transparent">
                Instructions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
