"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { useSettings } from "@/contexts/settings-context"
import { useTheme } from "@/contexts/theme-context"
import { FileExplorer } from "@/components/file-explorer"
import { OutputPanel } from "@/components/output-panel"
import { CommandPalette } from "@/components/command-palette"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatusBar } from "@/components/status-bar"
import { cn } from "@/lib/utils"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LuaScript {
  id: string
  name: string
  content: string
  lastModified: Date
}

export default function EditorPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { settings } = useSettings() as any
  const { theme } = useTheme()

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [isAwaitingNewScript, setIsAwaitingNewScript] = useState(false)
  const isAwaitingNewScriptRef = useRef(isAwaitingNewScript)

  // Sync ref with state
  useEffect(() => {
    isAwaitingNewScriptRef.current = isAwaitingNewScript
  }, [isAwaitingNewScript])

  const [scripts, setScripts] = useState<LuaScript[]>([
    { id: "script1", name: "Infinite Yield.lua", content: "-- code here", lastModified: new Date() },
    { id: "script2", name: "ESP.lua",           content: "-- code here", lastModified: new Date() },
    { id: "script3", name: "Aimbot.lua",        content: "-- code here", lastModified: new Date() },
  ])
  const [activeScriptId, setActiveScriptId] = useState("script1")
  const [openScripts, setOpenScripts] = useState<string[]>(["script1"])
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [outputVisible, setOutputVisible] = useState(true)
  const [output, setOutput] = useState<Array<{ type: string; content: string }>>([
    { type: "info", content: "Intertia Lua Executor initialized." },
    { type: "info", content: "Ready to execute Lua scripts." },
  ])

  // Listen for Monaco → Parent messages
  useEffect(() => {
  let lastScriptCreatedAt = 0

  const handler = (event: MessageEvent) => {
    const msg = event.data
    if (msg?.type === "RESPONSE_CONTENT") {
      if (!isAwaitingNewScriptRef.current) return

      const now = Date.now()
      if (now - lastScriptCreatedAt < 1000) {
        // Ignore if last script was created less than 1 second ago
        return
      }

      lastScriptCreatedAt = now
      setIsAwaitingNewScript(false)

      setScripts((prevScripts) => {
        let id: string
        do {
          id = `script${Date.now()}_${Math.floor(Math.random() * 10000)}`
        } while (prevScripts.some((s) => s.id === id))

        const newScript = {
          id,
          name: "New Script.lua",
          content: msg.content as string,
          lastModified: new Date(),
        }
        setOpenScripts((prev) => [...prev, id])
        setActiveScriptId(id)
        return [...prevScripts, newScript]
      })
    }
  }

  window.addEventListener("message", handler)
  return () => window.removeEventListener("message", handler)
}, [])




  // Helper to send a load command to Monaco iframe
  const loadIntoMonaco = (content: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "LOAD_SCRIPT", content },
      "*"
    )
  }

  // On sidebar script click
  const openScript = (id: string) => {
    if (!openScripts.includes(id)) setOpenScripts([...openScripts, id])
    setActiveScriptId(id)
    const script = scripts.find((s) => s.id === id)
    if (script) loadIntoMonaco(script.content)
  }

  // On "+" click: ask Monaco for its current contents
  const addNewScript = () => {
    if (isAwaitingNewScript) return
    setIsAwaitingNewScript(true)
    iframeRef.current?.contentWindow?.postMessage({ type: "REQUEST_CONTENT" }, "*")
  }

  const executeScript = () => {
    const active = scripts.find((s) => s.id === activeScriptId)
    if (!active) return
    setOutput((prev) => [...prev, { type: "command", content: `Executing ${active.name}...` }])
    setTimeout(() => {
      setOutput((prev) => [...prev, { type: "success", content: `${active.name} executed successfully.` }])
    }, 500)
  }

  const clearOutput = () => setOutput([])

  const toggleCommandPalette = () => setIsCommandPaletteOpen((o) => !o)

  const closeScript = (id: string) => {
    if (openScripts.length > 1) {
      const remaining = openScripts.filter((sid) => sid !== id)
      setOpenScripts(remaining)
      if (activeScriptId === id) setActiveScriptId(remaining[remaining.length - 1])
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") { e.preventDefault(); toggleCommandPalette() }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); executeScript() }
      if ((e.ctrlKey || e.metaKey) && e.key === "n") { e.preventDefault(); addNewScript() }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [activeScriptId, scripts])

  if (!isAuthenticated) return null

  return (
    <div className={cn("h-screen flex flex-col bg-zinc-950 text-zinc-200 overflow-hidden", `theme-${theme}`)}>
      <Header
        toggleCommandPalette={toggleCommandPalette}
        toggleSidebar={() => setIsSidebarCollapsed((c) => !c)}
        isSidebarCollapsed={isSidebarCollapsed}
        executeScript={executeScript}
      />

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence initial={false}>
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-[300px] h-full border-r border-zinc-800/50"
            >
              <Sidebar>
                <FileExplorer
                  scripts={scripts}
                  activeScriptId={activeScriptId}
                  onSelectScript={openScript}
                  onAddScript={addNewScript}
                />
              </Sidebar>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Monaco iframe */}
        <motion.div layout className="overflow-hidden p-0" style={{ width: "calc(100% - 300px)" }}>
          <iframe
            ref={iframeRef}
            src="/monaco-main/index.html"
            className="w-full h-full border-none"
            title="Monaco Editor"
          />
        </motion.div>

        <AnimatePresence initial={false}>
          {outputVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 200, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-zinc-800/50"
            >
              <OutputPanel
                output={output}
                errors={[]}
                onClear={clearOutput}
                onClose={() => setOutputVisible(false)}
                onExecute={executeScript}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StatusBar
        activeScript={scripts.find((s) => s.id === activeScriptId)!}
        toggleOutput={() => setOutputVisible((v) => !v)}
        outputVisible={outputVisible}
        errorCount={0}
        warningCount={0}
      />

      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette
            onClose={() => setIsCommandPaletteOpen(false)}
            scripts={scripts}
            onSelectScript={(id) => { openScript(id); setIsCommandPaletteOpen(false) }}
            onExecute={() => { executeScript(); setIsCommandPaletteOpen(false) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
