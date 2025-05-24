"use client"
import { motion } from "framer-motion"
import { FileIcon, MoreVertical, Plus, Trash, Edit, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Script {
  id: string
  name: string
}

interface FileExplorerProps {
  scripts: Script[]
  activeScriptId: string
  onSelectScript: (id: string) => void
  onAddScript: () => void
}

export function FileExplorer({ scripts, activeScriptId, onSelectScript, onAddScript }: FileExplorerProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-zinc-800/50">
        <h3 className="text-sm font-medium text-zinc-300">Scripts</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white" onClick={onAddScript}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {scripts.map((script) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-center px-2 py-1 rounded-md cursor-pointer group",
                activeScriptId === script.id
                  ? "bg-zinc-800/70 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-300",
              )}
              onClick={() => onSelectScript(script.id)}
            >
              <FileIcon className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm">{script.name}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-zinc-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 bg-zinc-900 border-zinc-800">
                  <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
                    <Copy className="h-4 w-4 mr-2" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500 focus:bg-red-900/20 focus:text-red-500">
                    <Trash className="h-4 w-4 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
