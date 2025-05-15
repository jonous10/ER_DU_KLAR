"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { Separator } from "./separator";
import { AccountCircleIcon, HomeIcon, SettingsIcon } from "@/components/ui/icons"
import { SettingsPopover } from "./settings-popover";
import { AccountPopover } from "./account-popover";


interface HeaderProps {
    lan: string
}
export default function Header({ lan }: HeaderProps) {
    return (
        <div>
            <NavigationMenu className="p-2">
                <div className="w-screen">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link
                            href="http://localhost:3000"
                            legacyBehavior passHref
                            >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <HomeIcon/>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <AccountPopover/>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="ml-auto mr-0">
                            <div className="flex flex-row gap-4">
                                <SettingsPopover/>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
            <Separator></Separator>
        </div>
    )
}