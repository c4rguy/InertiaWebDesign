"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { Terminal, ChevronUp, ChevronDown, AlertCircle, AlertTriangle } from "lucide-react"

interface StatusBarProps {
  activeScript: {
    name: string
    lastModified: Date
  }
  toggleOutput: () => void
  outputVisible: boolean
  errorCount: number
  warningCount: number
}

export function StatusBar({ activeScript, toggleOutput, outputVisible, errorCount, warningCount }: StatusBarProps) {
  const { theme } = useTheme()

  return (
    <div className="h-6 bg-zinc-900/80 border-t border-zinc-800/50 flex items-center justify-between px-3 text-xs text-zinc-400">
      <div className="flex items-center gap-3">
        <span>{activeScript.name}</span>
        <span>Lua</span>
        {errorCount > 0 && (
          <span className="flex items-center text-red-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            {errorCount} {errorCount === 1 ? "error" : "errors"}
          </span>
        )}
        {warningCount > 0 && (
          <span className="flex items-center text-yellow-500">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {warningCount} {warningCount === 1 ? "warning" : "warnings"}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleOutput}
          className="h-5 px-1 text-zinc-400 hover:text-white flex items-center gap-1"
        >
          <Terminal className="h-3 w-3" />
          {outputVisible ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
        </Button>
      </div>
    </div>
  )
}
