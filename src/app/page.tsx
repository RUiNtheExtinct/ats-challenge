import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, Edit, Upload } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                            Transform Your Resume with AI
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Upload your resume, enhance it with our AI-powered
                            editor, and download a polished version that stands
                            out to employers.
                        </p>
                        <Button size="lg" asChild>
                            <Link
                                href="/home"
                                className="flex items-center gap-2"
                            >
                                Get Started <ArrowRight size={20} />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Upload className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Upload
                                </h3>
                                <p className="text-gray-600">
                                    Simply upload your existing resume in PDF
                                    format
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Edit className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Edit
                                </h3>
                                <p className="text-gray-600">
                                    Enhance your content with our AI-powered
                                    editor
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Download className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Download
                                </h3>
                                <p className="text-gray-600">
                                    Export your polished resume in professional
                                    PDF format
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Simple Pricing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="p-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">
                                    Free
                                </h3>
                                <p className="text-3xl font-bold mb-4">$0</p>
                                <ul className="text-gray-600 space-y-2 mb-6">
                                    <li>1 resume edit per month</li>
                                    <li>Basic AI suggestions</li>
                                    <li>PDF export</li>
                                </ul>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full"
                                >
                                    <Link href="/home">Get Started</Link>
                                </Button>
                            </div>
                        </Card>

                        <Card className="p-6 border-blue-200 border-2">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">
                                    Pro
                                </h3>
                                <p className="text-3xl font-bold mb-4">$9</p>
                                <ul className="text-gray-600 space-y-2 mb-6">
                                    <li>Unlimited resume edits</li>
                                    <li>Advanced AI suggestions</li>
                                    <li>Multiple formats export</li>
                                </ul>
                                <Button asChild className="w-full">
                                    <Link href="/home">Get Pro</Link>
                                </Button>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">
                                    Enterprise
                                </h3>
                                <p className="text-3xl font-bold mb-4">
                                    Custom
                                </p>
                                <ul className="text-gray-600 space-y-2 mb-6">
                                    <li>Team collaboration</li>
                                    <li>Custom AI training</li>
                                    <li>API access</li>
                                </ul>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full"
                                >
                                    <Link href="#contact">Contact Sales</Link>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
