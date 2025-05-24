"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Resizable } from "@/components/resizable"
import { CodeEditor } from "@/components/code-editor"
import { FileTree } from "@/components/file-tree"
import { Console } from "@/components/console"
import { SettingsMenu } from "@/components/settings-menu"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"
import { useSettings } from "@/contexts/settings-context"
import { PlusIcon, SearchIcon, XIcon, PlayIcon, SaveIcon, TrashIcon } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { settings } = useSettings()

  const [tabs, setTabs] = useState([
    { id: "tab1", name: "Untitled Tab", content: "// Welcome to Intertia!\n\n", language: "javascript" },
    {
      id: "tab2",
      name: "Untitled Tab",
      content: "function hello() {\n  console.log('Hello world');\n}",
      language: "javascript",
    },
    {
      id: "tab3",
      name: "Untitled Tab",
      content:
        "import React from 'react';\n\nconst App = () => {\n  return <div>Hello React</div>;\n}\n\nexport default App;",
      language: "jsx",
    },
  ])
  const [activeTab, setActiveTab] = useState("tab1")
  const [consoleOutput, setConsoleOutput] = useState([
    { time: "08:21:42", message: 'Test is not a valid member of Model "Workspace.Part"', type: "error" },
  ])

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const addNewTab = () => {
    const newId = `tab${tabs.length + 1}`
    setTabs([...tabs, { id: newId, name: "Untitled Tab", content: "", language: "javascript" }])
    setActiveTab(newId)
  }

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== id)
      setTabs(newTabs)
      if (activeTab === id) {
        setActiveTab(newTabs[0].id)
      }
    }
  }

  const updateTabContent = (id: string, content: string) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, content } : tab)))
  }

  const executeCode = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab)
    if (currentTab) {
      try {
        // In a real app, you'd have a safer way to execute code
        // This is just for demonstration
        const timestamp = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        setConsoleOutput([
          ...consoleOutput,
          { time: timestamp, message: `Executing ${currentTab.name}...`, type: "info" },
        ])

        // If autoInject is enabled, we would add some code here
        if (settings.autoInject) {
          setConsoleOutput([...consoleOutput, { time: timestamp, message: "Auto-injecting code...", type: "info" }])
        }
      } catch (error) {
        const timestamp = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        setConsoleOutput([...consoleOutput, { time: timestamp, message: String(error), type: "error" }])
      }
    }
  }

  const clearConsole = () => {
    setConsoleOutput([])
  }

  // Auto-execute if enabled
  useEffect(() => {
    if (settings.autoExecute && activeTab) {
      executeCode()
    }
  }, [activeTab, settings.autoExecute])

  if (!isAuthenticated) {
    return null // Don't render anything until we redirect
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex items-center justify-between p-2 bg-zinc-900 border-b border-zinc-800">
        <div className="font-bold text-lg">Intertia</div>
        <div className="flex items-center gap-2">
          <SettingsMenu />
          <UserMenu />
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <span className="sr-only">Minimize</span>
              <Separator className="h-0.5 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <span className="sr-only">Maximize</span>
              <div className="h-3 w-3 border border-current" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:bg-red-500/20">
              <span className="sr-only">Close</span>
              <XIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center bg-zinc-900 border-b border-zinc-800">
            <ScrollArea className="w-full" orientation="horizontal">
              <div className="flex">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`flex items-center h-9 px-4 border-r border-zinc-800 cursor-pointer ${activeTab === tab.id ? "bg-zinc-800" : "bg-zinc-900 hover:bg-zinc-800/50"}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="text-sm text-zinc-300 mr-2">{tab.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full hover:bg-zinc-700"
                      onClick={(e) => closeTab(tab.id, e)}
                    >
                      <XIcon className="h-3 w-3" />
                      <span className="sr-only">Close tab</span>
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none border-r border-zinc-800"
                  onClick={addNewTab}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">New tab</span>
                </Button>
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 overflow-hidden">
            {tabs.map((tab) => (
              <div key={tab.id} className={`h-full ${activeTab === tab.id ? "block" : "hidden"}`}>
                <CodeEditor
                  value={tab.content}
                  language={tab.language}
                  onChange={(value) => updateTabContent(tab.id, value)}
                  lineWrapping={settings.lineWrapping}
                  tabSize={settings.tabSize}
                />
              </div>
            ))}
          </div>

          <Resizable direction="up" defaultSize={150} minSize={100} maxSize={500}>
            <div className="bg-zinc-900 border-t border-zinc-800">
              <div className="flex items-center justify-between p-2 border-b border-zinc-800">
                <div className="text-sm font-medium">Output</div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={executeCode}>
                    <PlayIcon className="h-4 w-4" />
                    <span className="sr-only">Execute</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={clearConsole}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <SaveIcon className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                </div>
              </div>
              <Console output={consoleOutput} />
            </div>
          </Resizable>
        </div>

        <Resizable direction="left" defaultSize={250} minSize={200} maxSize={400}>
          <div className="h-full bg-zinc-900 border-l border-zinc-800">
            <div className="p-2 border-b border-zinc-800">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>
            <FileTree />
          </div>
        </Resizable>
      </div>

      <footer className="flex items-center justify-between p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-zinc-500">
        <div>Intertia v1.0.0</div>
      </footer>
    </div>
  )
}
