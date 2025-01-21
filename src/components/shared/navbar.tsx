"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { LOGO_FONT } from "@/lib/constants/fonts";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
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
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav
            className={`border-b z-30 sticky top-0 bg-light-surface dark:bg-dark-surface transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/icon.png"
                            alt="Resume Anonymizer"
                            className="size-6"
                        />
                        <span
                            className={`ml-2 text-xl font-bold text-gray-900 ${LOGO_FONT.className}`}
                        >
                            {APP_NAME}
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400"
                        >
                            {darkMode ? (
                                <SunIcon className="size-4" />
                            ) : (
                                <MoonIcon className="size-4" />
                            )}
                        </Button>
                        <Button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400"
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
                        className="md:hidden absolute flex flex-col space-y-2 mt-2  rounded-lg shadow-lg w-full px-2"
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
