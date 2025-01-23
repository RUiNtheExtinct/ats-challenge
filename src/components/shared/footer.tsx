import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-row justify-evenly">
                    <div className="hidden md:flex flex-col justify-center gap-2">
                        <h3 className="text-lg font-semibold">{APP_NAME}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Transform your resume with our AI-powered editor.
                            Make your career shine.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/home"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Editor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#pricing"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#blog"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#careers"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#privacy"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#terms"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                >
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 mt-8 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        © {new Date().getFullYear()} {APP_NAME}. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
