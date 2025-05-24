"use client"

import { User, LogOut, ChevronDown, Settings, HelpCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function UserMenu() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{user?.username || "User"}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end">
        <DropdownMenuLabel className="text-zinc-300">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
          <User className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
          <Settings className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Preferences</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
          <HelpCircle className="mr-2 h-4 w-4 text-zinc-400" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuItem onClick={logout} className="text-red-500 focus:bg-red-900/20 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
