import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/components/auth-context"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Work_Sans, Open_Sans } from "next/font/google"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sathyabama Hostel Management",
  description: "Modern hostel management system for Sathyabama University",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable} antialiased`}>
      <head>
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-sans: ${openSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-work-sans: ${workSans.variable};
  --font-open-sans: ${openSans.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
