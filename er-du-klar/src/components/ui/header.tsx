"use client"

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./navigation-menu";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./separator";
import language_data from "@/data-test/data.json"
import home from "@/icons/home.png"
import Image from "next/image";


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
                                    <img src="@/icons/home.png"/>
                                    <p>{language_data.home[lan as keyof typeof language_data.home] || language_data.home.en}</p>
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