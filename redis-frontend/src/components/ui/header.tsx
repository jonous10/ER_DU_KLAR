"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { Separator } from "./separator";
import { SettingsPopover } from "./settings-popover";
import { AccountPopover } from "./account-popover";
import image from "@/images/politiet.png"
import Image from "next/image";


export default function Header() {
    return (
        <div>
            <NavigationMenu className="p-2">
                <div className="w-screen">
                    <NavigationMenuList className="flex flex-col sm:flex-row">
                        <NavigationMenuItem>
                            <Image
                                className="w-40 cursor-pointer"
                                src={image}
                                alt={""}
                                onClick={() => window.location.href = "/"}
                            />
                        </NavigationMenuItem>

                        

                        <NavigationMenuItem className="ml-auto mr-0">
                            <div className="flex flex-row gap-4">
                                <AccountPopover/>
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