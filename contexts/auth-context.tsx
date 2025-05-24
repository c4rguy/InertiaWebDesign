"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const savedAuth = localStorage.getItem("intertia-auth")
    if (savedAuth) {
      try {
        setUser(JSON.parse(savedAuth))
      } catch (e) {
        console.error("Failed to parse auth:", e)
        localStorage.removeItem("intertia-auth")
      }
    } else if (pathname !== "/" && pathname !== "/login") {
      // Redirect to login if not authenticated and not already on login page
      router.push("/")
    }
  }, [pathname, router])

  const login = async (username: string, password: string) => {
    // In a real app, you'd validate credentials with an API
    // For demo, we'll just set the user
    const user = { username }
    setUser(user)
    localStorage.setItem("intertia-auth", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("intertia-auth")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
