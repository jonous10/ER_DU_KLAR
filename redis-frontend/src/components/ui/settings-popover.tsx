import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SettingsIcon } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSelector } from "./language-select"

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><SettingsIcon/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto m-4 flex flex-col gap-2 items-end">
          <ThemeToggle/>
          <LanguageSelector/>
      </PopoverContent>
    </Popover>
  )
}
