import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AccountCircleIcon } from "./icons"
import LoginCard from "./login-card"

export function AccountPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><AccountCircleIcon/></Button>
      </PopoverTrigger>
    <PopoverContent className="w-120 flex justify-center items-center p-2 m-4">
      <LoginCard /> 
    </PopoverContent>
    </Popover>
  )
}
