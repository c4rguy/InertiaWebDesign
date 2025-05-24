import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { SettingsProvider } from "@/contexts/settings-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Intertia - Advanced Code Editor",
  description: "A powerful code editor with syntax highlighting and advanced features",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
