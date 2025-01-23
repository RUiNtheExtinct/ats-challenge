"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { LOGO_FONT } from "@/lib/constants/fonts";
import { useUserState } from "@/store";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CustomIcon from "./icons";

export default function Navbar() {
    const { theme, setTheme } = useUserState();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDarkMode = () => {
        setTheme(theme === "light" ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme !== "dark");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="border-b z-30 sticky top-0 bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center">
                        <CustomIcon
                            className="size-8"
                            color={theme === "dark" ? "white" : "black"}
                        />
                        <span
                            className={`ml-2 text-xl font-bold ${LOGO_FONT.className}`}
                        >
                            {APP_NAME}
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={toggleDarkMode}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400"
                        >
                            {theme === "dark" ? (
                                <SunIcon className="size-4" />
                            ) : (
                                <MoonIcon className="size-4" />
                            )}
                        </Button>
                        <Button
                            onClick={toggleMenu}
                            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400"
                        >
                            <MenuIcon className="size-4" />
                        </Button>
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/home">Editor</Link>
                            <Link href="#features">Features</Link>
                            <Link href="#pricing">Pricing</Link>
                            <Link href="/about">About Us</Link>
                            <Button asChild>
                                <Link href="/home">Try Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="md:hidden absolute flex flex-col space-y-2 mt-2 rounded-lg shadow-lg w-full px-2 bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100"
                    >
                        <Link
                            href="/home"
                            className="border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                            Editor
                        </Link>
                        <Link
                            href="#features"
                            className="border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="border-b border-gray-200 dark:border-gray-700 pb-2"
                        >
                            About Us
                        </Link>
                        <Button asChild>
                            <Link href="/home">Try Now</Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
