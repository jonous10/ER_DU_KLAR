"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, } from "./navigation-menu";
import { Separator } from "./separator";
import { SettingsPopover } from "./settings-popover";
import { AccountPopover } from "./account-popover";
import politiet_light from "@/images/politiet_light.png"
import politiet_dark from "@/images/politiet_dark.png"
import Image from "next/image";


export default function Header() {
    return (
        <div>
            <NavigationMenu className="p-2">
                <div className="w-screen">
                    <NavigationMenuList className="flex flex-col sm:flex-row">
                        <NavigationMenuItem>
                            <Image
                                className="w-40 cursor-pointer dark:hidden"
                                src={politiet_light}
                                alt={""}
                                onClick={() => window.location.href = "/"}
                            />
                            <Image
                                className="w-40 cursor-pointer hidden dark:block"
                                src={politiet_dark}
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