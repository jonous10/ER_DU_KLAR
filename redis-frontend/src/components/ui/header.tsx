"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { Separator } from "./separator";
import { SettingsPopover } from "./settings-popover";
import { AccountPopover } from "./account-popover";
import image from "@/images/politiet.png"
import Image from "next/image";


interface HeaderProps {
    lan: string
}
export default function Header({ lan }: HeaderProps) {
    return (
        <div>
            <NavigationMenu className="p-2">
                <div className="w-screen">
                    <NavigationMenuList className="flex flex-col sm:flex-row">
                        <NavigationMenuItem>
                            <Link
                            href="http://localhost:3000"
                            legacyBehavior passHref
                            >
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <Image 
                                        className="w-40"
                                        src={image} alt={""}/>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        

                        <NavigationMenuItem className="ml-auto mr-0">
                            <div className="flex flex-row gap-4">
                                <SettingsPopover/>
                                <AccountPopover/>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
            <Separator></Separator>
        </div>
    )
}