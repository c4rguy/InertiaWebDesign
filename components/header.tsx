"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SettingsMenu } from "@/components/settings-menu"
import { UserMenu } from "@/components/user-menu"
import { Search, Play, PanelLeft } from "lucide-react"

interface HeaderProps {
  toggleCommandPalette: () => void
  toggleSidebar: () => void
  isSidebarCollapsed: boolean
  executeScript: () => void
}

export function Header({ toggleCommandPalette, toggleSidebar, isSidebarCollapsed, executeScript }: HeaderProps) {
  return (
    <header className="h-12 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm flex items-center px-2 justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-zinc-400 hover:text-white">
          <PanelLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center ml-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xs mr-2"
          >
            I
          </motion.div>
          <span className="font-semibold text-white">Intertia</span>
          <span className="text-zinc-500 ml-2 text-xs">Lua Executor</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCommandPalette}
          className="text-zinc-400 hover:text-white flex items-center gap-1"
        >
          <Search className="h-4 w-4" />
          <span>Scripts</span>
          <kbd className="ml-1 bg-zinc-800 px-1.5 py-0.5 text-xs rounded text-zinc-400">⌘P</kbd>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white flex items-center gap-1"
          onClick={executeScript}
        >
          <Play className="h-4 w-4 mr-1" />
          <span>Execute</span>
          <kbd className="ml-1 bg-zinc-800 px-1.5 py-0.5 text-xs rounded text-zinc-400">⌘↵</kbd>
        </Button>

        <SettingsMenu />
        <UserMenu />
      </div>
    </header>
  )
}
