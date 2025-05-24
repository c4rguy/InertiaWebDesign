"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FileIcon, FolderIcon, StarIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileItem[]
  expanded?: boolean
  favorite?: boolean
}

export function FileTree() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "workspace",
      name: "Workspace",
      type: "folder",
      expanded: true,
      children: [
        { id: "file1", name: "Infinite Yield.txt", type: "file" },
        { id: "file2", name: "Dev Explorer.txt", type: "file" },
      ],
    },
    {
      id: "favorites",
      name: "Favorites",
      type: "folder",
      expanded: true,
      favorite: true,
      children: [],
    },
  ])

  const toggleFolder = (id: string) => {
    setFiles((prevFiles) => {
      const updateItem = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, expanded: !item.expanded }
          }
          if (item.children) {
            return { ...item, children: updateItem(item.children) }
          }
          return item
        })
      }
      return updateItem(prevFiles)
    })
  }

  const renderFileTree = (items: FileItem[]) => {
    return items.map((item) => (
      <div key={item.id} className="select-none">
        <div
          className="flex items-center py-1 px-2 hover:bg-zinc-800 rounded cursor-pointer"
          onClick={() => item.type === "folder" && toggleFolder(item.id)}
        >
          {item.type === "folder" ? (
            <span className="mr-1">
              {item.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          ) : (
            <span className="ml-4 mr-1"></span>
          )}

          {item.type === "folder" ? (
            <FolderIcon className="h-4 w-4 mr-2 text-zinc-400" />
          ) : (
            <FileIcon className="h-4 w-4 mr-2 text-zinc-400" />
          )}

          <span className="text-sm">{item.name}</span>

          {item.favorite && <StarIcon className="h-4 w-4 ml-auto text-yellow-500" />}
        </div>

        {item.type === "folder" && item.expanded && item.children && (
          <div className="pl-4">{renderFileTree(item.children)}</div>
        )}
      </div>
    ))
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">{renderFileTree(files)}</div>
    </ScrollArea>
  )
}
