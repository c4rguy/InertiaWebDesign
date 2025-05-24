"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Settings {
  autoInject: boolean
  autoExecute: boolean
  formatOnSave: boolean
  lineWrapping: boolean
  tabSize: number
}

interface SettingsContextType {
  settings: Settings
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

const defaultSettings: Settings = {
  autoInject: false,
  autoExecute: false,
  formatOnSave: true,
  lineWrapping: false,
  tabSize: 2,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem("intertia-settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse settings:", e)
      }
    }
  }, [])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value }
      // Save to localStorage
      localStorage.setItem("intertia-settings", JSON.stringify(newSettings))
      return newSettings
    })
  }

  return <SettingsContext.Provider value={{ settings, updateSetting }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
