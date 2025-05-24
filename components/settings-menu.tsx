"use client"

import { Settings, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useSettings } from "@/contexts/settings-context"
import { useTheme } from "@/contexts/theme-context"

export function SettingsMenu() {
  const { settings, updateSetting } = useSettings()
  const { theme, setTheme, themes } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white flex items-center gap-1">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end">
        <DropdownMenuLabel className="text-zinc-300">Editor Settings</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center justify-between cursor-default text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Auto Inject</span>
            <Switch
              checked={settings.autoInject}
              onCheckedChange={(checked) => updateSetting("autoInject", checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between cursor-default text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Auto Execute</span>
            <Switch
              checked={settings.autoExecute}
              onCheckedChange={(checked) => updateSetting("autoExecute", checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between cursor-default text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Format On Save</span>
            <Switch
              checked={settings.formatOnSave}
              onCheckedChange={(checked) => updateSetting("formatOnSave", checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center justify-between cursor-default text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Line Wrapping</span>
            <Switch
              checked={settings.lineWrapping}
              onCheckedChange={(checked) => updateSetting("lineWrapping", checked)}
              className="data-[state=checked]:bg-indigo-600"
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-zinc-900 border-zinc-800">
            <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as any)}>
              {themes.map((t) => (
                <DropdownMenuRadioItem
                  key={t.name}
                  value={t.name}
                  className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        background:
                          t.name === "dark"
                            ? "#333"
                            : t.name === "midnight"
                              ? "#1a1a2e"
                              : t.name === "synthwave"
                                ? "#241b2f"
                                : t.name === "matrix"
                                  ? "#0d1b0d"
                                  : t.name === "nord"
                                    ? "#2e3440"
                                    : "#333",
                      }}
                    />
                    {t.label}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-zinc-300 focus:bg-zinc-800 focus:text-white">
            <span>Tab Size</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-zinc-900 border-zinc-800">
            <DropdownMenuRadioGroup
              value={settings.tabSize.toString()}
              onValueChange={(value) => updateSetting("tabSize", Number.parseInt(value))}
            >
              {[2, 4, 8].map((size) => (
                <DropdownMenuRadioItem
                  key={size}
                  value={size.toString()}
                  className="text-zinc-300 focus:bg-zinc-800 focus:text-white"
                >
                  {size} spaces
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
