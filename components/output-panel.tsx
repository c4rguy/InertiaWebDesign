"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Trash, Play, Terminal, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import type { LuaError } from "@/components/code-editor"

interface OutputPanelProps {
  output: Array<{ type: string; content: string }>
  errors: LuaError[]
  onClear: () => void
  onClose: () => void
  onExecute: () => void
}

export function OutputPanel({ output, errors, onClear, onClose, onExecute }: OutputPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
      case "command":
        return <Terminal className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
      default:
        return <Terminal className="h-4 w-4 text-zinc-500 mr-2 flex-shrink-0" />
    }
  }

  const getTextColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
        return "text-blue-500"
      case "success":
        return "text-green-500"
      case "command":
        return "text-purple-500"
      default:
        return "text-zinc-300"
    }
  }

  return (
    <div className="h-full bg-zinc-900/30 flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-zinc-800/50">
        <div className="flex items-center">
          <Terminal className="h-4 w-4 mr-2 text-zinc-400" />
          <h3 className="text-sm font-medium text-zinc-300">Output</h3>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-white" onClick={onExecute}>
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-white" onClick={onClear}>
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="console" className="flex-1 flex flex-col">
        <TabsList className="bg-zinc-900/50 border-b border-zinc-800/50 rounded-none justify-start px-2 h-8">
          <TabsTrigger value="console" className="text-xs h-7 data-[state=active]:bg-zinc-800/50 rounded-md">
            Console
          </TabsTrigger>
          <TabsTrigger value="problems" className="text-xs h-7 data-[state=active]:bg-zinc-800/50 rounded-md">
            Problems {errors.length > 0 && `(${errors.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="console" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-2 font-mono text-sm">
              {output.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start py-1"
                >
                  {getIcon(item.type)}
                  <span className={getTextColor(item.type)}>{item.content}</span>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="problems" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full">
            <div className="p-2 font-mono text-sm">
              {errors.length === 0 ? (
                <div className="flex items-center justify-center h-full text-zinc-500 py-4">No problems detected</div>
              ) : (
                errors.map((error, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start py-1 border-b border-zinc-800/30 last:border-0"
                  >
                    {error.type === "error" ? (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex flex-col">
                      <span className={error.type === "error" ? "text-red-500" : "text-yellow-500"}>
                        {error.message}
                      </span>
                      <span className="text-zinc-500 text-xs">Line {error.line}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
