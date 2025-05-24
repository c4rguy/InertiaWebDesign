"use client"

import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Files, BookOpen, Star } from "lucide-react"

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="h-full flex flex-col bg-zinc-900/30">
      <Tabs defaultValue="scripts" className="flex-1 flex flex-col">
        <TabsList className="bg-zinc-900/50 border-b border-zinc-800/50 rounded-none justify-start px-2 h-10">
          <TabsTrigger value="scripts" className="data-[state=active]:bg-zinc-800/50 rounded-md">
            <Files className="h-4 w-4 mr-1" />
            <span>Scripts</span>
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-zinc-800/50 rounded-md">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Docs</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-zinc-800/50 rounded-md">
            <Star className="h-4 w-4 mr-1" />
            <span>Favorites</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scripts" className="flex-1 p-0 m-0">
          {children}
        </TabsContent>
        <TabsContent value="docs" className="flex-1 p-4">
          <div className="text-sm text-zinc-400">
            <h3 className="font-medium text-white mb-2">Lua Documentation</h3>
            <p className="mb-2">Quick reference for Roblox Lua functions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <code className="bg-zinc-800 px-1 rounded">print()</code> - Output text to console
              </li>
              <li>
                <code className="bg-zinc-800 px-1 rounded">wait()</code> - Pause execution
              </li>
              <li>
                <code className="bg-zinc-800 px-1 rounded">game:GetService()</code> - Access Roblox services
              </li>
              <li>
                <code className="bg-zinc-800 px-1 rounded">Instance.new()</code> - Create new instances
              </li>
              <li>
                <code className="bg-zinc-800 px-1 rounded">workspace</code> - Access the game workspace
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1 p-4">
          <div className="text-sm text-zinc-400">
            <p>No favorite scripts yet.</p>
            <p className="mt-2">Star your frequently used scripts to add them here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
