"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "dark" | "midnight" | "synthwave" | "matrix" | "nord"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { name: Theme; label: string }[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  const themes = [
    { name: "dark" as Theme, label: "Dark" },
    { name: "midnight" as Theme, label: "Midnight" },
    { name: "synthwave" as Theme, label: "Synthwave" },
    { name: "matrix" as Theme, label: "Matrix" },
    { name: "nord" as Theme, label: "Nord" },
  ]

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      "theme-dark",
      "theme-midnight",
      "theme-synthwave",
      "theme-matrix",
      "theme-nord",
    )
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`)

    // Save to localStorage
    localStorage.setItem("intertia-theme", theme)
  }, [theme])

  useEffect(() => {
    // Load from localStorage on initial render
    const savedTheme = localStorage.getItem("intertia-theme") as Theme | null
    if (savedTheme && themes.some((t) => t.name === savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
