"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./separator";

export default function Header() {
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
                                    <image 
                                    
                                    />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="ml-auto mr-0">
                            <div className="flex flex-row gap-4">
                                <ThemeToggle/>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
            <Separator></Separator>
        </div>
    )
}