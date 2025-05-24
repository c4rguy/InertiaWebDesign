"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileIcon, Play, Settings, Save, Command } from "lucide-react"

interface CommandPaletteProps {
  onClose: () => void
  scripts: Array<{ id: string; name: string }>
  onSelectScript: (id: string) => void
  onExecute: () => void
}

export function CommandPalette({ onClose, scripts, onSelectScript, onExecute }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredScripts = scripts.filter((script) => script.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    // input focus on amount
    inputRef.current?.focus()

    // exit on escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filteredScripts.length + 3))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredScripts.length + 3) % (filteredScripts.length + 3))
      } else if (e.key === "Enter") {
        e.preventDefault()
        handleSelect(selectedIndex)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, filteredScripts.length])

  const handleSelect = (index: number) => {
    if (index < filteredScripts.length) {
      onSelectScript(filteredScripts[index].id)
    } else if (index === filteredScripts.length) {
      onExecute()
    } else if (index === filteredScripts.length + 1) {
      // Settings
      onClose()
    } else if (index === filteredScripts.length + 2) {
      // Save
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Lua scripts..."
            className="w-full bg-transparent border-0 border-b border-zinc-800 rounded-none py-3 pl-10 pr-4 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <ScrollArea className="max-h-80">
          <div className="p-1">
            <div className="py-1 px-3 text-xs text-zinc-500 uppercase">Lua Scripts</div>
            {filteredScripts.map((script, index) => (
              <div
                key={script.id}
                className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${selectedIndex === index ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"}`}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <FileIcon className="h-4 w-4 text-blue-400 mr-2" />
                <span className="ml-2 text-sm">{script.name}</span>
              </div>
            ))}

            <div className="py-1 px-3 text-xs text-zinc-500 uppercase mt-2">Commands</div>
            <div
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${selectedIndex === filteredScripts.length ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"}`}
              onClick={() => handleSelect(filteredScripts.length)}
              onMouseEnter={() => setSelectedIndex(filteredScripts.length)}
            >
              <Play className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">Execute Current Script</span>
              <kbd className="ml-auto bg-zinc-800 px-1.5 py-0.5 text-xs rounded text-zinc-400">⌘↵</kbd>
            </div>
            <div
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${selectedIndex === filteredScripts.length + 1 ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"}`}
              onClick={() => handleSelect(filteredScripts.length + 1)}
              onMouseEnter={() => setSelectedIndex(filteredScripts.length + 1)}
            >
              <Settings className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm">Open Settings</span>
              <kbd className="ml-auto bg-zinc-800 px-1.5 py-0.5 text-xs rounded text-zinc-400">⌘,</kbd>
            </div>
            <div
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${selectedIndex === filteredScripts.length + 2 ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"}`}
              onClick={() => handleSelect(filteredScripts.length + 2)}
              onMouseEnter={() => setSelectedIndex(filteredScripts.length + 2)}
            >
              <Save className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm">Save Current Script</span>
              <kbd className="ml-auto bg-zinc-800 px-1.5 py-0.5 text-xs rounded text-zinc-400">⌘S</kbd>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-zinc-800 p-2 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center">
            <Command className="h-3 w-3 mr-1" />
            <span>Command Palette</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span>↑↓</span>
              <span className="ml-1">to navigate</span>
            </div>
            <div className="flex items-center">
              <span>↵</span>
              <span className="ml-1">to select</span>
            </div>
            <div className="flex items-center">
              <span>esc</span>
              <span className="ml-1">to close</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
